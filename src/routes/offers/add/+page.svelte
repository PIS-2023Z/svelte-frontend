<script lang="ts">
	import { goto } from '$app/navigation';
	import { JobStatus } from '$lib';
	import type { ApiOffer } from '$lib/types';

	let new_data: ApiOffer = {
		id: 0,
		name: '',
		publishedAt: new Date(),
		expiresAt: new Date(),
		status: JobStatus.GOING,
		monthlySalary: null,
		description: null
	};

	const quit = () => {
		goto('../offers');
	};
	const handleSubmit = async () => {
		console.log(JSON.stringify(new_data));
		quit();
	};
</script>

<form on:submit={handleSubmit}>
	<div class="form"></div>
	<div class="buttons">
		<button type="button" on:click={quit}>Back...</button>
		<button type="submit" class="confirm">Confirm</button>
	</div>
</form>
