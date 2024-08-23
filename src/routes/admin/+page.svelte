<!-- routes/admin/+page.svelte -->

<script lang="ts">
  import Admin from '$lib/admin/Admin.svelte'
	import { Sun, Moon } from "lucide-svelte";
  import { toggleMode } from "mode-watcher";
  import { Button } from "$lib/components/ui/button";
  import Menu from "$lib/components/Menu.svelte";
</script>

<nav class="flex justify-between items-center px-24 py-4">
  <button class="text-xl font-semibold">HR</button>
  <div class="flex items-center space-x-2">
    <Button on:click={toggleMode} variant="outline" size="icon">
      <Sun
        class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      />
      <Moon
        class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
      />
      <span class="sr-only">Toggle theme</span>
    </Button>
    <Menu />
  </div>
</nav>


<Admin />
