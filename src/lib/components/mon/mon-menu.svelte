<script lang="ts">
	import type { Pokemon } from '$extractors/types';
	import type { BoxMon, PartyMon } from '$parsers/types';
	import MonBasics from '$components/mon/mon-basics.svelte';
	import MonStats from '$components/mon/mon-stats.svelte';
	import MonMoveset from '$components/mon/mon-moveset.svelte';
	import MonMisc from '$components/mon/mon-misc.svelte';
	import MonCaught from '$components/mon/mon-caught.svelte';

	interface MonMenuProps {
		mon: PartyMon | BoxMon;
		data: Pokemon;
	}

	let { mon = $bindable(), data }: MonMenuProps = $props();
</script>

<h4 class="m-5 text-4xl font-extrabold">
	<span class="text-primary">Edit</span>
	{mon.nickname.join('')}
</h4>

<div class="flex flex-col gap-3 px-3">
	<div class="collapse-plus collapse bg-base-100">
		<input type="radio" name="mon-editor" checked />
		<div class="collapse-title text-2xl font-bold">Basics</div>
		<div class="collapse-content">
			<MonBasics bind:mon {data} />
		</div>
	</div>
	<div class="collapse-plus collapse bg-base-100">
		<input type="radio" name="mon-editor" />
		<div class="collapse-title text-2xl font-bold">DVs & EVs</div>
		<div class="collapse-content">
			<MonStats />
		</div>
	</div>
	<div class="collapse-plus collapse bg-base-100">
		<input type="radio" name="mon-editor" />
		<div class="collapse-title text-2xl font-bold">Moveset</div>
		<div class="collapse-content">
			<MonMoveset />
		</div>
	</div>
	<div class="collapse-plus collapse bg-base-100">
		<input type="radio" name="mon-editor" />
		<div class="collapse-title text-2xl font-bold">Miscellaneous</div>
		<div class="collapse-content">
			<MonMisc />
		</div>
	</div>
	<div class="collapse-plus collapse bg-base-100">
		<input type="radio" name="mon-editor" />
		<div class="collapse-title text-2xl font-bold">OT & Caught Data</div>
		<div class="collapse-content">
			<MonCaught />
		</div>
	</div>
</div>
