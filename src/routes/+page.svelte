<!-- routes/+page.svelte -->

<script lang="ts">
  import { onMount } from 'svelte';
  import Portfolio from "$lib/components/Portfolio.svelte";
  import Navbar from "$lib/components/Navbar.svelte";

  let projects = [];

  onMount(async () => {
    const response = await fetch('/api/projects');
    const data = await response.json();
    projects = data.projects;
  });
</script>

<Navbar />

<main class="px-24 py-8">
  <h1 class="text-6xl font-bold mb-4">SCENOGRAPHY</h1>
  <hr class="border-t-4 border-black dark:border-white w-full mb-8" />
  {#if projects.length > 0}
    <Portfolio {projects} />
  {:else}
    <p>Loading projects...</p>
  {/if}
</main>

<footer class="bg-black text-white py-12 px-24">
  <div class="flex justify-between">
    <div>
      <h2 class="text-2xl font-bold mb-4">CHRISTOPH GEHRE</h2>
      <p>Email: contact@christophgehre.com</p>
      <p>Phone: +1234567890</p>
    </div>
    <div>
      <h3 class="text-xl font-bold mb-2">Links</h3>
      <ul>
        <li><a href="/cv" class="hover:underline">CV</a></li>
        <li><a href="/contact" class="hover:underline">Contact</a></li>
        <li><a href="https://officeforworlddesign.com" class="hover:underline">Office for World Design</a></li>
      </ul>
    </div>
  </div>
</footer>