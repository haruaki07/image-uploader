<div class="card">
  <slot />
</div>

<style>
  .card {
    width: 400px;
    padding: var(--theme-spacing);
    background-color: var(--theme-card-color);
    border-radius: var(--theme-border-radius-md);
    box-shadow: var(--theme-box-shadow);
  }

  @media screen and (max-width: 425px) {
    .card {
      width: 90%;
    }
  }
</style>
