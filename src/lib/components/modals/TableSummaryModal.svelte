<script lang="ts">
  import { getModalStore } from '@skeletonlabs/skeleton';
  import { Check, Dot, X } from 'lucide-svelte';

  const modalStore = getModalStore();
  const tables = $modalStore[0].meta.tables.sort((x: any, y: any) => x.number - y.number);
</script>

{#if $modalStore[0]}
  <div class="card w-modal-wide grid grid-cols-2 gap-6 p-6 shadow-xl">
    {#each tables as table}
      <div class="rounded-s border p-2">
        <h2 class="h2 mb-4">Table {table.number}</h2>
        <h3 class="h3 mb-4">{table.groupName ?? 'No Group'}</h3>
        <div class="table-container">
          <table class="table">
            <tbody>
              {#each table.chairs as chair}
                <tr>
                  <th align="left" class="text-xl">chair {chair.number}</th>
                  <td
                    >{#if chair.mainGuest}
                      <div class="flex">
                        <p>
                          {chair.mainGuest.nickName}
                        </p>
                        {#if chair.mainGuest.checkedIn}
                          <Check class="stroke-success-200" size="18" />
                        {:else}
                          <X class="stroke-error-200" size="18" />
                        {/if}
                      </div>
                    {:else if chair.additionalGuest}
                      <div class="flex">
                        <p>
                          {chair.additionalGuest.fullName}
                        </p>
                        <Dot size="18" />
                      </div>
                    {:else}
                      <span class="text-surface-400">empty</span>
                    {/if}</td
                  >
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    {/each}
  </div>
{/if}
