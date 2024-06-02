<script lang="ts">
  import { superForm } from 'sveltekit-superforms/client';
  import { X, Search, ExternalLink, RefreshCcw } from 'lucide-svelte';
  import { invalidateAll } from '$app/navigation';
  import * as messages from '$lib/messages';
  import {
    getModalStore,
    type ModalSettings,
    type DrawerSettings,
    getDrawerStore,
    type ModalComponent,
    ListBox,
    ListBoxItem,
    popup,
    Autocomplete
  } from '@skeletonlabs/skeleton';
  import { page } from '$app/stores';
  import type { MainGuest, GuestTodo } from '@/db/schema.js';
  import CheckInModal from '@/lib/components/modals/CheckInModal.svelte';
  import GuestSummaryModal from '@/lib/components/modals/GuestSummaryModal.svelte';
  import CheckInSummaryModal from '@/lib/components/modals/CheckInSummaryModal.svelte';

  export let data;

  const drawerStore = getDrawerStore();
  const modalStore = getModalStore();

  const {
    form: addForm,
    errors: addErrors,
    enhance: addEnhance
  } = superForm(data.addForm, {
    dataType: 'json',
    resetForm: true
  });

  // Remove guest, show modal
  async function deleteGuest(guest: Partial<MainGuest>) {
    const modal: ModalSettings = {
      type: 'confirm',
      title: 'Delete Guest',
      body: `Are you sure you want to remove <slot class="text-error-300">${guest.nickName}</slot>`,
      response: async (r: boolean) => {
        if (r) {
          let f = new FormData();
          f.append('id', guest.id as string);
          await fetch(`${$page.url}?/remove`, { method: 'POST', body: f });
          invalidateAll();
        }
      }
    };
    modalStore.trigger(modal);
  }

  // Check In
  function checkIn(guest: MainGuest): void {
    const c: ModalComponent = { ref: CheckInModal };
    const modal: ModalSettings = {
      type: 'component',
      component: c,
      title: `Check In ${guest.nickName}`,
      body: guest.fullName as string,
      meta: guest
    };
    modalStore.trigger(modal);
  }

  // Guest Summary
  function openGuestSummary() {
    const modal: ModalSettings = {
      type: 'component',
      component: { ref: GuestSummaryModal },
      meta: data.guests
    };
    modalStore.trigger(modal);
  }

  // Guest Summary
  function openCheckInSummary() {
    const modal: ModalSettings = {
      type: 'component',
      component: { ref: CheckInSummaryModal },
      meta: data.guests
    };
    modalStore.trigger(modal);
  }

  function openDrawer(meta: any) {
    const drawerSettings: DrawerSettings = {
      id: 'user-drawer',
      position: 'right',
      bgDrawer: 'variant-glass',
      meta: meta
    };
    drawerStore.open(drawerSettings);
  }

  // Filters
  let statusFilter = 0;
  let priorityFilter = 0;
  let plusOneFilter = 0;
  let seatFilter = 2;
  let nameFilter = '';
  let todoFilters = Object.fromEntries(data.todos.map((t) => [t.id, 2]));
  let groupFilter = '';

  $: guests = data.guests.filter((g) => {
    const f = nameFilter.toLowerCase();
    return (
      // Status
      {
        0: true,
        1: !g.reserved,
        2: g.reserved && !g.checkedIn && (g.attendingHolyMat || g.attendingReception),
        3: g.reserved && !(g.attendingHolyMat || g.attendingReception),
        4: g.checkedIn
      }[statusFilter] &&
      // Priority
      (priorityFilter == 0 || priorityFilter.toString() == g.priority) &&
      // plusOne
      {
        0: true,
        1: g.plusOneAllowed,
        2: !g.plusOneAllowed
      }[plusOneFilter] &&
      // Seated
      (g.chairId ? 1 : 0) != seatFilter &&
      // Todos
      g.todos.every((t) => (t.done ? 1 : 0) != todoFilters[t.todoId]) &&
      // Group
      (groupFilter == '' || g.group == groupFilter) &&
      // Name
      (g.nickName.toLowerCase().includes(f) ||
        g.id.includes(f) ||
        g.fullName?.toLowerCase().includes(f) ||
        (g.additionalGuests
          ? g.additionalGuests.some((g) => g.fullName.toLowerCase().includes(f))
          : false))
    );
  });

  // Additional Columns
  let additionalCollumns = {
    phoneNumber: false,
    groupName: false,
    chairTable: false,
    sendInvite: false
  };

  let todoColumns = Object.fromEntries(data.todos.map((t) => [t.id, false]));

  function sendInvitation(number: string, name: string, priority: string, id: string) {
    const domain = 'https://wa.me/';
    const numberSanitized = number.replace(/[\\ ()+-]/g, '').replace(/^0/, '62');
    let text = messages.invite.replace('{{name}}', name);
    text = text.replaceAll('{{id}}', id);

    if (priority == '3') {
      text = text.replace('{{reception}}', '');
    } else {
      text = text.replace('{{reception}}', messages.reception);
    }

    window.open(domain + numberSanitized + '?text=' + encodeURIComponent(text), '_blank');
  }

  function sendReminder(number: string, name: string, id: string) {
    const domain = 'https://wa.me/';
    const numberSanitized = number.replace(/[\\ ()+-]/g, '').replace(/^0/, '62');
    let text = messages.remind.replace('{{name}}', name);
    text = text.replace('{{id}}', id);

    window.open(domain + numberSanitized + '?text=' + encodeURIComponent(text), '_blank');
  }

  async function toggleTodo(guestTodo: GuestTodo) {
    await fetch(`${$page.url}?/toggleTodo`, {
      method: 'POST',
      body: JSON.stringify(guestTodo)
    });
  }
