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
    <h2 class="h2 card-header mb-7 text-center">N & M Wedding</h2>
    <div class="flex gap-4">
      <label class="label">
        <div class="flex items-baseline">
          <span class="mr-2">Enter Invitation Code</span>
          <button type="button" class="[&>*]:pointer-events-none" use:popup={popupHover}>
            <HelpCircle class="card-hover" size={15} strokeWidth={1} />
          </button>
          <div class="card variant-glass px-4 py-2" data-popup="popupHover">
            <p>Get the code from your inviter</p>
            <div class="variant-glass arrow" />
          </div>
        </div>
        <input class="input variant-glass" type="text" placeholder="Code" bind:value={code} />
      </label>
      <button type="submit" class="variant-filled btn" disabled={clicked}>
        {#if clicked}
          <Loader2 class="animate-spin" />
        {:else}
          Enter
        {/if}
      </button>
    </div>
  </form>
</Center>

<style>
  .neu {
    box-shadow:
      20px 20px 34px #000,
      -17px -17px 34px #191925;
  }
</style>
