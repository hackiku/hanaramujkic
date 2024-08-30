<!-- routes/+page.svelte -->

<script lang="ts">
  import { onMount } from 'svelte';
  import Portfolio from "$lib/components/Portfolio.svelte";
  // import Navbar from "$lib/components/Navbar.svelte";
  // import DraggableStickers from "$lib/components/DraggableStickers.svelte";
  import type { Project } from '$lib/server/contentful';

  let projects: Project[] = [];
  let isLoading = true;
  let error: string | null = null;

  onMount(async () => {
    try {
      const response = await fetch('/api/portfolio');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      projects = data.projects;
    } catch (err) {
      console.error('Error fetching projects:', err);
      error = err instanceof Error ? err.message : 'An unknown error occurred';
    } finally {
      isLoading = false;
    }
  });
</script>

<!-- <Navbar /> -->

<div class="relative overflow-hidden">
  <div 
    class="w-full h-screen bg-gradient-to-b from-gray-200 to-transparent dark:from-gray-800 pt-14 absolute top-0 left-0 z-0"
  >
    <div class="w-full h-full bg-dots dark:bg-dots-dark animate-spin-slow"></div>
  </div>

  <main class="px-4 sm:px-8 md:px-16 lg:px-24 py-8 relative z-10">
    <h1 class="text-4xl sm:text-5xl md:text-5xl font-bold mb-4">SCENOGRAPHY</h1>
    <h1 class="text-4xl sm:text-5xl md:text-5xl font-bold mb-4 ml-36">+ COSTUME</h1>
   
    <!-- Placeholder stickers -->
    <div class="relative h-64 mb-8">
      <div class="absolute top-0 left-0 w-32 h-32 bg-gray-300 dark:bg-gray-700 border-4 border-white dark:border-black transform -rotate-6"></div>
      <div class="absolute top-16 left-24 w-40 h-40 bg-gray-400 dark:bg-gray-600 border-4 border-white dark:border-black transform rotate-3"></div>
      <div class="absolute top-8 left-48 w-36 h-36 bg-gray-500 dark:bg-gray-500 border-4 border-white dark:border-black transform -rotate-12"></div>
    </div>

    <!-- <DraggableStickers /> -->

    <hr class="border-t-2 border-black dark:border-white w-full mb-8" />
    
    {#if isLoading}
      <p>Loading projects...</p>
    {:else if error}
      <p class="text-red-500">Error: {error}</p>
    {:else if projects.length > 0}
      <Portfolio {projects} />
    {:else}
      <p>No projects found.</p>
    {/if}

    <hr class="border-t-2 border-black dark:border-white w-full my-8" />

    <div>
      <h2 class="text-2xl font-semibold">SCENOGRAPHY</h2>
      <p>The scenographer is a designer of atmospheres. The atmosphere is a space that tells a story and offers free creative interpretation. The scenography produces an experience of metaphorical immersion that becomes the synthesis between what is represented and what the representation leaves in the observer's mind. The only real protagonist of the scenographic realization is the spectator.</p>
    </div>
  </main>
</div>

<style>
  @keyframes spin-slow {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .animate-spin-slow {
    animation: spin-slow 240s linear infinite;
  }

  .bg-dots {
    background-image: radial-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px);
    background-size: 20px 20px;
  }

  .bg-dots-dark {
    background-image: radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px);
    background-size: 20px 20px;
  }
</style>