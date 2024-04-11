<script>
  // Styles
  import '../app.postcss'; // postcss

  // Floating UI
  import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
  import { Modal, storePopup } from '@skeletonlabs/skeleton';
  import { initializeStores } from '@skeletonlabs/skeleton';

  initializeStores();
  storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
</script>

<svelte:head>
  <script
    async
    src="https://umami.nikolasmichely.day/umami"
    data-website-id="1dace658-bfc2-4016-85f0-aa01e12e4bda"
  ></script>
  <link
    rel="preload"
    as="font"
    href="/fonts/Glester.woff"
    type="font/woff2"
    crossorigin="anonymous"
  />
  <link
    rel="preload"
    as="font"
    href="/fonts/Alice.woff2"
    type="font/woff2"
    crossorigin="anonymous"
  />
</svelte:head>

<Modal />

<main>
  <slot />
</main>
