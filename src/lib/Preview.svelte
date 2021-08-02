<script lang="ts">
  export let src: string;
</script>

<div class="preview">
  <div class="img" style={`--background-image: url('${src}');`} />
</div>

<style>
  .preview {
    width: 100%;
    height: 220px;
    border-radius: var(--theme-border-radius-md);
    border: var(--theme-border);
    overflow: hidden;
  }

  .preview .img {
    background-image: var(--background-image);
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    width: 100%;
    height: 100%;
  }
</style>
