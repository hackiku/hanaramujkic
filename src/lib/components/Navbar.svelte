<!-- $lib/components/Navbar.svelte -->

<script lang="ts">
  import { Sun, Moon } from "lucide-svelte";
  import { toggleMode } from "mode-watcher";
  import { Button } from "$lib/components/ui/button";
  import Menu from "$lib/components/Menu.svelte";
  import { onMount } from 'svelte';

  let darkMode = false;

  onMount(() => {
    const updateDarkMode = () => {
      darkMode = document.documentElement.classList.contains('dark');
    };
    updateDarkMode();
    const observer = new MutationObserver(updateDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  });
</script>

<nav class="flex justify-between items-center px-4 sm:px-8 md:px-16 lg:px-24 py-4">
  <button class="text-lg sm:text-xl font-semibold">HR</button>
  <div class="flex items-center space-x-2">
    <Button on:click={toggleMode} variant="ghost" size="icon">
      <Sun
        class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      />
      <Moon
        class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
      />
      <span class="sr-only">Toggle theme</span>
    </Button>
    <Menu {darkMode} />
  </div>
</nav>