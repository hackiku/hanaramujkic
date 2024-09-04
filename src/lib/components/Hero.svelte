<!-- $lib/components/Hero.svelte -->
<script lang="ts">
	import { Play } from 'lucide-svelte';
	import DraggableStickers from "$lib/components/DraggableStickers.svelte";

	let videoUrl = "die_riesen_vom_berge_trailer.mp4";
</script>

<div class="relative overflow-hidden h-[60vh] w-full bg-white dark:bg-gray-900">
	<!-- Headline -->
	<div class="absolute top-8 left-4 sm:top-12 sm:left-8 z-30 mix-blend-difference">
		<h1 class="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 sm:mb-4 text-white">SCENOGRAPHY</h1>
		<h1 class="text-4xl sm:text-5xl md:text-6xl font-bold ml-8 sm:ml-16 text-white">+ COSTUME</h1>
	</div>

	<!-- Content Wrapper -->
	<div class="absolute inset-0 flex items-center justify-center">
		<!-- Video Wrapper -->
		<div class="relative w-full max-w-2xl aspect-video transform -rotate-3">
			<!-- Video Container -->
			<div class="absolute inset-0 overflow-hidden rounded-3xl shadow-2xl">
				<!-- Video -->
				<video
					class="w-full h-full object-cover"
					autoplay
					loop
					muted
					playsinline
				>
					<source src={videoUrl} type="video/mp4" />
					Your browser does not support the video tag.
				</video>
				<!-- Play icon -->
				<div class="absolute inset-0 flex items-center justify-center">
					<Play size={64} class="text-white opacity-75" />
				</div>
			</div>
		</div>

		<!-- Stickers Wrapper -->
		<div class="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 flex flex-wrap justify-end items-end gap-2 sm:gap-4 z-20">
			<!-- Sticker 1 (Square) -->
			<div class="w-20 h-20 sm:w-32 sm:h-32 bg-yellow-200 dark:bg-yellow-700 rounded-lg transform rotate-6 shadow-lg"></div>
			<!-- Sticker 2 (Human figure approximation) -->
			<div class="w-16 h-24 sm:w-24 sm:h-36 bg-blue-200 dark:bg-blue-700 rounded-lg transform -rotate-3 shadow-lg"></div>
			<!-- Sticker 3 (Human figure approximation) -->
			<div class="w-20 h-28 sm:w-28 sm:h-40 bg-pink-200 dark:bg-pink-700 rounded-lg transform rotate-12 shadow-lg"></div>
		</div>
	</div>

	<!-- Uncomment when DraggableStickers component is ready -->
	<!-- <DraggableStickers /> -->
</div>