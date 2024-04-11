<script lang="ts">
  import { getModalStore } from '@skeletonlabs/skeleton';
  import { superForm } from 'sveltekit-superforms/client';
  import { superValidateSync } from 'sveltekit-superforms/server';
  import { tableSelectSchema } from '@/lib/validations/table';

  export let parent: any;

  const modalStore = getModalStore();

  const { form, enhance, message } = superForm(
    superValidateSync($modalStore[0].meta, tableSelectSchema),
    {
      dataType: 'json',
      onUpdated({ form }) {
        if (!form.message) {
          modalStore.close();
        }
      }
    }
  );

  // Base Classes
  const cBase = 'card p-4 w-modal shadow-xl space-y-4';
  const cHeader = 'text-2xl font-bold';
</script>

{#if $modalStore[0]}
  <div class="modal-example-form {cBase}">
    <header class={cHeader}>{$modalStore[0].title ?? '(title missing)'}</header>
    <form method="POST" action="?/editTable" use:enhance>
      <label class="label w-full">
        <h4 class="h4">Table number</h4>
        <input class="input" type="text" placeholder="number" bind:value={$form.number} />
      </label>
      <label class="label mt-2 w-full">
        <h4 class="h4">Group name</h4>
        <input class="input" type="text" placeholder="group name" bind:value={$form.groupName} />
      </label>
      {#if $message}
        <small class="text-error-300">{$message}</small>
      {/if}
      <footer class="modal-footer {parent.regionFooter} mt-6">
        <button class="btn {parent.buttonNeutral}" type="submit" formaction="?/deleteTable"
          >Delete</button
        >
        <button type="button" class="btn {parent.buttonNeutral}" on:click={parent.onClose}
          >{parent.buttonTextCancel}</button
        >
        <button type="submit" class="btn {parent.buttonPositive}">Save</button>
      </footer>
    </form>
  </div>
{/if}
