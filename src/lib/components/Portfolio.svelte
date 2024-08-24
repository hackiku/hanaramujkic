<!-- $lib/components/Portfolio.svelte -->

<script lang="ts">
  import { fade } from 'svelte/transition';
  import * as Resizable from '$lib/components/ui/resizable';
  import { Button } from "$lib/components/ui/button";
  import ProjectCard from './ProjectCard.svelte';

  export let projects: Array<{
    id: string;
    name: string;
    company: string;
    image: string;
    tags: string[];
  }> = [];
  
  let visibleProjects = 6;

  $: gridItems = projects.slice(0, visibleProjects);

  function showMore() {
    visibleProjects += 6;
    if (visibleProjects > projects.length) {
      visibleProjects = projects.length;
    }
  }
</script>

<div class="space-y-8">
  <div class="w-full md:hidden">
    {#if gridItems[0]}
      <ProjectCard project={gridItems[0]} />
    {/if}
  </div>

  <div class="hidden md:block">
    <Resizable.PaneGroup class="w-full min-h-[600px]">
      <Resizable.Pane defaultSize={66} minSize={20}>
        {#if gridItems[0]}
          <ProjectCard project={gridItems[0]} />
        {/if}
      </Resizable.Pane>
      <Resizable.Handle class="w-8" />
      <Resizable.Pane>
        <Resizable.PaneGroup direction="vertical">
          <Resizable.Pane defaultSize={50} minSize={20}>
            {#if gridItems[1]}
              <ProjectCard project={gridItems[1]} />
            {/if}
          </Resizable.Pane>
          <Resizable.Handle class="h-8" />
          <Resizable.Pane>
            {#if gridItems[2]}
              <ProjectCard project={gridItems[2]} />
            {/if}
          </Resizable.Pane>
        </Resizable.PaneGroup>
      </Resizable.Pane>
    </Resizable.PaneGroup>
  </div>

  {#if gridItems.length > 1}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      {#each gridItems.slice(1) as project, index}
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