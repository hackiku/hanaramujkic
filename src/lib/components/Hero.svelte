<!-- $lib/components/Hero.svelte -->
<script lang="ts">
	import DraggableStickers from "$lib/components/DraggableStickers.svelte";
</script>

<div>

	<h1 class="text-4xl sm:text-5xl md:text-5xl font-bold mb-4">SCENOGRAPHY</h1>
	<h1 class="text-4xl sm:text-5xl md:text-5xl font-bold mb-4 ml-36">+ COSTUME</h1>
	
	<!-- Placeholder stickers -->
	<div class="relative h-64 mb-8">
		<div class="absolute top-0 left-0 w-32 h-32 bg-gray-300 dark:bg-gray-700 border-4 border-white dark:border-black transform -rotate-6"></div>
		<div class="absolute top-16 left-24 w-40 h-40 bg-gray-400 dark:bg-gray-600 border-4 border-white dark:border-black transform rotate-3"></div>
		<div class="absolute top-8 left-48 w-36 h-36 bg-gray-500 dark:bg-gray-500 border-4 border-white dark:border-black transform -rotate-12"></div>
	</div>
	
	<!-- <DraggableStickers /> -->
	
</div>
<!-- <hr class="border-t-2 border-black dark:border-white w-full mb-8" /> -->
