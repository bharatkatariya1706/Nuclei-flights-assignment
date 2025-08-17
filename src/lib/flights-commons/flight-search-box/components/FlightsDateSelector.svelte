<script lang="ts">
	import AddIcon from '$lib/flights-commons/icons/AddIcon.svelte';

	const handleDepartureClick = () => {
		console.log('Departure date calendar opens');
	};

	const handleReturnClick = () => {
		console.log('Return date calendar opens');
	};
</script>

<div class="flex justify-center mt-6">
	<div
		class="w-11/12 h-21 bg-base-200 rounded-lg shadow overflow-hidden flex divide-x divide-gray-300"
	>
		<div class="flex-1 px-4 py-2.5 cursor-pointer" on:click={handleDepartureClick}>
			<div class="flex flex-col justify-center h-full ml-2">
				<p class="sub-text base-content-light-60 leading-none">Departure</p>
				<p class="card-sub-heading leading-tight mt-1">17 Mar</p>
				<p class="sub-text base-content-light-60 mt-1">Monday</p>
			</div>
		</div>

		<div
			class="flex-1 px-4 py-2.5 cursor-pointer"
			on:click={handleReturnClick}
			on:keydown={(e) => {
				if (e.key === 'Enter') {
					handleReturnClick();
				}
			}}
		>
			<div class="flex justify-between items-center h-full">
				<div>
					<p class="sub-text base-content-light-60">Return</p>
					<p class="card-sub-heading leading-tight mt-1">Add Return</p>
					<p class="sub-text base-content-light-60 mt-1">and save more!</p>
				</div>

				<div class="mr-1">
					<AddIcon />
				</div>
			</div>
		</div>
	</div>
</div>
