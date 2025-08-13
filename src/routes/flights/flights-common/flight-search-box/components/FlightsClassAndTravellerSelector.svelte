<script lang="ts">
	import DropdownIcon from '$flights/flights-common/icons/DropdownIcon.svelte';
	import { BottomSheet, closeBottomSheet, openBottomSheet } from '@CDNA-Technologies/svelte-vitals/components/bottom-sheet';
  import BottomSheetTravellerAndClassSelector from './BottomSheetTravellerAndClassSelector.svelte';
  import { flightSearchStore } from '$flights/search-city/components/flightSearchStore.js';

let travelClass = 'Economy';
	let travellers = 1;
	let nonStopOnly = true;

  const handleOpenSelector = () => {
		openBottomSheet('traveller-class-selector');
	};

  const handleSelectionProceed = (event) => {
		travellers = event.detail.travellers;
		travelClass = event.detail.travelClass.replace(' Class', '');
		closeBottomSheet();
	};
  

	const handleClassClick = () => console.log('Class dropdown opens');
	const handleTravellerClick = () => console.log('Traveller(s) dropdown opens');
</script>

<div class="flex flex-col mt-6 space-y-3 w-[90%] mx-auto">
  
  <!-- Dropdown container for Class and Traveller(s) -->
  <div class="h-[56px] bg-base-200 rounded-[8px] shadow overflow-hidden flex divide-x divide-gray-300">
    
    <!-- Class Section -->
    <div class="flex-1 px-4 py-2 cursor-pointer" on:click={handleOpenSelector}>
      <p class="sub-text base-content-light-60 mb-1">Class</p>
     
      <div class="flex items-center justify-between">
        <p class="heading-3 truncate">{$flightSearchStore.travelClass}</p>
        <DropdownIcon />
      </div>
    </div>

    <!-- Traveller(s) Section -->
    <div class="flex-1 px-4 py-2 cursor-pointer" on:click={handleOpenSelector}>
      <p class="sub-text base-content-light-60 mb-1">Traveller(s)</p>
      <div class="flex items-center justify-between">
        <p class="heading-3">{$flightSearchStore.travellers}</p>
        <DropdownIcon />
      </div>
    </div>
  </div>


  <div class="flex items-center space-x-2">
    <input
      id="nonStopOnly"
      type="checkbox"
      bind:checked={nonStopOnly}
      class="checkbox h-5 w-5 rounded checkbox-primary"
    />
   
    <label for="nonStopOnly" class="sub-text base-content-light-60 cursor-pointer">
      Show only non-stop flights
    </label>
  </div>
</div>


<BottomSheet
	modelId="traveller-class-selector"
	modalPosition="flex-end"
	height="h-auto  "
	borderRadius="rounded-t-lg"
	showCrossIcon={true}
	showBackButton={false}
  disableOuterClick={true} 
>
	<div slot="details">
		<BottomSheetTravellerAndClassSelector on:proceed={handleSelectionProceed} />
	</div>
</BottomSheet>

