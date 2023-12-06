<script lang="ts">
	import { JobOffer } from '$lib';
	import Offer from './Offer.svelte';

	export let data;
</script>

<h1>Offers</h1>
<div>
	{#each data.data as offer (offer.id)}
		<div class="offer_div">
			<Offer
				offer={JobOffer.from_api_offer(offer)}
				href="/offers/{offer.id}"
			/>
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
