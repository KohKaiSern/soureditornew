<script lang="ts">
	interface StatusProps {
		status: string;
		currentHP: number;
	}

	let { status, currentHP }: StatusProps = $props();

	let statusText = $derived(
		{
			PARALYSIS: 'PRZ',
			BURN: 'BRN',
			FREEZE: 'FRZ',
			POISON: 'PSN',
			SLEEP: 'SLP'
		}[status]
	);
	let statusColor = $derived(
		{
			PARALYSIS: '#fdae10',
			BURN: '#f94e00',
			FREEZE: '#62ccd4',
			POISON: '#bc52e7',
			SLEEP: '#7d7d7d'
		}[status]
	);
</script>

{#if status != 'NONE'}
	<div style:background-color={statusColor} class="rounded-md px-2">
		<p class="text-xs !text-gray-50">{statusText}</p>
	</div>
{/if}
{#if currentHP === 0}
	<div class="rounded-md bg-red-500 px-2">
		<p class="text-xs !text-white">FNT</p>
	</div>
{/if}
