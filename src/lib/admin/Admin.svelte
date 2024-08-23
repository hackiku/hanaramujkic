<!-- $lib/admin/Admin.svelte -->

<script lang="ts">
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

  function handleImageUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      projectData.image = input.files[0];
      imagePreview = URL.createObjectURL(input.files[0]);
    }
  }

  function handleSubmit() {
    // Here you would typically send the data to your backend
    console.log('Submitting project data:', projectData);
    // Reset form after submission
    projectData = { name: '', company: '', tags: '', color: '', image: null };
    imagePreview = null;
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