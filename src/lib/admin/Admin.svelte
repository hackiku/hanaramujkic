<!-- $lib/admin/Admin.svelte -->

<script lang="ts">
  import { onMount } from 'svelte';
  import { Button } from "$lib/components/ui/button";
  
  let projects = [];
  let newProject = {
    name: '',
    company: '',
    tags: '',
    color: '',
    image: null as File | null
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
    const formData = new FormData();
    formData.append('name', newProject.name);
    formData.append('company', newProject.company);
    formData.append('tags', newProject.tags);
    formData.append('color', newProject.color);
    if (newProject.image) {
      formData.append('image', newProject.image);
    }

    const response = await fetch('/api/projects', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      await fetchProjects();
      newProject = { name: '', company: '', tags: '', color: '', image: null };
    } else {
      console.error('Failed to add project');
    }
  }

  function handleFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      newProject.image = target.files[0];
    }
  }
</script>

<div class="container mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold mb-8">Admin Dashboard</h1>

  <div class="mb-12">
    <h2 class="text-2xl font-semibold mb-4">Add New Project</h2>
    <form on:submit|preventDefault={handleSubmit} class="space-y-4">
      <div>
        <label for="name" class="block mb-1">Project Name</label>
        <input id="name" bind:value={newProject.name} placeholder="Project Name" class="w-full p-2 border rounded" required>
      </div>
      <div>
        <label for="company" class="block mb-1">Company</label>
        <input id="company" bind:value={newProject.company} placeholder="Company" class="w-full p-2 border rounded" required>
      </div>
      <div>
        <label for="tags" class="block mb-1">Tags (comma-separated)</label>
        <input id="tags" bind:value={newProject.tags} placeholder="Tags (comma-separated)" class="w-full p-2 border rounded" required>
      </div>
      <div>
        <label for="color" class="block mb-1">Color (e.g., bg-blue-500)</label>
        <input id="color" bind:value={newProject.color} placeholder="Color (e.g., bg-blue-500)" class="w-full p-2 border rounded" required>
      </div>
      <div>
        <label for="image" class="block mb-1">Image</label>
        <input type="file" id="image" on:change={handleFileChange} accept="image/*" class="w-full p-2 border rounded" required>
      </div>
      <Button type="submit" class="w-full">Add Project</Button>
    </form>
  </div>

  <div>
    <h2 class="text-2xl font-semibold mb-4">Current Projects</h2>
    <ul class="space-y-4">
      {#each projects as project}
        <li class="border p-4 rounded">
          <h3 class="text-xl font-semibold">{project.name}</h3>
          <p><strong>Company:</strong> {project.company}</p>
          <p><strong>Tags:</strong> {project.tags.join(', ')}</p>
          <p><strong>Color:</strong> {project.color}</p>
          <img src={project.image} alt={project.name} class="mt-2 max-w-full h-auto" />
        </li>
      {/each}
    </ul>
  </div>
</div>