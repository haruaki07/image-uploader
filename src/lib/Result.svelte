<script>
  import Preview from "./Preview.svelte";

  export let src;

  async function copy() {
    await navigator.clipboard.writeText(src);
  }
</script>

<h2 class="title">Uploaded Successfully!</h2>

<Preview {src} />

<div class="source flex items-center w-full">
  <input type="text" readonly value={src} />
  <button on:click={copy}>Copy</button>
</div>

<style>
  .title {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 30px;
    text-align: left;
  }

  .source {
    margin-top: 30px;
  }
</style>
