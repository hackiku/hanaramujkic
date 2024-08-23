<script lang="ts">
  import { onMount } from 'svelte';
  
  let projects = [];
  let newProject = {
    name: '',
    company: '',
    tags: '',
    color: '',
    image: ''
  };

  onMount(async () => {
    await fetchProjects();
  });

  async function fetchProjects() {
    const response = await fetch('/api/projects');
    const data = await response.json();
    projects = data.projects;
  }

  async function handleSubmit() {
    const response = await fetch('/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...newProject,
        tags: newProject.tags.split(',').map(tag => tag.trim())
      })
    });

    if (response.ok) {
      await fetchProjects();
      newProject = { name: '', company: '', tags: '', color: '', image: '' };
    } else {
      console.error('Failed to add project');
    }
  }
</script>

<h1 class="text-2xl font-bold mb-4">API Test Page</h1>

<h2 class="text-xl font-semibold mb-2">Current Projects</h2>
<ul class="mb-4">
  {#each projects as project}
    <li class="mb-2">
      <strong>{project.name}</strong> - {project.company}
      <br>
      Tags: {project.tags.join(', ')}
    </li>
  {/each}
</ul>

<h2 class="text-xl font-semibold mb-2">Add New Project</h2>
<form on:submit|preventDefault={handleSubmit} class="space-y-2">
  <input bind:value={newProject.name} placeholder="Project Name" class="w-full p-2 border rounded" required>
  <input bind:value={newProject.company} placeholder="Company" class="w-full p-2 border rounded" required>
  <input bind:value={newProject.tags} placeholder="Tags (comma-separated)" class="w-full p-2 border rounded" required>
  <input bind:value={newProject.color} placeholder="Color (e.g., bg-blue-500)" class="w-full p-2 border rounded" required>
  <input bind:value={newProject.image} placeholder="Image URL" class="w-full p-2 border rounded" required>
  <button type="submit" class="w-full p-2 bg-blue-500 text-white rounded">Add Project</button>
</form>