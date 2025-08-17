export enum ConfigType {
	DEFAULT_SEARCH_REQUEST = 'DEFAULT_SEARCH_REQUEST',
	ORDER_CONFIG = 'ORDER_CONFIG'
}

export interface ConfigRequest {
	latitude: number;
	longitude: number;
	config_type: ConfigType;
}

export interface ConfigResponse {
	status?: Status;
	searchRequest: SearchRequest;
	categorySdkConfig?: CategorySDKConfig;
}

export interface CategorySDKConfig {
	couponEnabled: boolean;
	walletEnabled: boolean;
	rewardEnabled: boolean;
	payload: Payload;
}

export interface Payload {
	[key: string]: string;
}

export interface SearchRequest {
	src: AirportCode;
	des: AirportCode;
	departDate: number;
	returnDate?: number;
	partnerCountry: string;
	configMap?: ConfigMap;
	travellers?: Traveller[];
	guests: Guest[];
	defaultSortFilter?: AppliedSortAndFilter;
	stpFare?: string;
}

export interface ConfigMap {
	MIN_TOTAL_GUEST?: string;
	NON_STOP_FLIGHT_LANDING?: string;
	MAX_TOTAL_GUEST?: string;
	CACHING_TIME_IN_MILLISECOND?: string;
	SEARCH_CITY_REGEX?: string;
	PASSPORT_NUMBER_REGEX?: string;
	ONWARD_NUMBER_OF_STOP_FILTER_ID?: string;
	MAX_CALENDER_DAYS?: string;
	SEARCH_CITY_REGEX_ERROR_MESSAGE?: string;
	GST_ENABLED?: string;
	PASSPORT_DATE_MAX_YEARS?: string;
	RETURN_NUMBER_OF_STOP_FILTER_ID?: string;
	BOOKING_RESULT_PER_PAGE?: string;
	NON_STOP_FLIGHT_FILTER_ID?: string;
	LISTING_LOADING_MESSAGE?: string;
	LISTING_DAYS_TILL_END_DATE?: string;
	LISTING_COUPONS_ENABLED?: string;
	LISTING_WALLET_ENABLED?: string;
	VENDOR_ID?: string;
}

export interface AppliedSortAndFilter {
	tabId?: string;
	sortId?: string;
	filtersList?: FiltersList[];
}

export interface FiltersList {
	filterId: number;
	appliedFilterValueList: AppliedFilterValueList;
}

export interface AppliedFilterValueList {
	filterValues: string[];
}

export interface AirportCode {
	iataCode: string;
	city: string;
	name?: string;
	countryCode: string;
	iconUrl?: string;
}

export interface Guest {
	guestType: GuestType;
	textName?: string;
	subTextName?: string;
	defaultValue: number;
	minValue?: number;
	maxValue?: number;
	displayOrder?: number;
	errorMessage?: string;
}

export enum GuestType {
	DUMMY_GUEST = 'DUMMY_GUEST',
	ADULT = 'ADULT',
	CHILD = 'CHILD',
	INFANT = 'INFANT'
}
export interface Traveller {
	key: string;
	value: string;
}

export enum TravellerClass {
	ECONOMY = 'Economy',
	BUSINESS = 'Business',
	PREMIUM = 'Premium'
}

export interface Status {
	responseCode: string;
	responseCodeCause: string;
	responseMessage: string;
}
