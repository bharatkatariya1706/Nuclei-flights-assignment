<script lang="ts">
	import FilterIcon from '../icons/FilterIcon.svelte';

	// dummy values
	const quickFilters = ['Non-Stop', 'Morning Departure', 'Indigo', 'Vistara', 'Air India'];

	// to be implemented  with actual functinalities
	const handleFilterClick = (filter: string) => {
		console.log(`Filter clicked: ${filter}`);
	};

	const handleSortAndFilterClick = () => {
		console.log('Sort & Filters button clicked');
	};
</script>

<!-- Main container -->
<div class="fixed bottom-0 left-0 right-0 p-3 bg-base-100 shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
	<div class="flex items-center space-x-2">
		<!-- Horizontally scrollable  -->
		<div class="flex-1 flex items-center space-x-4 overflow-x-auto scrollbar-hide">
			{#each quickFilters as filter}
				<button
					on:click={() => handleFilterClick(filter)}
					class="px-4 py-2 bg-base-200 rounded-md sub-text
					 whitespace-nowrap hover:bg-base-100 transition-colors"
				>
					{filter}
				</button>
			{/each}
		</div>

		<!-- filter button -->
		<button
			on:click={handleSortAndFilterClick}
			class="flex flex-col items-center justify-center bg-primary
			 text-white px-4 py-2 w-[88px] h-[72px] hover:bg-primary-focus transition-colors"
		>
			<FilterIcon />
			<span class="content-2 mt-1 whitespace-nowrap">Sort & Filters</span>
		</button>
	</div>
</div>
