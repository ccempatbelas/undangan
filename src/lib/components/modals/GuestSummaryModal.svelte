<script lang="ts">
  import { filter, getModalStore } from '@skeletonlabs/skeleton';

  const modalStore = getModalStore();
  const guests = $modalStore[0].meta;

  const mainGuestCount = guests.length;
  const additionalGuestCount = guests.reduce(
    (sum: number, g: any) => sum + g.additionalGuests.length,
    0
  );

  const unreservedGuestCount = guests.reduce(
    (sum: number, g: any) => (g.reserved ? sum : sum + 1 + g.additionalGuests.length),
    0
  );

  const rsvpedGuestCount = guests.reduce((sum: number, g: any) => {
    if (g.reserved && (g.attendingHolyMat || g.attendingReception)) {
      return sum + 1 + g.additionalGuests.length;
    } else {
      return sum;
    }
  }, 0);
  const holmatGuestCount = guests.reduce((sum: number, g: any) => {
    if (g.reserved && g.attendingHolyMat) {
      return sum + 1 + g.additionalGuests.length;
    } else {
      return sum;
    }
  }, 0);
  const receptionGuestCount = guests.reduce((sum: number, g: any) => {
    if (g.reserved && g.attendingReception) {
      return sum + 1 + g.additionalGuests.length;
    } else {
      return sum;
    }
  }, 0);
  const declinedGuestCount = guests.reduce((sum: number, g: any) => {
    if (g.reserved && !g.attendingHolyMat && !g.attendingReception) {
      return sum + 1 + g.additionalGuests.length;
    } else {
      return sum;
    }
  }, 0);
  const checkedInGuestCount = guests.reduce((sum: number, g: any) => {
    if (g.checkedIn) {
      return sum + 1 + g.additionalGuests.length;
    } else {
      return sum;
    }
  }, 0);

  const groups = new Set();

  for (const guest of guests) {
    groups.add(guest.group);
  }
</script>

{#if $modalStore[0]}
  <div class="card w-modal p-4 shadow-xl">
    <div class="table-container">
      <table class="table">
        <tbody>
          <tr>
            <th align="left" class="text-xl">Total Guest Count</th>
            <td>{mainGuestCount + additionalGuestCount}</td>
          </tr>
          <tr>
            <th align="left">Unreserved</th>
            <td>{unreservedGuestCount}</td>
          </tr>
          <tr>
            <th align="left" class="text-warning-500">RSVPed</th>
            <td>{rsvpedGuestCount}</td>
          </tr>
          <tr>
            <th align="left" class="text-warning-500">Attending</th>
            <td>{receptionGuestCount}</td>
          </tr>
          <tr>
            <th align="left" class="text-error-500">Declined</th>
            <td>{declinedGuestCount}</td>
          </tr>
          <tr>
            <th align="left" class="text-success-500">Checked In</th>
            <td>{checkedInGuestCount}</td>
          </tr>
          <tr>
            <th align="left">Main Guest</th>
            <td>{mainGuestCount}</td>
          </tr>
        </tbody>
      </table>
    </div>

    {#each groups as group}
      <h3 class="h3 mt-8">{group}</h3>

      <h3>
        Total:
        {guests.reduce(
          (sum, g) =>
            g.reserved && g.attendingReception && g.group === group
              ? sum + 1 + g.additionalGuests.length
              : sum,
          0
        )}
      </h3>

      {#each guests.filter((g) => g.group === group && g.attendingReception == true) as g, i}
        <div class="flex gap-4">
          <p>{i + 1}</p>
          <p>{g.fullName}</p>
        </div>
        {#each g.additionalGuests as additionalGuest}
          <div class="flex gap-4">
            <p>+</p>
            <p>{additionalGuest.fullName}</p>
          </div>
        {/each}
      {/each}
    {/each}
  </div>
{/if}
