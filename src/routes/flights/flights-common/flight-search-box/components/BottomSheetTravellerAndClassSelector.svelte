<script lang="ts">
	import { flightSearchStore } from '$flights/search-city/components/flightSearchStore.js';
	import { createEventDispatcher, onMount } from 'svelte';
	 // Import the shared store

	// --- Component State ---
	let adults = 1;
	let children = 0;
	let infants = 0;
	let selectedClass = 'Economy Class';

	const classOptions = ['Economy Class', 'Premium Economy Class', 'Business Class', 'First Class'];
	const dispatch = createEventDispatcher();

	// Initialize the component's state 
	onMount(() => {
		const unsubscribe = flightSearchStore.subscribe((store) => {
			adults = store.travellers;
			selectedClass = store.travelClass + ' Class';
		});
		unsubscribe(); // Unsubscribe after initial read 
	});

	//  Handler
	const handleProceed = () => {
		const totalTravellers = adults + children + infants;

		// Update the shared store 
		flightSearchStore.update((store) => {
			store.travellers = totalTravellers;
			store.travelClass = selectedClass.replace(' Class', '');
			return store;
		});

		// Dispatch an event
		
		dispatch('proceed', {
			travellers: totalTravellers,
			travelClass: selectedClass
		});
	};
</script>

<div class="flex flex-col p-4 space-y-6">
	<!-- Traveller Selection -->
	<div>
		<h3 class="nav-text mb-4">Select Traveller(s)</h3>
		<div class="space-y-4">
			<!-- Adults -->
			<div class="flex justify-between items-center">
				<div>
					<p class="card-sub-heading">Adults</p>
					<p class="sub-text base-content-light-60">12 years and above</p>
				</div>
				<div
					class="flex items-center bg-base-200 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.1)] px-1 py-1"
				>
					<!-- CORRECTED: Adults cannot be less than 1 -->
					<button on:click={() => (adults = Math.max(1, adults - 1))} class="px-3 cta-text"
						>-</button
					>
					<span class="px-4 font-semibold w-10 text-center">{adults}</span>
					<button on:click={() => adults++} class="px-3 cta-text">+</button>
				</div>
			</div>
			<!-- Children -->
			<div class="flex justify-between items-center">
				<div>
					<p class="card-sub-heading">Children</p>
					<p class="sub-text base-content-light-60">2 to 12 years</p>
				</div>
				<div
					class="flex items-center bg-base-200 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.1)] px-1 py-1"
				>
					<button on:click={() => (children = Math.max(0, children - 1))} class="px-3 cta-text"
						>-</button
					>
					<span class="px-4 font-semibold w-10 text-center">{children}</span>
					<button on:click={() => children++} class="px-3 cta-text">+</button>
				</div>
			</div>
			<!-- Infants -->
			<div class="flex justify-between items-center">
				<div>
					<p class="card-sub-heading">Infants</p>
					<p class="sub-text base-content-light-60">Less than 2 years</p>
				</div>
				<div
					class="flex items-center bg-base-200 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.1)] px-1 py-1"
				>
					<button on:click={() => (infants = Math.max(0, infants-1))} class="px-3 cta-text"
						>-</button
					>
					<span class="px-4 font-semibold w-10 text-center">{infants}</span>
					<button on:click={() => infants++} class="px-3 cta-text">+</button>
				</div>
			</div>
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