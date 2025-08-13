import { writable } from 'svelte/store';
import dayjs from 'dayjs';

// 1. Define an interface for a single location.
export interface Location {
	locationName: string;
	iataCode: string;
}

// 2. Define an interface for the entire store's data structure.
export interface FlightSearchState {
	source: Location;
	destination: Location;
	departureDate: Date;
	returnDate?: Date;
	travellers: number;
	travelClass: string;
}

// 3. Create the store and give it the correct type.
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
