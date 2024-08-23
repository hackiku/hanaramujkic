<!-- $lib/components/Portfolio.svelte -->

<script lang="ts">
  import { fade } from 'svelte/transition';

  export let projects = [];
  let visibleProjects = 8;

  $: gridItems = projects.slice(0, visibleProjects);

  function showMore() {
    visibleProjects += 8;
    if (visibleProjects > projects.length) {
      visibleProjects = projects.length;
    }
  }

  function handleImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
    img.nextElementSibling.classList.remove('hidden');
  }
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {#each gridItems as project (project.id)}
    <div class="relative overflow-hidden rounded-lg shadow-md group" transition:fade>
      <img
        src={project.image}
        alt={project.name}
        class="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
        on:error={handleImageError}
      />
      <div class="hidden bg-gray-500 w-full h-full absolute inset-0"></div>
      <div class="absolute inset-0 flex flex-col justify-end p-4 bg-black bg-opacity-0 group-hover:bg-opacity-75 transition-all duration-300">
        <h3 class="text-white text-xl font-bold transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">{project.name}</h3>
        <p class="text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 delay-75">{project.company}</p>
        <div class="flex flex-wrap mt-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 delay-100">
          {#each project.tags as tag}
            <span class="bg-white text-black text-xs px-2 py-1 rounded-full mr-2 mb-2">{tag}</span>
          {/each}
        </div>
      </div>
    </div>
  {/each}
</div>

{#if visibleProjects < projects.length}
  <div class="mt-8 text-center">
    <button
      on:click={showMore}
      class="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors duration-300"
    >
      Show More
    </button>
  </div>
{/if}