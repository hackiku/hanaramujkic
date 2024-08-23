<!-- $lib/components/Portfolio.svelte -->

<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  interface Project {
    id: string;
    name: string;
    company: string;
    tags: string[];
    image: string;
    color: string;
  }

  let projects: Project[] = [];
  let container: HTMLElement;

  onMount(async () => {
    const response = await fetch('/api/projects');
    const data = await response.json();
    projects = data.projects;
    adjustMasonry();
  });

  function adjustMasonry() {
    const items = container.querySelectorAll('.masonry-item');
    let columns = 3;
    if (window.innerWidth < 768) columns = 1;
    else if (window.innerWidth < 1024) columns = 2;

    items.forEach((item: HTMLElement, i) => {
      item.style.gridRowEnd = `span ${Math.ceil(item.getBoundingClientRect().height / 10)}`;
    });
  }

  function handleImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
    img.nextElementSibling.classList.remove('hidden');
  }
</script>

<div bind:this={container} class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[10px]">
  {#each projects as project (project.id)}
    <div class="masonry-item relative overflow-hidden" transition:fade>
      <img
        src={project.image}
        alt={project.name}
        class="w-full h-auto object-cover"
        on:error={handleImageError}
      />
      <div class="hidden bg-gray-500 w-full h-full absolute inset-0"></div>
      <div class="absolute inset-0 flex flex-col justify-end p-4 bg-opacity-0 hover:bg-opacity-75 transition-all duration-300 {project.color}">
        <h3 class="text-white text-xl font-bold">{project.name}</h3>
        <p class="text-white">{project.company}</p>
        <div class="flex flex-wrap mt-2">
          {#each project.tags as tag}
            <span class="bg-white text-black text-xs px-2 py-1 rounded-full mr-2 mb-2">{tag}</span>
          {/each}
        </div>
      </div>
    </div>
  {/each}
</div>

<style>
  .masonry-item {
    break-inside: avoid;
    margin-bottom: 16px;
  }
</style>