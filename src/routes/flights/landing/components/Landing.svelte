<script lang="ts">
	import { fetchFlightsCoreConfig } from '$flights/api/flights-api.js';
	import RecentSearches from '$flights/flights-common/recent-search-flights/RecentSearches.svelte';
	import UpcomingFlights from '$flights/flights-common/upcoming-flights/UpcomingFlights.svelte';
	import { flightSearchStore } from '$flights/stores/flightSearchStore.js';
	import FlightsSearchBox from '$lib/flights-commons/flight-search-box/FlightsSearchBox.svelte';
	import { ListCouponCta } from '@CDNA-Technologies/svelte-vitals/cart/coupons';
	import { LandingWalletCta } from '@CDNA-Technologies/svelte-vitals/cart/wallet';
	import AppBar from '@CDNA-Technologies/svelte-vitals/components/appbar';
	import PrimaryLoader from '@CDNA-Technologies/svelte-vitals/components/primary-loader';
	import ThreeDotMenu from '@CDNA-Technologies/svelte-vitals/components/three-dot-menu';
	import {
		ErrorHandling,
		lceStore,
		setContentLce,
		setErrorLce,
		setLoadingLce
	} from '@CDNA-Technologies/svelte-vitals/error-handling';
	import { NucleiLogger } from '@CDNA-Technologies/svelte-vitals/logger';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { hasFetchedConfig } from '../appState.js';
	import { flightConfigStore, setFlightConfig } from '$flights/stores/flightConfigStore.js';
	import LandingAppBar from './LandingAppBar.svelte';

	onMount(async () => {
		NucleiLogger.logInfo('Flights', 'Landing screen mounted');
       
		if (!$hasFetchedConfig) {
			setLoadingLce();
			await fetchScreenData();
			hasFetchedConfig.set(true);
		} else {
			setContentLce();
		}
	});

	const fetchScreenData = async () => {
		const configResponse = await fetchFlightsCoreConfig();
		console.log('Config : ', configResponse);
		if (configResponse.hasError()) {
			setErrorLce(configResponse.error);
		} else {
			if (configResponse.response) {
				const defaults = configResponse.response.searchRequest;

				// Populate stores
				 setFlightConfig({
                    guests: defaults.guests || [],
                    travellerClass: defaults.travellerClass || 'Economy'
                });
				flightSearchStore.update((store) => {
					store.source = {
						locationName: defaults.src.city,
						iataCode: defaults.src.iataCode
					};
					store.destination = {
						locationName: defaults.des.city,
						iataCode: defaults.des.iataCode
					};
					store.departureDate = new Date(parseInt(defaults.departDate));
					store.travellers =
						defaults.guests.find((g) => g.guestType === 'ADULT')?.defaultValue || 1;
					store.travelClass = defaults.travellerClass ?? 'Economy';
					return store;
				});
			}
			setContentLce();
		}
	};

	function handleRetry() {
		setLoadingLce();
		fetchScreenData();
	}

</script>

<div class="h-screen flex flex-col">
	<LandingAppBar/>

	{#if $lceStore.isLoading}
		<div class="h-screen flex flex-col justify-center">
			<PrimaryLoader />
		</div>
	{:else if $lceStore.hasError && $lceStore.errorDetails != null}
		<ErrorHandling errorHandling={$lceStore.errorDetails} on:submit={handleRetry} />
	{:else if $lceStore.hasContent}
		<div class="overflow-y-scroll w-full">
			<!-- TODO: Remove this inner div and add screen specific code -->
			<FlightsSearchBox />
			<UpcomingFlights />
			<RecentSearches />
		</div>
	{/if}
</div>
