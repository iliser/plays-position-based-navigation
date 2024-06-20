<script lang="ts">
	import { kbGFocus } from "$lib/kb_focus_handler";

	const { gfocus, windowKeydown } = kbGFocus("selected");
	let input = 10;
	$: gridItemCount = Math.min(Math.max(input, 5), 100);
</script>

<svelte:window on:keydown={windowKeydown} />

<input type="number" use:gfocus bind:value={input} />
<div class="viewport" style="--grid-cnt:{gridItemCount}">
	{#each new Array(gridItemCount * gridItemCount).fill(null) as item, id}
		<div class="box" use:gfocus>
			{id}
		</div>
	{/each}
</div>

<style>
	.box {
		border: 1px dashed white;
		font-size: 11px;
		font-weight: bold;
		display: grid;

		align-items: center;
		justify-items: center;
	}
	.viewport {
		width: calc(100vw - 16px);
		height: calc(100vh - 48px);
		margin: auto auto;

		display: grid;
		grid-template-columns: repeat(var(--grid-cnt, 5), 1fr);
		grid-template-rows: repeat(var(--grid-cnt, 5), 1fr);
		grid-column-gap: 8px;
		grid-row-gap: 8px;
	}
	:global(.selected) {
		outline: 1px solid lime;
	}
	:global(body) {
		/* background-color: #1f1f1f; */
		background-color: black;
		color: white;
	}
</style>
