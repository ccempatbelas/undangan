<script lang="ts">
  import { enhance } from '$app/forms';
  import { DateTime, Duration } from 'luxon';
  import { Check, X } from 'lucide-svelte';
  import { superForm } from 'sveltekit-superforms/client';

  export let data;

  const dateFormat = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  } as const;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const {
    form: addForm,
    errors: addErrors,
    enhance: addEnhance
  } = superForm(data.addForm, {
    dataType: 'json',
    resetForm: true,
    taintedMessage: null
  });

  // due date
  let dueDate = DateTime.local().toFormat('yyyy-MM-dd');
  const daysMilli = Duration.fromObject({ days: 1 }).as('milliseconds');

  $: $addForm.dueDate = DateTime.fromFormat(dueDate, 'yyyy-MM-dd')
    .setZone('Asia/Jakarta')
    .toJSDate();

  function dueDateText(dueDate: Date) {
    const diff = dueDate.valueOf() - today.valueOf();
    if (diff < 0) {
      return '<td class="text-error-500">Overdue!</td>';
    } else if (diff < daysMilli) {
      return '<td class="text-error-500">Today</td>';
    } else if (diff < 2 * daysMilli) {
      return '<td class="text-warning-500">Tommorow</td>';
    } else if (diff < 3 * daysMilli) {
      return `<td class="text-warning-500">${dueDate.toLocaleDateString(
        undefined,
        dateFormat
      )}</td>`;
    } else {
      return `<td>${dueDate.toLocaleDateString(undefined, dateFormat)}</td>`;
    }
  }

  $: todos = data.todos
    .filter((t) => !t.done)
    .sort((a, b) => {
      if (a.done) {
        return 1;
      } else {
        return a.dueDate.getTime() - b.dueDate.getTime();
      }
    });
  $: dones = data.todos.filter((t) => t.done);
</script>

<h1 class="h1 mb-4 text-primary-200">
  {today.toLocaleDateString(undefined, dateFormat)}
</h1>

<div>
  <form method="POST" action="?/add" class="flex gap-1" use:addEnhance>
    <select class="select basis-1/6" bind:value={$addForm.guestAction}>
      <option value={false}>admin todo</option>
      <option value={true}>guest action</option>
    </select>
    <input
      class="input variant-glass basis-7/12"
      type="text"
      placeholder="todo item"
      bind:value={$addForm.item}
    />
    <input class="input variant-glass basis-1/6" type="date" bind:value={dueDate} />
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

{#if data.todos.length == 0}
  <div class="variant-glass h2 p-4 text-center">Todo all clear</div>
{:else}
  <table class="table table-hover table-compact">
    <thead>
      <tr>
        <th>Type</th>
        <th>Due Date</th>
        <th>Todo Item</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {#each todos as todo (todo.id)}
        <tr>
          <td
            >{#if todo.guestAction}
              <span class="variant-filled-tertiary badge">Guest</span>
            {:else}
              <span class="variant-filled badge">Admin</span>
            {/if}</td
          >
          {#key todo.dueDate}
            {@html dueDateText(todo.dueDate)}
          {/key}
          <td>{todo.item}</td>
          <td class="w-32"
            ><div class="flex gap-20">
              <form method="POST" action="?/done" use:enhance>
                <input type="hidden" name="item" value={todo.item} />
                <button name="id" value={todo.id} type="submit" class="btn"
                  ><Check class="stroke-success-700" /></button
                >
              </form>
              <form method="POST" action="?/remove" use:enhance>
                <input type="hidden" name="item" value={todo.item} />
                <button name="id" value={todo.id} type="submit" class="btn"
                  ><X class="stroke-error-700" /></button
                >
              </form>
            </div></td
          >
        </tr>
      {/each}
    </tbody>

    <tbody>
      {#each dones as done (done.id)}
        <tr>
          <td
            >{#if done.guestAction}
              <span class="variant-filled-tertiary badge">Guest</span>
            {:else}
              <span class="variant-filled badge">Admin</span>
            {/if}</td
          >
          <td class="text-success-500"
            >done {done.dueDate.toLocaleDateString(undefined, dateFormat)}</td
          >
          <td>{done.item}</td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}
