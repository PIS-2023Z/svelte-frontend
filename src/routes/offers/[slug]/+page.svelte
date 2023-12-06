<script lang="ts">
	import ConfirmationBox from './ConfirmationBox.svelte';

	export let data;
	let show_confirmation = false;
	const handleModifyClick = () => {
		window.location.href = `/offers/${data.id}/modify`;
	};
	const handleDeleteClick = () => {
		show_confirmation = true;
	};
	const handleConfirm = () => {
		show_confirmation = false;
	};
</script>

<h1>{data.name}</h1>
<p>Creation date: {data.date_published.toString()}</p>
<p>Expiration date: {data.expiration_date.toString()}</p>
<p>Salary: {data.salary?.toString() ?? 'not specified.'}</p>
<p>Description: {data.description ?? 'not specified.'}</p>

{#if show_confirmation}
	<ConfirmationBox
		on:cancel={() => {
			show_confirmation = false;
		}}
		on:confirm={handleConfirm}
	/>
{:else}
	<div>
		<button class="modify" on:click={handleModifyClick}>Modify...</button>
		<button class="delete" on:click={handleDeleteClick}>Delete...</button>
	</div>
{/if}

<style>
	h1,
	p {
		font-family: Poppins, Arial, Helvetica, sans-serif;
		color: beige;
	}
	button {
		font-family: Poppins, Arial, Helvetica, sans-serif;
		color: beige;
		border-color: beige;
		border-radius: 5px;
	}
	button.modify {
		background-color: var(--bg-color);
	}
	button.delete {
		background-color: rgb(95, 0, 0);
	}
</style>
