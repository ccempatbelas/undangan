<script lang="ts">
  // @ts-ignore: Library has no type
  import { QRious } from '@phippsytech/svelte-qrious';

  export let value: string | undefined;
  export let priority = '1';
</script>

<p>
  You have <span class="font-bold text-green-800">sucessfully</span> reserve your spot to Nikolas and
  Michely's wedding on December 30 2023
</p>
{#if priority != '3'}
  <div class="flex justify-center">
    <div class="rounded-lg bg-white p-4">
      <QRious bind:value size={200} />
    </div>
  </div>
  <div class="flex justify-center">
    <p>Show this QRcode at the check in desk</p>
  </div>
{/if}
