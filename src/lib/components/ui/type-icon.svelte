<script lang="ts">
	interface TypeIconProps {
		type: string;
	}

	let { type }: TypeIconProps = $props();

	let bg = $derived(
		{
			bug: '#92BC2C',
			dark: '#595761',
			dragon: '#0C69C8',
			electric: '#F2D94E',
			fire: '#FBA54C',
			fairy: '#EE90E6',
			fighting: '#D3425F',
			flying: '#A1BBEC',
			ghost: '#5F6DBC',
			grass: '#5FBD58',
			ground: '#DA7C4D',
			ice: '#75D0C1',
			normal: '#A0A29F',
			poison: '#B763CF',
			psychic: '#FA8581',
			rock: '#C9BB8A',
			steel: '#5695A3',
			water: '#539DDF'
		}[type.toLowerCase()]
	);
</script>

<div class="flex size-[30px] items-center justify-center rounded-[50%]" style:background-color={bg}>
	<img
		class="size-[60%] object-contain"
		src={`https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/5781623f147f1bf850f426cfe1874ba56a9b75ee/icons/${type.toLowerCase()}.svg`}
		alt={`${type} logo`}
	/>
</div>
