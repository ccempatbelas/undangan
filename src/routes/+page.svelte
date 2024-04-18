<script lang="ts">
  import { audio, cover, muted } from '@/lib/stores';
  import { inview } from 'svelte-inview';
  import Section from '@/lib/components/layouts/Section.svelte';
  import { Volume2, CalendarPlus, Image, VolumeX, ArrowLeft, ArrowRight } from 'lucide-svelte';
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
      <title>N&M Wedding</title>
      <meta name="the description" content="Svelte demo app" />
      <link rel="preload" href="/images/veil_top.png" as="image" />
      <link rel="preload" href="/images/veil_bot.png" as="image" />
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
<img src={img} alt="invisible" hidden />
  <div class="bg-nebula relative flex justify-center overflow-hidden">
    <div class="max-w-5xl">
      <header
        id="head"
        class="flex justify-center"
        transition:fade={{ duration: 3000 }}
      >
          <div
            class="animShow gradient-heading flex flex-col items-center gap-8 from-primary-400 via-primary-200 to-primary-100 pt-4 md:mb-[32rem]"
          >
            <h1 class="h1 shadow-primary-300 text-shadow">CC 2014 10 Tahun!!!</h1>
            <h2 class="h4">Ketemuan yuuuu</h2>
          </div>
      </header>

      <Section id="gallery" title="" class="mb-12">
        <div class="mb-10 mt-10 flex justify-center object-none object-bottom">
          <div class="variant-glass flex items-center justify-center">
            <img
              class="aspect-square max-h-full w-full max-w-xl rounded-md object-cover"
              src="/images/0.jpg"
              alt="meet gif"
            />
          </div>
        </div>

        <div class="grid grid-cols-[auto_1fr_auto] items-center">
          <!-- Button: Left -->
          <button
            type="button"
            class="variant-filled btn-icon max-sm:hidden"
            on:click={multiColumnLeft}
          >
            <ArrowLeft />
          </button>
          <!-- Carousel -->
          <div
            bind:this={elemGallery}
            class="flex snap-x snap-mandatory gap-2 overflow-x-auto scroll-smooth pb-2"
          >
            {#each imagePaths as path, i}
              <button class="w-[42%] shrink-0 snap-start md:w-[28%]" on:click={() => openImage(i)}>
                <div class="variant-glass">
                  <img
                    class="aspect-square max-h-full w-full rounded-md object-cover hover:scale-105"
                    src={path}
                    loading="lazy"
                    alt="image {imagePaths}"
                  />
                </div>
              </button>
            {/each}
          </div>
          <!-- Button-Right -->
          <button
            type="button"
            class="variant-filled btn-icon max-sm:hidden"
            on:click={multiColumnRight}
          >
            <ArrowRight />
          </button>
        </div>
      </Section>

      <Section id="schedule" title="Makan Malam Santai">
        <h1 class="h1 mb-4 mt-12">Sabtu, 27 Juli 2024</h1>
        <div
          class="flex justify-center opacity-0"
          use:inview={animOptions}
          class:animRight={inviewFlag.holyMat}
          on:inview_change={({ detail }) => (inviewFlag.holyMat = detail.inView)}
        >
          <div class="relative  mr-4 basis-3/5 text-right xs:basis-1/2">
            <p>
              <span class="h2 text-primary-200"></span>
            </p>
            <h3 class="h3 mt-4">Jam dan tempat</h3>
            <p>akan diinformasikan segera!</p>

          </div>
        </div>
        <div
          class="flex justify-center opacity-0"
          use:inview={animOptions}
          class:animLeft={inviewFlag.holyMat}
          on:inview_change={({ detail }) => (inviewFlag.holyMat = detail.inView)}
        >
          <div class="relative mr-4 basis-3/5 text-left xs:basis-1/2">
            <p>
              <span class="h2 text-primary-200"></span>
            </p>
            <h3 class="h3 mt-4">Simpan tanggal dulu</h3>
            <p>don't miss it</p>

          </div>
        </div>
      </Section>

      <Section id="rsvp" title="Nanti absen ya">
        <div
          class="mb-64 mt-8 flex justify-center object-none object-bottom opacity-0"
          use:inview={{ unobserveOnEnter: true }}
          class:animFade={inviewFlag.rsvp}
          on:inview_change={({ detail }) => (inviewFlag.rsvp = detail.inView)}
        >
          <div class="flex max-h-full w-full max-w-lg flex-col justify-center gap-8">
            <p class="text-center">
              More information coming soon!
            </p>
              <div class="relative">
                <div
                  class="gradient-heading animScale rounded-lg border border-primary-200 from-primary-500 to-primary-50 px-8 py-4 text-3xl shadow-primary-300 text-shadow-sm md:text-5xl"
                >
                  RSVP belum buka
                </div>
              </div>
          </div>
        </div>
      </Section>
    </div>
  </div>
