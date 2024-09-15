<!-- $lib/components/Footer.svelte -->
<script lang="ts">
  import type { Project } from '$lib/server/contentful';

  export let projects: Project[] = [];
</script>

<footer class="bg-black text-white py-12 px-4 sm:px-8 md:px-16 lg:px-24">
  <div class="container mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h2 class="text-2xl font-bold mb-4">HANA RAMUJKIC</h2>
        <p class="mb-2">Email: hana@hanaramujkic.com</p>
        <p>Phone: +43 123 456 78</p>
      </div>
      <div>
        <h3 class="text-xl font-bold mb-4">Links</h3>
        <ul class="space-y-2">
          <li><a href="/" class="hover:underline">Home</a></li>
          <li><a href="/cv" class="hover:underline">CV</a></li>
          <li><a href="/contact" class="hover:underline">Contact</a></li>
        </ul>
      </div>
      <div>
        <h3 class="text-xl font-bold mb-4">Recent Projects</h3>
        <ul class="space-y-2">
          {#each projects.slice(0, 5) as project}
            <li>
              <a href="/{project.slug}" class="hover:underline">{project.title}</a>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </div>
</footer>