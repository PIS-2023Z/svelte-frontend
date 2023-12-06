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
	<p>Are you sure?</p>
	<div>
		<button class="cancel" on:click={handleCancel}>Cancel</button>
		<button class="delete" on:click={handleConfirm}>Confirm</button>
	</div>
</div>
