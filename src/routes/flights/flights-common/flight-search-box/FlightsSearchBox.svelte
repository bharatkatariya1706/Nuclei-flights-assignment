<script lang="ts">
	import FlightsLocationSelector from './components/FlightsLocationSelector.svelte';
	import FlightsDateSelector from './components/FlightsDateSelector.svelte';
	import FlightsClassAndTravellerSelector from './components/FlightsClassAndTravellerSelector.svelte';
	import { NavigatorUtils } from '@CDNA-Technologies/svelte-vitals/navigator';
	import { base } from '$app/paths';
	import PrimaryButton from '@CDNA-Technologies/svelte-vitals/components/primary-button';

	const handleSearchButtonClick = () => {
		console.log('Searching for Flights');
		NavigatorUtils.navigateTo({url:base + '/flights/listing'});
	};
</script>

<div class="grid w-full">
	<FlightsLocationSelector />
	<FlightsDateSelector />

	<FlightsClassAndTravellerSelector />

	<div class="flex justify-center mt-6">
		<button
			class="w-[95%] heading-2 max-w-md h-14 bg-primary hover:bg-primary-focus text-white content-m rounded-lg flex items-center justify-center transition duration-200"
			on:click={handleSearchButtonClick}
		>
			Search Flights
		</button>
		<!-- <PrimaryButton>Search Flights</PrimaryButton> -->
	</div>
</div>
