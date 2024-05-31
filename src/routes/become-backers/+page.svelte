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

    <Section id="rsvp" title="Mari menjadi Backers">
      <div class="mt-16">
        <p class="text-center">
          Mau jadi backers? Contact <a
            class="text-primary-300 underline"
            target="_blank"
            href="https://wa.me/628999966385">DL</a
          > atau
          <a class="text-primary-300 underline" target="_blank" href="https://forms.gle/R8tGcz5UwGXbWn4V9"
          >isi ini</a>. Tidak ada deadline.
        </p>
      </div>
      <div class="relative flex max-h-full w-full max-w-lg flex-col justify-center gap-2">
        <img src="/images/sponsor-graph.png" alt="sponsor-graph.png" class="mt-4" />
      </div>
      <div class="justify-left mb-2 mt-16 flex">
        <h3 class="text-primary-500">Tier 4 - nyumbang aja</h3>
      </div>
      <div class="justify-left flex text-secondary-500">Minimum 200 ribu, ga ada maksimum.</div>
      <div class="justify-left flex">
        <p class="justify-left">
          Nama ditulis di banner, poster, dan website <a
            class="text-primary-500 underline"
            href="/backers">kanisius14.cc/backers</a
          >
        </p>
      </div>
      <div
        class="relative flex max-h-full w-full max-w-lg flex-col justify-center gap-2 border border-secondary-200 shadow-primary-300"
      >
        <img src="/images/poster-example.jpeg" alt="poster-example.jpeg" class="mt-4" />
      </div>

      <div class="justify-left mb-2 mt-16 flex">
        <h3 class="text-primary-500">Tier 3 - Sambil ngiklan (Recommended)</h3>
      </div>
      <div class="justify-left flex text-secondary-500">500 ribu</div>
      <div class="flex justify-center">
        <p class="justify-center">
          Logo atau foto di banner, poster, dan website <a
            class="text-primary-500 underline"
            href="/backers">kanisius14.cc/backers</a
          >
        </p>
      </div>

      <div
        class="relative flex max-h-full w-full max-w-lg flex-col justify-center gap-2 border border-secondary-200 shadow-primary-300"
      >
        <img
          src="/images/contoh-halaman-sponsor.jpg"
          alt="contoh-halaman-sponsor.jpg"
          class="mt-4"
        />
      </div>
      <div class="mt-8 flex justify-center">
        <p class="justify-center">
          Dapat setengah halaman di 10th anniversary yearbook. Bebas mau diisi apapun, ga ngiklan jg
          gpp.
        </p>
      </div>

      <div>
        <div class="flex max-h-full w-full max-w-lg flex-col justify-center gap-8">
          <div
            class="relative flex max-h-full w-full max-w-lg flex-col justify-center gap-2 border border-primary-200 shadow-primary-300"
          >
            <div>Contoh halaman yang biasa.</div>
            <img src="/images/yearbook-tanpa-sponsor.jpg" alt="yearbook-tanpa-sponsor.jpg" />
          </div>

          <div
            class="relative flex max-h-full w-full max-w-lg flex-col justify-center gap-2 border border-primary-200 shadow-primary-300"
          >
            <div>Contoh halaman yang ngesponsor.</div>
            <img src="/images/yearbook-sponsored.jpg" alt="yearbook-sponsored.jpg" />
          </div>
        </div>
      </div>

      <div class="justify-left mb-2 mt-16 flex">
        <h3 class="text-primary-500">Tier 2 - mau flexing</h3>
      </div>
      <div class="justify-left flex text-secondary-500">5 juta</div>
      <div class="flex justify-center">
        <p class="justify-center">Logo lebih besar, posisi lebih awal.</p>
      </div>
      <div class="flex justify-center">
        <p class="justify-center">Dapat X banner atau standing banner yang akan ada saat acara.</p>
      </div>
      <div class="flex justify-center">
        <p class="justify-center">
          Bisa berdiskusi untuk benefit yang lebih sesuai dengan kebutuhan backer.
        </p>
      </div>

      <div class="justify-left mb-2 mt-16 flex">
        <h3 class="text-primary-500">Tier 1 - bayarin semua</h3>
      </div>
      <div class="justify-left flex text-secondary-500">20 juta</div>
      <div class="flex justify-center">
        <p class="justify-center">Hanya ada 1 backer untuk tier ini.</p>
      </div>
      <div class="flex justify-center">
        <p class="justify-center">
          Nama akan dicantumkan di nama acara. Seperti "Reuni 10 tahun by Lorem"
        </p>
      </div>
      <div class="flex justify-center">
        <p class="justify-center">Logo paling besar, posisi paling awal.</p>
      </div>
      <div class="flex justify-center">
        <p class="justify-center">
          Bisa berdiskusi untuk benefit yang lebih sesuai dengan kebutuhan backer.
        </p>
      </div>
    </Section>

    <div class="mb-20 text-center text-sm">
      <p class="text-center">
        Mau jadi backers? Contact <a
          class="text-primary-300 underline"
          target="_blank"
          rel="noopener noreferrer"
          href="https://wa.me/628999966385">DL</a
        > atau
        <a class="text-primary-300 underline" target="_blank" href="https://forms.gle/R8tGcz5UwGXbWn4V9"
        >isi ini</a>. Cek yang sudah jadi
        <a
          class="text-secondary-300 underline"
          href="/backers">backers</a
        >
      </p>
    </div>
    <SupportedBy />
  </div>
</div>
<NavBar />
