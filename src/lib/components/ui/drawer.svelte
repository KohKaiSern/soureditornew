<script lang="ts">
	import type { Pokemon } from '$extractors/types';
	import type { BoxMon, PartyMon } from '$parsers/types';
	import MonMenu from '$components/mon/mon-menu.svelte';
	interface DrawerProps {
		mon: PartyMon | BoxMon;
		data: Pokemon;
	}

	let { mon = $bindable(), data }: DrawerProps = $props();

	let innerHeight = $state(0);
	let innerWidth = $state(0);
	let isOpen = $state(false);

	let drawerClasses = $derived.by(() => {
		const isMobile = innerHeight! > innerWidth!;
		const base = 'fixed bg-base-200 z-10 duration-200 ease-in-out';
		if (isMobile) {
			const position = 'bottom-0 left-0 right-0 h-[85%]';
			const transform = isOpen ? 'translate-y-0' : 'translate-y-full';
			return `${base} ${position} ${transform}`;
		} else {
			const position = 'top-0 right-0 bottom-0 w-[75%]';
			const transform = isOpen ? 'translate-x-0' : 'translate-x-full';
			return `${base} ${position} ${transform}`;
		}
	});
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<!-- Drawer Button -->
<button
	class="btn size-11 rounded-lg p-3 btn-primary"
	aria-label="Edit Pokemon"
	onclick={() => {
		isOpen = !isOpen;
		document.body.style.overflow = isOpen ? 'hidden' : '';
	}}
>
	<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor">
		<path
			d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
</button>

<!-- Backdrop -->
{#if isOpen}
	<button
		class="fixed inset-0 z-5 bg-black/25"
		onclick={() => {
			isOpen = false;
			document.body.style.overflow = '';
		}}
		aria-label="Close Drawer"
	></button>
{/if}

<!-- Drawer -->
<div class={drawerClasses}>
	<div class="h-full overflow-y-auto">
		<!-- Close Button -->
		<button
			class="absolute top-5 right-5 z-0 size-8"
			onclick={() => {
				isOpen = false;
				document.body.style.overflow = '';
			}}
			aria-label="Close Drawer"
		>
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M6 18L18 6M6 6l12 12"
				/>
			</svg>
		</button>

		<!-- Drawer Editor Content -->
		<MonMenu bind:mon {data} />
	</div>
</div>
