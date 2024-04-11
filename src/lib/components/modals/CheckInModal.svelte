<script lang="ts">
  import { SlideToggle, getModalStore } from '@skeletonlabs/skeleton';
  import { superForm, superValidateSync } from 'sveltekit-superforms/client';
  import { mainGuestCheckInSchema } from '@/lib/validations/guest';

  export let parent: any;

  const modalStore = getModalStore();

  const { form, enhance } = superForm(
    superValidateSync($modalStore[0].meta, mainGuestCheckInSchema),
    {
      dataType: 'json',
      onUpdated({ form }) {
        if (!form.message) {
          modalStore.close();
        }
      }
    }
  );
</script>

{#if $modalStore[0]}
  <div class="modal-example-form card w-modal space-y-4 p-4 shadow-xl">
    <header class="text-2xl font-bold">{$modalStore[0].title ?? '(title missing)'}</header>
    <article>{$modalStore[0].body ?? '(body missing)'}</article>
    <!-- Enable for debugging: -->
    <form action="?/checkIn" method="POST" use:enhance>
      <div class="modal-form space-y-4 border border-surface-500 p-4 rounded-container-token">
        <table class="table-compact">
          <tbody>
            <tr class="border-0">
              <td class="pr-10">Angpau</td>
              <td><SlideToggle name="Angpau" bind:checked={$form.angpau} /></td>
            </tr>
            <tr class="border-0">
              <td>Gift</td>
              <td><SlideToggle name="Gift" bind:checked={$form.gift} /></td>
            </tr>
          </tbody>
        </table>
        <label class="label">
          <span>Actual Guest Amount</span>
          <input class="input" type="number" value={$form.actualGuestAmount} />
        </label>
        <label class="label">
          <span>Note</span>
          <textarea
            class="textarea"
            rows="4"
            placeholder="Additional notes..."
            bind:value={$form.note}
          />
        </label>
      </div>
      <footer class="modal-footer {parent.regionFooter} mt-4">
        <button type="button" class="btn {parent.buttonNeutral}" on:click={parent.onClose}
          >{parent.buttonTextCancel}</button
        >
        <button type="submit" class="btn {parent.buttonPositive}">Check In</button>
      </footer>
    </form>
  </div>
{/if}
