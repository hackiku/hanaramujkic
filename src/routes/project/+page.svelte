<script lang="ts">
  import { slide } from 'svelte/transition';
  import type { PageData } from './$types';

  export let data: PageData;

  let { projects, error } = data;
  let currentIndex = 0;
  let containerWidth: number;
  let scrollContainer: HTMLElement;

  function handleScroll() {
    if (scrollContainer) {
      const scrollPercentage = scrollContainer.scrollLeft / (scrollContainer.scrollWidth - scrollContainer.clientWidth);
      if (scrollPercentage > 0.8 && currentIndex < projects.length - 1) {
        currentIndex++;
      } else if (scrollPercentage < 0.2 && currentIndex > 0) {
        currentIndex--;
      }
    }
  }

  $: visibleProjects = projects.slice(Math.max(0, currentIndex - 1), currentIndex + 3);
</script>

<svelte:window bind:innerWidth={containerWidth} />

<div class="min-h-screen flex flex-col">
  <h1 class="text-3xl font-bold p-4">Projects</h1>

  {#if error}
    <div class="flex-grow flex items-center justify-center">
      <p class="text-red-500">{error}</p>
    </div>
  {:else if projects.length === 0}
    <div class="flex-grow flex items-center justify-center">
      <p>No projects found.</p>
    </div>
  {:else}
    <div 
      class="flex-grow overflow-x-scroll overflow-y-auto"
      bind:this={scrollContainer}
      on:scroll={handleScroll}
    >
      <div class="h-full flex" style="width: {containerWidth * visibleProjects.length}px;">
        {#each visibleProjects as project, index (project.id)}
          <div 
            class="h-full flex-shrink-0 overflow-y-auto"
            style="width: {containerWidth}px;"
            in:slide={{axis: 'x', duration: 300}}
          >
            <div class="h-full p-4 flex flex-col">
              <h2 class="text-2xl font-bold mb-2">{project.title}</h2>

              <div class="space-y-2 mb-4">
                <p><strong>Theater:</strong> {project.venue || 'Not specified'}</p>
                <p><strong>Writer:</strong> {project.writer || 'Not specified'}</p>
                <p><strong>Conductor:</strong> {project.conductor || 'Not specified'}</p>
                <p><strong>Director:</strong> {project.director || 'Not specified'}</p>
                <p><strong>Set Designer:</strong> {project.setDesigner || 'Not specified'}</p>
                <p><strong>Costume Designer:</strong> {project.costumeDesigner || 'Not specified'}</p>
                <p><strong>City:</strong> {project.city ? `${project.city.lat}, ${project.city.lon}` : 'Not specified'}</p>
                <p><strong>Photographer:</strong> {project.photographer || 'Not specified'}</p>
                <p><strong>Spot:</strong> {project.spot !== undefined ? project.spot : 'Not specified'}</p>
                {#if project.tags && project.tags.length > 0}
                  <p><strong>Tags:</strong> {project.tags.join(', ')}</p>
                {/if}
              </div>

              {#if project.media && project.media.length > 0}
                <div class="mb-4">
                  <h3 class="text-xl font-semibold mb-2">Media</h3>
                  <div class="grid grid-cols-2 gap-4">
                    {#each project.media as media}
                      <img 
                        src={media.url} 
                        alt={media.title} 
                        class="w-full h-48 object-cover"
                      />
                    {/each}
                  </div>
                </div>
              {/if}

              {#if project.projectDescription}
                <div class="mt-4">
                  <h3 class="text-xl font-semibold mb-2">Project Description</h3>
                  <!-- This is a simplified rendering. You might need a more complex renderer for Contentful's rich text -->
                  <p>{JSON.stringify(project.projectDescription)}</p>
                </div>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>

<style>
  /* Hide scrollbar for Chrome, Safari and Opera */
  .overflow-x-scroll::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  .overflow-x-scroll {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
</style>