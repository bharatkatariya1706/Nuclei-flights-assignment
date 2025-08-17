import { get } from 'svelte/store';

export function initializeFromConfig(flightConfigStore: any, flightSearchStore: any) {
	const config = get(flightConfigStore);
	const searchStore = get(flightSearchStore);

	let adults;
	let children;
	let infants;
	let selectedClass;

	// Set default values from config API 
	if (config.guests.length > 0) {
		const adultConfig = config.guests.find((g: any) => g.guestType === 'ADULT');
		const childConfig = config.guests.find((g: any) => g.guestType === 'CHILD');
		const infantConfig = config.guests.find((g: any) => g.guestType === 'INFANT');

		adults = adultConfig?.defaultValue || 1;
		children = childConfig?.defaultValue || 0;
		infants = infantConfig?.defaultValue || 0;
	}

	// Set default class from config
	if (config.travellerClass) {
		selectedClass = config.travellerClass + ' Class';
	}

	// Override with existing search store values if they exist
	if (searchStore.travellers > 0) {
		adults = searchStore.travellers;
	}
	if (searchStore.travelClass) {
		selectedClass = searchStore.travelClass + ' Class';
	}

	return { adults, children, infants, selectedClass };
}

export function getGuestLimits(guestType: string, flightConfigStore: any) {
	const config = get(flightConfigStore);
	const guest = config.guests.find((g: any) => g.guestType === guestType);
	return {
		min: guest?.minValue || (guestType === 'ADULT' ? 1 : 0),
		max: guest?.maxValue || 9
	};
}

export function updateAdultsCount(currentAdults: number, change: number, flightConfigStore: any) {
	const limits = getGuestLimits('ADULT', flightConfigStore);
	return Math.max(limits.min, Math.min(limits.max, currentAdults + change));
}

export function updateChildrenCount(
	currentChildren: number,
	change: number,
	flightConfigStore: any
) {
	const limits = getGuestLimits('CHILD', flightConfigStore);
	return Math.max(limits.min, Math.min(limits.max, currentChildren + change));
}

export function updateInfantsCount(currentInfants: number, change: number, flightConfigStore: any) {
	const limits = getGuestLimits('INFANT', flightConfigStore);
	return Math.max(limits.min, Math.min(limits.max, currentInfants + change));
}

export function handleProceedAction(
	adults: number,
	children: number,
	infants: number,
	selectedClass: string,
	flightSearchStore: any
) {
	const totalTravellers = adults + children + infants;

	// Update the shared store
	flightSearchStore.update((store: any) => {
		store.travellers = totalTravellers;
		store.travelClass = selectedClass.replace(' Class', '');
		return store;
	});

	return {
		travellers: totalTravellers,
		travelClass: selectedClass
	};
}
