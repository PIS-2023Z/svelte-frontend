<script lang="ts">
	import { page } from '$app/stores';
	import Application from '$lib/Application.svelte';

	export let data;
	$: console.log($page.url.searchParams.get('phrase'));
</script>

{#if data.logged_in}
	{#if data.data.length === 0}
		<h1>No applications found.</h1>
	{:else}
		<h1>Applications:</h1>
	{/if}
	<div class="select_list">
		<form method="post">
			<select name="select_list" id="select_list" value={data.offer_id}>
				<option value={$page.url.searchParams.get('offerId') ?? undefined}
					>Filter by offer...</option
				>
				{#each data.offers as offer (offer.id)}
					<option value={offer.id}>{offer.name}</option>
				{/each}
			</select>
			<p>or</p>
			<input
				type="text"
				name="phrase"
				placeholder="by phrase..."
				value={$page.url.searchParams.get('phrase') ?? ''}
			/>
			<button type="submit">Submit</button>
		</form>
	</div>
	{#each data.data as app (app.id)}
		<Application application_data={app} />
	{/each}
{:else}
	<h1>Log in to manage applications.</h1>
{/if}

<style>
	.select_list {
		margin-bottom: 20px;
	}
</style>
