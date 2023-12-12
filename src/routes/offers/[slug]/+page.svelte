<script lang="ts">
	import { goto } from '$app/navigation';
	import type { ApiOffer } from '$lib/types';

	export let data: ApiOffer;
	let show_confirmation = false;
	const handleModifyClick = () => {
		goto(`./${data.id}/modify`);
	};
	const handleDeleteClick = () => {
		show_confirmation = true;
	};
	const hideConfirmation = () => {
		show_confirmation = false;
	};
</script>

<h1>{data.name}</h1>
<p>Creation date: {data.publishedAt.toDateString()}</p>
<p>Expiration date: {data.expiresAt.toDateString()}</p>
<p>Salary: {data.monthlySalary?.toString() ?? 'not specified.'}</p>
<p>Description: {data.description ?? 'not specified.'}</p>

<!-- <form method="post">
	<input type="hidden" value={data.id} name="id" />
	{#if show_confirmation}
		<div>
			<p>Are you sure?</p>
			<div>
				<button class="cancel" type="button" on:click={hideConfirmation}
					>Cancel</button
				>
				<button class="delete" on:click={hideConfirmation}>Confirm</button>
			</div>
		</div>
	{:else}
		<div>
			<button class="modify" type="button" on:click={handleModifyClick}
				>Modify...</button
			>
			<button class="delete" type="button" on:click={handleDeleteClick}
				>Delete...</button
			>
		</div>
	{/if}
</form> -->

<form method="post">
	<input type="hidden" value={data.id} name="id" />
	<div>
		<button class="modify" type="button" on:click={handleModifyClick}
			>Modify...</button
		>
		<button class="delete" type="submit" on:click={handleDeleteClick}
			>Delete...</button
		>
	</div>
</form>
