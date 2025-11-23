<script lang="ts">
	import type { PartyMon } from '$parsers/types';
	import MonCard from '$components/mon/mon-card.svelte';

	interface PartyProps {
		party: PartyMon[];
	}

	let { party = $bindable() }: PartyProps = $props();
</script>

<div class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
	{#each party as mon, i}
		{#if !mon}
			<div class="card bg-base-100 shadow-sm card-sm">
				<div class="card-body">
					<h2 class="card-title justify-between">EMPTY</h2>
				</div>
			</div>
		{/if}
		<MonCard bind:mon={party[i]} />
	{/each}
</div>
