//landing page config api
import { HOST_API_END_POINT } from '$lib/flights-commons/config/constants.js';
import type { ConfigRequest, ConfigResponse } from '$lib/flights-commons/messages/config.msg.js';
import type {
	FlightListingRequest,
	FlightListingResponse
} from '$lib/flights-commons/messages/flights-listing.msg.js';
import { ApiUtil, DataOrError } from '@CDNA-Technologies/svelte-vitals/api-util';

import { deepCopy } from '@CDNA-Technologies/svelte-vitals/util';
import dayjs from 'dayjs';

//landing page config api-----
export async function fetchFlightsCoreConfig(): Promise<DataOrError<ConfigResponse>> {
	return await ApiUtil.post<ConfigRequest, ConfigResponse>(
		`${HOST_API_END_POINT}.LandingService/getConfig`
	);
}

//listing page api
export function callGetFlightsSearchListV2(request: FlightListingRequest) {
	const flightListingRequest = deepCopy(request);

	flightListingRequest.departDate = dayjs(flightListingRequest.departDate).format('DD-MM-YYYY');
	if (flightListingRequest.is_round_trip) {
		flightListingRequest.returnDate = dayjs(flightListingRequest.returnDate).format('DD-MM-YYYY');
	}

	return ApiUtil.post<FlightListingRequest, FlightListingResponse>(
		`${HOST_API_END_POINT}.ListingService/GetFlightsSearchListV2`,
		flightListingRequest,
		true
	);
}
