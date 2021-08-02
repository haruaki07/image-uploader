<script lang="ts">
  import Uploader from "./lib/Uploader.svelte";
</script>

<div class="flex items-center justify-center w-full h-full root">
  <Uploader />
</div>

<style>
  .root {
    background-color: var(--theme-bg-color);
  }
</style>
