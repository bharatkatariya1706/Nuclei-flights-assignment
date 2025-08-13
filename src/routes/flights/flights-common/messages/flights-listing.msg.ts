import type { ErrorHandlingDetail } from '@CDNA-Technologies/svelte-vitals/messages';
import  type{ AirportCode, AppliedSortAndFilter } from './config.msg.js';


// import type { SpecialFeature } from './messages/flights-details.msg.js';

export interface FlightListingRequest {
	src: AirportCode;
	des: AirportCode;
	departDate: string;
	returnDate?: string;
	travellerClass: KeysValues;
	passenger: PassengerCount;
	appliedSortFilter?: AppliedSortAndFilter[];
	is_round_trip?: boolean;
	partnerCountry: string;
	fareType: string;
}
export interface PassengerCount {
	adultCount: number;
	childCount: number;
	infantCount: number;
}

export interface KeysValues {
	key: String;
	value: String;
}
export interface FlightListingResponse {
	errorHandlingDetail?: ErrorHandlingDetail;
	onwardFlights: FlightsListing[];
	returnFlights: FlightsListing[];
	isRoundTrip: boolean;
	quickFilters: QuickFilter[];
	minimumTimeGapForRoundTrip: number;
	isInternational: boolean;
	warningMessages: KeysValues[];
	onwardFareCalendar: FareCalendarDetails[];
	onwardSpecialFlights: FlightsListing[];
	returnSpecialFlights: FlightsListing[];
	fareType: string;
}

export interface FareCalendarDetails {}

export interface DiscountMapping {}

export interface IconMapping {
	G8: The6_E;
	SG: The6_E;
	UK: The6_E;
	AI: The6_E;
	I5: The6_E;
	'6E': The6_E;
}

export interface The6_E {
	airlineName: string;
	airlineIconUrl: string;
}

export interface FlightsListing {
	segmentId: string;
	onwardSegmentDetails: SegmentDetails;
	returnSegmentDetails: SegmentDetails;
	refundable: boolean;
	hasFreeMeal: boolean;
	handBaggageOnlyFare: boolean;
	fareList: FareList[];
	// specialFeatures: SpecialFeature[];
	savingsText: string;
}

export interface FareList {
	fareId: string;
	partnerId: number;
	partnerName: string;
	fare: number;
	currencySymbol: String;
	fareS: string;
	color?: Color;
	partnerIconUrl: string;
	vendorId: string;
	segmentId: string;
	isLowestPrice: boolean;
}

export interface Color {
	red: number;
	green: number;
	blue: number;
}

export interface SegmentDetails {
	arrivalTime: string;
	departTime: string;
	arrivalTimestamp: number;
	departTimestamp: number;
	duration: string;
	stops: string;
	airlineCode: string;
	sourceAirportCode?: AirportCode;
	destinationAirportCode?: AirportCode;
	airlineTime: string;
	airlineDuration: string;
	segmentAirlineInfos: SegmentAirlineInfo[];
}

export interface SegmentAirlineInfo {
	airlineName: String;
	airlineIconUrl: String;
}

export interface PartnerPriority {
	partnerId: string;
	priority: number;
}

export interface QuickFilter {
	id: number;
	title: string;
	filterType: string;
	filterValue: string;
	isSelected: boolean;
	appliedOn: string;
}

export interface Status {
	responseCode: string;
	responseCodeCause: string;
	responseMessage: string;
}

export interface SortAndFilterResponse {
	sortFilter: SortFilter[];
}
export interface SortFilter {
	sortList: any;
	filterList: {
		id: string;
		title: string;
		listFilter?: ListFilter;
		gridFilter?: any;
	}[];
	tabId: any;
	tabName: any;
}

export interface ListFilter {
	title: string;
	listItems: ListItem[];
}
export interface ListItem {
	id: string;
	isIconVisible: boolean;
	isSelected: boolean;
	descText: string;
	iconUrl: string;
}
