<script lang="ts">
  import { slide } from 'svelte/transition';
  import { superForm } from 'sveltekit-superforms/client';
  import { popup, getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
  import { ArrowBigLeft, ChevronDown, Loader2 } from 'lucide-svelte';
  import RsvpSuccess from '@/lib/components/RsvpSuccess.svelte';
  import { page } from '$app/stores';
  import EmailModal from '@/lib/components/modals/EmailModal.svelte';

  export let data;
  let modify = $page.url.searchParams.get('modify') ? true : false;
  let submited = false;

  const modalStore = getModalStore();
  const {
    form: guest,
    errors,
    allErrors,
    message,
    enhance
  } = superForm(data.guest, {
    dataType: 'json',
    taintedMessage: null,
    onSubmit() {
      submited = true;
    },
    onUpdated() {
      submited = false;
    }
  });

  // Attendance
  let attendance = 0; // Range: 0 to 4
  let attendanceText = [
    'Choose Atendance',
    'Unable to Come',
    `Attend Holy Matrimony${$guest.priority == '3' ? '' : ' Only'}`,
    'Attend Reception Only',
    'Attend Holy Matrimony and Reception'
  ];
  if ($guest.attendingReception == undefined && $guest.attendingHolyMat == undefined) {
    attendance = 0;
  } else if ($guest.attendingReception && $guest.attendingHolyMat) {
    attendance = 4;
  } else if ($guest.attendingReception) {
    attendance = 3;
  } else if ($guest.attendingHolyMat) {
    attendance = 2;
  } else {
    attendance = 1;
  }
  $: $guest.attendingHolyMat = attendance == 2 || attendance == 4 ? true : false;
  $: $guest.attendingReception = attendance == 3 || attendance == 4 ? true : false;

  // Plus One Functions
  $: plusOneIndex = $guest.additionalGuests.findIndex((g) => !g.manualyAdded);

  function addPlusOne() {
    const plusOneGuest = {
      fullName: '',
      vegan: false,
      phoneNumber: '',
      inviterId: $guest.id,
      manualyAdded: false,
      checkedIn: false
    };
    $guest.additionalGuests.push(plusOneGuest);
    plusOneIndex = $guest.additionalGuests.length - 1;
  }

  function removePlusOne() {
    $guest.additionalGuests.splice(plusOneIndex, 1);
    plusOneIndex = -1;
  }

  // email
  async function email(id: string | undefined, name: string) {
    const modal: ModalSettings = {
      type: 'component',
      component: { ref: EmailModal },
      meta: { id, name }
    };
    modalStore.trigger(modal);
  }
</script>

<div class="relative grid min-h-screen place-items-center">
  <a href="/{$guest.id}" class="btn absolute left-0 top-0 flex gap-2"><ArrowBigLeft />Home</a>
  <form class="prose mt-10 p-5 dark:prose-invert" method="POST" action="?/submit" use:enhance>
    <h1 class="gradient-heading h1 from-primary-300 via-primary-200 to-primary-100 pb-4">
      Hello {$guest.nickName}
    </h1>
    {#if $guest.reserved}
      {#if attendance != 1}
        <RsvpSuccess bind:value={$guest.id} bind:priority={$guest.priority} />
      {:else}
        <p>
          You have kindly opted <span class="font-bold text-error-200">not to accept</span> the invitation
          to Nikolas and Michely's wedding. Your presence will be missed on this special day.
        </p>
      {/if}
      <div class="flex justify-between">
        <a href="/{$guest.id}" class="underline" data-sveltekit-preload-data="hover">Back To Home</a
        >
        <button
          class="underline [&>*]:pointer-events-none"
          on:click={() => email($guest.id, $guest.nickName)}
          use:popup={{ event: 'hover', target: 'popupEmail', placement: 'top' }}
          >email the link</button
        >
        <div class="not-prose card variant-filled px-4 py-2" data-popup="popupEmail">
          <p>Send a link to this page to your email</p>
          <div class="variant-glass arrow" />
        </div>
        {#if modify}
          <button class="underline" on:click={() => ($guest.reserved = false)}>Modify</button>
        {/if}
      </div>

      <p class="pt-24 text-sm text-warning-50">
        * Please contact Nikolas or Michely <a
          class="text-primary-300 underline"
          target="_blank"
          href="https://wa.me/6287777438727">here</a
        > to modify your reservation
      </p>
    {:else}
      <!-- Welcome Note -->
      <p>Join us in celebrating this joyous union on the 30th of December 2023!</p>

      <h4 class="h4">Attendance Confirmation</h4>
      <button
        type="button"
        class="btn w-full [&>*]:pointer-events-none {attendance == 1
          ? 'variant-soft-error'
          : 'variant-filled'}"
        use:popup={{
          event: 'click',
          target: 'attendancePopup',
          placement: 'bottom'
        }}
        >{attendanceText[attendance]}
        <ChevronDown class="ml-4" size="18" />
      </button>

      <div class="card variant-glass" data-popup="attendancePopup">
        <div class="flex flex-col gap-2 p-2">
          {#each $guest.priority == '3' ? attendanceText.slice(1, 3) : attendanceText.slice(1) as a, i}
            <button
              on:click={() => (attendance = i + 1)}
              type="button"
              class="variant-soft p-2 text-left"
              >{a}
            </button>
          {/each}
        </div>
      </div>

      {#if attendance > 0}
        <div transition:slide>
          <!-- Main Input -->
          <div class="flex flex-wrap gap-x-4 sm:flex-nowrap">
            <label class="label w-full">
              <h4 class="h4">Full Name</h4>
              <input
                class="input"
                type="text"
                placeholder="full name (for table card)"
                bind:value={$guest.fullName}
              />
              {#if $errors.fullName}
                <small class="text-red-300">{$errors.fullName}</small>
              {/if}
            </label>

            <label class="label w-full">
              <h4 class="h4">WhatsApp Number</h4>
              <input
                class="input"
                type="text"
                placeholder="phone number"
                bind:value={$guest.phoneNumber}
              />
              {#if $errors.phoneNumber}
                <small class="text-red-300">{$errors.phoneNumber}</small>
              {/if}
            </label>
          </div>
          {#if attendance > 2}
            <label class="flex items-center space-x-2 pt-6">
              <input class="checkbox" type="checkbox" bind:checked={$guest.vegan} />
              <span>Choose vegan meal option</span>
            </label>
          {/if}

          <!-- Additional Guests -->
          {#if plusOneIndex != -1}
            <div transition:slide>
              <h2 class="h2">Additional Guest Information</h2>
              <label class="label w-full">
                <h4 class="h4">Guest Full Name</h4>
                <input
                  class="input"
                  type="text"
                  placeholder="additional guest full name"
                  bind:value={$guest.additionalGuests[plusOneIndex].fullName}
                />
                {#if $errors.additionalGuests && $errors.additionalGuests[plusOneIndex].fullName}
                  <small class="text-red-300"
                    >{$errors.additionalGuests[plusOneIndex].fullName}</small
                  >
                {/if}
              </label>
              {#if attendance > 2}
                <label class="flex items-center space-x-2">
                  <input
                    class="checkbox"
                    type="checkbox"
                    bind:checked={$guest.additionalGuests[plusOneIndex].vegan}
                  />
                  <p>Choose vegan meal option</p>
                </label>
              {/if}
            </div>
          {/if}
          {#each $guest.additionalGuests.filter((g) => g.manualyAdded) as item, index}
            <h2 class="h2">Additional Guest {index + 1}</h2>
            <table class="table-compact">
              <tbody>
                <tr class="border-0">
                  <td class="table-cell-fit pr-20 font-bold">Name</td>
                  <td>{item.fullName}</td>
                </tr>
                <tr class="border-0">
                  <td class="table-cell-fit pr-20 font-bold">Phone Number</td>
                  <td>{item.phoneNumber}</td>
                </tr>
                <tr class="border-0">
                  <td class="table-cell-fit pr-20 font-bold">Vegan</td>
                  <td>{item.vegan}</td>
                </tr>
              </tbody>
            </table>
          {/each}

          <h4 class="h4">Wishes</h4>
          <textarea
            class="textarea"
            rows="6"
            maxlength="1000"
            placeholder="add your personal wishes for Nikolas and Michely here (not shown to public)"
            bind:value={$guest.wishes}
          ></textarea>
          <small class="flex justify-end">{$guest.wishes ? $guest.wishes.length : 0}/1000</small>

          {#if $allErrors.length}
            <small class="text-red-300">please fix the fields above</small>
          {/if}
          {#if $message}
            <small class="text-red-300">{$message}</small>
          {/if}
        </div>
        {#if attendance > 1}
          <div class="flex items-center gap-8">
            Number of guest coming:
            <label class="flex items-center space-x-2">
              <input
                class="radio"
                type="radio"
                checked={plusOneIndex == -1}
                name="radio"
                on:change={() => removePlusOne()}
              />
              <p>1</p>
            </label>
            {#if $guest.plusOneAllowed}
              <label class="flex items-center space-x-2">
                <input
                  class="radio"
                  type="radio"
                  checked={plusOneIndex != -1}
                  name="radio"
                  on:change={() => addPlusOne()}
                />
                <p>2</p>
              </label>
            {/if}
          </div>
          <p class="text-sm text-primary-50">
            * Please contact Nikolas or Michely <a
              class="text-primary-300 underline"
              target="_blank"
              href="https://wa.me/6287777438727">here</a
            > if you need to add additional guests
          </p>
        {/if}
        <!-- Buttons -->
        <div class="relative mb-20 mt-10 flex justify-center gap-10">
          <button class="variant-filled-secondary btn" type="submit" disabled={submited}>
            {#if submited}
              <Loader2 class="animate-spin" />
            {:else}
              Submit
            {/if}
          </button>
        </div>
      {/if}
    {/if}
  </form>
</div>
