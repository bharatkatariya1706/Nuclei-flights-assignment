import { writable } from 'svelte/store';
import dayjs from 'dayjs';

// interface for single location
export interface Location {
	locationName: string;
	iataCode: string;
}

// Stores's data structure
export interface FlightSearchState {
	source: Location;
	destination: Location;
	departureDate: Date;
	returnDate?: Date;
	travellers: number;
	travelClass: string;
}

// Store to manage flight search state
export const flightSearchStore = writable<FlightSearchState>({
	source: {
		locationName: 'Bangalore',
		iataCode: 'BLR'
	},
	destination: {
		locationName: 'Hyderabad',
		iataCode: 'HYD'
	},
	departureDate: dayjs().add(1, 'day').toDate(), 
	returnDate: undefined,
	travellers: 2,
	travelClass: 'Economy'
});
