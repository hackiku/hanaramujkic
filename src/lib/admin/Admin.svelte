<!-- $lib/components/Admin.svelte -->
<script lang="ts">
  import { createUploader } from "$lib/utils/uploadthing";
  import { UploadDropzone } from "@uploadthing/svelte";
  import { dndzone } from "svelte-dnd-action";
  import { Button } from "$lib/components/ui/button";

  export let projects = [];
  export let onSave: (project: any) => Promise<void>;
  export let onDelete: (id: string) => Promise<void>;

  let editingProject = null;
  const MAX_IMAGES = 9;

  const uploader = createUploader("imageUploader", {
    onClientUploadComplete: (res) => {
      if (res && editingProject) {
        editingProject.images = [...editingProject.images, ...res.map(file => file.url)];
      }
    },
    onUploadError: (error: Error) => {
      alert(`Upload Error! ${error.message}`);
    },
  });

  function startEditing(project) {
    editingProject = { ...project, images: project.images || [] };
  }

  function cancelEditing() {
    editingProject = null;
  }

  async function saveProject() {
    await onSave(editingProject);
    editingProject = null;
  }

  function handleDnd(e) {
    editingProject.images = e.detail.items;
  }

  function removeImage(index) {
    editingProject.images = editingProject.images.filter((_, i) => i !== index);
  }

  async function deleteProject(id: string) {
    if (confirm('Are you sure you want to delete this project?')) {
      await onDelete(id);
    }
  }
</script>

<div class="space-y-8">
  {#if editingProject}
    <div class="bg-white p-6 rounded-lg shadow-lg">
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
          <div use:dndzone={{items: editingProject.images}} on:consider={handleDnd} on:finalize={handleDnd} class="grid grid-cols-3 gap-2">
            {#each editingProject.images as image, index (image)}
              <div class="relative">
                <img src={image} alt={`Project image ${index + 1}`} class="w-full h-32 object-cover rounded" />
                <button type="button" on:click={() => removeImage(index)} class="absolute top-0 right-0 bg-red-500 text-white p-1 rounded">X</button>
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
          <img src={project.images[0] || '/placeholder-image.jpg'} alt={project.name} class="w-full h-48 object-cover rounded-lg mb-4" />
          <h3 class="text-xl font-semibold">{project.name}</h3>
          <p><strong>Company:</strong> {project.company}</p>
          <p><strong>Tags:</strong> {project.tags}</p>
          {#if project.color}<p><strong>Color:</strong> {project.color}</p>{/if}
          <div class="mt-4 flex justify-between">
            <Button on:click={() => startEditing(project)}>Edit</Button>
            <Button on:click={() => deleteProject(project.id)} variant="destructive">Delete</Button>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>