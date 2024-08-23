<!-- /contact -->

<script>
  import { onMount } from 'svelte';
  import Portfolio from "$lib/components/Portfolio.svelte";

  let projects = [];
  let loading = true;
  let error = null;

  onMount(async () => {
    try {
      const response = await fetch('/api/projects');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      projects = data.projects;
    } catch (e) {
      console.error("Failed to fetch projects:", e);
      error = e.message;
    } finally {
      loading = false;
    }
  });
</script>

<h1>Contact Page</h1>

<h2>Portfolio</h2>
{#if loading}
  <p>Loading projects...</p>
{:else if error}
  <p>Error loading projects: {error}</p>
{:else if projects.length === 0}
  <p>No projects found.</p>
{:else}
  <Portfolio {projects} />
{/if}

<pre>
  Debug info:
  Number of projects: {projects.length}
  Projects data: {JSON.stringify(projects, null, 2)}
</pre>