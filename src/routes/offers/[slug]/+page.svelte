<script lang="ts">
	export let data;
</script>

<h1>{data.name}</h1>
<p>Creation date: {data.date_published.toString()}</p>
<p>Expiration date: {data.expiration_date.toString()}</p>
<p>Salary: {data.salary?.toString() ?? 'not specified.'}</p>
<p>Description: {data.description ?? 'not specified.'}</p>

<div>
	<button class="modify">Modify...</button>
	<button class="delete">Delete...</button>
</div>

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
