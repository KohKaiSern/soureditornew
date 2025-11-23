<script lang="ts">
	import type { Pokemon } from '$extractors/types';
	import type { BoxMon, PartyMon } from '$parsers/types';
	import keyboards from '$data/keyboards.json';
	import KeyboardInput from '$ui/keyboard-input.svelte';

	interface MonBasicsProps {
		mon: PartyMon | BoxMon;
		data: Pokemon;
	}

	let { mon = $bindable(), data }: MonBasicsProps = $props();
</script>

<div class="flex flex-col gap-5">
	<section>
		<h6 class="mb-3">Nickname</h6>
		<KeyboardInput bind:value={mon.nickname} maxLen={10} keyboard={keyboards.name} />
	</section>
	<section>
		<h6>Species</h6>
	</section>
	<section>
		<h6>Level</h6>
	</section>
	<section>
		<h6>Held Item</h6>
	</section>
	{#if 'currentHP' in mon && !mon.isEgg}
		<section>
			<h6>Current HP</h6>
		</section>
		<section>
			<h6>Status</h6>
		</section>
	{/if}
</div>
