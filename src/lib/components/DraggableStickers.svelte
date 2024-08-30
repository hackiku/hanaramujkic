<!-- DraggableStickers.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { spring } from 'svelte/motion';

  export let stickers: Array<{ id: string, imageUrl: string, name: string }>;

  let container: HTMLElement;
  let stickerElements: { [key: string]: HTMLElement } = {};
  let positions: { [key: string]: { x: number, y: number } } = {};

  onMount(() => {
    stickers.forEach(sticker => {
      positions[sticker.id] = spring({ x: Math.random() * 200, y: Math.random() * 200 }, {
        stiffness: 0.2,
        damping: 0.4
      });
    });
  });

  function dragStart(event: MouseEvent | TouchEvent, stickerId: string) {
    const target = event.target as HTMLElement;
    const startX = 'clientX' in event ? event.clientX : event.touches[0].clientX;
    const startY = 'clientY' in event ? event.clientY : event.touches[0].clientY;
    const startPositionX = positions[stickerId].x;
    const startPositionY = positions[stickerId].y;

    function dragMove(event: MouseEvent | TouchEvent) {
      const currentX = 'clientX' in event ? event.clientX : event.touches[0].clientX;
      const currentY = 'clientY' in event ? event.clientY : event.touches[0].clientY;
      positions[stickerId].set({
        x: startPositionX + currentX - startX,
        y: startPositionY + currentY - startY
      });
    }

    function dragEnd() {
      window.removeEventListener('mousemove', dragMove);
      window.removeEventListener('touchmove', dragMove);
      window.removeEventListener('mouseup', dragEnd);
      window.removeEventListener('touchend', dragEnd);
    }

    window.addEventListener('mousemove', dragMove);
    window.addEventListener('touchmove', dragMove);
    window.addEventListener('mouseup', dragEnd);
    window.addEventListener('touchend', dragEnd);
  }
</script>

<div class="relative h-screen w-full overflow-hidden bg-gray-100" bind:this={container}>
  {#each stickers as sticker (sticker.id)}
    <img
      src={sticker.imageUrl}
      alt={sticker.name}
      class="absolute w-24 h-24 cursor-move"
      style="transform: translate({$positions[sticker.id].x}px, {$positions[sticker.id].y}px)"
      on:mousedown={(e) => dragStart(e, sticker.id)}
      on:touchstart={(e) => dragStart(e, sticker.id)}
      bind:this={stickerElements[sticker.id]}
    />
  {/each}
</div>

<style>
  img {
    user-select: none;
    -webkit-user-drag: none;
  }
</style>