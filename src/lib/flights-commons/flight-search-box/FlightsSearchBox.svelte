<script lang="ts">
	import { flightSearchStore } from '$flights/stores/flightSearchStore.js';
	import { NavigatorUtils } from '@CDNA-Technologies/svelte-vitals/navigator';
	import { buildSearchUrl, validateSearchState } from '../utils/search-utils.js';
	import FlightsClassAndTravellerSelector from './components/FlightsClassAndTravellerSelector.svelte';
	import FlightsDateSelector from './components/FlightsDateSelector.svelte';
	import FlightsLocationSelector from './components/FlightsLocationSelector.svelte';
	// import PrimaryButton from '@CDNA-Technologies/svelte-vitals/components/primary-button';

	const handleSearchButtonClick = () => {
		const searchState = $flightSearchStore;
		const validation = validateSearchState(searchState);

		if (!validation.isValid) {
			console.error('Search validation failed:', validation.errors);
			return;
		}

		const url = buildSearchUrl(searchState);
		console.log('Navigating to:', url);
		NavigatorUtils.navigateTo({ url });
	};

</script>

<FlightsLocationSelector />
<FlightsDateSelector />
<FlightsClassAndTravellerSelector />

<div class="flex justify-center mt-6">
	<button
		class="w-full heading-2 max-w-md h-14 bg-primary
             hover:bg-primary-focus text-white content-m
             rounded-lg flex items-center justify-center transition duration-200"
		on:click={handleSearchButtonClick}
	>
		Search Flights
</button>
</div>
