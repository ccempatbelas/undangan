<script lang="ts">
  import { enhance } from '$app/forms';
  import { X } from 'lucide-svelte';
  import { superForm } from 'sveltekit-superforms/client';

  export let data;

  const {
    form: addForm,
    errors: addErrors,
    enhance: addEnhance
  } = superForm(data.addForm, {
    dataType: 'json',
    resetForm: true,
    taintedMessage: null
  });
</script>

<div>
  <form method="POST" action="?/add" class="flex gap-1" use:addEnhance>
    <input
      class="input variant-glass basis-1/6"
      type="text"
      placeholder="Name"
      bind:value={$addForm.name}
    />
    <input
      class="input variant-glass basis-3/4"
      type="text"
      placeholder="link"
      bind:value={$addForm.link}
    />
    <button type="submit" class="variant-filled-success btn basis-1/12">+ Add New</button>
  </form>
  {#if $addErrors}
    <small class="text-error-300"
      >{Object.entries($addErrors)
        .map((e) => e.join(': '))
        .join(', ')}</small
    >
  {/if}
</div>

{#if data.registry.length == 0}
  <div class="variant-glass h2 p-4 text-center">No Registry Yet</div>
{:else}
  <table class="table table-hover table-compact mt-10">
    <thead>
      <tr>
        <th>Item</th>
        <th>Status</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {#each data.registry as reg (reg.id)}
        <tr>
          <td><a href={reg.link} target="_blank" class="btn underline">{reg.name}</a></td>
          <td>
            <form method="POST" action="?/toggle" use:enhance>
              <input type="hidden" name="id" value={reg.id} />
              <input type="hidden" name="chosen" value={reg.chosen} />
              {#if reg.chosen}
                <button class="variant-filled-primary btn"> Chosen </button>
              {:else}
                <button class=" variant-filled btn">Available</button>
              {/if}
            </form>
          </td>
          <td class="w-32">
            <form method="POST" action="?/remove" use:enhance>
              <input type="hidden" name="name" value={reg.name} />
              <button name="id" value={reg.id} type="submit" class="btn"
                ><X class="stroke-error-700" /></button
              >
            </form>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}
