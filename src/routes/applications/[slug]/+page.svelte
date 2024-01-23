<script lang="ts">
	export let data;
</script>

<h1>Application for offer: {data.offer.name}</h1>
<p>Email: {data.account.email}</p>
<p>Proposed salary: {data.salary}</p>
<p>Proposed hours per week: {data.hours}</p>
<form method="post">
	<input type="hidden" value={data.cvId} name="id" />
	<button type="submit">Download CV</button>
</form>
