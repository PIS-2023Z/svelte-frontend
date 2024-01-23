<script lang="ts">
	import { goto } from '$app/navigation';
	import type { ApplicationData } from './types';

	export let application_data: ApplicationData;
</script>

<button
	class="application"
	on:click={() => {
		goto(`/applications/${application_data.id}`);
	}}
>
	<h2>{application_data.offer.name}</h2>
	<h3>Email: {application_data.account.email}</h3>
	<h3>Proposed salary: {application_data.salary}</h3>
	<h3>Proposed hours: {application_data.hours}</h3>
</button>

<style>
	.application {
		width: 50%;
		border-radius: 30px;
		border-width: 5px;
	}
</style>
