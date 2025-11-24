<script lang="ts">
	import type { Pokemon } from '$extractors/types';
	import type { BoxMon, PartyMon } from '$parsers/types';
	import keyboards from '$data/keyboards.json';
	import pokemon from '$data/pokemon.json';
	import items from '$data/items.json';
	import KeyboardInput from '$ui/keyboard-input.svelte';
	import Combobox from '$ui/combobox.svelte';
	import recalc from '$components/mon/recalc';

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
		<h6 class="mb-3">Species</h6>
		<Combobox
			bind:value={mon.species}
			options={pokemon.map((p) => p.name).filter((p) => p != '')}
			onchange={() => {
				mon = recalc(mon, data);
			}}
		/>
	</section>
	<section>
		<h6 class="mb-3">Level</h6>
		<div class="flex flex-wrap items-center gap-3 sm:flex-nowrap">
			<span class="w-15 text-left">Lv. {mon.level}</span>
			<input
				type="range"
				min="1"
				max="100"
				bind:value={mon.level}
				class="range range-primary"
				onchange={() => {
					mon = recalc(mon, data);
				}}
			/>
		</div>
	</section>
	<section>
		<h6 class="mb-3">Held Item</h6>
		<Combobox
			bind:value={mon.heldItem}
			options={[
				'NONE',
				...items
					.filter((i) => i.category != 'KEY_ITEM')
					.map((i) => i.name)
					.filter((i) => i != 'TERU-SAMA' && i != '')
			]}
		/>
	</section>
	{#if 'currentHP' in mon && !mon.isEgg}
		<section>
			<h6 class="mb-3">Current HP</h6>
			<div class="flex flex-wrap items-center gap-3 sm:flex-nowrap">
				<span class="w-28 text-left">HP: {mon.currentHP}/{mon.stats[0]}</span>
				<input
					type="range"
					min="0"
					max={mon.stats[0]}
					bind:value={mon.currentHP}
					class="range range-primary"
				/>
			</div>
		</section>
		<section>
			<h6>Status</h6>
		</section>
	{/if}
</div>
