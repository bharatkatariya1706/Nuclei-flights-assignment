import type { AirportCode, TravellerClass } from '../messages/config.msg.js';

export interface ValidationResult {
	isValid: boolean;
	errors: string[];
}

export interface FlightSearchState {
	source: AirportCode;
	destination: AirportCode;
	departureDate: string | Date;
	returnDate?: string | Date;
	travellers: number;
	travelClass: TravellerClass;
}
