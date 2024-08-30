<script lang="ts">
	import "../app.css";
	import Footer from "$lib/components/Footer.svelte";
  import { ModeWatcher } from "mode-watcher";
	
</script>

<ModeWatcher />

<slot></slot>

<Footer />
