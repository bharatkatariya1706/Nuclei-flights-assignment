<script lang="ts">
	import { page } from '$app/stores';
	import { callGetFlightsSearchListV2 } from '$flights/api/flights-api.js';
	import { flightSearchStore } from '$flights/stores/flightSearchStore.js';
	import PrimaryLoader from '@CDNA-Technologies/svelte-vitals/components/primary-loader';
	import {
		ErrorHandling,
		lceStore,
		setContentLce,
		setErrorLce,
		setLoadingLce
	} from '@CDNA-Technologies/svelte-vitals/error-handling';
	import { NucleiLogger } from '@CDNA-Technologies/svelte-vitals/logger';
	import { onMount } from 'svelte';
	import {
		buildFlightListingRequest,
		formatFlightData,
		initializeStoreFromURL
	} from '../utils/listing-utils.js';
	import BottomFilterBar from './BottomFilterBar.svelte';
	import FlightList from './FlightList.svelte';
	import ListingAppBar from './ListingAppBar.svelte';

	onMount(() => {
		NucleiLogger.logInfo('Flights', 'Listing screen mounted');
		// Initialize store from URL parameters
		initializeStoreFromURL($page);
		// Then fetch data
		setLoadingLce();
		fetchScreenData();
	});

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
</script>

<div class="h-screen flex flex-col">
	<ListingAppBar />

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
