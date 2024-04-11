<script lang="ts">
  import { getModalStore } from '@skeletonlabs/skeleton';
  import { ArrowLeft, ArrowRight, X } from 'lucide-svelte';
  const modalStore = getModalStore();

  const images = $modalStore[0].meta.images;
  let index = $modalStore[0].meta.index;
  $: source = images[index].replace('/placeholder/', '/gallery/');

  console.log(source);
</script>

{#if $modalStore[0]}
  <div class="card relative max-w-3xl shadow-xl">
    <button
      class="absolute -right-3 -top-3 rounded-full border border-white p-1"
      on:click={() => {
        modalStore.close();
      }}><X size="16" /></button
    >
    {#if index > 0}
      <button
        class="variant-filled absolute -left-3 top-1/2 -translate-y-1/2 rounded-full border p-2 opacity-70"
        on:click={() => {
          index -= 1;
        }}><ArrowLeft size="20" /></button
      >
    {/if}
    {#if index < images.length - 1}
      <button
        class="variant-filled absolute -right-3 top-1/2 -translate-y-1/2 rounded-full border p-2 opacity-70"
        on:click={() => {
          index += 1;
        }}><ArrowRight size="20" /></button
      >
    {/if}
    <img class="max-h-[90vh] object-cover" src={source} alt="image {$modalStore[0].meta}" />
  </div>
{/if}
