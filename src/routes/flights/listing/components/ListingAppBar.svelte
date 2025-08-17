<script lang="ts">
	import AppBar from "@CDNA-Technologies/svelte-vitals/components/appbar";
	import EditIcon from "../icons/EditIcon.svelte";
	import RightArrowIcon from "../icons/RightArrowIcon.svelte";
	import { NavigatorUtils } from "@CDNA-Technologies/svelte-vitals/navigator";
	import { base } from "$app/paths";
	import { BottomSheet, openBottomSheet } from "@CDNA-Technologies/svelte-vitals/components/bottom-sheet";
    import { flightSearchStore } from '$flights/stores/flightSearchStore.js';
	import dayjs from "dayjs";
	import FlightsSearchBox from "$lib/flights-commons/flight-search-box/FlightsSearchBox.svelte";

	const handleBackClick = () => {
		console.log('Listing Page Back Button clicked');
		NavigatorUtils.navigateTo({ url: base + '/flights/landing' });
	};

	const handleEditButtonClick = () => {
		console.log('Edit Buton Clicked');
		openBottomSheet('edit-flight-search');
	};

	let date = dayjs().format('DD MMM');

</script>

<AppBar height="80px" enableZIndex showBackButton onBackButtonClick={handleBackClick}>
		<div
			slot="action"
			class="btn btn-sm h-auto p-1 btn-primary bg-neutral-content"
			on:click={handleEditButtonClick}
		>
			<EditIcon />
		</div>

		<div slot="title" class="flex items-center gap-2 nav-text">
			<span>{$flightSearchStore.source.locationName}</span>
			<RightArrowIcon />
			<span>{$flightSearchStore.destination.locationName}</span>
		</div>

		<div slot="details" class="ml-14 -mt-4 py-2">
			{date} | {$flightSearchStore.travellers} Traveller{$flightSearchStore.travellers > 1
				? 's'
				: ''} | {$flightSearchStore.travelClass}
		</div>
	</AppBar>


    <BottomSheet
	modelId="edit-flight-search"
	modalPosition="flex-start"
	fullScreenModal={false}
	showBackButton={false}
	showCrossIcon={true}
	borderRadius="rounded-2xl"
>
	<div slot="title" class="heading-2 -mt-4 ml-6">Modify Search</div>
	<div slot="details" class="p-6 -mt-12">
		<FlightsSearchBox />
	</div>
</BottomSheet>