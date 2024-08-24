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

<Resizable.PaneGroup class="w-full min-h-[600px] rounded-lg border">
  <Resizable.Pane defaultSize={66} minSize={20}>
    {#if gridItems[0]}
      <ProjectCard project={gridItems[0]} />
    {/if}
  </Resizable.Pane>
  <Resizable.Handle />
  <Resizable.Pane>
    <Resizable.PaneGroup direction="vertical">
      <Resizable.Pane defaultSize={50} minSize={20}>
        {#if gridItems[1]}
          <ProjectCard project={gridItems[1]} />
        {/if}
      </Resizable.Pane>
      <Resizable.Handle />
      <Resizable.Pane>
        {#if gridItems[2]}
          <ProjectCard project={gridItems[2]} />
        {/if}
      </Resizable.Pane>
    </Resizable.PaneGroup>
  </Resizable.Pane>
</Resizable.PaneGroup>

{#if gridItems.length > 3}
  <Resizable.PaneGroup class="w-full min-h-[400px] mt-4 rounded-lg border">
    {#each gridItems.slice(3) as project, index}
      <Resizable.Pane minSize={20}>
        <ProjectCard {project} />
      </Resizable.Pane>
      {#if index < gridItems.slice(3).length - 1}
        <Resizable.Handle />
      {/if}
    {/each}
  </Resizable.PaneGroup>
{/if}

{#if visibleProjects < projects.length}
  <div class="mt-8 text-center">
    <Button on:click={showMore} variant="outline">
      Load More
    </Button>
  </div>
{/if}