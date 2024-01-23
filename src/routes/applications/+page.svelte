<script lang="ts">
	import Application from '$lib/Application.svelte';

	export let data;
</script>

{#if data.logged_in}
	{#if data.data.length === 0}
		<h1>No applications found.</h1>
	{:else}
		<h1>Applications:</h1>
		{#each data.data as app (app.id)}
			<Application application_data={app} />
		{/each}
	{/if}
{:else}
	<h1>Log in to manage applications.</h1>
{/if}
