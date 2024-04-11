<script lang="ts">
  import { page } from '$app/stores';
  import Table from '@/lib/components/Table.svelte';
  import TableSummaryModal from '@/lib/components/modals/TableSummaryModal.svelte';
  import type { GuestChairSelect } from '@/lib/validations/guest';
  import { draggable } from '@neodrag/svelte';
  import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
  import { Minus, Plus } from 'lucide-svelte';
  import { superForm } from 'sveltekit-superforms/client';

  export let data;

  const modalStore = getModalStore();

  let pageScale = 1;

  const {
    form: addForm,
    errors: addErrors,
    message: addMessage,
    enhance: addEnhance
  } = superForm(data.addForm, {
    dataType: 'json',
    resetForm: true,
    taintedMessage: null
  });

  const guests: GuestChairSelect = [];
  for (const guest of data.guests) {
    const { additionalGuests, ...mainGuest } = guest;
    if (mainGuest.chairId === null) {
      guests.push(mainGuest);
    }
    for (const additionalGuest of additionalGuests) {
      if (additionalGuest.chairId === null) {
        guests.push(additionalGuest);
      }
    }
  }

  async function saveLayout() {
    const tables = data.tables.map((table) =>
      (({ id, xPosition, yPosition }) => ({ id, xPosition, yPosition }))(table)
    );

    await fetch(`${$page.url}?/save`, {
      method: 'POST',
      body: JSON.stringify({ tables })
    });
  }

  // Table Summary
  function openTableSummary() {
    const modal: ModalSettings = {
      type: 'component',
      component: { ref: TableSummaryModal },
      title: `Table Summary`,
      meta: { tables: data.tables, guests: data.guests }
    };
    modalStore.trigger(modal);
  }
</script>

<div class="flex grow">
  <aside class="variant-glass flex w-44 flex-col items-center justify-between py-8">
    <button class="variant-filled btn" on:click={openTableSummary}> Table Summary </button>
    <div class="flex flex-col items-center">
      <Table size={100} bind:chairNumber={$addForm.numberOfChair} />
      <form
        class="flex flex-col items-center justify-center gap-4"
        method="POST"
        action="?/add"
        use:addEnhance
      >
        <div class="flex gap-6">
          <label class="label mt-8 w-full text-center">
            <span class="text-primary-50">Seats amount</span>
            <input
              class="input variant-ringed-tertiary"
              type="number"
              min="1"
              max="12"
              on:keydown={(e) => e.preventDefault()}
              bind:value={$addForm.numberOfChair}
            />
            {#if $addErrors.numberOfChair}
              <small class="text-error-300">{$addErrors.numberOfChair}</small>
            {/if}
          </label>
          <label class="label mt-8 w-full text-center">
            <span class="text-primary-50">Table number</span>
            <input class="input" type="number" bind:value={$addForm.number} min="1" />
            {#if $addErrors.number}
              <small class="text-error-300">{$addErrors.number}</small>
            {/if}
          </label>
        </div>
        {#if $addMessage}
          <small class="text-error-300">{$addMessage}</small>
        {/if}
        <button class="variant-filled btn" type="submit">Add Table</button>
      </form>
      <button class="variant-filled-success btn mt-8" on:click={saveLayout}>Save Layout</button>
    </div>
    <div class="flex items-center gap-1">
      <span class="h4 m-2">Zoom: {pageScale * 100}%</span>
      <button
        class="variant-filled-tertiary flex h-8 w-12 items-center justify-center rounded-lg"
        on:click={() => {
          if (pageScale < 4) {
            pageScale = pageScale + 0.5;
          }
        }}><Plus size={16} /></button
      >
      <button
        class="variant-filled-tertiary flex h-8 w-12 items-center justify-center rounded-lg"
        on:click={() => {
          if (pageScale > 1) {
            pageScale = pageScale - 0.5;
          }
        }}><Minus size={16} /></button
      >
    </div>
  </aside>
  {#key pageScale}
    <div class="relative grow overflow-scroll border">
      <div style="transform: scale({pageScale});" class="relative h-full w-full origin-top-left">
        {#each data.tables as table (table.id)}
          <div
            class="absolute h-fit w-fit"
            use:draggable={{
              bounds: 'parent',
              grid: [20, 20],
              defaultPosition: { x: table.xPosition, y: table.yPosition },
              onDrag: ({ offsetX, offsetY }) => {
                table.xPosition = offsetX;
                table.yPosition = offsetY;
              }
            }}
          >
            <Table size={70} {table} {guests} />
          </div>
        {/each}
      </div>
    </div>
  {/key}
</div>
