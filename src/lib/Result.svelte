<script>
  import { scale } from "svelte/transition";
  import { getHostname } from "../utils";

  import Preview from "./Preview.svelte";

  export let src;
  export let fileName;

  let copied = false;

  $: apiPath = `${getHostname()}/api/${fileName}`;

  async function copy() {
    await navigator.clipboard.writeText(apiPath);
    copied = true;
    await new Promise((r) => setTimeout(r, 2000)); //sleep 2 sec
    copied = false;
  }
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="273.566 55.086 134.216 134.216"
  width="56"
  height="56"
  class="w-full checkmark"
  in:scale
>
  <path
    d="M 340.674 55.086 C 303.63 55.086 273.566 85.15 273.566 122.194 C 273.566 159.237 303.63 189.302 340.674 189.302 C 377.718 189.302 407.782 159.237 407.782 122.194 C 407.782 85.15 377.718 55.086 340.674 55.086 Z M 322.488 150.983 L 298.396 126.891 C 295.779 124.274 295.779 120.046 298.396 117.429 C 301.013 114.812 305.241 114.812 307.858 117.429 L 327.252 136.756 L 373.423 90.586 C 376.04 87.969 380.268 87.969 382.885 90.586 C 385.502 93.203 385.502 97.431 382.885 100.048 L 331.95 150.983 C 329.4 153.6 325.105 153.6 322.488 150.983 Z"
    stroke-width="1"
    style="fill: rgb(33, 150, 83);"
  />
</svg>
<h2 class="title mt-4">Uploaded Successfully!</h2>

<Preview {src} />

<div class="source flex items-center w-full">
  <input type="text" readonly value={apiPath} />
  <button class="btn" on:click={copy}>
    {#if copied}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1rem"
        height="1rem"
        viewBox="0 0 256 256"
        ><rect width="256" height="256" fill="none" /><polyline
          points="216 72.005 104 184 48 128.005"
          fill="none"
          stroke="#FFFFFF"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="24"
        /></svg
      >
      &nbsp; Copied
    {:else}
      Copy
    {/if}
  </button>
</div>

<style>
  .title {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 30px;
    text-align: center;
  }

  .checkmark path {
    margin: 0 auto;
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
    display: flex;
    align-items: center;
  }
</style>
