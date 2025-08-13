<script lang="ts">
	// import { flightLists } from "../ListingFlightsData.js";
	import FlightListCard from "./FlightListCard.svelte";
  export let flightLists = [];

</script>

<!-- complete list of flights card  -->
<div class="p-4 bg-base-100 font-sans pb-24 -mt-2">
  <div class="bg-base-100 divide-y divide-gray-200">
    {#each flightLists as flight}
      <FlightListCard {...flight} />
    {/each}
  </div>
</div>
