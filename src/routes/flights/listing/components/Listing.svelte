<script lang="ts">
	import { base } from '$app/paths';
	import AppBar from '@CDNA-Technologies/svelte-vitals/components/appbar';
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
	import FlightList from './FlightList.svelte';
	import BottomFilterBar from './BottomFilterBar.svelte';
	import RightArrowIcon from '../icons/RightArrowIcon.svelte';
	import EditIcon from '../icons/EditIcon.svelte';
	import {
		BottomSheet,
		openBottomSheet
	} from '@CDNA-Technologies/svelte-vitals/components/bottom-sheet';
	import FlightsSearchBox from '$flights/flights-common/flight-search-box/FlightsSearchBox.svelte';
	import { flightSearchStore } from '$flights/search-city/components/flightSearchStore.js';
	import { page } from '$app/stores';
	import dayjs from 'dayjs';
	import  type {FlightListingRequest, FlightListingResponse, FlightsListing } from '$flights/flights-common/messages/flights-listing.msg.js';
	import { callGetFlightsSearchListV2 } from '$flights/api/flights-api.js';

	

	onMount(async () => {
		NucleiLogger.logInfo('Flights', 'Listing screen mounted');
		setLoadingLce();
		await fetchScreenData();
	});

	let searchState;
		const unsubscribe = flightSearchStore.subscribe((value) => {
			searchState = value;
		});
		unsubscribe();
      const destinationFromURL = $page.url.searchParams.get('from');
    console.log('source from URL:', destinationFromURL);

	interface FormattedFlight {
		airlineLogo: string;
		airlinename: string;
		departureTime: string;
		arrivalTime: string;
		totalDuration: string;
		isNonStop: boolean;
		ticketPrice: string;
		isRefundable: boolean;
		isFreeMeal: boolean;
	}

	let flightLists: FormattedFlight[] = [];

	const fetchScreenData = async () => {
		// fetch data from api and set lce accordingly
		// if error, setErrorLce(response.error);
		// else, set data to lceStore and setContentLce();
		// setContentLce();
		setLoadingLce();
		const params = $page.url.searchParams;
		console.log("parameters : " , params);
		const departureDate = params.get('departureDate');
		console.log(departureDate);
		const returnDate = params.get('returnDate');
		console.log(returnDate);
		const travellers = parseInt(params.get('travellers') || '1');
		console.log(travellers);
		const travelClass = params.get('travelClass') ?? 'Economy';
		console.log(travelClass);
		const source = params.get('from');
		console.log(source);

		const flightListingRequest: FlightListingRequest = {
			src: {
				iataCode: searchState.source.iataCode,
				city: searchState.source.locationName,
				countryCode: 'IN'
			},
			des: {
				iataCode: searchState.destination.iataCode,
				city: searchState.destination.locationName,
				countryCode: 'IN'
			},
			departDate: departureDate||undefined,
			returnDate: returnDate || undefined,
			is_round_trip: !!returnDate,
			travellerClass: {
				key: travelClass,
				value: travelClass
			},
			passenger: {
				adultCount: travellers,
				childCount: 0,
				infantCount: 0
			},
			partnerCountry: 'IN',
			fareType: 'REGULAR'
		};


		
		console.log("flight listing data - " , flightListingRequest);
		console.log("fdvbfddfbdfbfdbfdbf");
		
		// const response = callGetFlightsSearchListV2(flightListingRequest);
      
		// console.log("response :" , response);
		const response = await callGetFlightsSearchListV2(flightListingRequest);

		if (response.hasError()) {
			setErrorLce(response.error);
		} else {
			if (response.response) {
				const flightsFromServer: FlightsListing[] = response.response.onwardFlights;

				const formattedFlights: FormattedFlight[] = flightsFromServer.map((flight) => {
					const airlineInfo = flight.onwardSegmentDetails.segmentAirlineInfos[0];
					const times = flight.onwardSegmentDetails.airlineTime.split(' - ');
					const durationInfo = flight.onwardSegmentDetails.airlineDuration.split(' | ');

					return {
						airlineLogo:
							airlineInfo?.airlineIconUrl ||
							'https://placehold.co/100x100/cccccc/FFFFFF?text=Logo',
						airlinename: airlineInfo?.airlineName || 'Unknown Airline',
						departureTime: times[0] || '',
						arrivalTime: times[1] || '',
						totalDuration: durationInfo[0] || '',
						isNonStop: durationInfo[1] === 'Non-Stop',
						ticketPrice: `${flight.fareList[0].currencySymbol}${flight.fareList[0].fareS}`,
						isRefundable: flight.refundable,
						isFreeMeal: flight.hasFreeMeal
					};
				});

				flightLists = formattedFlights;
				console.log("Flisght List from api call : ",flightLists);
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

	

	let source = 'Bangalore';
	let destination = 'Hyderabad';
	let date = '17 Mar';
	let travellerCount = 2;
	let travelClass = 'Economy';
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
			<FlightList {flightLists}/>
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
