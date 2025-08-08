<script lang="ts">
	import FlightIcon from '$flights/flights-common/icons/FlightIcon.svelte';
	import SwapIcon from '$flights/flights-common/icons/SwapIcon.svelte';

	export let from = 'Bangalore';
	export let to = 'Hyderabad';
	export let srcIataCode = 'BLR';
	export let destIataCode = 'HYD';

	const handleSourceClick = () => {
		console.log('Source clicked');
	};

	const handleDestinationClick = () => {
		console.log('Destination clicked');
	};

	const handleSwapButtonClick = () => {
		console.log('Swap button clicked');
		[from, to] = [to, from];
		[srcIataCode, destIataCode] = [destIataCode, srcIataCode];
	};
</script>

<!-- main container -->
<div class="flex justify-center mt-6">
	<div class="w-[90%] h-[122px] bg-white rounded-[8px] shadow p-4">
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
					<div class="sub-text border border-gray-400 rounded px-1.5 py-0.5">{srcIataCode}</div>
					<div class="font-normal text-xl">{from}</div>
				</div>

				<!-- Dashed line -->
				<div class="border-t border-dashed border-[#606574] w-full my-1" />

				<!-- Destination -->
				<div class="flex items-center gap-2 cursor-pointer" on:click={handleDestinationClick}>
					<div class="sub-text border border-gray-400 rounded px-1.5 py-0.5">{destIataCode}</div>
					<div class="font-normal text-xl">{to}</div>
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
