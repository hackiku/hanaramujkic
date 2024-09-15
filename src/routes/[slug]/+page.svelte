<script lang="ts">
  import type { PageData } from './$types';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import Footer from '$lib/components/Footer.svelte';

  export let data: PageData;

  const { project, error, allProjects } = data;

  let currentImageIndex = 0;

  function nextImage() {
    if (project && project.media) {
      currentImageIndex = (currentImageIndex + 1) % project.media.length;
    }
  }

  function prevImage() {
    if (project && project.media) {
      currentImageIndex = (currentImageIndex - 1 + project.media.length) % project.media.length;
    }
  }
</script>

<div class="min-h-screen flex flex-col">
  {#if error}
    <div class="flex-grow flex items-center justify-center">
      <p class="text-red-500">{error}</p>
    </div>
  {:else if project}
    <div class="flex-grow flex">
      <!-- Left column for project details -->
      <div class="w-1/4 p-8 flex flex-col justify-between">
        <div>
          <h1 class="text-4xl font-bold mb-6">{project.title}</h1>
          <p class="mb-2"><strong>Musical direction:</strong> {project.conductor || 'Not specified'}</p>
          <p class="mb-2"><strong>Directed by:</strong> {project.director || 'Not specified'}</p>
          <p class="mb-2"><strong>Set design:</strong> {project.setDesigner || 'Not specified'}</p>
          <p class="mb-2"><strong>Costume design:</strong> {project.costumeDesigner || 'Not specified'}</p>
          <p class="mb-2"><strong>Theatre:</strong> {project.venue || 'Not specified'}</p>
          <p class="mb-2"><strong>Photos:</strong> {project.photographer || 'Not specified'}</p>
        </div>
        <div class="text-center">
          <button class="text-6xl font-bold" on:click={nextImage}>{currentImageIndex + 1}</button>
        </div>
      </div>

      <!-- Right column for images -->
      <div class="w-3/4 h-screen overflow-y-scroll">
        {#if project.media && project.media.length > 0}
          {#each project.media as image, index}
            <div class="mb-4">
              <img 
                src={image.url} 
                alt={image.title} 
                class="w-full h-auto"
              />
            </div>
          {/each}
        {/if}
      </div>
    </div>
  {:else}
    <div class="flex-grow flex items-center justify-center">
      <p>Project not found.</p>
    </div>
  {/if}
  
  <Footer projects={allProjects} />
</div>