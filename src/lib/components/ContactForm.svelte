<!-- $lib/components/ContactForm.svelte -->

<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Copy } from "lucide-svelte";

  let email = "hanaramujkic1@gmail.com";
  let phone = "+49 123 123 123";

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    // You might want to add a toast notification here
  }
</script>

<div class="flex flex-col gap-4 items-center justify-center">
  <div class="flex items-center w-full">
    <Button variant="ghost" class="flex-grow text-left">
      <!-- <Mail class="opacity-30 h-12 mr-2" /> -->
      <div class="text-xl font-semibold hover:underline">
        {email}
      </div>
    </Button>
    <Button variant="ghost" size="icon" on:click={() => copyToClipboard(email)}>
      <Copy class="h-4 w-4" />
    </Button>
  </div>
  <div class="flex items-center w-full">
    <Button variant="ghost" class="flex-grow text-left">
      <!-- <Phone class="opacity-30 h-12 mr-2" /> -->
      <div class="text-xl font-semibold hover:underline">
        {phone}
      </div>
    </Button>
    <Button variant="ghost" size="icon" on:click={() => copyToClipboard(phone)}>
      <Copy class="h-4 w-4" />
    </Button>
  </div>
</div>