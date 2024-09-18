<!-- $lib/components/Hero.svelte -->

<div class="relative overflow-hidden w-full h-[80vh] sm:h-[70vh] px-4 sm:px-12 md:px-24 py-8">
  <!-- Headline -->
  <div class="absolute top-8 left-4 sm:left-12 md:left-24 z-10">
    <h1 class="text-4xl sm:text-5xl md:text-6xl font-semibold mb-2 sm:mb-4">SCENOGRAPHY</h1>
    <h1 class="text-4xl sm:text-5xl md:text-6xl font-semibold mb-2 sm:mb-4 ml-8 md:ml-12 ">+ COSTUME</h1>
    <h1 class="text-4xl sm:text-5xl md:text-6xl font-semibold mb-2 sm:mb-4 ml-20 md:ml-36">DESIGN</h1>
  </div>

  <!-- Video Wrapper -->
  <div class="absolute bottom-8 right-4 sm:right-12 md:right-24 w-full max-w-lg aspect-video transform rotate-6">
    <!-- Video Container -->
    <div class="overflow-hidden rounded-3xl">
      <!-- Video -->
      <video
        class="w-full h-full object-cover"
        autoplay
        loop
        muted
        playsinline
      >
        <source src="die_riesen_vom_berge_trailer.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  </div>
</div>
