//landing page config api 

import type { ConfigRequest, ConfigResponse } from "$flights/flights-common/messages/config.msg.js";
import type { FlightListingRequest, FlightListingResponse } from "$flights/flights-common/messages/flights-listing.msg.js";
import { ApiUtil, DataOrError } from "@CDNA-Technologies/svelte-vitals/api-util";

import { deepCopy } from "@CDNA-Technologies/svelte-vitals/util";
import dayjs from "dayjs";


//landing page config api-----
export async function fetchFlightsCoreConfig(): Promise<DataOrError<ConfigResponse>> {
    return await ApiUtil.post < ConfigRequest, ConfigResponse > (
        '/com.gonuclei.flights.v1.LandingService/getConfig',
    );
}

//listing page api
export function callGetFlightsSearchListV2(request: FlightListingRequest) {
	const flightListingRequest = deepCopy(request);
	console.log("calling api from  : ",flightListingRequest); 
		console.log('Date:', dayjs(flightListingRequest.departDate, 'DD-MM-YYYY').valueOf());

	flightListingRequest.departDate = dayjs(flightListingRequest.departDate).format('DD-MM-YYYY');
	if (flightListingRequest.is_round_trip) {
		flightListingRequest.returnDate = dayjs(flightListingRequest.returnDate).format('DD-MM-YYYY');
	}
	return ApiUtil.post<FlightListingRequest, FlightListingResponse>(
		'/com.gonuclei.flights.v1.ListingService/GetFlightsSearchListV2',
		flightListingRequest,
		true
	);
}