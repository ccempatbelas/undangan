<script lang="ts">
  import { Home, Coins, Users, PencilLine } from 'lucide-svelte';
  import { TabGroup, TabAnchor } from '@skeletonlabs/skeleton';
  import { page } from '$app/stores';
</script>

<div style="position: fixed;bottom:0; width:100%;font-size:12px;">
  <TabGroup
    justify="justify-center"
    active="variant-filled-primary"
    hover="hover:variant-soft-primary"
    flex="flex-1 lg:flex-none"
    rounded=""
    border="border-token"
    class="bg-surface-100-800-token w-full"
  >
    <TabAnchor  href="/" selected={$page.url.pathname === '' || $page.url.pathname ===  '/'}>
      <div class="flex items-center justify-center"><Home /></div>
      <div><span>Home</span></div>
    </TabAnchor>
    <TabAnchor href="/rsvp" selected={$page.url.pathname === '/rsvp' || $page.url.pathname ===  '/rsvp/'}>
      <div class="flex items-center justify-center"><PencilLine /></div>
      <div><span>RSVP</span></div>
    </TabAnchor>
    <TabAnchor href="/backers" selected={$page.url.pathname === '/backers' || $page.url.pathname ===  '/backers/'}>
      <div class="flex items-center justify-center"><Users /></div>
      <div><span>Backers</span></div>
    </TabAnchor>
    <TabAnchor href="/become-backers"  selected={$page.url.pathname === '/become-backers' || $page.url.pathname === '/become-backers/'}>
      <div class="flex items-center justify-center"><Coins /></div>
      <div><span>Support Us</span></div>
    </TabAnchor>
  </TabGroup>
</div>