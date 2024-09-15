<!-- $lib/components/Menu.svelte -->

<script lang="ts">
  import { fly } from 'svelte/transition';
  import { cubicInOut } from 'svelte/easing';
  import { Menu as MenuIcon, X, Download } from 'lucide-svelte';
  import { Button } from "$lib/components/ui/button";

  export let darkMode = false;
  export let navItems = [];

  let isOpen = false;

  function toggleMenu() {
    isOpen = !isOpen;
  }

  function closeMenu() {
    isOpen = false;
  }
</script>

<div class="relative z-50">
  <Button 
    on:click={toggleMenu} 
    variant="ghost" 
    size="icon" 
    class="relative z-50 {isOpen ? (darkMode ? 'text-black' : 'text-white') : 'text-current'}"
  >
    {#if isOpen}
      <X class="h-6 w-6" />
    {:else}
      <MenuIcon class="h-6 w-6" />
    {/if}
  </Button>

  {#if isOpen}
    <div class="fixed inset-0 z-40" transition:fly="{{ opacity: 0, duration: 300 }}">
      <div 
        class="absolute inset-0 bg-gray-700 bg-opacity-70"
        on:click={closeMenu}
      ></div>
      
      <div
        class="absolute inset-y-0 right-0 w-64 {darkMode ? 'bg-white text-black' : 'bg-black text-white'} flex items-center justify-center"
        transition:fly="{{ x: '100%', duration: 300, easing: cubicInOut }}"
      >
        <nav class="w-full px-8">
          <ul class="text-2xl space-y-6">
            {#each navItems as item}
              <li class="w-full">
                <a
                  href={item.href}
                  class="relative overflow-hidden block p-2 w-full"
                  on:click={closeMenu}
                >
                  <span class="block transition-transform duration-300 hover:translate-y-[-100%]">
                    {item.label}
                  </span>
                  <span class="absolute inset-0 flex items-center justify-center {darkMode ? 'bg-black text-white' : 'bg-white text-black'} transition-transform duration-300 translate-y-full hover:translate-y-0 w-full">
                    {item.label}
                  </span>
                </a>
              </li>
            {/each}
          </ul>
          <Button variant="secondary" size="sm" class="mt-6 w-full flex items-center justify-center gap-2">
            <Download size={16} />
            Download CV
          </Button>
        </nav>
      </div>
    </div>
  {/if}
</div>