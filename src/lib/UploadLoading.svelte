<script lang="ts">
</script>

<h2 class="title">Uploading...</h2>

<div class="progress-bar">
  <div class="progress-bar-value" />
</div>

<style>
  .title {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 30px;
    text-align: left;
  }

  /* copy-paste from https://codepen.io/tmac/pen/QgVRKb */
  .progress-bar {
    height: 6px;
    background-color: #f2f2f2;
    width: 100%;
    overflow: hidden;
    border-radius: var(--theme-border-radius);
  }

  .progress-bar-value {
    width: 100%;
    height: 100%;
    background-color: #2f80ed;
    border-radius: var(--theme-border-radius);
    animation: indeterminateAnimation 1s infinite linear;
    transform-origin: 0% 50%;
  }

  @keyframes indeterminateAnimation {
    0% {
      transform: translateX(0) scaleX(0);
    }
    40% {
      transform: translateX(0) scaleX(0.4);
    }
    100% {
      transform: translateX(100%) scaleX(0.5);
    }
  }
</style>
