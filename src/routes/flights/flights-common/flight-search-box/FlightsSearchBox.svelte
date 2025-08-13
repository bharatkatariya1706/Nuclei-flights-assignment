<script lang="ts">
	import FlightsLocationSelector from './components/FlightsLocationSelector.svelte';
	import FlightsDateSelector from './components/FlightsDateSelector.svelte';
	import FlightsClassAndTravellerSelector from './components/FlightsClassAndTravellerSelector.svelte';
	import { NavigatorUtils } from '@CDNA-Technologies/svelte-vitals/navigator';
	import { base } from '$app/paths';
	import PrimaryButton from '@CDNA-Technologies/svelte-vitals/components/primary-button';
	import { closeBottomSheet } from '@CDNA-Technologies/svelte-vitals/components/bottom-sheet';
	import { flightSearchStore } from '$flights/search-city/components/flightSearchStore.js';
	import dayjs from 'dayjs';

	const handleSearchButtonClick = () => {
		console.log('Searching for Flights');

		const searchState = $flightSearchStore;

		if (!searchState || !searchState.source || !searchState.source.iataCode) {
			console.error('Source is null or undefined in flightSearchStore');
		}

		console.log('Building URL :', searchState);

		// Build the URL parameters
		const params = new URLSearchParams({
			from: searchState?.source?.iataCode,
			to: searchState?.destination?.iataCode,
			departureDate: dayjs(searchState?.departureDate).format('YYYY-MM-DD'),
			travellers: searchState?.travellers.toString(),
			travelClass: searchState?.travelClass
		});

		// Add return date only if it exists
		if (searchState?.returnDate) {
			params.append('returnDate', dayjs(searchState?.returnDate).format('YYYY-MM-DD'));
		}

		const url = `${base}/flights/listing?${params.toString()}`;
		console.log('Navigating to:', url);

		NavigatorUtils.navigateTo({ url });
	};
</script>


	<FlightsLocationSelector />
	<FlightsDateSelector />

	<FlightsClassAndTravellerSelector />

	<div class="flex justify-center mt-6">
		<button
			class="w-[95%] heading-2 max-w-md h-14 bg-primary
             hover:bg-primary-focus text-white content-m 
             rounded-lg flex items-center justify-center transition duration-200"
			on:click={handleSearchButtonClick}
		>
			Search Flights
		</button>
		<!-- <PrimaryButton>Search Flights</PrimaryButton> -->
	</div>

