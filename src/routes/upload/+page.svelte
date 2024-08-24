<!-- routes/upload/ -->

<script lang="ts">
  import { createUploader } from "$lib/utils/uploadthing";
  import { Uploader, UploadButton, UploadDropzone } from "@uploadthing/svelte";

  let uploadedFiles: { name: string; url: string }[] = [];

  const uploader = createUploader("imageUploader", {
    onClientUploadComplete: (res) => {
      console.log("Upload Completed", res);
      if (res) {
        uploadedFiles = [
          ...uploadedFiles,
          ...res.map(file => ({ name: file.name, url: file.url }))
        ];
      }
      alert("Upload Completed");
    },
    onUploadError: (error: Error) => {
      alert(`Upload Error! ${error.message}`);
    },
  });
</script>

<main class="container mx-auto p-4">
  <h1 class="text-2xl font-bold mb-4">File Uploader</h1>

  <div class="mb-8">
    <h2 class="text-xl font-semibold mb-2">Upload with Uploader Component</h2>
    <Uploader {uploader} />
  </div>

  <div class="mb-8">
    <h2 class="text-xl font-semibold mb-2">Upload with Button</h2>
    <UploadButton {uploader} />
  </div>

  <div class="mb-8">
    <h2 class="text-xl font-semibold mb-2">Upload with Dropzone</h2>
    <UploadDropzone {uploader} />
  </div>

  <div>
    <h2 class="text-xl font-semibold mb-2">Uploaded Files</h2>
    <div class="grid grid-cols-3 gap-4">
      {#each uploadedFiles as file}
        <div class="border p-2 rounded">
          <img src={file.url} alt={file.name} class="w-full h-32 object-cover mb-2" />
          <p class="text-sm truncate">{file.name}</p>
        </div>
      {/each}
    </div>
  </div>
</main>