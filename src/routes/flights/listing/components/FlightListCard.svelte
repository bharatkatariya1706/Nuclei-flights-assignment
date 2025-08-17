<script lang="ts">
	import type { FormattedFlight } from '$lib/flights-commons/messages/flights-listing.msg.js';
	import FreeMealIcon from '../icons/FreeMealIcon.svelte';
	import NonRefundableIcon from '../icons/NonRefundableIcon.svelte';
	import RefundableIcon from '../icons/RefundableIcon.svelte';

	export let flight: FormattedFlight;
</script>

<!-- Main  container -->
<div class="flex items-start p-4 space-x-4">
	<!-- logo and name -->
	<div class="flex-shrink-0 w-24">
		<img
			src={flight.airlineLogo}
			alt="{flight.airlinename} logo"
			class="w-14 h-14 rounded-md object-cover"
		/>
		<p class="content-2 mt-2 truncate">{flight.airlinename}</p>

		<div class="mt-2 flex items-center space-x-4">
			{#if flight.isRefundable}
				<div class="flex items-center space-x-2 content-2 text-gray-600 whitespace-nowrap">
					<RefundableIcon />
					<span>Refundable</span>
				</div>
			{:else}
				<div class="flex items-center space-x-2 content-2 text-gray-600 whitespace-nowrap">
					<NonRefundableIcon />
					<span>Non-Refundable</span>
				</div>
			{/if}
			{#if flight.isFreeMeal}
				<div class="flex items-center space-x-2 content-2 text-gray-600 whitespace-nowrap">
					<FreeMealIcon />
					<span>Free Meals</span>
				</div>
			{/if}
		</div>
	</div>

	<!-- timing and duration -->
	<div class="flex-1 flex items-center">
		<div class="flex-1 flex flex-col items-center">
			<p class="card-heading">{flight.departureTime} - {flight.arrivalTime}</p>
			<p class="sub-text mt-1 whitespace-nowrap">
				<!-- total duration | no. of stops -->
				{flight.airlineDuration[0]} | {flight.airlineDuration[1]}
			</p>
		</div>

		<!-- Price -->
		<div class="w-32 text-right">
			<p class="card-heading text-green-500">{flight.ticketPrice}</p>
		</div>
	</div>
</div>
