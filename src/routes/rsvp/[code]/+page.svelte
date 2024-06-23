<script lang="ts">
  import { superForm } from 'sveltekit-superforms/client';
  import { ArrowBigLeft } from 'lucide-svelte';
  import { page } from '$app/stores';

  export let data;
  let modify = $page.url.searchParams.get('modify') ? true : false;
  let submited = false;

  const {
    form: guest,
    errors,
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
</script>

<div class="relative grid min-h-screen place-items-center">
  <a href="/" class="btn absolute left-0 top-0 flex gap-2"><ArrowBigLeft />Home</a>
  <form class="prose mt-10 p-5 dark:prose-invert" method="POST" action="?/submit" use:enhance>
    <h1 class="gradient-heading h1 from-primary-300 via-primary-200 to-primary-100 pb-4">
      Hello {$guest.nickName}
    </h1>
    {#if $guest.reserved}
      {#if $guest.attendingReception}
        <p>
          You have <span class="font-bold text-green-800">sucessfully</span> reserve your spot to CC14
          reunion
        </p>
      {:else}
        <p>
          You have opted <span class="font-bold text-error-200">not to join</span> CC14 reunion
        </p>
      {/if}
      <div class="flex justify-between">
        <a href="/" class="underline" data-sveltekit-preload-data="hover">Back To Home</a>
        {#if modify}
          <button class="underline" on:click={() => ($guest.reserved = false)}>Modify</button>
        {/if}
      </div>

      <p class="pt-24 text-sm text-primary-400">
        * Please contact Deel <a
          class="text-primary-300 underline"
          target="_blank"
          href="https://wa.me/6287777438727">here</a
        > to modify your reservation
      </p>
    {:else}
      <!-- Welcome Note -->
      <p>Yuk reuni 27 July 2024!</p>

      <!-- Main Input -->
      <div class="flex flex-wrap gap-x-4 sm:flex-nowrap">
        <label class="label w-full">
          <h4 class="h4">Full Name</h4>
          <input
            class="input"
            type="text"
            placeholder="for confirmation"
            bind:value={$guest.fullName}
          />
          {#if $errors.fullName}
            <small class="text-red-300">{$errors.fullName}</small>
          {/if}
        </label>
      </div>

      <!-- Buttons -->
      <div class="relative mb-20 mt-10 flex justify-between gap-10">
        <button
          class="variant-filled-primary btn min-w-28"
          type="submit"
          disabled={submited}
          on:click={() => ($guest.attendingReception = false)}
        >
          Gak bisa :(
        </button>
        <button
          class="variant-filled-secondary btn min-w-28"
          type="submit"
          disabled={submited}
          on:click={() => ($guest.attendingReception = true)}
        >
          Gass!
        </button>
      </div>
    {/if}
  </form>
</div>
