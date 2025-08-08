<script>
	import { flights as recentSearches } from '../FlightsData.js';
	import SearchItemCard from './components/SearchItemCard.svelte';
</script>

<div class="base-100 font-sans">
	<div class="mb-4 px-4">
		<h2 class="heading-2">Recent Searches</h2>
	</div>

	<div
		class="flex flex-col space-y-2 border-t border-b border-gray-200bg-white divide-y divide-gray-200 border-t border-b border-gray-200"
	>
		{#each recentSearches as search}
			<SearchItemCard {...search} />
		{/each}
	</div>
</div>
