<script lang="ts">
	import Button from '$lib/components/Button.svelte';

	$: val = 'Input here';
</script>

<h1 class="h1">Hello!</h1>

<Button buttonText={val} />
<Button buttonText="Hello!2" />
<Button buttonText="Hello!3" />

<input type="text" class="input" bind:value={val} />
