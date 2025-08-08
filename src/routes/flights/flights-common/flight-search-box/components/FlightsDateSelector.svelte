<script lang="ts">
	import AddIcon from '$flights/flights-common/icons/AddIcon.svelte';

	const handleDepartureClick = () => {
		console.log('Departure date calendar opens');
	};

	const handleReturnClick = () => {
		console.log('Return date calendar opens');
	};
</script>

<div class="flex justify-center mt-6">
	<div
		class="w-[90%] h-[90px] bg-white rounded-[8px] shadow overflow-hidden flex divide-x divide-gray-300"
	>
		<div class="flex-1 px-4 py-[10px] cursor-pointer" on:click={handleDepartureClick}>
			<div class="flex flex-col justify-center h-full">
				<p class="sub-text base-content-light-60 leading-none ml-2">Departure</p>
				<p class="card-sub-heading leading-tight mt-[2px] ml-2">17 Mar</p>
				<p class="sub-text base-content-light-60 mt-[2px] ml-2">Monday</p>
			</div>
		</div>

		<div class="flex-1 px-4 py-[10px] cursor-pointer" on:click={handleReturnClick}>
			<div class="flex justify-between items-center h-full">
				<div>
					<p class="sub-text base-content-light-60">Return</p>
					<p class="card-sub-heading leading-tight mt-[2px]">Add Return</p>
					<p class="sub-text base-content-light-60 mt-1">and save more!</p>
				</div>

				<div class="">
					<AddIcon />
				</div>
			</div>
		</div>
	</div>
</div>
