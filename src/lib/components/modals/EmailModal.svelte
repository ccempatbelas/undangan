<script lang="ts">
  import { getModalStore } from '@skeletonlabs/skeleton';
  import { superForm } from 'sveltekit-superforms/client';
  import { superValidateSync } from 'sveltekit-superforms/server';
  import { mainGuestEmailSchema } from '@/lib/validations/guest';
  import { Loader2 } from 'lucide-svelte';

  export let parent: any;

  const modalStore = getModalStore();
  const id = $modalStore[0].meta.id;
  const name = $modalStore[0].meta.name;
  let sent = false;
  let submited = false;

  const { form, enhance, errors } = superForm(
    superValidateSync({ id, nickName: name }, mainGuestEmailSchema),
    {
      dataType: 'json',
      onSubmit: async () => {
        submited = true;
      },
      onUpdated: ({ form }) => {
        if (form.valid) {
          sent = true;
        }
        submited = false;
      }
    }
  );
</script>

{#if $modalStore[0]}
  <div class="card w-modal space-y-4 p-4 shadow-xl">
    {#if !sent}
      <header class="text-2xl font-bold">Send Link to Your Email</header>
      <form method="POST" action="?/email" use:enhance>
        <input
          class="input"
          type="email"
          placeholder="your email address"
          bind:value={$form.email}
        />
        {#if $errors.email}
          <small class="text-error-300">{$errors.email}</small>
        {/if}
        <footer class="modal-footer {parent.regionFooter} mt-6">
          <button type="button" class="btn {parent.buttonNeutral}" on:click={parent.onClose}
            >{parent.buttonTextCancel}</button
          >
          <button type="submit" class="btn {parent.buttonPositive}">
            {#if submited}
              <Loader2 class="animate-spin" />
            {:else}
              Send
            {/if}
          </button>
        </footer>
      </form>
    {:else}
      <div class="flex justify-center">
        <h1 class="h1 p-8 font-bold">Email Sent ✔</h1>
      </div>
      <footer class="modal-footer {parent.regionFooter} mt-6">
        <button type="button" class="btn {parent.buttonNeutral}" on:click={parent.onClose}
          >Close</button
        >
      </footer>
    {/if}
  </div>
{/if}
