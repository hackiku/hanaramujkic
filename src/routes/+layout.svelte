<script lang="ts">
	import "../app.css";
	import Navbar from "$lib/components/Navbar.svelte";
	import Footer from "$lib/components/Footer.svelte";
  import { ModeWatcher } from "mode-watcher";
	
</script>

<svelte:head>
  <title>Hana Ramujkic - Set and Costume Designer</title>
  <meta name="description" content="Set and costume designer with a background in literature, music, and visual arts. Making theater magically accessible to younger audiences." />
</svelte:head>

<ModeWatcher />

<Navbar />
<slot></slot>

<Footer />
