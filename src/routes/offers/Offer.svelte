<script lang="ts">
	import type { JobOffer } from '$lib/index';

	export let offer: JobOffer;
	export let href: string;

	const subbutton_click = (event: Event) => {
		event.stopPropagation();
		console.log('Sub-button pressed.');
	};
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
	<!-- <div>
		<button class="modify" on:click={subbutton_click}>Modify...</button>
		<button class="delete">Delete...</button>
	</div> -->
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

	/* .modify {
		cursor: pointer;
		border-color: beige;
		background-color: var(--bg-color);
	} */
</style>
