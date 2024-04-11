<script lang="ts">
  import Center from '@/lib/components/layouts/Center.svelte';
  import { page } from '$app/stores';
</script>

<Center>
  <div class="card variant-glass px-4 py-8">
    <h1 class="h1 card-header mb-4 text-center">{$page.status}</h1>
    {#if $page.error}
      <h3 class="h3">{$page.error.message}</h3>
    {/if}
    <div class="mt-12 flex justify-center">
      <a class="variant-filled-primary btn shadow-sm shadow-primary-50" href="/">Back Home</a>
    </div>
  </div>
</Center>
