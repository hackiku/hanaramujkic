<script lang="ts">
  import { onMount } from 'svelte';
  import type { Project } from '$lib/server/contentful';

  let project: Project | null = null;
  let isLoading = true;
  let error: string | null = null;

  onMount(async () => {
    try {
      // In a real app, you'd fetch the specific project based on the route parameter
      // For this example, we'll use mock data
      const mockProject: Project = {
        id: '1',
        title: 'LA BOHÈME',
        writer: 'Giacomo Puccini',
        venue: 'Theatre for Lower Saxony',
        director: 'Juana Inés Cano Restrepo',
        conductor: 'Florian Ziemen',
        media: [
          { url: '/path-to-image1.jpg', title: 'Image 1' },
          { url: '/path-to-image2.jpg', title: 'Image 2' },
        ],
        positions: ['Set design: Christoph Gehre', 'Costume design: Lena Weikhard'],
        projectDescription: {
          // This would be rich text content from Contentful
          content: [{ nodeType: 'paragraph', content: [{ nodeType: 'text', value: 'Project description goes here...' }] }]
        }
      };
      
      project = mockProject;
    } catch (err) {
      console.error('Error fetching project:', err);
      error = err instanceof Error ? err.message : 'An unknown error occurred';
    } finally {
      isLoading = false;
    }
  });
</script>

<div class="max-w-4xl mx-auto px-4 py-8">
  {#if isLoading}
    <p class="text-center">Loading project details...</p>
  {:else if error}
    <p class="text-red-500 text-center">{error}</p>
  {:else if project}
    <h1 class="text-3xl font-bold mb-2">{project.title}</h1>
    <p class="text-xl text-gray-500 mb-4">{project.venue}</p>
    
    <div class="mb-6">
      <p><strong>Writer:</strong> {project.writer}</p>
      <p><strong>Director:</strong> {project.director}</p>
      <p><strong>Conductor:</strong> {project.conductor}</p>
    </div>

    <div class="mb-6">
      <h2 class="text-2xl font-semibold mb-2">Positions</h2>
      {#each project.positions as position}
        <p>{position}</p>
      {/each}
    </div>

    {#if project.media && project.media.length > 0}
      <div class="mb-6">
        <h2 class="text-2xl font-semibold mb-2">Media</h2>
        <div class="grid grid-cols-2 gap-4">
          {#each project.media as media}
            <img src={media.url} alt={media.title} class="w-full h-auto"/>
          {/each}
        </div>
      </div>
    {/if}

    {#if project.projectDescription}
      <div class="mb-6">
        <h2 class="text-2xl font-semibold mb-2">Project Description</h2>
        <!-- This is a simplified rendering of rich text. You might need a more complex renderer for Contentful's rich text -->
        {#each project.projectDescription.content as node}
          {#if node.nodeType === 'paragraph'}
            <p class="mb-2">
              {#each node.content as textNode}
                {textNode.value}
              {/each}
            </p>
          {/if}
        {/each}
      </div>
    {/if}
  {:else}
    <p class="text-center">No project found.</p>
  {/if}
</div>