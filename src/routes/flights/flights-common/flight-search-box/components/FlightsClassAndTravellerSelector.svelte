<script lang="ts">
	import DropdownIcon from '$flights/flights-common/icons/DropdownIcon.svelte';

	let travelClass = 'Economy';
	let travellers = 12;
	let nonStopOnly = true;

	const handleClassClick = () => console.log('Class dropdown opens');
	const handleTravellerClick = () => console.log('Traveller(s) dropdown opens');
</script>

<div class="flex flex-col mt-6 space-y-3 w-[90%] mx-auto">
	<div class="h-[68px] bg-white rounded-[8px] shadow overflow-hidden flex divide-x divide-gray-300">
		<div class="flex-1 px-4 py-2 cursor-pointer" on:click={handleClassClick}>
			<p class="sub-text base-content-light-60 mb-1">Class</p>
			<div class="flex items-center gap-4">
				<p class="heading-3">{travelClass}</p>
				<DropdownIcon />
			</div>
		</div>

		<div class="flex-1 px-4 py-2 cursor-pointer" on:click={handleTravellerClick}>
			<p class="sub-text base-content-light-60 mb-1">Traveller(s)</p>
			<div class="flex items-center gap-4">
				<p class="heading-3">{travellers}</p>
				<DropdownIcon />
			</div>
		</div>
	</div>

	<div class="flex item-center space-x-2">
		<input
			id="nonStopOnly"
			type="checkbox"
			bind:checked={nonStopOnly}
			class="mx-2 checkbox h-5 w-5 rounded checkbox-primary"
		/>
		<label for="nonStopOnly" class="flex h-12 sub-text base-content-light">
			Show only non-stop flights
		</label>
	</div>
</div>
