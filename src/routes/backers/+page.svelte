<script lang="ts">
  import { audio, cover, muted } from '@/lib/stores';
  import { inview } from 'svelte-inview';
  import Section from '@/lib/components/layouts/Section.svelte';
  import { Volume2, CalendarPlus, Image, Home, ArrowLeft, ArrowRight } from 'lucide-svelte';
  import { fade } from 'svelte/transition';
  import { superForm } from 'sveltekit-superforms/client';
  import ShootingStar from '@/lib/components/ShootingStar.svelte';
  import {
    getModalStore,
    type ModalSettings,
    type ModalComponent,
    popup,
    type PopupSettings
  } from '@skeletonlabs/skeleton';
  import ImageModal from '@/lib/components/modals/ImageModal.svelte';
  import { onMount } from 'svelte';
  import Nav from '@/lib/components/Nav.svelte';
  import Cover from '@/lib/components/Cover.svelte';

  // Load Data
  export let data;
  const modalStore = getModalStore();

  const { form: guest } = superForm(data.guest, {
    dataType: 'json'
  });

  // Days remaining
  const daysRemaining = Math.ceil(
    (new Date(new Date().getFullYear(), 7, 27).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24)
  );

  // Gallery Images
  const allImages = Object.keys(import.meta.glob('static/images/placeholder/*')).map((p) =>
    p.replace('/static', '')
  );
  let imagePaths = allImages;
  let img = '';
  onMount(() => {
    if ($guest.id) {
      localStorage.setItem('code', $guest.id);
    }
    img = '/images/cover.jpg';
  });

  function openImage(i: number): void {
    const c: ModalComponent = { ref: ImageModal };
    const modal: ModalSettings = {
      type: 'component',
      component: c,
      meta: { images: imagePaths, index: i }
    };
    modalStore.trigger(modal);
  }

  let visible = false;

  // Anmimation
  let animOptions = {
    rootMargin: '-100px',
    unobserveOnEnter: true
  };

  let inviewFlag = {
    holyMat: false,
    reception: false,
    rsvp: false,
    gift: false
  };

  let elemGallery: HTMLDivElement;

  function multiColumnLeft(): void {
    let x = elemGallery.scrollWidth;
    if (elemGallery.scrollLeft !== 0) x = elemGallery.scrollLeft - elemGallery.clientWidth;
    elemGallery.scroll(x, 0);
  }

  function multiColumnRight(): void {
    let x = 0;
    // -1 is used because different browsers use different methods to round scrollWidth pixels.
    if (elemGallery.scrollLeft < elemGallery.scrollWidth - elemGallery.clientWidth - 1)
      x = elemGallery.scrollLeft + elemGallery.clientWidth;
    elemGallery.scroll(x, 0);
  }

  // popup
  const popupHover: PopupSettings = {
    event: 'hover',
    target: 'popupHover',
    placement: 'top'
  };
</script>

<svelte:head>
  <title>CC14 10 tahun</title>
  <meta name="the description" content="Svelte demo app" />
</svelte:head>

<svelte:window
  on:scroll={() => {
    if (window.scrollY > window.innerHeight / 8) {
      visible = true;
    } else {
      visible = false;
    }
  }}
/>

