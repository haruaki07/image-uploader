<script lang="ts">
  import { supabase } from "../supabase";
  import { state } from "../stores";
  import { allowedImgType, uniqId } from "../utils";
  import Card from "./Card.svelte";
  import Dropzone from "./Dropzone.svelte";
  import UploadLoading from "./UploadLoading.svelte";
  import Preview from "./Preview.svelte";
  import Result from "./Result.svelte";

  let file: any;
  let filePath: string;
  let previewSrc: any;
  let result: string;

  function handleUpload(e: Event, dropzone?: boolean) {
    try {
      const input = dropzone
        ? (<CustomEvent>e).detail
        : (e.target as HTMLInputElement);
      if (!input.files || input.files.length === 0) return;

      file = input.files[0];

      if (!allowedImgType.includes(file.type))
        throw new Error("File must be an image!");

      let fileName = file.name.split(".");
      const fileExt = fileName.pop();
      const newFileName = `${fileName.join("")}-${uniqId()}.${fileExt}`;
      filePath = `${newFileName}`;

      previewFile(file);
    } catch (e) {
      console.log(e);
    }
  }

  function previewFile(file: Blob) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      previewSrc = reader.result;
      state.set("preview");
    };
  }

  function reset() {
    previewSrc = null;
    file = null;
    filePath = null;
  }

  async function handleSubmit() {
    try {
      if (file && filePath) {
        state.set("upload");
        const { error, data } = await supabase.storage
          .from("images")
          .upload(filePath, file);

        if (error) throw error;

        state.set("done");
        result = await getImageUrl(filePath);

        reset();
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function getImageUrl(key: string) {
    try {
      const { signedURL, error } = await supabase.storage
        .from("images")
        .createSignedUrl(key, 30);

      if (error) throw error;

      return signedURL;
    } catch (e) {
      throw e;
    }
  }
</script>

<Card>
  {#if $state === "idle"}
    <div class="uploader">
      <h2 class="title">Upload your image</h2>
      <p class="text">File should be Jpeg, Png,...</p>
      <Dropzone on:dropped={(e) => handleUpload(e, true)} />
      <p class="text">Or</p>
      <label>
        <input type="file" hidden on:change={handleUpload} accept="image/*" />
        Choose a file
      </label>
    </div>
  {:else if $state === "preview"}
    <Preview src={previewSrc} />
    <button
      on:click={() => {
        reset();
        state.set("idle");
      }}>Cancel</button
    >
    <button on:click={handleSubmit}>Submit</button>
  {:else if $state === "upload"}
    <UploadLoading />
  {:else}
    <Result src={result} />
    <button
      on:click={() => {
        result = null;
        reset();
        state.set("idle");
      }}>Back</button
    >
  {/if}
</Card>

<style>
  .uploader {
    text-align: center;
  }

  .uploader .title {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 1rem;
  }

  .uploader .text {
    font-size: 14px;
  }
</style>
