<script lang="ts">
	export let data: { slug: string };
	import { goto } from '$app/navigation';
	import { JobStatus } from '$lib';
	import type { ApiOffer } from '$lib/types';
	let new_data: ApiOffer = {
		id: 1,
		name: 'Some new offer',
		date_published: new Date(),
		expiration_date: new Date(),
		status: JobStatus.AVAILABLE,
		salary: null,
		description: null
	};
	const quit = () => {
		goto(`../${data.slug}`);
	};
	const handleSubmit = async () => {
		await fetch('/api/offer/update', {
			method: 'PUT',
			body: JSON.stringify(new_data),
			headers: { 'Content-Type': 'application/json' }
		});
		goto(`../${data.slug}`);
	};
</script>

<form on:submit={handleSubmit}>
	<div>
		<label for="name">Offer name: </label>
		<input name="name" type="text" bind:value={new_data.name} />
	</div>
	<div>
		<label for="date">Expiration date: </label>
		<input name="date" type="date" bind:value={new_data.expiration_date} />
	</div>
	<div>
		<label for="description">Job description: </label>
		<textarea name="description" bind:value={new_data.description}></textarea>
	</div>
	<div>
		<button on:click={quit}>Back...</button>
		<button type="submit" class="confirm">Confirm</button>
	</div>
</form>
