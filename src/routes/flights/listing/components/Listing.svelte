<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { callGetFlightsSearchListV2 } from '$flights/api/flights-api.js';
	import { flightSearchStore } from '$flights/stores/flightSearchStore.js';
	import FlightsSearchBox from '$lib/flights-commons/flight-search-box/FlightsSearchBox.svelte';
	import type { FlightsListing } from '$lib/flights-commons/messages/flights-listing.msg.js';
	import AppBar from '@CDNA-Technologies/svelte-vitals/components/appbar';
	import {
		BottomSheet,
		openBottomSheet
	} from '@CDNA-Technologies/svelte-vitals/components/bottom-sheet';
	import PrimaryLoader from '@CDNA-Technologies/svelte-vitals/components/primary-loader';
	import {
		ErrorHandling,
		lceStore,
		setContentLce,
		setErrorLce,
		setLoadingLce
	} from '@CDNA-Technologies/svelte-vitals/error-handling';
	import { NucleiLogger } from '@CDNA-Technologies/svelte-vitals/logger';
	import { NavigatorUtils } from '@CDNA-Technologies/svelte-vitals/navigator';
	import { onMount } from 'svelte';
	import EditIcon from '../icons/EditIcon.svelte';
	import RightArrowIcon from '../icons/RightArrowIcon.svelte';
	import {
		buildFlightListingRequest,
		formatFlightData,
		initializeStoreFromURL
	} from '../utils/listing-utils.js';
	import BottomFilterBar from './BottomFilterBar.svelte';
	import FlightList from './FlightList.svelte';
	import dayjs from 'dayjs';

	onMount(() => {
		NucleiLogger.logInfo('Flights', 'Listing screen mounted');
		// Initialize store from URL parameters
		initializeStoreFromURL($page);
		// Then fetch data
		setLoadingLce();
		fetchScreenData();
	});

	interface FormattedFlight {
		airlineLogo: string;
		airlinename: string;
		departureTime: string;
		airlineDuration: string;
		totalDuration: string;
		isNonStop: boolean;
		ticketPrice: string;
		isRefundable: boolean;
		isFreeMeal: boolean;
	}

	let flightLists: FormattedFlight[] = [];

	const fetchScreenData = async () => {
		setLoadingLce();

		// using latest store that is initialised with the url data
		const currentStore = $flightSearchStore;
		const params = $page.url.searchParams;

		const flightListingRequest = buildFlightListingRequest(currentStore, params);
		//calling flight listing api----
		const response = await callGetFlightsSearchListV2(flightListingRequest);

		if (response.hasError()) {
			setErrorLce(response.error);
		} else {
			if (response.response) {
				const flightsFromServer: FlightsListing[] = response.response.onwardFlights;

				// used a utils function to properly format flight api response to data we need
				const formattedFlights: FormattedFlight[] = formatFlightData(flightsFromServer);

				flightLists = formattedFlights;
				setContentLce();
			} else {
				setErrorLce({ title: 'No Flights Found', description: 'The API returned no data.' });
			}
		}
	};

	function handleRetry() {
		setLoadingLce();
		fetchScreenData();
	}

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

<div class="h-screen flex flex-col">
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

	{#if $lceStore.isLoading}
		<div class="h-screen flex flex-col justify-center">
			<PrimaryLoader />
		</div>
	{:else if $lceStore.hasError && $lceStore.errorDetails != null}
		<ErrorHandling errorHandling={$lceStore.errorDetails} on:submit={handleRetry} />
	{:else if $lceStore.hasContent}
		<div class="overflow-y-scroll w-full">
			<!-- TODO: Remove this inner div and add screen specific code -->
			<FlightList {flightLists} />
			<BottomFilterBar />
		</div>
	{/if}
</div>

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
