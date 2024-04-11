<script lang="ts">
  import { slide } from 'svelte/transition';
  import { popup } from '@skeletonlabs/skeleton';
  import { Menu } from 'lucide-svelte';

  export let id = '';
  export let priority = '1';

  // Smooth Scroll
  function scrollIntoView({ target }: any) {
    const anchor: HTMLAnchorElement = document.querySelector(target.getAttribute('href'));
    if (!anchor) return;
    window.scrollTo({
      top: anchor.offsetTop - 50,
      behavior: 'smooth'
    });
  }
</script>

<nav
  class="variant-glass fixed z-10 flex w-full justify-between p-2 px-20 text-xl max-md:bottom-0 md:top-0"
  transition:slide={{ duration: 1000 }}
>
  <div class="flex gap-10 max-lg:hidden">
    <a href="/{id}#head">Home</a>
    <a href="#schedule" on:click|preventDefault={scrollIntoView}>Schedule & Location</a>
    <a href="#gallery" on:click|preventDefault={scrollIntoView}>Moments</a>
    {#if priority === '1'}
      <a href="/{id}/gift">Wedding Gift</a>
    {/if}
  </div>
  <a href="/{id}/rsvp" class="text-primary-200">RSVP</a>
  <button
    class="lg:hidden [&>*]:pointer-events-none"
    use:popup={{
      event: 'click',
      target: 'navigatePopup',
      placement: 'top'
    }}
  >
    <Menu />
  </button>
  <div class="card variant-filled-surface" data-popup="navigatePopup">
    <div class="flex flex-col gap-4 p-4">
      <a href="/{id}#head">Home</a>
      <a href="#schedule" on:click|preventDefault={scrollIntoView}>Schedule & Location</a>
      <a href="#gallery" on:click|preventDefault={scrollIntoView}>Moments</a>
      {#if priority === '1'}
        <a href="/{id}/gift">Wedding Gift</a>
      {/if}
    </div>
  </div>
</nav>
