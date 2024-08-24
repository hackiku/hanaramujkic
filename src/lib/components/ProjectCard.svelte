<!-- $lib/components/ProjectCard.svelte -->
<script lang="ts">
  export let project: {
    id: string;
    name: string;
    company: string;
    image: string;
    tags: string[];
  };

  function handleImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
    img.nextElementSibling.classList.remove('hidden');
  }
</script>

<div class="relative h-64 md:h-full overflow-hidden group">
  <img
    src={project.image}
    alt={project.name}
    class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
    on:error={handleImageError}
  />
  <div class="hidden bg-gray-500 w-full h-full absolute inset-0"></div>
  <div class="absolute inset-0 flex flex-col justify-end p-4 bg-black bg-opacity-0 group-hover:bg-opacity-75 transition-all duration-300">
    <div class="transform group-hover:translate-y-0 transition-all duration-300">
      <h3 class="text-white text-sm md:text-xs group-hover:text-xl font-bold absolute bottom-2 right-2 group-hover:static group-hover:mb-2 transition-all duration-300">{project.name}</h3>
      <p class="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">{project.company}</p>
      <div class="flex flex-wrap mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {#each project.tags as tag}
          <span class="bg-white text-black text-xs px-2 py-1 rounded-full mr-2 mb-2">{tag}</span>
        {/each}
      </div>
    </div>
  </div>
</div>