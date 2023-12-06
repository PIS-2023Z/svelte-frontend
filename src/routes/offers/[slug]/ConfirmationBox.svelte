<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	const handleConfirm = () => {
		dispatch('confirm');
	};
	const handleCancel = () => {
		dispatch('cancel');
	};
</script>

<div>
	<span>Some message...?</span>
	<div>
		<button on:click={handleConfirm}>Confirm</button>
		<button on:click={handleCancel}>Cancel</button>
	</div>
</div>
