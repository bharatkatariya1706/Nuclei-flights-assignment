<script lang="ts">
	import LocationPinIcon from '$lib/flights-commons/icons/LocationPinIcon.svelte';

	export let locationName: string;
	export let airportDetails: string;
</script>

<!-- Main container -->
<div class="p-4 flex items-center space-x-4 cursor-pointer hover:bg-base-200 transition-colors">
	<!-- Icon on the left -->
	<div class="flex-shrink-0">
		<LocationPinIcon />
	</div>

	<div>
		<p class="card-sub-heading">{locationName}</p>
		<p class="card-content base-content-light">{airportDetails}</p>
	</div>
</div>
