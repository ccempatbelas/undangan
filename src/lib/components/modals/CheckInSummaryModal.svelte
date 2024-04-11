<script lang="ts">
  import { getModalStore } from '@skeletonlabs/skeleton';

  const modalStore = getModalStore();
  const guests = $modalStore[0].meta;

  const groupedGuests = guests.reduce((result: any, guest: any) => {
    if (!guest.checkedInBy) {
      return result;
    }
    if (!result[guest.checkedInBy]) {
      result[guest.checkedInBy] = [];
    }
    result[guest.checkedInBy].push(guest);
    return result;
  }, {});
</script>

{#if $modalStore[0]}
  <div class="card w-modal-wide flex flex-col gap-6 p-6 shadow-xl">
    {#each Object.entries(groupedGuests) as [registrant, group]}
      {#if registrant != null}
        <div class="rounded-s border p-2">
          <h1 class="h2 mb-4">{registrant}</h1>

          <div class="table-container">
            <table class="table">
              <tbody>
                <tr>
                  <th align="left" class="text-xl">Total Guest Checked In</th>
                  <td>{group.length}</td>
                </tr>
                <tr>
                  <th align="left" class="text-xl">Actual guest count</th>
                  <td
                    >{group.reduce((total, guest) => total + (guest.actualGuestAmount ?? 0), 0)}</td
                  >
                </tr>
                <tr>
                  <th align="left" class="text-xl">Angpau Count</th>
                  <td>{group.reduce((total, guest) => total + (guest.angpau ? 1 : 0), 0)}</td>
                </tr>
                <tr>
                  <th align="left" class="text-xl">Gift Count</th>
                  <td>{group.reduce((total, guest) => total + (guest.gift ? 1 : 0), 0)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      {/if}
    {/each}
  </div>
{/if}
