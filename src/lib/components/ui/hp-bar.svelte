<script lang="ts">
	interface HPBarProps {
		currentHP: number;
		maxHP: number;
	}

	let { currentHP, maxHP }: HPBarProps = $props();

	let progressClass = $derived.by(() => {
		const ratio = currentHP / maxHP;
		return ratio <= 0.2 ? 'hp-critical' : ratio <= 0.5 ? 'hp-low' : 'hp-healthy';
	});
</script>

HP<progress class="progress w-full sm:w-56 {progressClass}" value={currentHP} max={maxHP}
></progress>

<style>
	.hp-critical {
		background-color: rgb(239 68 68 / 0.25); /* bg-red-500/50 */
	}
	.hp-critical::-webkit-progress-value {
		background-color: rgb(239 68 68); /* bg-red-500 */
	}
	.hp-critical::-moz-progress-bar {
		background-color: rgb(239 68 68); /* bg-red-500 */
	}
	.hp-low {
		background-color: rgb(234 179 8 / 0.25); /* bg-yellow-500/50 */
	}
	.hp-low::-webkit-progress-value {
		background-color: rgb(234 179 8); /* bg-yellow-500 */
	}
	.hp-low::-moz-progress-bar {
		background-color: rgb(234 179 8); /* bg-yellow-500 */
	}
	.hp-healthy {
		background-color: rgb(34 197 94 / 0.25); /* bg-green-500/50 */
	}
	.hp-healthy::-webkit-progress-value {
		background-color: rgb(34 197 94); /* bg-green-500 */
	}
	.hp-healthy::-moz-progress-bar {
		background-color: rgb(34 197 94); /* bg-green-500 */
	}
</style>
