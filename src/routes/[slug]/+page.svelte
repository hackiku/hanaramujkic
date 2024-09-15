<!-- routes/[slug]/+page.svelte -->
<script lang="ts">
  import type { PageData } from './$types';
  import Footer from '$lib/components/Footer.svelte';

  export let data: PageData;

  const { project, error } = data;
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
            <img 
              src={project.media[0].url} 
              alt={project.media[0].title} 
              class="w-full h-auto rounded-lg shadow-lg mb-4"
            />
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
  
  <Footer {data} />
</div>