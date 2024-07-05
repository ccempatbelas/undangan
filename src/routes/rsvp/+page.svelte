<script lang="ts">
  import PageHeader from '@/lib/components/PageHeader.svelte';
  import SupportedBy from '@/lib/components/SupportedBy.svelte';
  import Center from '@/lib/components/layouts/Center.svelte';
  import NavBar from '@/lib/components/NavBar.svelte';
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
  <PageHeader />
  <form
    action="/rsvp/{code}"
    class="neu card variant-glass m-2 p-4"
    on:submit={() => {
      if (code) {
        clicked = true;
        $cover = true;
      }
    }}
  >
    <h1 class="font-mrheadline h1 text-primary-500 mb-7 text-center">CC<span class="font-mrheadline headline text-secondary-500">14</span>
    10 TAHUN</h1>
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
      <button type="submit" class="variant-filled btn bg-primary-500" disabled={clicked}>
        {#if clicked}
          <Loader2 class="animate-spin" />
        {:else}
          Enter
        {/if}
      </button>
    </div>
  </form>
  <SupportedBy />
</Center>

<NavBar />
<style>
  .neu {
    box-shadow:
      20px 20px 40px #104079,
      -20px -20px 40px #d66b05;
  }
</style>

