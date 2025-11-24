<script lang="ts">
	interface ComboboxProps {
		value: string;
		options: string[];
		onchange?: () => void;
	}
	let { value = $bindable(), options, onchange }: ComboboxProps = $props();
	let isOpen = $state(false);
	let searchTerm = $state('');
	let filteredOptions = $derived(
		options.filter((o) => o.toUpperCase().includes(searchTerm.toUpperCase()))
	);
</script>

{#if isOpen}
	<button
		class="fixed inset-0 z-0 cursor-default"
		onclick={() => {
			isOpen = false;
		}}
		aria-label="Close dropdown"
	></button>
{/if}

<div class="dropdown" class:dropdown-open={isOpen}>
	<button
		class="btn btn-primary"
		onclick={() => {
			isOpen = !isOpen;
		}}>{value}</button
	>
	{#if isOpen}
		<ul
			class="dropdown-content menu z-1 my-1 max-h-80 w-60 flex-nowrap overflow-y-auto rounded-box bg-base-100 p-2 shadow-lg"
		>
			<li class="m-3">
				<label class="input">
					<svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
						<g
							stroke-linejoin="round"
							stroke-linecap="round"
							stroke-width="2.5"
							fill="none"
							stroke="currentColor"
						>
							<circle cx="11" cy="11" r="8"></circle>
							<path d="m21 21-4.3-4.3"></path>
						</g>
					</svg>
					<input type="search" class="grow" placeholder={value} bind:value={searchTerm} />
				</label>
			</li>
			{#each filteredOptions as option}
				<li>
					<button
						onclick={() => {
							value = option;
							onchange?.();
							isOpen = false;
						}}>{option}</button
					>
				</li>
			{/each}
		</ul>
	{/if}
</div>
