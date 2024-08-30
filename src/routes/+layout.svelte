<script lang="ts">
	import "../app.css";
	import Navbar from "$lib/components/Navbar.svelte";
	import Footer from "$lib/components/Footer.svelte";
  import { ModeWatcher } from "mode-watcher";
	
</script>

<ModeWatcher />

<Navbar />
<slot></slot>

<Footer />
