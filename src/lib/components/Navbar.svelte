<!-- $lib/components/Navbar.svelte -->
<script lang="ts">
  import { Sun, Moon, Download } from "lucide-svelte";
  import { toggleMode } from "mode-watcher";
  import { Button } from "$lib/components/ui/button";
  import * as Popover from "$lib/components/ui/popover";
  import Menu from "$lib/components/Menu.svelte";
  import ContactForm from '$lib/components/ContactForm.svelte';
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
  <a class="text-lg sm:text-2xl text-start font-semibold" href="/">
    Hana Ramujkic
  </a>
  
  <div class="hidden md:flex items-center space-x-6">
    <a href="./#work" class="text-lg font-light hover:underline">Work</a>
    <a href="./#about" class="text-lg font-light hover:underline">About</a>
    <Popover.Root>
      <Popover.Trigger asChild let:builder>
        <Button builders={[builder]} variant="link" class="text-lg font-light hover:underline p-0">Contact</Button>
      </Popover.Trigger>
      <Popover.Content class="w-80">
        <ContactForm />
      </Popover.Content>
    </Popover.Root>
  </div>
  
  <div class="flex items-center space-x-2 md:space-x-4">
    <Button variant="secondary" size="sm" class="flex items-center gap-2">
      <Download size={16} />
      CV
    </Button>
    <Button on:click={toggleMode} variant="ghost" size="icon" class="h-8 w-8">
      <Sun
        class="h-[1rem] w-[1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      />
      <Moon
        class="absolute h-[1rem] w-[1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
      />
      <span class="sr-only">Toggle theme</span>
    </Button>
    <div class="md:hidden">
      <Menu {darkMode} />
    </div>
  </div>
</nav>