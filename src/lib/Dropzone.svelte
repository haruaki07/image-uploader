<script lang="ts">
  import { allowedImgType } from "../utils";
  import { createEventDispatcher, onMount } from "svelte";
  import dropzoneBg from "../assets/image.svg";

  let dropzone: HTMLDivElement;

  const dispatch = createEventDispatcher();

  onMount(() => {
    ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
      dropzone.addEventListener(eventName, preventDefaults, false);
    });

    dropzone.addEventListener("drop", handleDrop, false);

    return () => {
      dropzone.removeEventListener("drop", handleDrop, false);
    };
  });

  function preventDefaults(e: Event) {
    e.preventDefault();
    e.stopPropagation();
  }

  function handleDrop(e: DragEvent) {
    let dt = e.dataTransfer;
    let files = dt.files;

    if (allowedImgType.includes(files[0].type)) {
      dispatch("dropped", { files });
    }
  }
</script>

<div class="dropzone flex items-center justify-center" bind:this={dropzone}>
  <img src={dropzoneBg} alt="placeholder" draggable="false" />
  <p class="text">Drag & Drop your image here</p>
</div>

<style>
  .dropzone {
    margin: var(--theme-spacing) 0;
    width: 100%;
    height: 220px;
    background: #f6f8fb;
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='12' ry='12' stroke='%2397BEF4FF' stroke-width='5' stroke-dasharray='6%2c14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
    border-radius: var(--theme-border-radius-md);
    user-select: none;
    flex-direction: column;
    overflow: hidden;
  }

  .dropzone .text {
    color: #bdbdbd;
    font-weight: 500;
    font-size: 14px;
    margin-top: 32px;
  }
</style>
