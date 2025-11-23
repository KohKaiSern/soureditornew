<script lang="ts">
	import type { BoxMon, PartyMon } from '$parsers/types';
	import type { Pokemon } from '$extractors/types';

	interface SpriteProps {
		mon: PartyMon | BoxMon;
		data: Pokemon;
	}

	let { mon, data }: SpriteProps = $props();

	let src = $derived.by(() => {
		const file =
			mon.dvs.slice(1).every((dv) => dv === 10) && [2, 3, 6, 7, 10, 11, 14, 15].includes(mon.dvs[0])
				? 'shiny.gif'
				: 'normal.gif';
		const dir = data.paths.sprite;
		if (mon.isEgg) {
			return `https://raw.githubusercontent.com/KohKaiSern/soureditornew/refs/heads/main/src/gfx/pokemon/egg/${file}`;
		} else if (mon.species != 'UNOWN') {
			return `https://raw.githubusercontent.com/KohKaiSern/soureditornew/refs/heads/main/src/${dir}${file}`;
		} else {
			let x = 0;
			for (const dv of mon.dvs) {
				x += (dv >> 1) & 0x3;
			}
			x = Math.floor(x / 10);
			const letter = String.fromCharCode(97 + x);
			return `https://raw.githubusercontent.com/KohKaiSern/soureditornew/refs/heads/main/src/gfx/pokemon/unown_${letter}/${file}`;
		}
	});
</script>

<div
	class="mr-5 flex size-[75px] items-center justify-center rounded-lg border border-gray-300 bg-white dark:border-none"
>
	<img {src} alt={`GIF of the front sprite of ${mon.species}`} />
</div>
