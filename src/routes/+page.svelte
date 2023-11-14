<script lang="ts">
	import { max } from '$lib';
	import ReactiveBarDiv from './ReactiveBarDiv.svelte';

	let value_a: number = 0;
	let value_b: number = 0;
	$: bigger = max(value_a, value_b);
</script>

<h1>Hello world</h1>
<ReactiveBarDiv bind:value={value_a}></ReactiveBarDiv>
<ReactiveBarDiv bind:value={value_b}></ReactiveBarDiv>
<p>Maximum of {value_a} and {value_b} is {bigger}.</p>
