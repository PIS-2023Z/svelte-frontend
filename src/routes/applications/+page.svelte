<script lang="ts">
	import { page } from '$app/stores';
	import Application from '$lib/Application.svelte';

	export let data;
	$: phrase = $page.url.searchParams.get('phrase');
	$: offer_id = $page.url.searchParams.get('offerId');
</script>

{#if data.logged_in}
	{#if data.data.length === 0}
		<h1>No applications found.</h1>
	{:else}
		<h1>Applications:</h1>
	{/if}
	<div class="select_list">
		<form method="post">
			<input
				type="radio"
				name="search_option"
				value="list"
				checked={offer_id !== null}
			/>
			<select name="select_list" id="select_list" value={data.offer_id}>
				<option value={offer_id ?? undefined}>Filter by offer...</option>
				{#each data.offers as offer (offer.id)}
					<option value={offer.id}>{offer.name}</option>
				{/each}
			</select>
			<p>or</p>
			<input
				type="radio"
				name="search_option"
				value="text"
				checked={phrase !== null}
			/>
			<input
				type="text"
				name="phrase"
				placeholder="by phrase..."
				value={phrase ?? ''}
			/>
			<button type="submit"
				>{offer_id !== null && phrase !== null ? 'Reset' : 'Submit'}</button
			>
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