</script>

<section class="p-2">
  <div>
    <form method="POST" action="?/add" class="flex gap-1" use:addEnhance>
      <input
        class="input variant-glass"
        type="text"
        id="nickname"
        placeholder="Nick Name"
        bind:value={$addForm.nickName}
      />
      <input
        class="input variant-glass"
        type="text"
        id="phonenumber"
        placeholder="Phone Number"
        bind:value={$addForm.phoneNumber}
      />
      <input
        class="input variant-glass"
        type="search"
        id="groupnmae"
        placeholder="Group Name"
        bind:value={$addForm.group}
        use:popup={{
          event: 'focus-click',
          target: 'popupAutocomplete',
          placement: 'bottom'
        }}
      />
      <div data-popup="popupAutocomplete" class="card variant-filled p-4">
        <Autocomplete
          bind:input={$addForm.group}
          options={data.groups.map((g) => ({ label: g, value: g }))}
          on:selection={({ detail }) => {
            $addForm.group = detail.label;
          }}
        />
      </div>
      <select class="select" bind:value={$addForm.plusOneAllowed}>
        <option value={false}>+1 not allowed</option>
        <option value={true}>+1 allowed</option>
      </select>
      <select class="select" bind:value={$addForm.priority}>
        <option value="1">priority 1</option>
        <option value="2">priority 2</option>
        <option value="3">priority 3</option>
      </select>
      <button type="submit" class="variant-filled-success btn">+ Add New</button>
    </form>
    {#if $addErrors.nickName}
      <small class="text-error-300">{$addErrors.nickName}</small>
    {:else if $addErrors.phoneNumber}
      <small class="text-error-300">{$addErrors.phoneNumber}</small>
    {:else if $addErrors.group}
      <small class="text-error-300">{$addErrors.group}</small>
    {/if}
  </div>

  <div class="mt-6 flex gap-2">
    <button class="variant-filled btn" on:click={openGuestSummary}>Guest Summary</button>
    <button class="variant-filled btn" on:click={openCheckInSummary}>Check In Summary</button>
  </div>

  <div class="flex justify-between">
    <div class="mt-6 flex gap-2">
      <div class="input-group input-group-divider max-w-xs grid-cols-[auto_1fr_auto]">
        <div class="input-group-shim"><Search /></div>
        <input type="search" bind:value={nameFilter} placeholder="Filter Name..." />
      </div>

      <button
        class="variant-filled btn [&>*]:pointer-events-none"
        use:popup={{
          event: 'click',
          target: 'statusPopup',
          placement: 'bottom'
        }}
      >
        <span>Filters</span>
      </button>
      <div class="card variant-filled-surface" data-popup="statusPopup">
        <div class="flex gap-10 p-4">
          <div>
            <h4 class="h4 mb-4">Status</h4>
            <ListBox>
              <ListBoxItem bind:group={statusFilter} name="status" value={0}>all</ListBoxItem>
              <ListBoxItem bind:group={statusFilter} name="status" value={1}
                >Not Reserved</ListBoxItem
              >
              <ListBoxItem bind:group={statusFilter} name="status" value={2}
                >Reserved, Attending</ListBoxItem
              >
              <ListBoxItem bind:group={statusFilter} name="status" value={3}
                >Not Attending</ListBoxItem
              >
              <ListBoxItem bind:group={statusFilter} name="status" value={4}>Checked In</ListBoxItem
              >
            </ListBox>
            <br />
          </div>
          <div>
            <h4 class="h4 mb-4">Priority</h4>
            <ListBox>
              <ListBoxItem bind:group={priorityFilter} name="priority" value={0}>all</ListBoxItem>
              <ListBoxItem bind:group={priorityFilter} name="priority" value={1}>1</ListBoxItem>
              <ListBoxItem bind:group={priorityFilter} name="priority" value={2}>2</ListBoxItem>
              <ListBoxItem bind:group={priorityFilter} name="priority" value={3}>3</ListBoxItem>
            </ListBox>
            <br />
          </div>
          <div>
            <h4 class="h4 mb-4">Plus One</h4>
            <ListBox>
              <ListBoxItem bind:group={plusOneFilter} name="priority" value={0}>all</ListBoxItem>
              <ListBoxItem bind:group={plusOneFilter} name="priority" value={1}>Allowed</ListBoxItem
              >
              <ListBoxItem bind:group={plusOneFilter} name="priority" value={2}
                >Not Allowed</ListBoxItem
              >
            </ListBox>
            <br />
          </div>
          <div>
            <h4 class="h4 mb-4">Seat</h4>
            <ListBox>
              <ListBoxItem bind:group={seatFilter} name="seat" value={2}>all</ListBoxItem>
              <ListBoxItem bind:group={seatFilter} name="seat" value={1}>Unassigned</ListBoxItem>
              <ListBoxItem bind:group={seatFilter} name="seat" value={0}>Assigned</ListBoxItem>
            </ListBox>
            <br />
          </div>
          {#each data.todos as todo}
            <div>
              <h4 class="h4 mb-4">{todo.item}</h4>
              <ListBox>
                <ListBoxItem bind:group={todoFilters[todo.id]} name={todo.item} value={2}
                  >all</ListBoxItem
                >
                <ListBoxItem bind:group={todoFilters[todo.id]} name={todo.item} value={1}
                  >not done</ListBoxItem
                >
                <ListBoxItem bind:group={todoFilters[todo.id]} name={todo.item} value={0}
                  >done</ListBoxItem
                >
              </ListBox>
              <br />
            </div>
          {/each}
          <div>
            <h4 class="h4 mb-4">Groups</h4>
            <ListBox>
              <ListBoxItem bind:group={groupFilter} name="group" value="">all</ListBoxItem>
              {#each data.groups as group}
                <ListBoxItem bind:group={groupFilter} name="group" value={group}
                  >{group}</ListBoxItem
                >
              {/each}
            </ListBox>
          </div>
        </div>
      </div>

      <button
        class="variant-filled btn [&>*]:pointer-events-none"
        use:popup={{
          event: 'click',
          target: 'additionalColumnsPopup',
          placement: 'bottom'
        }}
      >
        Additional Columns
      </button>

      <div class="card variant-filled-surface p-4" data-popup="additionalColumnsPopup">
        <label class="flex items-center space-x-2">
          <input class="checkbox" type="checkbox" bind:checked={additionalCollumns.groupName} />
          <p>Group Name</p>
        </label>
        <label class="flex items-center space-x-2">
          <input class="checkbox" type="checkbox" bind:checked={additionalCollumns.phoneNumber} />
          <p>Phone Number</p>
        </label>
        <label class="flex items-center space-x-2">
          <input class="checkbox" type="checkbox" bind:checked={additionalCollumns.chairTable} />
          <p>Table and Chair</p>
        </label>
        <label class="flex items-center space-x-2">
          <input class="checkbox" type="checkbox" bind:checked={additionalCollumns.sendInvite} />
          <p>Send Invite</p>
        </label>
        {#each data.todos as todo}
          <label class="flex items-center space-x-2">
            <input class="checkbox" type="checkbox" bind:checked={todoColumns[todo.id]} />
            <p>todo: {todo.item}</p>
          </label>
        {/each}
      </div>

      <button
        class="variant-soft-error btn"
        on:click={() => {
          statusFilter = 0;
          priorityFilter = 0;
          seatFilter = 2;
          nameFilter = '';
          todoFilters = Object.fromEntries(data.todos.map((t) => [t.id, 2]));
          groupFilter = '';
        }}>Clear Filters</button
      >
    </div>
    <button class="variant-soft-success btn" on:click={() => invalidateAll()}><RefreshCcw /></button
    >
  </div>

  <div class="table-container mt-6">
    <table class="table table-hover">
      <thead>
        <tr>
          <th class="text-center">no</th>
          <th>Name</th>
          {#if additionalCollumns.groupName}
            <th>Group</th>
          {/if}
          {#if additionalCollumns.phoneNumber}
            <th>Phone Number</th>
          {/if}
          {#if additionalCollumns.chairTable}
            <th>Chair and Table Number</th>
          {/if}
          {#if additionalCollumns.sendInvite}
            <th>Send Invite</th>
          {/if}
          {#each data.todos as todo (todo.id)}
            {#if todoColumns[todo.id]}
              <th align="center">todo: {todo.item}</th>
            {/if}
          {/each}
          <th>status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {#each guests as guest, i (guest.id)}
          <tr>
            <td class="text-center">{i + 1}</td>
            <td>
              <button class=" btn underline" on:click={() => openDrawer(guest)}>
                {guest.nickName}
              </button>
            </td>
            {#if additionalCollumns.groupName}
              <td>{guest.group}</td>
            {/if}
            {#if additionalCollumns.phoneNumber}
              <td>{guest.phoneNumber}</td>
            {/if}
            {#if additionalCollumns.chairTable}
              <td>
                <div class="btn">
                  {#if guest.chair}
                    Table: {guest.chair.table.number}, Chair: {guest.chair.number}
                  {:else}
                    Unassigned
                  {/if}
                </div>
              </td>
            {/if}
            {#if additionalCollumns.sendInvite}
              <td>
                {#if guest.phoneNumber}
                  <div class="flex gap-2">
                    <button
                      on:click={() =>
                        sendInvitation(
                          String(guest.phoneNumber),
                          guest.nickName,
                          guest.priority,
                          guest.id
                        )}
                      class="variant-ringed btn">invite <ExternalLink class="pl-2" /></button
                    >
                    <button
                      on:click={() =>
                        sendReminder(String(guest.phoneNumber), guest.nickName, guest.id)}
                      class="variant-ringed btn">remind <ExternalLink class="pl-2" /></button
                    >
                  </div>
                {:else}
                  no WA number
                {/if}
              </td>
            {/if}
            {#each data.todos as todo, i (todo.id)}
              {#if todoColumns[todo.id]}
                <td align="center">
                  <input
                    class="checkbox variant-filled-tertiary [&>*]:pointer-events-none"
                    type="checkbox"
                    checked={guest.todos[i].done}
                    on:click={({ currentTarget }) => {
                      toggleTodo({
                        guestId: guest.id,
                        todoId: todo.id,
                        done: currentTarget.checked,
                        doneDate: null
                      });
                    }}
                    use:popup={{ event: 'hover', target: 'popupTodo', placement: 'top' }}
                  />
                  <div class="card variant-filled-primary p-4" data-popup="popupTodo">
                    {#if guest.todos[i].done}
                      <p>checked at {guest.todos[i].doneDate}</p>
                    {:else}
                      <p>click to check</p>
                    {/if}
                    <div class="variant-filled-primary arrow" />
                  </div>
                </td>
              {/if}
            {/each}
            <td>
              {#if !guest.reserved}
                <a
                  href="/{guest.id}/rsvp"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="variant-soft-error btn">Not Reserved</a
                >
              {:else if guest.checkedIn}
                <a
                  class="variant-soft-success btn"
                  href="/{guest.id}/rsvp?modify=true"
                  target="_blank"
                  rel="noopener noreferrer">Checked In</a
                >
              {:else if guest.attendingReception || guest.attendingHolyMat}
                <button class="variant-soft-warning btn" on:click={() => checkIn(guest)}
                  >Reserved</button
                >
              {:else}
                <button class="variant-soft-surface btn" disabled>Not Attending</button>
              {/if}</td
            >
            <td
              ><button on:click={() => deleteGuest(guest)}><X class="stroke-error-700" /></button>
            </td>
          </tr>
          {#if guest.additionalGuests}
            {#each guest.additionalGuests as additionalGuest}
              <tr>
                <td> </td>
                <td>
                  <button
                    class="btn pl-12 underline"
                    on:click={() =>
                      openDrawer({ ...additionalGuest, nickName: additionalGuest.fullName })}
                  >
                    {additionalGuest.fullName}
                  </button>
                </td>
                {#if additionalCollumns.groupName}
                  <td></td>
                {/if}
                {#if additionalCollumns.phoneNumber}
                  <td>{additionalGuest.phoneNumber}</td>
                {/if}
                {#if additionalCollumns.chairTable}
                  <td>
                    <div class="btn">
                      {#if additionalGuest.chair}
                        Table: {additionalGuest.chair.table.number}, Chair: {additionalGuest.chair
                          .number}
                      {:else}
                        Unassigned
                      {/if}
                    </div>
                  </td>
                {/if}
                {#if additionalCollumns.sendInvite}
                  <td> </td>
                {/if}
                {#each data.todos as todo (todo.id)}
                  {#if todoColumns[todo.id]}
                    <td></td>
                  {/if}
                {/each}
                <td><button class="variant-soft-surface btn" disabled>Additional Guest</button></td>
                <td> </td>
              </tr>
            {/each}
          {/if}
        {/each}
      </tbody>
    </table>
  </div>
</section>
