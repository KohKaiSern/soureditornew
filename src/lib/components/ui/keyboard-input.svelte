<script lang="ts">
	import { fly } from 'svelte/transition';

	interface KeyboardInputprops {
		value: string[];
		maxLen: number;
		keyboard: string[];
	}
	let { value = $bindable(), maxLen, keyboard }: KeyboardInputprops = $props();
	let isOpen = $state(false);
	let drawerElement: HTMLDivElement;

	$effect(() => {
		if (drawerElement) {
			document.body.appendChild(drawerElement);
			return () => {
				document.body.removeChild(drawerElement);
			};
		}
	});
</script>

<button class="btn btn-soft" onclick={() => (isOpen = true)}>
	{value.join('')}
</button>

<div bind:this={drawerElement} style="display: contents;">
	{#if isOpen}
		<div transition:fly={{ y: '100%', duration: 200 }} class="fixed inset-0 z-50 bg-base-200 p-5">
			<div class="mx-auto flex h-full max-w-2xl flex-col gap-5">
				<div class="sticky top-0 z-10">
					<p>
						Editing text ({value.length}/{maxLen} characters)
					</p>
					<div class="mt-5 rounded-md border border-base-300 bg-base-100 p-3">
						<p class="mb-1 text-xs">Current text:</p>
						<p>{value.join('')}|</p>
					</div>
				</div>

				<div class="overflow-y-auto">
					<div class="grid grid-cols-6 gap-2 sm:grid-cols-8 md:grid-cols-10">
						{#each keyboard as char}
							<button
								class="btn btn-soft"
								onclick={() => {
									if (value.length < maxLen) {
										value = [...value, char];
										if (value.length >= maxLen) isOpen = false;
									}
								}}
							>
								<p>{char}</p>
							</button>
						{/each}
					</div>
				</div>

				<div class="sticky bottom-0 z-10 p-5">
					<div class="flex gap-5">
						<button
							class="btn flex-1 btn-error"
							onclick={() => {
								if (value.length > 0) {
									const newValue = [...value];
									newValue.pop();
									value = newValue;
								}
							}}
						>
							← Backspace
						</button>
						<button
							class="btn flex-1 btn-success"
							disabled={value.length === 0}
							onclick={() => (isOpen = false)}
						>
							Done
						</button>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>
