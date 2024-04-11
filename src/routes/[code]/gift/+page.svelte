<script lang="ts">
  import { enhance } from '$app/forms';
  import { TabGroup, Tab } from '@skeletonlabs/skeleton';
  import { ArrowBigLeft } from 'lucide-svelte';
  import { superForm } from 'sveltekit-superforms/client';

  export let data;

  const { form: guest } = superForm(data.guest, {
    dataType: 'json'
  });

  let nikolasNumber = '4280365110';
  let nikolasCopied = false;
  let michelyNumber = '3100262681';
  let michelyCopied = false;

  let tabSet: number = 0;
</script>

<div>
  <a href="/{$guest.id}" class="btn flex justify-start gap-2"><ArrowBigLeft />Home</a>
  <TabGroup justify="justify-center" active="variant-filled" class="mt-8">
    <Tab bind:group={tabSet} name="tab1" value={0}>Bank Transfer</Tab>
    <Tab bind:group={tabSet} name="tab2" value={1}>Gift Registry</Tab>
    <!-- Tab Panels --->
    <svelte:fragment slot="panel">
      {#if tabSet === 0}
        <div class="mt-8 flex justify-evenly">
          <div class="text-center md:text-left">
            <h3 class="h3">BCA Nikolas Setiawan</h3>
            <p>no: {nikolasNumber}</p>
            <button
              class="variant-ringed btn mt-8"
              on:click={() => {
                navigator.clipboard.writeText(nikolasNumber);
                nikolasCopied = true;
              }}
              >{#if nikolasCopied}
                Number Copied!
              {:else}
                Copy Number
              {/if}</button
            >
          </div>
          <div class="text-center md:text-left">
            <h3 class="h3">BCA Michely Tenardi</h3>
            <p>no: {michelyNumber}</p>
            <button
              class="variant-ringed btn mt-8"
              on:click={() => {
                navigator.clipboard.writeText(michelyNumber);
                michelyCopied = true;
              }}
              >{#if michelyCopied}
                Number Copied!
              {:else}
                Copy Number
              {/if}</button
            >
          </div>
        </div>
      {:else if tabSet === 1}
        <div class="table-container px-8">
          <!-- Native Table Element -->
          <table class="table variant-soft table-compact">
            <tbody>
              {#each data.registry as reg (reg.id)}
                <tr>
                  <td>
                    <a href={reg.link} target="_blank" class="btn underline">{reg.name}</a>
                  </td>
                  <td>
                    <form method="POST" action="?/toggle" use:enhance>
                      <input type="hidden" name="id" value={reg.id} />
                      <input type="hidden" name="guest" value={$guest.id} />
                      <input type="hidden" name="name" value={reg.name} />
                      <input type="hidden" name="chosen" value={reg.chosen} />
                      {#if reg.chosen}
                        <button class="variant-soft-primary btn"> Already Chosen </button>
                      {:else}
                        <button class=" variant-filled btn">Mark Chosen</button>
                      {/if}
                    </form>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      {/if}
    </svelte:fragment>
  </TabGroup>
</div>
