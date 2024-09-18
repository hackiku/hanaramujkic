<!-- routes/[slug]/+page.svelte -->
 
<!-- routes/[slug]/+page.svelte -->
 
<script lang="ts">
  import type { PageData } from './$types';
  import { onMount } from 'svelte';
  import ContactForm from '$lib/components/ContactForm.svelte';
  import * as Popover from "$lib/components/ui/popover";
  import { Button } from "$lib/components/ui/button";

  export let data: PageData;

  const { project, error } = data;

  let currentImageIndex = 0;

  // Define the fields to display and their labels
  const fieldLabels = {
    conductor: 'Musical direction',
    director: 'Directed by',
    venue: 'Theatre',
  };

  // Prepare project details
  $: projectDetails = Object.entries(fieldLabels).reduce((acc, [field, label]) => {
    if (project[field]) {
      acc.push({ label, value: project[field] });
    }
    return acc;
  }, []);

  // Check if set and costume designer are the same
  $: {
    if (project.setDesigner && project.costumeDesigner && project.setDesigner === project.costumeDesigner) {
      projectDetails.push({ label: 'Set and costume design', value: project.setDesigner });
    } else {
      if (project.setDesigner) projectDetails.push({ label: 'Set design', value: project.setDesigner });
      if (project.costumeDesigner) projectDetails.push({ label: 'Costume design', value: project.costumeDesigner });
    }
  }

  // Add photographer with opacity class
  $: if (project.photographer) {
    projectDetails.push({ label: 'Photos', value: project.photographer, class: 'opacity-60' });
  }

  function updateCurrentImage() {
    // Implementation remains the same
  }

  onMount(() => {
    const imageContainer = document.querySelector('.image-container');
    if (imageContainer) {
      imageContainer.addEventListener('scroll', updateCurrentImage);
    }
    return () => {
      if (imageContainer) {
        imageContainer.removeEventListener('scroll', updateCurrentImage);
      }
    };
  });
</script>

<div class="min-h-screen flex flex-col md:flex-row">
  {#if error}
    <div class="flex-grow flex items-center justify-center">
      <p class="text-red-500">{error}</p>
    </div>
  {:else if project}
    <!-- Left column for project details -->
    <div class="w-full md:w-1/3 p-8 flex flex-col justify-between overflow-y-auto">
      <div>
        <div class="mb-8">
          <h1 class="text-4xl font-bold mb-6">{project.title}</h1>
          {#if project.writer}
            <h3 class="text-lg opacity-60">{project.writer}</h3>
          {/if}
        </div>
        
        <div class="space-y-4">
          {#each projectDetails as detail}
            <p>
              <span class="text-sm font-light">{detail.label}</span><br>
              <span class="text-lg font-semibold {detail.class || ''}">{detail.value}</span>
            </p>
          {/each}
        </div>
      </div>
      <div class="mb-2 mt-12 md:mb-20 md:mt-4">
        <Popover.Root>
          <Popover.Trigger asChild let:builder>
            <Button builders={[builder]} variant="secondary">Contact</Button>
          </Popover.Trigger>
          <Popover.Content class="w-80">
            <ContactForm />
          </Popover.Content>
        </Popover.Root>
      </div>
    </div>

    <!-- Right column for images -->
    <div class="w-full md:w-2/3 h-screen overflow-y-scroll image-container">
      {#if project.media && project.media.length > 0}
        {#each project.media as image, index}
          <div class="mb-4">
            <img 
              src={image.url} 
              alt={image.title} 
              class="w-full h-auto project-image"
            />
          </div>
        {/each}
      {:else}
        <p class="text-center py-8">No images available</p>
      {/if}
    </div>
  {:else}
    <div class="flex-grow flex items-center justify-center">
      <p>Project not found.</p>
    </div>
  {/if}
</div>


<style>
  /* Hide scrollbar for Chrome, Safari and Opera */
  .image-container::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  .image-container {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
</style>