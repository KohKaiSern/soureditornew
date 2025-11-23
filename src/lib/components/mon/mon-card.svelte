<script lang="ts">
	import type { PartyMon, BoxMon } from '$parsers/types';
	import pokemon from '$data/pokemon.json';
	import Sprite from '$ui/sprite.svelte';
	import TypeIcon from '$ui/type-icon.svelte';
	import HpBar from '$ui/hp-bar.svelte';
	import Status from '$ui/status.svelte';
	import Drawer from '$ui/drawer.svelte';
	interface MonCardProps {
		mon: PartyMon | BoxMon;
	}
	let { mon = $bindable() }: MonCardProps = $props();
	let data = $derived(pokemon.find((p) => p.name === mon.species)!);
</script>

<div class="card bg-base-200 shadow-lg card-md">
	<div class="card-body text-lg">
		<h5 class="mb-2 card-title items-start">
			<Sprite {mon} {data} />
			<div class="flex h-full flex-col justify-between text-xl">
				{mon.nickname.join('')}
				<div class="flex gap-3">
					{#each data.types as type}
						<TypeIcon {type} />
					{/each}
				</div>
			</div>
		</h5>
		{#if 'currentHP' in mon && !mon.isEgg}
			<div class="flex items-center gap-3">
				<HpBar currentHP={mon.currentHP} maxHP={mon.stats[0]} />
				<Status status={mon.status.name} currentHP={mon.currentHP} />
			</div>
		{/if}
		Lv. {mon.level} <br />
		{#if mon.heldItem === ''}
			Held Item: None
		{:else}
			Held Item: {mon.heldItem}
		{/if}
		<div class="absolute right-5 bottom-5 card-actions">
			<Drawer bind:mon {data} />
		</div>
	</div>
</div>
