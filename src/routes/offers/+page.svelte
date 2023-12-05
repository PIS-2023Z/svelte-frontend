<script lang="ts">
	export let data;
</script>

<h1>Offers</h1>
<div>
	{#each data.data as offer}
		<li><a href="/offers/{offer.id}">{offer.name}</a></li>
	{/each}
</div>

<div><a href="/">Back to top...</a></div>
