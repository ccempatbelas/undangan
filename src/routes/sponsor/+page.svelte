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



  // Anmimation
  let animOptions = {
    rootMargin: '-100px',
    unobserveOnEnter: true
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

      <Section id="rsvp" title="This event is supported by" title-class="h4 text-secondary-500">
        <div
          class="mb-64 mt-8 flex justify-center object-none object-bottom opacity-0"
          use:inview={{ unobserveOnEnter: true }}
          class:animFade={true}
          on:inview_change={({ detail }) => (true)}
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
          Want to support this event? Check <a
              class="text-primary-300 underline"
              href="/backers">here</a
            > or contact <a
            class="text-primary-300 underline"
            target="_blank"
            href="https://wa.me/628999966385">DL</a
          > :)
        </p>
      </Section>

    <p class="mb-20 text-center text-sm text-primary-200 [&>*]:pointer-events-none">
      still building more exciting stuff here
    </p>
  </div>
</div>
