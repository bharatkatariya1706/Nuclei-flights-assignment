import { base } from '$app/paths';
import dayjs from 'dayjs';
import { DEFAULT_DATE_FORMAT } from '../config/constants.js';
import type { FlightSearchState } from '$flights/stores/flightSearchStore.js';
import type { ValidationResult } from '../flight-search-box/types.js';

export const validateSearchState = (searchState: FlightSearchState): ValidationResult => {
	const errors: string[] = [];

	if (!searchState?.source?.iataCode) {
		errors.push('Source location is required');
	}
	if (!searchState?.destination?.iataCode) {
		errors.push('Destination location is required');
	}
	if (!searchState?.departureDate) {
		errors.push('Departure date is required');
	}
	if (!searchState?.travellers || searchState.travellers < 1) {
		errors.push('At least one traveller is required');
	}
	if (!searchState?.travelClass) {
		errors.push('Travel class is required');
	}

	return {
		isValid: errors.length === 0,
		errors
	};
};

export const buildSearchUrl = (searchState: FlightSearchState): string => {
	const params = new URLSearchParams({
		from: searchState.source.iataCode,
        fromName: searchState.source.locationName,
		to: searchState.destination.iataCode,
		toName: searchState.destination.locationName,
		departureDate: dayjs(searchState.departureDate).format(DEFAULT_DATE_FORMAT),
		travellers: searchState.travellers.toString(),
		travelClass: searchState.travelClass
	});

	if (searchState.returnDate) {
		params.append('returnDate', dayjs(searchState.returnDate).format(DEFAULT_DATE_FORMAT));
	}

	return `${base}/flights/listing?${params.toString()}`;
};
