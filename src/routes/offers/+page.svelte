<script lang="ts">
	import { goto } from '$app/navigation';
	import Offer from './Offer.svelte';

	export let data;

	const handle_new_offer = () => {
		goto('/offers/add');
	};
</script>

{#if data.logged_in}
	<h1>Offers</h1>
	<button on:click={handle_new_offer}>Add new offer...</button>
	<div>
		{#each data.data as offer (offer.id)}
			<div class="offer_div">
				<Offer {offer} />
			</div>
		{/each}
	</div>
{:else}
	<h1>Log in to see your offers.</h1>
{/if}

<style>
	.offer_div {
		margin-bottom: 20px;
		margin-top: 20px;
	}
	h1 {
		font-family: Poppins, Arial, Helvetica, sans-serif;
		color: beige;
	}
</style>
