import { writable } from 'svelte/store';

// Empty initial state
const initialConfig = {
	guests: [],
	travellerClass: '',
	isLoaded: false
};

export const flightConfigStore = writable(initialConfig);

// Function to update config from your API response
export function setFlightConfig(apiResponse) {
	const config = {
		guests: apiResponse.guests || [],
		travellerClass: apiResponse.travellerClass || 'Economy',
		isLoaded: true
	};

	flightConfigStore.set(config);
}
