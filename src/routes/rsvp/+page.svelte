<script lang="ts">
  import Section from '@/lib/components/layouts/Section.svelte';
  import NavBar from '@/lib/components/NavBar.svelte';
  import SupportedBy from '@/lib/components/SupportedBy.svelte';
  import PageHeader from '@/lib/components/PageHeader.svelte';
</script>

<svelte:head>
  <title>CC14 10 tahun</title>
  <meta name="the description" content="Svelte demo app" />
</svelte:head>

<!-- For Eager loading -->
<div class="relative flex justify-center overflow-hidden">
  <div class="max-w-5xl">
    <PageHeader />
    <div class="h4 text-secondary-500" style="margin-top: 200px;margin-bottom:200px;text-align:center;">
      Halaman ini lagi dibangun nih.
      <br>
      Tunggu 1 Juni ya :3
    </div>
    <SupportedBy />
  </div>
</div>
<NavBar />
