<script lang="ts">
	import type { ApiOfferResponse } from '$lib/types';
	import Offer from './Offer.svelte';

	export let data: ApiOfferResponse;

	const handle_new_offer = () => {};
</script>

<h1>Offers</h1>
<button on:click={handle_new_offer}>Add new offer...</button>
<div>
	{#each data.data as offer (offer.id)}
		<div class="offer_div">
			<Offer {offer} />
		</div>
	{/each}
</div>

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
