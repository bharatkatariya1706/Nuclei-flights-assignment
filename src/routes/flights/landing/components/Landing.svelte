<script lang="ts">
	import { fetchFlightsCoreConfig } from '$flights/api/flights-api.js';
	import FlightsSearchBox from '$flights/flights-common/flight-search-box/FlightsSearchBox.svelte';
	import RecentSearches from '$flights/flights-common/recent-search-flights/RecentSearches.svelte';
	import UpcomingFlights from '$flights/flights-common/upcoming-flights/UpcomingFlights.svelte';

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
	import { flightSearchStore } from '$flights/search-city/components/flightSearchStore.js';
	import dayjs from 'dayjs';

	onMount(async () => {
		NucleiLogger.logInfo('Flights', 'Landing screen mounted');
		setLoadingLce();
		await fetchScreenData();
	});

	const fetchScreenData = async () => {
		// fetch data from api and set lce accordingly
		
		const configResponse = await fetchFlightsCoreConfig();
		console.log("configuration response - ",configResponse);

		// if error, setErrorLce(response.error);
		 if (configResponse.hasError()) {
        setErrorLce(configResponse.error);
    } else {
        if (configResponse.response) {
            // Get the default data from the API response
            const defaults = configResponse.response.searchRequest; 

         // default values
			flightSearchStore.update(store => {
                store.source = {
                    locationName: defaults.src.city,
                    iataCode: defaults.src.iataCode
                };
                store.destination = {
                    locationName: defaults.des.city,
                    iataCode: defaults.des.iataCode
                };
                // store.departureDate = dayjs(defaults.departDate).toDate();
                store.travellers = defaults.guests[0].defaultValue;
                store.travelClass = defaults.travellerclass ?? "Economy";
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

	const handleBackClick = () => {
		console.log('Back Button Clicked');
	};

	const handleMyBookingClick = (close: () => void) => {
		console.log('My Booking Clicked');
		close();
	};

	const handleMyTransactionClick = (close: () => void) => {
		console.log('My transaction Clicked');
		close();
	};

	const handleWebCheckInClick = (close: () => void) => {
		console.log('Web CheckIn Clicked');
		close();
	};

	const handleHelpClick = (close: () => void) => {
		console.log('Help clicked');
		close();
	};

	const handlePartnerHomeClick = (close: () => void) => {
		console.log('Partner Home clicked');
		close();
	};

	const handleSdkLogoutClick = (close: () => void) => {
		console.log('SDK Logout clicked');
		close();
	};
</script>

<div class="h-screen flex flex-col">
	<AppBar
		title="Flights"
		height="80px"
		enableZIndex
		showBackButton
		onBackButtonClick={handleBackClick}
	>
		<div slot="action" class="flex flex-row items-center gap-2">
			<LandingWalletCta />
			<ListCouponCta />

			<div class="dropdown dropdown-end">
				<ThreeDotMenu let:closeDropDown colour="#000000">
					<li on:click={handleMyBookingClick(closeDropDown)} class="border-t p-3 text-base-content">
						My Bookings
					</li>

					<li
						on:click={handleMyTransactionClick(closeDropDown)}
						class="border-t p-3 text-base-content"
					>
						My Transactions
					</li>
					<li
						on:click={handleWebCheckInClick(closeDropDown)}
						class="border-t p-3 text-base-content"
					>
						Web Check-In
					</li>
					<li on:click={handleHelpClick(closeDropDown)} class="border-t p-3 text-base-content">
						Help
					</li>
					<li
						on:click={handlePartnerHomeClick(closeDropDown)}
						class="border-t p-3 text-base-content"
					>
						Partner Home
					</li>
					<li on:click={handleSdkLogoutClick(closeDropDown)} class="border-t p-3 text-base-content">
						SDK Logout
					</li>
				</ThreeDotMenu>
			</div>
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
			<FlightsSearchBox />
			<UpcomingFlights />
			<RecentSearches />
		</div>
	{/if}
</div>