<!-- For Eager loading -->
<div class="bg-nebula relative flex justify-center overflow-hidden">
  <div class="max-w-5xl">
    <header id="head" class="flex justify-center" transition:fade={{ duration: 3000 }}>
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
          >. Tidak ada deadline.
        </p>
        </div>
        <div class="relative flex max-h-full w-full max-w-lg flex-col justify-center gap-2">
                <img
                  src="/images/sponsor-graph.png"
                  alt="sponsor-graph.png"
                  class="mt-4"
                />
         </div>
        <div class="mb-2 mt-16 flex justify-left">
          <h3 class="text-primary-500">Tier 4 - nyumbang aja</h3>
        </div>
        <div class="flex justify-left text-secondary-500">
          Minimum 200 ribu, ga ada maksimum.
        </div>
        <div class="flex justify-left">
          <p class="justify-left">
            Nama ditulis di banner, poster, dan website <a
               class="text-primary-500 underline"
               href="/sponsor">kanisius14.cc/sponsor</a>
          </p>
        </div>
        <div class="relative border border-secondary-200 shadow-primary-300 flex max-h-full w-full max-w-lg flex-col justify-center gap-2">
        <img
          src="/images/poster-example.jpeg"
          alt="poster-example.jpeg"
          class="mt-4"
        />
        </div>


        <div class="mb-2 mt-16 flex justify-left">
          <h3 class="text-primary-500">Tier 3 - Sambil ngiklan (Recommended)</h3>
        </div>
        <div class="flex justify-left text-secondary-500">
          500 ribu
        </div>
        <div class="flex justify-center">
          <p class="justify-center">
            Logo atau foto di banner, poster, dan website <a
               class="text-primary-500 underline"
               href="/sponsor">kanisius14.cc/sponsor</a>
          </p>
        </div>

        <div class="relative border border-secondary-200 shadow-primary-300 flex max-h-full w-full max-w-lg flex-col justify-center gap-2">
        <img
          src="/images/contoh-halaman-sponsor.jpg"
          alt="contoh-halaman-sponsor.jpg"
          class="mt-4"
        />
        </div>
        <div class="flex justify-center mt-8">
          <p class="justify-center">
            Dapat setengah halaman di 10th anniversary yearbook. Bebas mau diisi apapun, ga ngiklan jg gpp.
          </p>
        </div>

        <div>
          <div class="flex max-h-full w-full max-w-lg flex-col justify-center gap-8">

            <div class="relative border border-primary-200 shadow-primary-300 flex max-h-full w-full max-w-lg flex-col justify-center gap-2">
              <div>
                Contoh halaman yang biasa.
              </div>
                <img
                  src="/images/yearbook-tanpa-sponsor.jpg"
                  alt="yearbook-tanpa-sponsor.jpg"
                />
            </div>

            <div class="relative border border-primary-200 shadow-primary-300 flex max-h-full w-full max-w-lg flex-col justify-center gap-2">
              <div>
                Contoh halaman yang ngesponsor.
              </div>
                <img
                  src="/images/yearbook-sponsored.jpg"
                  alt="yearbook-sponsored.jpg"
                />
            </div>
          </div>
        </div>


        <div class="mb-2 mt-16 flex justify-left">
          <h3 class="text-primary-500">Tier 2 - mau flexing</h3>
        </div>
        <div class="flex justify-left text-secondary-500">
          5 juta
        </div>
        <div class="flex justify-center">
          <p class="justify-center">
            Logo lebih besar, posisi lebih awal.
          </p>
        </div>
        <div class="flex justify-center">
          <p class="justify-center">
            Dapat X banner atau standing banner yang akan ada saat acara.
          </p>
        </div>
        <div class="flex justify-center">
          <p class="justify-center">
            Bisa berdiskusi untuk benefit yang lebih sesuai dengan kebutuhan backer.
          </p>
        </div>


        <div class="mb-2 mt-16 flex justify-left">
          <h3 class="text-primary-500">Tier 1 - bayarin semua</h3>
        </div>
        <div class="flex justify-left text-secondary-500">
          20 juta
        </div>
        <div class="flex justify-center">
          <p class="justify-center">
            Hanya ada 1 backer untuk tier ini.
          </p>
        </div>
        <div class="flex justify-center">
          <p class="justify-center">
            Nama akan dicantumkan di nama acara. Seperti "Reuni 10 tahun by Lorem"
          </p>
        </div>
        <div class="flex justify-center">
          <p class="justify-center">
            Logo paling besar, posisi paling awal.
          </p>
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
          href="https://wa.me/628999966385">DL</a
        >
      </p>
      </div>

      <button
        class="fixed left-3 opacity-70 backdrop-blur-sm max-md:top-3 md:bottom-6 md:left-6"
        onclick="location.href='/'"
      >
        <div class="variant-filled relative aspect-square rounded-full p-2">
            <Home  />
        </div>
      </button>
  </div>
</div>
