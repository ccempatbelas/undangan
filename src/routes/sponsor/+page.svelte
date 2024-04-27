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
<img src={img} alt="invisible" hidden />
<div class="bg-nebula relative flex justify-center overflow-hidden">
  <div class="max-w-5xl">
    <header id="head" class="flex justify-center" transition:fade={{ duration: 3000 }}>
      <div
        class="animShow gradient-heading flex flex-col items-center gap-8 from-primary-400 via-primary-200 to-primary-100 pt-4"
      >
        <h1 class="h1 text-primary-500">CC14 10 Tahun!!!</h1>
      </div>
    </header>

      <Section id="rsvp" title="This event is supported by" title-class="h4 text-secondary-500">
        <div
          class="mb-64 mt-8 flex justify-center object-none object-bottom opacity-0"
          use:inview={{ unobserveOnEnter: true }}
          class:animFade={inviewFlag.rsvp}
          on:inview_change={({ detail }) => (inviewFlag.rsvp = detail.inView)}
        >
          <div class="flex max-h-full w-full max-w-lg flex-col justify-center gap-8">
            <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/locahouse.id/" class="flex w-full flex-col items-center justify-center"
              ><div class="relative border border-primary-200 shadow-primary-300">
                <img
                  src="/images/logo-loca-house.png"
                  alt="click"
                />
              </div>
              <div>
                Cafe, Resto, Catering, Private Event
              </div>
            </a>
          </div>
        </div>
        <p class="text-center">
          Want to support this event? Contact <a
            class="text-primary-300 underline"
            target="_blank"
            href="https://wa.me/628999966385">here</a
          > :)
        </p>
      </Section>

    <p class="mb-20 text-center text-sm text-primary-200 [&>*]:pointer-events-none">
      still building more exciting stuff here
    </p>
  </div>
</div>
