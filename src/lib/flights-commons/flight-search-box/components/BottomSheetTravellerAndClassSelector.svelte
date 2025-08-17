<script lang="ts">
	import { flightConfigStore } from '$flights/stores/flightConfigStore.js';
	import { flightSearchStore } from '$flights/stores/flightSearchStore.js';
	import { TravellerClass } from '$lib/flights-commons/messages/config.msg.js';
	import {
		getGuestLimits,
		handleProceedAction,
		initializeFromConfig,
		updateAdultsCount,
		updateChildrenCount,
		updateInfantsCount
	} from '$lib/flights-commons/utils/bottom-sheet-config-utils.js';
	import { createEventDispatcher, onMount } from 'svelte';

	// Component State
	let adults:number;
	let children:number;
	let infants:number;
	let selectedClass:string;

	// Use config store for class options
	const classOptions = Object.values(TravellerClass).map((value) => value + ' Class');

	const dispatch = createEventDispatcher();

	// Initialize when config is loaded
	$: if ($flightConfigStore.isLoaded && $flightConfigStore.guests.length > 0) {
		initializeComponent();
	}

	// Initialize the component's state
	onMount(() => {
		// If config is already loaded, initialize immediately
		if ($flightConfigStore.isLoaded) {
			initializeComponent();
		}
	});

	function initializeComponent() {
		const result = initializeFromConfig(flightConfigStore, flightSearchStore);
		adults = result.adults;
		children = result.children;
		infants = result.infants;
		selectedClass = result.selectedClass;
	}

	function getGuestLimitsLocal(guestType: string) {
		return getGuestLimits(guestType, flightConfigStore);
	}

	// Update functions with config validation
	function updateAdults(change: number) {
		adults = updateAdultsCount(adults, change, flightConfigStore);
	}

	function updateChildren(change: number) {
		children = updateChildrenCount(children, change, flightConfigStore);
	}

	function updateInfants(change: number) {
		infants = updateInfantsCount(infants, change, flightConfigStore);
	}

	// Handler
	const handleProceed = () => {
		const result = handleProceedAction(adults, children, infants, selectedClass, flightSearchStore);

		// Dispatch an event
		dispatch('proceed', result);
	};
</script>

<!-- Show loading state if config not loaded -->
{#if !$flightConfigStore.isLoaded}
	<div class="flex justify-center p-8">
		<div class="loading loading-spinner loading-md" />
		<span class="ml-2">Loading...</span>
	</div>
{:else}
	<div class="flex flex-col p-4 space-y-6">
		<!-- Traveller Selection -->
		<div>
			<h3 class="nav-text mb-4">Select Traveller(s)</h3>
			<div class="space-y-4">
				<!-- Dynamic traveller categories from config -->
				{#each $flightConfigStore.guests as guest}
					<div class="flex justify-between items-center">
						<div>
							<p class="card-sub-heading">{guest.textName}</p>
							<p class="sub-text base-content-light-60">{guest.subTextName}</p>
						</div>
						<div
							class="flex items-center bg-base-200 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.1)] px-1 py-1"
						>
							<button
								on:click={() => {
									if (guest.guestType === 'ADULT') updateAdults(-1);
									else if (guest.guestType === 'CHILD') updateChildren(-1);
									else if (guest.guestType === 'INFANT') updateInfants(-1);
								}}
								class="px-3 cta-text text-primary"
								disabled={(guest.guestType === 'ADULT' && adults <= guest.minValue) ||
									(guest.guestType === 'CHILD' && children <= guest.minValue) ||
									(guest.guestType === 'INFANT' && infants <= guest.minValue)}
							>
								-
							</button>
							<span class="px-4 font-semibold w-10 text-center">
								{guest.guestType === 'ADULT'
									? adults
									: guest.guestType === 'CHILD'
									? children
									: infants}
							</span>
							<button
								on:click={() => {
									if (guest.guestType === 'ADULT') updateAdults(1);
									else if (guest.guestType === 'CHILD') updateChildren(1);
									else if (guest.guestType === 'INFANT') updateInfants(1);
								}}
								class="px-3 cta-text text-primary"
								disabled={(guest.guestType === 'ADULT' && adults >= guest.maxValue) ||
									(guest.guestType === 'CHILD' && children >= guest.maxValue) ||
									(guest.guestType === 'INFANT' && infants >= guest.maxValue)}
							>
								+
							</button>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Class Selection -->
		<div>
			<h3 class="nav-text mb-4">Select Class</h3>
			<div class="space-y-3">
				{#each classOptions as travelClass}
					<label class="flex items-center gap-4">
						<input
							type="radio"
							name="travelClass"
							bind:group={selectedClass}
							value={travelClass}
							class="radio radio-primary"
						/>
						<span class="card-sub-heading">{travelClass}</span>
					</label>
				{/each}
			</div>
		</div>

		<!-- Proceed Button -->
		<button on:click={handleProceed} class="btn btn-primary w-full">Proceed</button>
	</div>
{/if}
