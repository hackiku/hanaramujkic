<!-- $lib/components/ProjectCard.svelte -->

<script lang="ts">
  import type { Project } from '$lib/server/contentful';

  export let project: Project;

  let imageError = false;

  function handleImageError() {
    imageError = true;
  }

  $: featuredImage = project.media[0]?.url || '';
</script>

<div class="relative h-64 md:h-full overflow-hidden group">
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
  <div class="absolute inset-0 flex flex-col justify-end p-4 bg-black bg-opacity-0 group-hover:bg-opacity-75 transition-all duration-300">
    <div class="transform group-hover:translate-y-0 transition-all duration-300">
      <h3 class="text-white text-sm md:text-xs group-hover:text-xl font-bold absolute bottom-2 right-2 group-hover:static group-hover:mb-2 transition-all duration-300">{project.title}</h3>
      {#if project.company}
        <p class="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">{project.company}</p>
      {/if}
      {#if project.venue}
        <p class="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">{project.venue}</p>
      {/if}
      {#if project.director}
        <p class="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">Director: {project.director}</p>
      {/if}
    </div>
  </div>
</div>
