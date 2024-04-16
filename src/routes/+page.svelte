<script lang="ts">
  import Center from '@/lib/components/layouts/Center.svelte';
  import { cover } from '@/lib/stores';
  import type { PopupSettings } from '@skeletonlabs/skeleton';
  import { popup } from '@skeletonlabs/skeleton';
  import { HelpCircle, Loader2 } from 'lucide-svelte';
  import { onMount } from 'svelte';

  let clicked = false;
  let code = '';
  onMount(() => {
    const cachedCode = localStorage.getItem('code');
    if (cachedCode != null) {
      code = cachedCode;
    }
  });

  const popupHover: PopupSettings = {
    event: 'hover',
    target: 'popupHover',
    placement: 'top'
  };
</script>

<Center>
  <form
    action="/{code}"
    class="neu card variant-glass m-2 border-b border-r border-black p-4"
    on:submit={() => {
      if (code) {
        clicked = true;
        $cover = true;
      }
    }}
  >
    <h2 class="h2 mb-7 text-center">CC 2014 - 10 TAHUN!!!</h2>
    <h1 class="h1 card-header mb-7 text-center">27 Juli 2024 - Jakarta</h1>
    <h3 class="h3 mb-7 text-center">more info coming soon</h3>
  </form>
</Center>

<style>
  .neu {
    box-shadow:
      20px 20px 34px #000,
      -17px -17px 34px #191925;
  }
</style>
