<!-- $lib/components/ContactForm.svelte -->

<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Copy, Mail, Phone } from "lucide-svelte";

  interface ContactFormProps {
    textSize?: string;
  }

  export let textSize: ContactFormProps['textSize'] = 'text-sm';

  let email = "hanaramujkic1@gmail.com";
  let phone = "+43 677 64 3151 64";

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    // TODO: Implement toast notification
  }

  function getWhatsAppLink(phoneNumber: string) {
    return `https://wa.me/${phoneNumber.replace(/\s+/g, '')}`;
  }
</script>

<div class="flex flex-col gap-2 w-full">
  <div class="flex items-center w-full">
    <a href="mailto:{email}" class="flex-grow">
      <Button variant="ghost" class="w-full justify-start py-2 px-3 hover:bg-gray-100 dark:hover:bg-gray-800">
        <Mail class="h-4 w-4 mr-2 opacity-70" />
        <span class="{textSize} font-medium text-left truncate">{email}</span>
      </Button>
    </a>
    <Button variant="ghost" size="sm" class="ml-1 p-1" on:click={() => copyToClipboard(email)}>
      <Copy class="h-4 w-4" />
    </Button>
  </div>
  <div class="flex items-center w-full">
    <a href={getWhatsAppLink(phone)} target="_blank" rel="noopener noreferrer" class="flex-grow">
      <Button variant="ghost" class="w-full justify-start py-2 px-3 hover:bg-gray-100 dark:hover:bg-gray-800">
        <Phone class="h-4 w-4 mr-2 opacity-70" />
        <span class="{textSize} font-medium text-left truncate">{phone}</span>
      </Button>
    </a>
    <Button variant="ghost" size="sm" class="ml-1 p-1" on:click={() => copyToClipboard(phone)}>
      <Copy class="h-4 w-4" />
    </Button>
  </div>
</div>