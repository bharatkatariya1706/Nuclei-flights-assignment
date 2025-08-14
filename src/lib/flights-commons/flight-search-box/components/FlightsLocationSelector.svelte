<script lang="ts">
	import { base } from '$app/paths';
	import { flightSearchStore } from '$flights/stores/flightSearchStore.js';
	import FlightIcon from '$lib/flights-commons/icons/FlightIcon.svelte';
	import SwapIcon from '$lib/flights-commons/icons/SwapIcon.svelte';
	import { NavigatorUtils } from '@CDNA-Technologies/svelte-vitals/navigator';

	// --- Event Handlers ---
	const handleSourceClick = () => {
		console.log('Source clicked');
		// Navigate to the search page, passing 'source' as the type
		NavigatorUtils.navigateTo({
			url: `${base}/flights/search-city?type=source&title=Search Source City`
		});
	};

	const handleDestinationClick = () => {
		console.log('Destination clicked');
		// Navigate to the search page, passing 'destination' as the type
		NavigatorUtils.navigateTo({
			url: `${base}/flights/search-city?type=destination&title=Search Destination City`
		});
	};

	const handleSwapButtonClick = () => {
		console.log('Swap button clicked');
		// Update the store to swap the source and destination
		flightSearchStore.update((current) => ({
			...current,
			source: current.destination,
			destination: current.source
		}));
	};
</script>

<!-- main container -->
<div class="flex justify-center mt-6">
	<div class="w-11/12 h-36 bg-base-200 rounded-lg shadow p-4">
		<div class="flex h-full items-center">
			<!-- Left-side vertical line with icon -->
			<div class="flex flex-col items-center mr-4 relative h-full">
				<div class="w-2 h-2 bg-blue-900 rounded-full mb-1" />
				<div class="w-px bg-blue-900 flex-1" />
				<FlightIcon />
			</div>

			<!-- Source and Destination -->
			<div class="flex flex-col flex-grow justify-between h-full py-1">
				<!-- Source -->
				<div class="flex items-center gap-2 cursor-pointer" on:click={handleSourceClick}>
					<div class="sub-text border border-gray-400 rounded px-1.5 py-0.5">
						{$flightSearchStore.source.iataCode}
					</div>
					<div class="font-normal text-xl">{$flightSearchStore.source.locationName}</div>
				</div>

				<!-- Dashed line -->
				<div class="border-t border-dashed border-gray-500 w-full my-1" />

				<!-- Destination -->
				<div class="flex items-center gap-2 cursor-pointer" on:click={handleDestinationClick}>
					<div class="sub-text border border-gray-400 rounded px-1.5 py-0.5">
						{$flightSearchStore.destination.iataCode}
					</div>
					<div class="font-normal text-xl">{$flightSearchStore.destination.locationName}</div>
				</div>
			</div>

			<!-- swap button -->
			<div class="ml-3 flex items-center h-full">
				<div
					class="flex items-center justify-center cursor-pointer"
					on:click={handleSwapButtonClick}
				>
					<SwapIcon />
				</div>
			</div>
		</div>
	</div>
</div>
