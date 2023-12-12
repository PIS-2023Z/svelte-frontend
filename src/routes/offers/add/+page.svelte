<script lang="ts">
	import { goto } from '$app/navigation';

	const quit = () => {
		goto('../offers');
	};
</script>

<form method="post">
	<div class="form">
		<label for="name">Offer name: </label>
		<input name="name" type="text" required />

		<label for="date">Expiration date: </label>
		<input name="date" type="date" required />

		<label for="salary">Salary:</label>
		<input type="number" name="salary" />

		<label for="description">Job description: </label>
		<textarea name="description"></textarea>
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
