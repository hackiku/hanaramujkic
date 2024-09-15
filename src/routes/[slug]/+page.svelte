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

  function updateCurrentImage() {
    const images = document.querySelectorAll('.project-image');
    const windowHeight = window.innerHeight;
    let closestImage = images[0];
    let closestDistance = Infinity;

    images.forEach((img, index) => {
      const rect = img.getBoundingClientRect();
      const distance = Math.abs(rect.top + rect.height / 2 - windowHeight / 2);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestImage = img;
        currentImageIndex = index;
      }
    });
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
        <h1 class="text-4xl font-bold mb-6">{project.title}</h1>
        <div class="space-y-4">
          <p>
            <span class="text-sm font-light">Musical direction</span><br>
            <span class="text-lg font-semibold">{project.conductor || 'Not specified'}</span>
          </p>
          <p>
            <span class="text-sm font-light">Directed by</span><br>
            <span class="text-lg font-semibold">{project.director || 'Not specified'}</span>
          </p>
          <p>
            <span class="text-sm font-light">Set design</span><br>
            <span class="text-lg font-semibold">{project.setDesigner || 'Not specified'}</span>
          </p>
          <p>
            <span class="text-sm font-light">Costume design</span><br>
            <span class="text-lg font-semibold">{project.costumeDesigner || 'Not specified'}</span>
          </p>
          <p>
            <span class="text-sm font-light">Theatre</span><br>
            <span class="text-lg font-semibold">{project.venue || 'Not specified'}</span>
          </p>
          <p>
            <span class="text-sm font-light">Photos</span><br>
            <span class="text-lg font-semibold">{project.photographer || 'Not specified'}</span>
          </p>
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