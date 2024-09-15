<!-- routes/[slug]/+page.svelte -->
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
    <div class="flex-grow p-8">
      <h1 class="text-4xl font-bold mb-6">{project.title}</h1>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {#if project.media && project.media.length > 0}
            <div class="relative">
              {#key currentImageIndex}
                <img 
                  src={project.media[currentImageIndex].url} 
                  alt={project.media[currentImageIndex].title} 
                  class="w-full h-auto rounded-lg shadow-lg mb-4"
                  transition:fade
                />
              {/key}
              {#if project.media.length > 1}
                <button class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full" on:click={prevImage}>←</button>
                <button class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full" on:click={nextImage}>→</button>
              {/if}
            </div>
          {/if}
          <div class="space-y-2">
            <p><strong>Theater:</strong> {project.venue || 'Not specified'}</p>
            <p><strong>Writer:</strong> {project.writer || 'Not specified'}</p>
            <p><strong>Conductor:</strong> {project.conductor || 'Not specified'}</p>
            <p><strong>Director:</strong> {project.director || 'Not specified'}</p>
            <p><strong>Set Designer:</strong> {project.setDesigner || 'Not specified'}</p>
            <p><strong>Costume Designer:</strong> {project.costumeDesigner || 'Not specified'}</p>
            <p><strong>City:</strong> {project.city ? `${project.city.lat}, ${project.city.lon}` : 'Not specified'}</p>
            <p><strong>Photographer:</strong> {project.photographer || 'Not specified'}</p>
            {#if project.tags && project.tags.length > 0}
              <p><strong>Tags:</strong> {project.tags.join(', ')}</p>
            {/if}
          </div>
        </div>
        <div>
          {#if project.projectDescription}
            <h2 class="text-2xl font-semibold mb-4">Project Description</h2>
            <div class="prose dark:prose-invert">
              {@html project.projectDescription}
            </div>
          {/if}
        </div>
      </div>
    </div>
  {:else}
    <div class="flex-grow flex items-center justify-center">
      <p>Project not found.</p>
    </div>
  {/if}
  
  <Footer projects={allProjects} />
</div>