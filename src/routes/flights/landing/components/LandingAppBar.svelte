<script lang="ts">
	import { ListCouponCta } from "@CDNA-Technologies/svelte-vitals/cart/coupons";
	import { LandingWalletCta } from "@CDNA-Technologies/svelte-vitals/cart/wallet";
	import AppBar from "@CDNA-Technologies/svelte-vitals/components/appbar";
	import ThreeDotMenu from "@CDNA-Technologies/svelte-vitals/components/three-dot-menu";

    const handleBackClick = () => {
		console.log('Back Button Clicked');
	};

	const handleMyBookingClick = (close: () => void) => {
		console.log('My Booking Clicked');
		close();
	};

	const handleMyTransactionClick = (close: () => void) => {
		console.log('My transaction Clicked');
		close();
	};

	const handleWebCheckInClick = (close: () => void) => {
		console.log('Web CheckIn Clicked');
		close();
	};

	const handleHelpClick = (close: () => void) => {
		console.log('Help clicked');
		close();
	};

	const handlePartnerHomeClick = (close: () => void) => {
		console.log('Partner Home clicked');
		close();
	};

	const handleSdkLogoutClick = (close: () => void) => {
		console.log('SDK Logout clicked');
		close();
	};
</script>


<AppBar
		title="Flights"
		height="80px"
		enableZIndex
		showBackButton
		onBackButtonClick={handleBackClick}
	>
		<div slot="action" class="flex flex-row items-center gap-2">
			<LandingWalletCta />
			<ListCouponCta />

			<div class="dropdown dropdown-end">
				<ThreeDotMenu let:closeDropDown colour="#000000">
					<li on:click={handleMyBookingClick(closeDropDown)} class="border-t p-3 text-base-content">
						My Bookings
					</li>

					<li
						on:click={handleMyTransactionClick(closeDropDown)}
						class="border-t p-3 text-base-content"
					>
						My Transactions
					</li>
					<li
						on:click={handleWebCheckInClick(closeDropDown)}
						class="border-t p-3 text-base-content"
					>
						Web Check-In
					</li>
					<li on:click={handleHelpClick(closeDropDown)} class="border-t p-3 text-base-content">
						Help
					</li>
					<li
						on:click={handlePartnerHomeClick(closeDropDown)}
						class="border-t p-3 text-base-content"
					>
						Partner Home
					</li>
					<li on:click={handleSdkLogoutClick(closeDropDown)} class="border-t p-3 text-base-content">
						SDK Logout
					</li>
				</ThreeDotMenu>
			</div>
		</div>
	</AppBar>