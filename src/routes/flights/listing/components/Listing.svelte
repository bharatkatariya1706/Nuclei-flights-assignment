<script lang="ts">
	import { base } from "$app/paths";
    import AppBar from "@CDNA-Technologies/svelte-vitals/components/appbar";
    import PrimaryLoader from "@CDNA-Technologies/svelte-vitals/components/primary-loader";
    import {
      ErrorHandling,
      lceStore,
      setContentLce,
      setLoadingLce,
    } from "@CDNA-Technologies/svelte-vitals/error-handling";
    import { NucleiLogger } from "@CDNA-Technologies/svelte-vitals/logger";
	import { NavigatorUtils } from "@CDNA-Technologies/svelte-vitals/navigator";
    import { onMount } from "svelte";
	import FlightList from "./FlightList.svelte";
	import BottomFilterBar from "./BottomFilterBar.svelte";
	import RightArrowIcon from "../icons/RightArrowIcon.svelte";

    onMount(async () => {
        NucleiLogger.logInfo("Flights", "Listing screen mounted");
        setLoadingLce();
        await fetchScreenData();
    });

    const fetchScreenData = async () => {
        // fetch data from api and set lce accordingly
        // if error, setErrorLce(response.error);
        // else, set data to lceStore and setContentLce();
        setContentLce();
    };

    function handleRetry() {
        setLoadingLce();
        fetchScreenData();
    }

    const handleBackClick = ()=>{
        console.log("Listing Page Back Button clicked");
        NavigatorUtils.navigateTo({url:base + '/flights/landing'})
    }

    let source = "Bangalore";
    let destination = "Hyderabad";
    let date = "17 Mar";
    let travellerCount = 2;
    let travelClass = "Economy";
 
</script>

<div class="h-screen flex flex-col">
    	<AppBar
    height="80px"
    enableZIndex
    showBackButton
    onBackButtonClick={handleBackClick}
>
   
    <div slot="title" class="flex items-center gap-2 nav-text">
        <span>{source}</span>
        <RightArrowIcon />
        <span>{destination}</span>
    </div>

    
    <div slot="details" class="ml-14 -mt-4 py-2">
        {date} | {travellerCount} Traveller{travellerCount > 1 ? 's' : ''} | {travelClass}
    </div>
</AppBar>

    {#if $lceStore.isLoading}
        <div class="h-screen flex flex-col justify-center">
            <PrimaryLoader />
        </div>
    {:else if $lceStore.hasError && $lceStore.errorDetails != null}
        <ErrorHandling
            errorHandling={$lceStore.errorDetails}
            on:submit={handleRetry}
        />
    {:else if $lceStore.hasContent}
        <div class="overflow-y-scroll w-full">
          <!-- TODO: Remove this inner div and add screen specific code -->
          <FlightList/>
          <BottomFilterBar/>
        </div>
    {/if}
</div>
