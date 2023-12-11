<script lang="ts">
	export let data: { slug: string; data: ApiOffer };
	import { goto } from '$app/navigation';
	import { JobStatus } from '$lib';
	import type { ApiOffer } from '$lib/types';
	const quit = () => {
		goto(`../${data.slug}`);
	};
	let date = data.data.expiresAt.toISOString().substring(0, 10);
	$: data.data.expiresAt = new Date(date);
</script>

<form method="post">
	<div class="form">
		<label for="name">Offer name: </label>
		<input name="name" type="text" bind:value={data.data.name} required />

		<label for="date">Expiration date: </label>
		<input name="date" type="date" bind:value={date} required />

		<label for="salary">Salary:</label>
		<input type="number" name="salary" bind:value={data.data.monthlySalary} />

		<label for="description">Job description: </label>
		<textarea name="description" bind:value={data.data.description}></textarea>

		<label for="status">Status:</label>
		<div>
			<label for="status">Going</label>
			<input
				type="radio"
				id="going"
				name="status"
				value="GOING"
				checked={data.data.status == JobStatus.GOING}
			/>
			<label for="status">Expired</label>
			<input
				type="radio"
				id="expired"
				name="status"
				value="EXPIRED"
				checked={data.data.status == JobStatus.EXPIRED}
			/>
			<label for="status">Closed</label>
			<input
				type="radio"
				id="closed"
				name="status"
				value="CLOSED"
				checked={data.data.status == JobStatus.CLOSED}
			/>
		</div>
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
