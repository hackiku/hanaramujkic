<!-- src/routes/admin/+page.svelte -->

<script lang="ts">
  import { onMount } from 'svelte';
  import { createUploader } from "$lib/utils/uploadthing";
  import { UploadDropzone } from "@uploadthing/svelte";
  import { Button } from "$lib/components/ui/button";
  import { dndzone } from "svelte-dnd-action";
  import Navbar from '$lib/components/Navbar.svelte';

  // Import the local data
  import portfolioData from '$lib/data/portfolio-data.json';

  let projects = [];
  let editingProject = null;
  let newProject = {
    name: '',
    company: '',
    tags: '',
    color: '',
    images: []
  };
  let isLoading = true;
  let error = null;
  const MAX_IMAGES = 9;

  onMount(() => {
    loadProjects();
  });

  function loadProjects() {
    isLoading = true;
    error = null;
    try {
      projects = portfolioData.projects.map(project => ({
        ...project,
        tags: project.tags.join(', '),
        images: project.image ? [project.image] : []
      }));
    } catch (err) {
      console.error('Error loading projects:', err);
      error = 'Failed to load projects. Please try again later.';
      projects = [];
    } finally {
      isLoading = false;
    }
  }

  const uploader = createUploader("imageUploader", {
    onClientUploadComplete: (res) => {
      if (res) {
        if (editingProject) {
          editingProject.images = [...editingProject.images, ...res.map(file => file.url)];
        } else {
          newProject.images = [...newProject.images, ...res.map(file => file.url)];
        }
      }
    },
    onUploadError: (error: Error) => {
      alert(`Upload Error! ${error.message}`);
    },
  });

  function addNewProject() {
    const newId = Date.now().toString();
    const projectToAdd = {
      id: newId,
      ...newProject,
      tags: newProject.tags.split(',').map(tag => tag.trim()),
      image: newProject.images[0] || ''
    };
    projects = [...projects, projectToAdd];
    newProject = { name: '', company: '', tags: '', color: '', images: [] };
  }

  function startEditing(project) {
    editingProject = { 
      ...project, 
      tags: project.tags.join(', '),
      images: project.image ? [project.image] : []
    };
  }

  function cancelEditing() {
    editingProject = null;
  }

  function saveProject() {
    const index = projects.findIndex(p => p.id === editingProject.id);
    if (index !== -1) {
      projects[index] = {
        ...editingProject,
        tags: editingProject.tags.split(',').map(tag => tag.trim()),
        image: editingProject.images[0] || ''
      };
      projects = [...projects];
    }
    editingProject = null;
  }

  function deleteProject(id: string) {
    if (confirm('Are you sure you want to delete this project?')) {
      projects = projects.filter(p => p.id !== id);
    }
  }

  function handleDnd(e, target) {
    target.images = e.detail.items;
  }

  function removeImage(index, target) {
    target.images = target.images.filter((_, i) => i !== index);
  }
</script>

<!-- The rest of the HTML remains the same as in the previous version -->

<Navbar />

