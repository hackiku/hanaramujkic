<!-- $lib/components/Portfolio.svelte -->

<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import * as Resizable from '$lib/components/ui/resizable';
  import { Button } from "$lib/components/ui/button";
  import ProjectCard from './ProjectCard.svelte';
  import type { Project } from '$lib/server/contentful';

  export let projects: Project[] = [];
  let isLoading = true;
  let error: string | null = null;
  let visibleProjects = 6;

  onMount(() => {
    isLoading = false;
  });

  $: gridItems = projects.slice(0, visibleProjects);

  function showMore() {
    visibleProjects += 6;
    if (visibleProjects > projects.length) {
      visibleProjects = projects.length;
    }
  }

  const layouts = {
    mobile: [
      { type: 'full', size: 100 },
      { type: 'split', sizes: [50, 50] },
      { type: 'split', sizes: [66, 34] },
    ],
    desktop: [
      { type: 'split', sizes: [66, 34] },
    ]
  };
</script>

{#if isLoading}
  <div class="flex justify-center items-center h-64">
    <p>Loading projects...</p>
  </div>
{:else if error}
  <div class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
    <p>{error}</p>
  </div>
{:else}
  <div class="space-y-4">
    <!-- Mobile layout -->
    <div class="md:hidden space-y-4">
      {#each layouts.mobile as layout, index}
        {#if layout.type === 'full' && gridItems[index * 2]}
          <div class="w-full">
            <ProjectCard project={gridItems[index * 2]} />
          </div>
        {:else if layout.type === 'split' && gridItems[index * 2] && gridItems[index * 2 + 1]}
          <div class="flex space-x-4">
            <div class="w-[{layout.sizes[0]}%]">
              <ProjectCard project={gridItems[index * 2]} />
            </div>
            <div class="w-[{layout.sizes[1]}%]">
              <ProjectCard project={gridItems[index * 2 + 1]} />
            </div>
          </div>
        {/if}
      {/each}
    </div>

    <!-- Desktop layout -->
    <div class="hidden md:block space-y-4">
      <Resizable.PaneGroup class="w-full min-h-[600px]">
        <Resizable.Pane defaultSize={66} minSize={20}>
          {#if gridItems[0]}
            <ProjectCard project={gridItems[0]} />
          {/if}
        </Resizable.Pane>
        <Resizable.Handle class="w-4" />
        <Resizable.Pane>
          <Resizable.PaneGroup direction="vertical">
            <Resizable.Pane defaultSize={50} minSize={20}>
              {#if gridItems[1]}
                <ProjectCard project={gridItems[1]} />
              {/if}
            </Resizable.Pane>
            <Resizable.Handle class="h-4" />
            <Resizable.Pane>
              {#if gridItems[2]}
                <ProjectCard project={gridItems[2]} />
              {/if}
            </Resizable.Pane>
          </Resizable.PaneGroup>
        </Resizable.Pane>
      </Resizable.PaneGroup>
    </div>

    {#if gridItems.length > 3}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        {#each gridItems.slice(3) as project}
          <ProjectCard {project} />
        {/each}
      </div>
    {/if}

    {#if visibleProjects < projects.length}
      <div class="mt-8 text-center">
        <Button on:click={showMore} variant="outline" class="w-full md:w-auto">
          Load More
        </Button>
      </div>
    {/if}
  </div>
{/if}

<style>
  :global(.resizable-handle) {
    background-color: transparent !important;
  }
  :global(.resizable-pane) {
    background-color: transparent !important;
  }
</style>