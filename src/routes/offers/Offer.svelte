<script lang="ts">
	import type { JobOffer } from '$lib/index';
	import { createEventDispatcher } from 'svelte';

	export let offer: JobOffer;
	export let href: string;
	const dispatch = createEventDispatcher();
</script>

<button
	class="offer"
	on:click={() => {
		window.location.href = href;
	}}
>
	<h2 class="name">{offer.name}</h2>
	<h3 class="salary">
		Salary: {offer.salary?.toString() ?? 'not specified'}
	</h3>
	<p class="description">
		{offer.description ?? 'A description was not added to this offer.'}
	</p>
</button>

<style>
	.offer {
		cursor: pointer;
		width: 50%;
		border-radius: 30px;
		border-width: 5px;
		background-color: var(--bg-color);
	}
	h2,
	h3,
	p {
		font-family: Poppins, Arial, Helvetica, sans-serif;
		color: beige;
	}
	.offer:hover {
		border-color: beige;
	}
</style>
