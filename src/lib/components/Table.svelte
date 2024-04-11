<script lang="ts">
  import type { ChairSelect } from '@/lib/validations/chair';
  import { getModalStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';
  import ChairModal from './modals/ChairModal.svelte';
  import type { GuestChairSelect } from '@/lib/validations/guest';
  import type { TableSelect } from '@/lib/validations/table';
  import TableModal from './modals/TableModal.svelte';

  export let size = 200; // in px
  export let tableSize = 30; // in percent
  export let chairSize = 8; // in percent
  export let table: TableSelect | undefined = undefined;
  export let guests: GuestChairSelect = [];
  export let chairNumber = 6;

  const modalStore = getModalStore();

  function editTable(): void {
    const c: ModalComponent = { ref: TableModal };
    const modal: ModalSettings = {
      type: 'component',
      component: c,
      title: `Table ${table?.number}`,
      meta: table
    };
    modalStore.trigger(modal);
  }

  function editChair(chair: ChairSelect): void {
    const c: ModalComponent = { ref: ChairModal };
    const modal: ModalSettings = {
      type: 'component',
      component: c,
      title: `Chair ${chair.number}`,
      meta: { chair, guests }
    };
    modalStore.trigger(modal);
  }

  $: fontSize = (((size * chairSize) / 100) * 3) / 4;
  $: angleStep = table ? 360 / table.chairs.length : 360 / chairNumber;

  const xInitial = 50 - chairSize / 2;
  const yInitial = 0;
</script>

<svg width={size} height={size} viewBox="0 0 {size} {size}">
  {#if table}
    <circle
      cx="50%"
      cy="50%"
      r="{tableSize}%"
      fill="#ccc"
      class="hover:stroke-success-300"
      on:click={editTable}
      role="button"
      on:keypress={(e) => e.key == 'Enter' && editTable}
      tabindex="0"
    />
    <text
      x="{50 - fontSize * 2}%"
      y="{50 + fontSize * 2}%"
      font-family="Verdana"
      font-size={fontSize * 4}
      fill="white">{table?.number}</text
    >
    {#each table.chairs as chair}
      <rect
        x="{xInitial}%"
        y="{yInitial}%"
        width="{chairSize}%"
        height="{chairSize}%"
        fill="#444"
        class="hover:stroke-success-300 {chair.additionalGuest || chair.mainGuest
          ? 'fill-success-300'
          : ''}"
        on:click={() => editChair(chair)}
        role="button"
        on:keypress={(e) => {
          if (e.key == 'Enter') return () => editChair(chair);
        }}
        tabindex="0"
        transform="rotate({chair.number * angleStep} {size / 2} {size / 2})"
      />
      <text
        x="{xInitial - chairSize}%"
        y="{yInitial + (chairSize * 3) / 4}%"
        font-family="Verdana"
        font-size={fontSize}
        fill="white"
        transform="rotate({chair.number * angleStep} {size / 2} {size / 2})">{chair.number}</text
      >
    {/each}
  {:else}
    <circle cx="50%" cy="50%" r="{tableSize}%" fill="#ccc" />
    {#each Array.from({ length: chairNumber }, (_, i) => i) as i}
      <rect
        x="{xInitial}%"
        y="{yInitial}%"
        width="{chairSize}%"
        height="{chairSize}%"
        fill="#444"
        transform="rotate({i * angleStep} {size / 2} {size / 2})"
      />
    {/each}
  {/if}
</svg>

<style>
  svg text {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    pointer-events: none;
    user-select: none;
  }
  svg text::selection {
    background: none;
  }
</style>
