<script lang="ts">
  import {
    getModalStore,
    Autocomplete,
    type AutocompleteOption,
    type PopupSettings,
    popup
  } from '@skeletonlabs/skeleton';
  import { superForm } from 'sveltekit-superforms/client';
  import { superValidateSync } from 'sveltekit-superforms/server';
  import { chairSaveSchema, type ChairSelect } from '@/lib/validations/chair';
  import type { GuestChairSelect } from '@/lib/validations/guest';

  export let parent: any;

  const modalStore = getModalStore();

  let popupSettings: PopupSettings = {
    event: 'focus-click',
    target: 'popupAutocomplete',
    placement: 'bottom'
  };

  const chair: ChairSelect = $modalStore[0].meta.chair;
  const chairSave = {
    id: chair.id,
    guestId: chair.mainGuest
      ? chair.mainGuest.id
      : chair.additionalGuest
      ? chair.additionalGuest.id
      : null
  };

  const { form, enhance, message } = superForm(superValidateSync(chairSave, chairSaveSchema), {
    dataType: 'json',
    onUpdated({ form }) {
      if (!form.message) {
        modalStore.close();
      }
    }
  });

  let fullName = chair.mainGuest
    ? chair.mainGuest.fullName
    : chair.additionalGuest
    ? chair.additionalGuest.fullName
    : '';

  const guestList: AutocompleteOption[] = ($modalStore[0].meta.guests as GuestChairSelect).map(
    (g) => {
      return {
        label: g.fullName as string,
        value: g.id,
        keywords: g.nickName ?? ''
      };
    }
  );

  guestList.unshift({
    label: 'No Guest',
    value: null,
    keywords: ''
  });

  function onGuestSelection(event: CustomEvent<AutocompleteOption>): void {
    fullName = event.detail.label;
    $form.guestId = event.detail.value as number | string;
  }
</script>

{#if $modalStore[0]}
  <div class="card w-full max-w-md space-y-4 p-8 shadow-xl">
    <header class="text-2xl font-bold">{$modalStore[0].title ?? '(title missing)'}</header>
    <form method="POST" action="?/editChair" use:enhance>
      <label class="flex w-full items-center gap-10">
        <h4 class="h4">Guest:</h4>
        <input
          class="input"
          type="search"
          bind:value={fullName}
          placeholder="Guest Name..."
          use:popup={popupSettings}
        />
      </label>
      <div data-popup="popupAutocomplete" class="card variant-filled">
        <Autocomplete bind:input={fullName} options={guestList} on:selection={onGuestSelection} />
      </div>
      {#if $message}
        <small class="text-error-300">{$message}</small>
      {/if}
      <footer class="modal-footer mt-6 flex justify-between">
        <button type="button" class="btn {parent.buttonNeutral}" on:click={parent.onClose}
          >{parent.buttonTextCancel}</button
        >
        <button type="submit" class="btn {parent.buttonPositive}">Save</button>
      </footer>
    </form>
  </div>
{/if}
