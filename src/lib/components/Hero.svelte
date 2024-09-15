<!-- $lib/components/Hero.svelte -->

<script lang="ts">
  import { Play } from 'lucide-svelte';

  let videoUrl = "die_riesen_vom_berge_trailer.mp4";
</script>

<div class="relative overflow-hidden h-[60vh] md:h-[75vh] w-full">
  <!-- Headline -->
  <div class="absolute top-8 left-0 sm:top-12 z-30 pl-4 sm:pl-8 md:pl-16">
    <h1 class="text-4xl sm:text-5xl md:text-6xl font-semibold mb-2 sm:mb-4 text-stroke">SCENOGRAPHY</h1>
    <h1 class="text-4xl sm:text-5xl md:text-6xl font-semibold mb-2 sm:mb-4 ml-8 sm:ml-16 text-stroke">+ COSTUME</h1>
  </div>

  <!-- Video Wrapper -->
  <div class="absolute inset-0 flex items-center justify-end pr-4 sm:pr-8 md:pr-16">
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
  </div>
</div>

<style>
  .text-stroke {
    -webkit-text-stroke: 2px #000;
  }

  :global(.dark) .text-stroke {
    -webkit-text-stroke: 1px #fff;
  }
</style>