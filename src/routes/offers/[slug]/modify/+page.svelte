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
	<div class="form">
		<label for="name">Offer name: </label>
		<input name="name" type="text" bind:value={new_data.name} required />

		<label for="date">Expiration date: </label>
		<input
			name="date"
			type="date"
			bind:value={new_data.expiration_date}
			required
		/>

		<label for="salary">Salary:</label>
		<input type="number" name="salary" bind:value={new_data.salary} />

		<label for="description">Job description: </label>
		<textarea name="description" bind:value={new_data.description}></textarea>
	</div>
	<div class="buttons">
		<button type="button" on:click={quit}>Back...</button>
		<button type="submit" class="confirm">Confirm</button>
	</div>
</form>

<style>
	div.form {
		width: 50%;
		display: grid;
		gap: 8px;
		grid-template-columns: 150px, 1fr;
		margin-bottom: 20px;
	}
	label {
		/* float: left;
		width: 200px;
		padding-right: 24px; */
		grid-column: 1/2;
	}
	input {
		/* float: right;
		width: calc(100% - 200px); */
		grid-column: 2/3;
	}
</style>
