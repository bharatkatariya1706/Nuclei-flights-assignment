<script>
	import ArrowRightIcon from '$flights/flights-common/icons/ArrowRightIcon.svelte';

	export let airlineLogo = '';
	export let from = '';
	export let to = '';
	export let dateRange = '';
	export let travellers = 1;
	export let travelClass = '';
	export let duration = '';
</script>

<div
	class="bg-white rounded-xl shadow-md p-3 flex items-center space-x-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
>
	<!-- Airline Logo -->
	<div class="flex-shrink-0">
		<img class="w-[72px] h-[72px] rounded-lg object-cover" src={airlineLogo} alt="Airline Logo" />
	</div>

	<!-- Flight Details -->
	<div class="flex-1 min-w-0">
		<div class="flex items-center gap-2">
			<p class="card-heading flex-shrink-0">{from}</p>
			<ArrowRightIcon />

			<p class="card-heading truncate">{to}</p>
		</div>

		<p class="sub-text base-content-light-60 mt-1">{dateRange}</p>

		<div class="content-2m mt-2 flex items-center space-x-2">
			<span>{travellers} Traveller{travellers > 1 ? 's' : ''}</span>
			<span class="text-base-300">|</span>
			<span>{travelClass}</span>
			<span class="text-base-300">|</span>
			<span>{duration}</span>
		</div>
	</div>
</div>
