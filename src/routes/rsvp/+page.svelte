<script lang="ts">
  import Section from '@/lib/components/layouts/Section.svelte';
  import NavBar from '@/lib/components/NavBar.svelte';
  import SupportedBy from '@/lib/components/SupportedBy.svelte';
</script>

<svelte:head>
  <title>CC14 10 tahun</title>
  <meta name="the description" content="Svelte demo app" />
</svelte:head>

<!-- For Eager loading -->
<div class="relative flex justify-center overflow-hidden">
  <div class="max-w-5xl">
    <header id="head" class="flex justify-center">
      <div
        class="animShow gradient-heading flex flex-col items-center gap-8 from-primary-400 via-primary-200 to-primary-100 pt-4"
      >
        <h1 class="h1 text-primary-500">CC14 10 Tahun!!!</h1>
      </div>
    </header>
      <div class="h4 text-secondary-500" style="margin-top: 200px;margin-bottom:200px;text-align:center;">
      Halaman ini lagi dibangun nih.
      <br>
      Tunggu 1 Juni ya :3
      </div>
      <SupportedBy />
  </div>
</div>
<NavBar />
