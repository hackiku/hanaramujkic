<!-- $lib/components/Footer.svelte -->

<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { Download } from "lucide-svelte";
	import * as Popover from "$lib/components/ui/popover";
	import ContactForm from "$lib/components/ContactForm.svelte";
</script>

<footer
	class="flex justify-between items-center px-4 sm:px-8 md:px-16 lg:px-24 py-4"
>
	<a class="text-lg sm:text-2xl text-start font-semibold" href="/">
		© Hana Ramujkic 2024
	</a>

	<div class="flex items-center gap-6">
		<a href="./#work" class="text-lg font-light hover:underline">Work</a>
		<a href="./#about" class="text-lg font-light hover:underline">About</a>
		<Popover.Root>
			<Popover.Trigger asChild let:builder>
				<Button builders={[builder]} variant="link" class="text-lg font-light hover:underline p-0 h-auto">Contact</Button>
			</Popover.Trigger>
			<Popover.Content class="w-80">
				<ContactForm />
			</Popover.Content>
		</Popover.Root>
	</div>
	
	<div class="flex gap-6">
		<a href="./Hana_Ramujkic_Biography_eng2024.pdf" target="_blank" rel="noopener noreferrer">
			<Button variant="secondary" size="sm" class="flex items-center gap-2">
				<Download size={16} />
				CV
			</Button>
		</a>
	</div>
</footer>