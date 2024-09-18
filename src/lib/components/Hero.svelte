<!-- $lib/components/Hero.svelte -->

<script lang="ts">
  import { Play } from 'lucide-svelte';

  let showPlayer = false;

  function openVideoPlayer() {
    showPlayer = true;
  }

  function closeVideoPlayer() {
    showPlayer = false;
  }
</script>

<div class="relative w-full overflow-hidden">
  <!-- Background Video -->
  <video
    class="absolute w-full h-auto object-cover"
    autoplay
    loop
    muted
    playsinline
  >
    <source src="die_riesen_vom_berge_trailer.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>

  <!-- Content Overlay -->
  <div class="relative z-10 md:h-[70vh] flex flex-col items-start p-4 sm:p-8 md:p-16">
    <!-- Text and Button Container -->
    <div class="flex items-center">
      <!-- Text Overlay -->
      <div class="text-white text-right border-r-2 border-white pr-4 sm:pr-8 md:pr-16 flex flex-col items-end pb-10">
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-semibold mb-2 whitespace-nowrap">SCENOGRAPHY</h1>
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-semibold mb-2 whitespace-nowrap">+ COSTUME</h1>
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-semibold whitespace-nowrap">DESIGN</h1>
      </div>
      
      <!-- Play Button -->
      <button
        class="ml-4 sm:ml-8 md:ml-16 bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-300 rounded-full p-4 flex-shrink-0"
        on:click={openVideoPlayer}
      >
        <Play class="w-8 h-8 text-white" />
      </button>
    </div>
  </div>

  <!-- Video Player Modal -->
  {#if showPlayer}
    <div class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div class="relative w-full max-w-4xl">
        <button
          class="absolute top-4 right-4 text-white text-2xl"
          on:click={closeVideoPlayer}
        >
          ×
        </button>
        <video
          class="w-full"
          controls
          autoplay
        >
          <source src="die_riesen_vom_berge_trailer.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  {/if}
</div>