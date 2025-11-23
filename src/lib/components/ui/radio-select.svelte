<script lang="ts" generics="T">
	interface RadioSelectProps {
		value: T;
		options: { id: T; text: string }[];
	}
	let { value = $bindable(), options }: RadioSelectProps = $props();
</script>

<div class="join">
	{#each options as option}
		<input
			class="btn join-item"
			type="radio"
			bind:group={value}
			value={option.id}
			name="options"
			aria-label={option.text}
		/>
	{/each}
</div>
