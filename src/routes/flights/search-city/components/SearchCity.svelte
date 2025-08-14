<script lang="ts">
	import { page } from '$app/stores';
	import SearchIcon from './SearchIcon.svelte';
	import CityCard from './CityCard.svelte';
	import { popularCities } from './cityData.js';
	import { flightSearchStore } from '../../stores/flightSearchStore.js';
	import AppBar from '@CDNA-Technologies/svelte-vitals/components/appbar';
	import { tick } from 'svelte';

	//title and type from the URL query parameters
	const appBarTitle = $page.url.searchParams.get('title') ?? 'Search City';
	const searchType = $page.url.searchParams.get('type'); // src or destination

	const handleBackClick = () => {
		history.back();
	};

	$: handleSearchChange();
	const handleSearchChange = () => {
		console.log('Searching for text');
	};

	const handleCitySelect = async(city: { locationName: string; airportDetails: string }) => {
		const iataCode = city.airportDetails.split(' ')[0];
		const newSelection = { locationName: city.locationName, iataCode: iataCode };

		// Get the current store value 
		let currentStoreValue;
		const unsubscribe = flightSearchStore.subscribe((value) => {
			currentStoreValue = value;
		});
		unsubscribe(); 

		// Check if the new selection matches the other city
		if (
			(searchType === 'source' &&
				newSelection.iataCode === currentStoreValue?.destination.iataCode) ||
			(searchType === 'destination' && newSelection.iataCode === currentStoreValue?.source.iataCode)
		) {
			// Show a message and stop the function
			alert('Source and Destination cannot be the same.');
			return;
		}

		// If the check passes, update the store
		flightSearchStore.update((store) => {
			if (searchType === 'source') {
				store.source = newSelection;
			} else if (searchType === 'destination') {
				store.destination = newSelection;
			}
			return store;
		});

		await tick();
		history.back(); 
	};
</script>

<div class="flex flex-col h-screen bg-base-100">
	<AppBar
		title={appBarTitle}
		height="80px"
		enableZIndex
		showBackButton
		onBackButtonClick={handleBackClick}
	/>

	<!-- Search Input -->
	<div class="p-4 bg-base-100">
		<div class="relative">
			<input
				type="text"
				placeholder="Enter City/Airport Name"
				class="w-full h-12 pl-4 pr-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
				on:change={handleSearchChange}
			/>
			<div class="absolute w-[24px] inset-y-0 right-0 flex items-center pr-4">
				<SearchIcon />
			</div>
		</div>
	</div>

	<!-- Scrollable Content Area -->
	<div class="flex-1 overflow-y-auto">
		<!-- Popular Cities Section -->
		<div class="bg-base-100 mt-4">
			<h3 class="p-4 heading-3">Popular cities</h3>
			<div class="divide-y divide-gray-200">
				{#each popularCities as city}
				
					<div on:click={() => handleCitySelect(city)}>
						<CityCard {...city} />
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
