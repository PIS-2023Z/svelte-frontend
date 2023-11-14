<script lang="ts">
	export let value: number;
</script>

<div>
	<label for="input">Value a:</label>
	<input id="input" type="range" min="0" max="500" step="1" bind:value />
</div>
