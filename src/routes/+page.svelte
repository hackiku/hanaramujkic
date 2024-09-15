<!-- routes/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import Hero from "$lib/components/Hero.svelte";
  import Portfolio from "$lib/components/Portfolio.svelte";
  import ContactForm from "$lib/components/ContactForm.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import type { Project } from '$lib/server/contentful';

  let projects: Project[] = [];
  let isLoading = true;
  let error: string | null = null;

  onMount(async () => {
    try {
      const response = await fetch('/api/portfolio');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      projects = data.projects;
    } catch (err) {
      console.error('Error fetching projects:', err);
      error = err instanceof Error ? err.message : 'An unknown error occurred';
    } finally {
      isLoading = false;
    }
  });
</script>

<div class="relative overflow-hidden">
  <Hero />
  <main class="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 py-8 relative z-10">
    <section id="work" class="mb-16">
      <hr class="border-t-2 border-black dark:border-white w-full my-8" />
      {#if isLoading}
        <p>Loading projects...</p>
      {:else if error}
        <p class="text-red-500">Error: {error}</p>
      {:else if projects.length > 0}
        <Portfolio {projects} />
      {:else}
        <p>No projects found.</p>
      {/if}
    </section>

    <section id="about" class="mb-16">
      <hr class="border-t-2 border-black dark:border-white w-full my-8" />
      <div class="flex flex-col md:flex-row gap-8 md:gap-16">
        <div class="w-full md:w-1/2 relative">
          <div class="shadow-xl w-4/5">
            <img src="hana-ramujkic.jpeg" alt="Hana Ramujkic set designer photo" class="w-full h-auto rounded-lg">
          </div>
        </div>
        <div class="w-full md:w-1/2">
          <h2 class="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6">ABOUT</h2>
          <div class="space-y-4">
            <p>Hana Ramujkić, born in Belgrade in 1995, is a talented set and costume designer with a unique background in opera singing. She combines her passion for literature, music, and visual arts in her theatrical designs, aiming to make theater relevant and accessible to younger audiences.</p>
            <p>With a diverse educational background in linguistics, literature, and music, Hana brings a multifaceted approach to her work. She views set designers as the magicians of theater, creating visual frameworks that set the tone for entire productions. Her designs are characterized by deep storytelling through visual tools and a collaborative spirit, leading her to work with renowned directors across Europe.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="mb-16">
      <ContactForm />
    </section>
  </main>
</div>