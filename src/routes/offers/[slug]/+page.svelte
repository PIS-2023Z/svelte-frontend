<script lang="ts">
	import { goto } from '$app/navigation';
	import ConfirmationBox from './ConfirmationBox.svelte';

	export let data;
	let show_confirmation = false;
	const handleModifyClick = () => {
		goto(`./${data.id}/modify`);
	};
	const handleDeleteClick = () => {
		show_confirmation = true;
	};
	const handleConfirm = () => {
		show_confirmation = false;
	};
</script>

<h1>{data.name}</h1>
<p>Creation date: {data.publishedAt.toDateString()}</p>
<p>Expiration date: {data.expiresAt.toDateString()}</p>
<p>Salary: {data.monthlySalary?.toString() ?? 'not specified.'}</p>
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
