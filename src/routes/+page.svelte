<!-- routes/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import Hero from "$lib/components/Hero.svelte";
  import Portfolio from "$lib/components/Portfolio.svelte";
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

<div class="relative overflow-hidden">
  <div 
    class="w-full h-screen bg-gradient-to-b from-gray-200 to-transparent dark:from-gray-800 pt-14 absolute top-0 left-0 z-0"
  >
    <div class="w-full h-full bg-dots dark:bg-dots-dark animate-spin-slow"></div>
  </div>

  <main class="px-4 sm:px-8 md:px-16 lg:px-24 py-8 relative z-10">
    <Hero />

    <hr class="border-t-2 border-black dark:border-white w-full my-8" />

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

		<!-- routes/+page.svelte (About section only) -->
		<div class="flex flex-col md:flex-row gap-4 md:gap-10">
			<div class="w-full md:w-1/3">
				<img src="hana-ramujkic.jpeg" alt="Hana Ramujkic set designer photo" class="w-full h-auto rounded-lg shadow-lg">
			</div>
			<div class="w-full md:w-2/3">
				<h2 class="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6">ABOUT</h2>
				<div class="space-y-4">
					<p>Hana Ramujkić is a talented set and costume designer with a unique background in opera singing. Born in Belgrade in 1995, she combines her passion for literature, music, and visual arts in her theatrical designs. Hana's mission is to make theater relevant and accessible to younger audiences, bringing her intense passion to every production.</p>
					<p>With a diverse educational background in linguistics, literature, and music, Hana brings a multifaceted approach to her designs. She believes set designers are the magicians of theater, creating visual frameworks that set the tone for entire productions. Her work is characterized by deep storytelling through visual tools and a collaborative spirit, leading her to work with renowned directors across Europe.</p>
				</div>
			</div>
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