<!-- $lib/admin/Admin.svelte -->

<script lang="ts">
  import { onMount } from 'svelte';
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { Textarea } from "$lib/components/ui/textarea";

  let projectData = {
    name: '',
    company: '',
    tags: '',
    color: '',
    image: null as File | null
  };

  let imagePreview: string | null = null;
  let projects = [];

  onMount(async () => {
    const response = await fetch('/api/projects');
    const data = await response.json();
    projects = data.projects;
  });

  function handleImageUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      projectData.image = input.files[0];
      imagePreview = URL.createObjectURL(input.files[0]);
    }
  }

  async function handleSubmit() {
    const formData = new FormData();
    formData.append('name', projectData.name);
    formData.append('company', projectData.company);
    formData.append('tags', projectData.tags);
    formData.append('color', projectData.color);
    if (projectData.image) {
      formData.append('image', projectData.image);
    }

    const response = await fetch('/api/projects', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      const result = await response.json();
      projects = [...projects, result.project];
      // Reset form after successful submission
      projectData = { name: '', company: '', tags: '', color: '', image: null };
      imagePreview = null;
    } else {
      console.error('Failed to save project');
    }
  }
</script>


<div class="container mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold mb-8">Add New Project</h1>
  
  <div class="flex flex-col md:flex-row gap-8">
    <div class="w-full md:w-1/2">
      <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
        {#if imagePreview}
          <img src={imagePreview} alt="Project preview" class="max-w-full h-auto mb-4" />
        {:else}
          <p class="text-gray-500 mb-4">No image uploaded</p>
        {/if}
        <Label for="image-upload" class="cursor-pointer">
          <Input 
            id="image-upload" 
            type="file" 
            accept="image/*" 
            on:change={handleImageUpload} 
            class="hidden" 
          />
          <span class="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded">
            {imagePreview ? 'Change Image' : 'Upload Image'}
          </span>
        </Label>
      </div>
    </div>
    
    <div class="w-full md:w-1/2">
      <form on:submit|preventDefault={handleSubmit} class="space-y-4">
        <div>
          <Label for="project-name">Project Name</Label>
          <Input id="project-name" bind:value={projectData.name} required />
        </div>
        
        <div>
          <Label for="company">Company</Label>
          <Input id="company" bind:value={projectData.company} required />
        </div>
        
        <div>
          <Label for="tags">Tags (comma-separated)</Label>
          <Input id="tags" bind:value={projectData.tags} placeholder="e.g. Stage Design, Lighting" />
        </div>
        
        <div>
          <Label for="color">Color (Tailwind class)</Label>
          <Input id="color" bind:value={projectData.color} placeholder="e.g. bg-red-500" />
        </div>
        
        <Button type="submit" class="w-full">Save Project</Button>
      </form>
    </div>
  </div>
</div>