<script>
  import { getHostname } from "../utils";

  import Preview from "./Preview.svelte";

  export let src;
  export let fileName;

  $: apiPath = `${getHostname()}/api/${fileName}`;

  async function copy() {
    await navigator.clipboard.writeText(apiPath);
  }
</script>

<h2 class="title">Uploaded Successfully!</h2>

<Preview {src} />

<div class="source flex items-center w-full">
  <input type="text" readonly value={apiPath} />
  <button class="btn" on:click={copy}>Copy</button>
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
    position: relative;
  }

  .source input {
    width: 100%;
    border-radius: var(--theme-border-radius-md);
    border: var(--theme-border);
    outline: none;
    padding: 8px 72px 8px 10px;
  }

  .source button {
    position: absolute;
    top: 2px;
    right: 2px;
    font-size: 12px;
  }
</style>
