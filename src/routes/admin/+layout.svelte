<script lang="ts">
  import { X, Activity, ListTodo, TableProperties, LayoutDashboard, Gift } from 'lucide-svelte';
  import { Drawer, getDrawerStore, TabGroup, TabAnchor } from '@skeletonlabs/skeleton';
  import Center from '@/lib/components/layouts/Center.svelte';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { enhance } from '$app/forms';

  let pass = '';
  const drawerStore = getDrawerStore();

  onMount(() => {
    const cachedPass = localStorage.getItem('pass');
    if (cachedPass != null) {
      pass = cachedPass;
    }
  });
</script>

<Drawer>
  <button class="btn" on:click={drawerStore.close}>
    <X class="stroke-error-700" />
  </button>
  <div class="prose m-5 dark:prose-invert">
    <h1 class="h1">{$drawerStore.meta.nickName}</h1>
    <form action="?/update" method="POST" use:enhance>
      <table class="table-compact">
        <tbody>
          {#each Object.entries($drawerStore.meta) as [key, value]}
            <tr class="border-0">
              <td class="table-cell-fit pr-20 font-bold">{key}</td>
              {#if typeof value == 'string'}
                <input class="input" type="text" name={key} placeholder="null" {value} />
              {:else}
                <td>{value}</td>
              {/if}
            </tr>
          {/each}
        </tbody>
      </table>
      <button type="submit" class="variant-filled btn" on:click={drawerStore.close}>Save</button>
    </form>
  </div>
</Drawer>

{#if pass == 'masuk'}
  <script lang="ts">
    localStorage.setItem('pass', 'gibpei');
  </script>
  <div class="flex min-h-screen flex-col">
    <TabGroup justify="justify-center" active="variant-filled">
      <TabAnchor href="/admin" selected={$page.url.pathname === '/admin'}>
        <div class="flex w-36 items-center justify-center">
          <TableProperties />
          <span class="ml-4">Guests</span>
        </div>
      </TabAnchor>
      <TabAnchor href="/admin/todo" selected={$page.url.pathname === '/admin/todo'}>
        <div class="flex w-36 items-center justify-center">
          <ListTodo />
          <span class="ml-4">Todo</span>
        </div>
      </TabAnchor>
      <TabAnchor href="/admin/table" selected={$page.url.pathname === '/admin/table'}>
        <div class="flex w-36 items-center justify-center">
          <LayoutDashboard />
          <span class="ml-4">Table Layout</span>
        </div>
      </TabAnchor>
      <TabAnchor href="/admin/registry" selected={$page.url.pathname === '/admin/registry'}>
        <div class="flex w-36 items-center justify-center">
          <Gift />
          <span class="ml-4">Gift Registry</span>
        </div>
      </TabAnchor>
      <TabAnchor href="/admin/activity" selected={$page.url.pathname === '/admin/activity'}>
        <div class="flex w-36 items-center justify-center">
          <Activity />
          <span class="ml-4">Activity Log</span>
        </div>
      </TabAnchor>
    </TabGroup>
    <slot />
  </div>
{:else}
  <Center>
    <div class="card variant-glass p-10">
      <input type="text" bind:value={pass} class="input" placeholder="pass" />
    </div>
  </Center>
{/if}
