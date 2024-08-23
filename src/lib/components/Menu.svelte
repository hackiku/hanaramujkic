<!-- $lib/components/Menu.svelte -->

<script lang="ts">
  import { fly } from 'svelte/transition';
  import { Menu } from 'lucide-svelte';
  import { Button } from "$lib/components/ui/button";

  let isOpen = false;

  const menuItems = [
    { label: 'Scenography', href: '/' },
    { label: 'CV', href: '/cv' },
    { label: 'Contact', href: '/contact' },
    { label: 'Office for World Design', href: 'https://officeforworlddesign.com' }
  ];

  function toggleMenu() {
    isOpen = !isOpen;
  }
</script>

<Button on:click={toggleMenu} variant="ghost" size="icon" class="relative z-50">
  <Menu class="h-6 w-6" />
</Button>

{#if isOpen}
  <div
    class="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-40"
    transition:fly="{{ y: -100, duration: 300 }}"
  >
    <nav>
      <ul class="text-white text-4xl md:text-6xl space-y-8">
        {#each menuItems as item}
          <li>
            <a
              href={item.href}
              class="relative overflow-hidden block"
              on:click={() => isOpen = false}
            >
              <span class="block transition-transform duration-300 hover:translate-y-[-100%]">
                {item.label}
              </span>
              <span class="absolute inset-0 flex items-center justify-center transition-transform duration-300 translate-y-full hover:translate-y-0">
                {item.label}
              </span>
            </a>
          </li>
        {/each}
      </ul>
    </nav>
  </div>
{/if}