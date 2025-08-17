import { page } from '$app/stores';
import { flightSearchStore } from '$flights/stores/flightSearchStore.js';


// this will initialise the store when page is refreshed by the latest url parameters
export function initializeStoreFromURL($page) {
	const params = $page.url.searchParams;

	flightSearchStore.update((store) => ({
		...store,
		source: {
			iataCode: params.get('from') || store.source.iataCode,
			locationName: params.get('fromName') || store.source.locationName
		},
		destination: {
			iataCode: params.get('to') || store.destination.iataCode,
			locationName: params.get('toName') || store.destination.locationName
		},
		departureDate: params.get('departureDate')
			? new Date(params.get('departureDate'))
			: store.departureDate,
		travellers: params.get('travellers') ? parseInt(params.get('travellers')) : store.travellers,
		travelClass: params.get('travelClass') || store.travelClass
	}));
}

// function to format flight data
export function formatFlightData(flightsFromServer) {
    return flightsFromServer.map((flight) => {
        const airlineInfo = flight.onwardSegmentDetails.segmentAirlineInfos[0];
        const times = flight.onwardSegmentDetails.airlineTime.split(' - ');
        const durationInfo = flight.onwardSegmentDetails.airlineDuration.split(' | ');
        const [durationPart, stopsPart] = flight.onwardSegmentDetails.airlineDuration
            .split('|')
            .map(part => part.trim());
        
        console.log(durationPart, "|", stopsPart);
        
        return {
            airlineLogo: airlineInfo?.airlineIconUrl || 'https://placehold.co/100x100/cccccc/FFFFFF?text=Logo',
            airlinename: airlineInfo?.airlineName || 'Unknown Airline',
            departureTime: times[0] || '',
            arrivalTime: times[1] || '',
            airlineDuration: [durationPart, stopsPart],
            isNonStop: durationInfo[1] === 'Non-Stop',
            ticketPrice: `${flight.fareList[0].currencySymbol}${flight.fareList[0].fareS}`,
            isRefundable: flight.refundable,
            isFreeMeal: flight.hasFreeMeal
        };
    });
}


// function to build request for flight search using store and url params
export function buildFlightListingRequest(currentStore, params) {
	const departureDate = params.get('departureDate');
	const returnDate = params.get('returnDate');
	const travellers = parseInt(params.get('travellers') || String(currentStore.travellers));
	const travelClass = params.get('travelClass') ?? currentStore.travelClass;

	return {
		src: {
			iataCode: currentStore.source.iataCode,
			city: currentStore.source.locationName,
			countryCode: 'IN'
		},
		des: {
			iataCode: currentStore.destination.iataCode,
			city: currentStore.destination.locationName,
			countryCode: 'IN'
		},
		departDate: departureDate || undefined,
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
}