<div class="container mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold mb-8">Admin Dashboard</h1>

  {#if isLoading}
    <p>Loading projects...</p>
  {:else if error}
    <p class="text-red-500">{error}</p>
    <Button on:click={loadProjects}>Try Again</Button>
  {:else}
    <div class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Add New Project</h2>
      <form on:submit|preventDefault={addNewProject} class="space-y-4">
        <div>
          <label for="newName" class="block mb-1">Project Name</label>
          <input id="newName" bind:value={newProject.name} class="w-full p-2 border rounded" required>
        </div>
        <div>
          <label for="newCompany" class="block mb-1">Company</label>
          <input id="newCompany" bind:value={newProject.company} class="w-full p-2 border rounded" required>
        </div>
        <div>
          <label for="newTags" class="block mb-1">Tags (comma-separated)</label>
          <input id="newTags" bind:value={newProject.tags} class="w-full p-2 border rounded" required>
        </div>
        <div>
          <label for="newColor" class="block mb-1">Color (optional, e.g., bg-blue-500)</label>
          <input id="newColor" bind:value={newProject.color} class="w-full p-2 border rounded">
        </div>
        <div>
          <label class="block mb-1">Images</label>
          <UploadDropzone {uploader} class="w-full h-32 border-2 border-dashed rounded flex items-center justify-center" />
          <div class="grid grid-cols-3 gap-2 mt-2">
            {#each newProject.images as image}
              <img src={image} alt="New project image" class="w-full h-24 object-cover rounded" />
            {/each}
          </div>
        </div>
        <Button type="submit">Add Project</Button>
      </form>
    </div>

    {#if editingProject}
      <div class="mb-12 bg-white p-6 rounded-lg shadow-lg">
        <h2 class="text-2xl font-semibold mb-4">Edit Project: {editingProject.name}</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <img src={editingProject.images[0] || '/placeholder-image.jpg'} alt="Main project image" class="w-full h-64 object-cover rounded-lg mb-4">
            <form on:submit|preventDefault={saveProject} class="space-y-4">
              <div>
                <label for="name" class="block mb-1">Project Name</label>
                <input id="name" bind:value={editingProject.name} class="w-full p-2 border rounded" required>
              </div>
              <div>
                <label for="company" class="block mb-1">Company</label>
                <input id="company" bind:value={editingProject.company} class="w-full p-2 border rounded" required>
              </div>
              <div>
                <label for="tags" class="block mb-1">Tags (comma-separated)</label>
                <input id="tags" bind:value={editingProject.tags} class="w-full p-2 border rounded" required>
              </div>
              <div>
                <label for="color" class="block mb-1">Color (optional, e.g., bg-blue-500)</label>
                <input id="color" bind:value={editingProject.color} class="w-full p-2 border rounded">
              </div>
              <div class="flex space-x-2">
                <Button type="submit">Save Changes</Button>
                <Button type="button" on:click={cancelEditing}>Cancel</Button>
              </div>
            </form>
          </div>
          <div>
            <h3 class="text-xl font-semibold mb-2">Project Images</h3>
            <div use:dndzone={{items: editingProject.images}} on:consider={(e) => handleDnd(e, editingProject)} on:finalize={(e) => handleDnd(e, editingProject)} class="grid grid-cols-3 gap-2">
              {#each editingProject.images as image, index (image)}
                <div class="relative">
                  <img src={image} alt={`Project image ${index + 1}`} class="w-full h-32 object-cover rounded" />
                  <button type="button" on:click={() => removeImage(index, editingProject)} class="absolute top-0 right-0 bg-red-500 text-white p-1 rounded">X</button>
                </div>
              {/each}
              {#if editingProject.images.length < MAX_IMAGES}
                <UploadDropzone {uploader} class="w-full h-32 border-2 border-dashed rounded flex items-center justify-center" />
              {/if}
            </div>
          </div>
        </div>
      </div>
    {/if}

    <div>
      <h2 class="text-2xl font-semibold mb-4">Current Projects</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each projects as project (project.id)}
          <div class="bg-white p-4 rounded-lg shadow">
            <img src={project.images[0] || project.image || '/placeholder-image.jpg'} alt={project.name} class="w-full h-48 object-cover rounded-lg mb-4" />
            <h3 class="text-xl font-semibold">{project.name}</h3>
            <p><strong>Company:</strong> {project.company}</p>
            <p><strong>Tags:</strong> {Array.isArray(project.tags) ? project.tags.join(', ') : project.tags}</p>
            {#if project.color}<p><strong>Color:</strong> {project.color}</p>{/if}
            <div class="mt-4 flex justify-between">
              <Button on:click={() => startEditing(project)}>Edit</Button>
              <Button on:click={() => deleteProject(project.id)} variant="destructive">Delete</Button>
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>