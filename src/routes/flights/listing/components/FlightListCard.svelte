<script lang="ts">
	import FreeMealIcon from '../icons/FreeMealIcon.svelte';
	import NonRefundableIcon from '../icons/NonRefundableIcon.svelte';
	import RefundableIcon from '../icons/RefundableIcon.svelte';

	export let airlineLogo: string;
	export let airlinename: string;
	export let departureTime: string;
	export let arrivalTime: string;
	export let airlineDuration: [];
	export let ticketPrice: string;
	export let isRefundable: boolean;
	export let isFreeMeal: boolean;
</script>

<div class="p-4">
	<!-- Main  container -->
	<div class="flex items-start space-x-4">
		<!-- logo and name -->
		<div class="flex-shrink-0 w-24">
			<img src={airlineLogo} alt="{airlinename} logo" class="w-14 h-14 rounded-md object-cover" />
			<p class="content-2 mt-2 truncate">{airlinename}</p>

			<div class="mt-2 flex items-center space-x-4">
				{#if isRefundable}
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
				{#if isFreeMeal}
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
				<p class="card-heading">{departureTime} - {arrivalTime}</p>
				<p class="sub-text mt-1 whitespace-nowrap">
					<!-- total duration | no. of stops -->
					{airlineDuration[0]} | {airlineDuration[1]}
				</p>
			</div>

			<!-- Price -->
			<div class="w-32 text-right">
				<p class="card-heading text-green-500">{ticketPrice}</p>
			</div>
		</div>
	</div>
</div>
