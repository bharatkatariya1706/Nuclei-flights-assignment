<script>
	import { flights } from '../FlightsData.js';
	import FlightCard from './components/FlightCard.svelte';
</script>

<div class="bg-gray-100 p-4 font-sans">
	<div class="flex justify-between items-center mb-4">
		<h2 class="heading-2">Upcoming Flights</h2>

		<a href="/flights" class="text-primary heading-3 hover:underline">VIEW ALL</a>
	</div>

	<div class="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
		{#each flights as flight}
			<div class="flex-shrink-0 w-[93%]">
				<FlightCard {...flight} />
			</div>
		{/each}
	</div>
</div>
