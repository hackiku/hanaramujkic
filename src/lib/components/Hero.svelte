<!-- $lib/components/Hero.svelte -->

<script lang="ts">
	import { Play } from 'lucide-svelte';
	import { onMount } from 'svelte';

	let videoUrl = "die_riesen_vom_berge_trailer.mp4";
	let stickersContainer: HTMLElement;

	onMount(() => {
		const handleScroll = () => {
			if (stickersContainer) {
				const scrollY = window.scrollY;
				const rotation = scrollY * 0.05;
				const parallax = scrollY * 0.2;
				stickersContainer.style.transform = `translateY(${parallax}px) rotate(${rotation}deg)`;
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<div class="relative overflow-hidden h-[60vh] md:h-[75vh] w-full">
	<!-- Headline -->
	<div class="absolute top-8 left-0 sm:top-12 z-30 pl-4 sm:pl-8 md:pl-16">
		<h1 class="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 sm:mb-4  text-stroke">SCENOGRAPHY</h1>
		<h1 class="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 sm:mb-4 ml-8 sm:ml-16 text-stroke">+ COSTUME</h1>
	</div>

	<!-- Content Wrapper -->
	<div class="absolute inset-0 flex items-center justify-end pr-4 sm:pr-8 md:pr-16">
		<!-- Video Wrapper -->
		<div class="relative w-full max-w-xl aspect-video transform -rotate-3" style="margin-top: calc(10vw + 2rem);">
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
					<Play size={48} class="text-white opacity-75" />
				</div>
			</div>
		</div>

		<!-- Stickers Wrapper -->
		<div bind:this={stickersContainer} class="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 flex flex-wrap justify-end items-end gap-2 sm:gap-4 z-20 transition-transform duration-300 ease-out">
			<!-- Sticker 1 (Square) -->
			<div class="w-16 h-16 sm:w-24 sm:h-24 bg-yellow-200 dark:bg-yellow-700 rounded-lg shadow-lg sticker"></div>
			<!-- Sticker 2 (Human figure approximation) -->
			<div class="w-12 h-20 sm:w-20 sm:h-28 bg-blue-200 dark:bg-blue-700 rounded-lg shadow-lg sticker"></div>
			<!-- Sticker 3 (Human figure approximation) -->
			<div class="w-16 h-24 sm:w-24 sm:h-32 bg-pink-200 dark:bg-pink-700 rounded-lg shadow-lg sticker"></div>
		</div>
	</div>
</div>

<style>
	.text-stroke {
		-webkit-text-stroke: 2px #000;
		/* color: transparent; */
	}

	:global(.dark) .text-stroke {
		-webkit-text-stroke: 1px #fff;
	}

	.sticker {
		animation: wiggle 3s ease-in-out infinite;
	}

	.sticker:nth-child(2) {
		animation-delay: -1s;
	}

	.sticker:nth-child(3) {
		animation-delay: -2s;
	}

	@keyframes wiggle {
		0%, 100% { transform: rotate(-3deg); }
		50% { transform: rotate(3deg); }
	}

	@media (min-width: 640px) {
		.sticker {
			transform: translateY(-25%);
		}
	}
</style>