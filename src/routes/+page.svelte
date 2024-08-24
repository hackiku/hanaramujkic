<!-- routes/+page.svelte -->

<script lang="ts">
  import { onMount } from 'svelte';
  import Portfolio from "$lib/components/Portfolio.svelte";
  import Navbar from "$lib/components/Navbar.svelte";
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

<Navbar />

<main class="px-4 sm:px-8 md:px-16 lg:px-24 py-8">
  <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">SCENOGRAPHY</h1>
  <hr class="border-t-2 border-black dark:border-white w-full mb-8" />
  {#if isLoading}
    <p>Loading projects...</p>
  {:else if error}
    <p class="text-red-500">Error: {error}</p>
  {:else if projects.length > 0}
    <Portfolio {projects} />
  {:else}
    <p>No projects found.</p>
  {/if}
</main>

<footer class="bg-black text-white py-8 sm:py-12 px-4 sm:px-8 md:px-16 lg:px-24">
  <div class="flex flex-col sm:flex-row justify-between space-y-6 sm:space-y-0">
    <div>
      <h2 class="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">HANA RAMUJKIC</h2>
      <p class="text-sm sm:text-base">Email: hana@hanaramujkic.com</p>
      <p class="text-sm sm:text-base">Phone: +43 123 456 78</p>
    </div>
    <div>
      <h3 class="text-lg sm:text-xl font-bold mb-2">Links</h3>
      <ul class="space-y-1">
        <li><a href="/cv" class="text-sm sm:text-base hover:underline">CV</a></li>
        <li><a href="/contact" class="text-sm sm:text-base hover:underline">Contact</a></li>
        <li><a href="/admin" class="text-sm sm:text-base hover:underline">Admin</a></li>
      </ul>
    </div>
  </div>
</footer>