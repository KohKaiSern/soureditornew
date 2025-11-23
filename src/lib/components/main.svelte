<script lang="ts">
	import ThemeToggler from '$ui/theme-toggler.svelte';
	import FileHandler from '$components/file-handler.svelte';
	import RadioSelect from '$ui/radio-select.svelte';
	import Party from '$components/party.svelte';
	import type { Data } from '$parsers/types';

	let data: Data | null = $state(null);
	let editor: string = $state('party');

	$inspect(data);
</script>

<header class="mb-5 flex flex-wrap justify-between gap-5">
	<h1><span class="text-primary">Sour</span> Editor</h1>
	<ThemeToggler />
</header>

<FileHandler bind:data />

<section class="mt-5">
	<h6>Sour Crystal is a save editor for the Sour Crystal ROM Hack by SourApple.</h6>
	Please contact Rev3lation on the Bowl of Soup Discord server if you experience any bugs<br />
	(e.g. Save failing to parse, save corruption, bad eggs, etc.).<br />
	I am not responsible for corrupted saves - please backup your original save files.<br />
	<br />
	Instructions for use:
	<ol>
		<li>Make a backup of your original save.</li>
		<li>Upload your save file to this website.</li>
		<li>Edit whatever you please.</li>
		<li>Download the edited save.</li>
		<li>Replace your original save file with the edited one.</li>
		<li>Rename the edited save file to the original's name.</li>
	</ol>
	<br />
	<span class="italic">Credits: Rev3lation, SourApple</span>
</section>

<div class="divider"></div>

{#if data}
	<RadioSelect
		bind:value={editor}
		options={[
			{ id: 'party', text: 'Party' },
			{ id: 'boxes', text: 'Boxes' },
			{ id: 'bag', text: 'Bag' },
			{ id: 'player', text: 'Player' }
		]}
	/>

	{#if editor === 'party'}<Party bind:party={data.party} />{/if}
{/if}
