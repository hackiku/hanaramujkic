<!-- $lib/components/Portfolio.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import * as Resizable from '$lib/components/ui/resizable';
  import { Button } from "$lib/components/ui/button";
  import ProjectCard from './ProjectCard.svelte';
  import type { Project } from '$lib/server/contentful';

  export let projects: Project[] = [];
  let isLoading = true;
  let error: string | null = null;
  let visibleProjects = 8;

  onMount(() => {
    isLoading = false;
  });

  $: gridItems = projects.slice(0, visibleProjects);

  function showMore() {
    visibleProjects += 2;
    if (visibleProjects > projects.length) {
      visibleProjects = projects.length;
    }
  }

  function getRowLayout(index) {
    const layouts = [
      [66, 34],
      [34, 66],
      [50, 50]
    ];
    return layouts[index % 3];
  }
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
  <div class="w-full">
    {#each gridItems as project, index (project.id)}
      <div class="mb-3 md:hidden">
        <ProjectCard {project} />
      </div>
    {/each}
    <div class="hidden md:block">
      {#each gridItems as project, index (project.id)}
        {#if index % 2 === 0}
          <Resizable.PaneGroup direction="horizontal" class="mb-1">
            <Resizable.Pane minSize={20} defaultSize={getRowLayout(index / 2)[0]}>
              <ProjectCard {project} />
            </Resizable.Pane>
            <Resizable.Handle withHandle />
            <Resizable.Pane minSize={20} defaultSize={getRowLayout(index / 2)[1]}>
              {#if gridItems[index + 1]}
                <ProjectCard project={gridItems[index + 1]} />
              {/if}
            </Resizable.Pane>
          </Resizable.PaneGroup>
        {/if}
      {/each}
    </div>
  </div>

  {#if visibleProjects < projects.length}
    <div class="mt-6 text-center">
      <Button on:click={showMore} variant="outline" class="w-full md:w-auto">
        Load More
      </Button>
    </div>
  {/if}
{/if}