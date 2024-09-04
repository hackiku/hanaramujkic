<!-- $lib/components/ProjectCard.svelte -->

<script lang="ts">
  // import { Drama } from 'lucide-svelte'
	import { goto } from '$app/navigation';
  import type { Project } from '$lib/server/contentful';

  export let project: Project;

  let imageError = false;

  function handleImageError() {
    imageError = true;
  }

  function handleClick() {
    goto('/project');
  }

  $: featuredImage = project.media[0]?.url || '';

  // Hardcoded tags for now, later we'll pull these from Contentful
  const tags = ['Costume Design', 'Scenography'];
</script>

<div 
  class="relative h-full w-full p-2 overflow-hidden group cursor-pointer"
  on:click={handleClick}
  on:keydown={(e) => e.key === 'Enter' && handleClick()}
  tabindex="0"
  role="button"
>
  <div class="h-full w-full rounded-lg overflow-hidden">
    {#if !imageError && featuredImage}
      <img
        src={featuredImage}
        alt={project.title}
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        on:error={handleImageError}
      />
    {:else}
      <div class="w-full h-full bg-gray-300 flex items-center justify-center">
        <span class="text-gray-500">Image not available</span>
      </div>
    {/if}
    <div class="absolute inset-2 flex flex-col justify-end p-4 bg-transparent group-hover:bg-black/75 transition-all duration-300 rounded-lg">
      <div class="transform transition-all duration-300 flex flex-col justify-end group-hover:justify-center group-hover:items-center h-full">
        <h3 class="text-white text-lg font-semibold mb-2 group-hover:text-2xl group-hover:font-bold transition-all duration-300 group-hover:text-center">{project.title}</h3>
        <div class="hidden group-hover:block text-center">
					{#if project.writer}
						<p class="text-white font-semibold text-md mb-4">{project.writer}</p>
          {/if}
          {#if project.venue}
					<p class="text-white text-sm">{project.venue}</p>
						<!-- <div class="flex flex-row justify-center items-center gap-2">
						</div> -->
          {/if}
          {#if project.director}
						<p class="text-white text-sm">Director: {project.director}</p>
          {/if}
					<div class="hidden group-hover:flex flex-wrap justify-center gap-2 mt-2">
						{#each tags as tag}
							<span class="bg-white/30 text-white px-2 py-1 rounded-full text-sm">{tag}</span>
						{/each}
					</div>
        </div>
      </div>
    </div>
  </div>
</div>