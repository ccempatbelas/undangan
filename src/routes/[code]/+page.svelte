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
    (new Date(new Date().getFullYear(), 11, 30).getTime() - new Date().getTime()) /
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

{#if $cover}
  <Cover nickName={$guest.nickName} />
{:else}
  <div class="bg-nebula relative flex justify-center overflow-hidden">
    <div class="max-w-5xl">
      <header
        id="head"
        class="mb-32 flex justify-center md:mb-60"
        transition:fade={{ duration: 3000 }}
      >
        <div
          class="relative flex h-screen w-full max-w-3xl flex-col justify-end bg-stars bg-cover bg-center supports-[height:100cqh]:h-[100cqh] supports-[height:100svh]:h-[100svh] md:bg-bottom md:shadow-[0_0_100px_-40px] md:shadow-primary-100"
        >
          <div class="absolute top-0 h-2/5 w-full overflow-hidden">
            {#each { length: 5 } as _}
              <ShootingStar />
            {/each}
          </div>
          <div
            class="animShow gradient-heading mb-96 flex flex-col items-center gap-8 from-primary-400 via-primary-200 to-primary-100 pt-4 md:mb-[32rem]"
          >
            <h2 class="h4 font-glester shadow-primary-300 text-shadow">{daysRemaining} days to</h2>
            <h1 class="h1 font-glester shadow-primary-300 text-shadow">Adventure Of A Lifetime</h1>
            <h2 class="h4 font-glester shadow-primary-300 text-shadow">30-12-2023</h2>
          </div>
        </div>
      </header>

      <Section id="schedule" title="Holy Matrimony">
        <h1 class="h1 mb-4 mt-12">30 December 2023</h1>
        <div
          class="flex opacity-0"
          use:inview={animOptions}
          class:animRight={inviewFlag.holyMat}
          on:inview_change={({ detail }) => (inviewFlag.holyMat = detail.inView)}
        >
          <div class="relative mr-4 basis-3/5 text-right xs:basis-1/2">
            <p>
              <span class="h2 text-primary-200">12:00 PM</span>
            </p>
            <h3 class="h3 mt-4">Santa Ursula Chapel</h3>
            <p>Jl. Pos No.2, Ps. Baru, Jakarta</p>
            <a
              class="variant-ringed-primary absolute bottom-0 right-0 flex items-center gap-2 rounded-md px-2"
              target="_blank"
              href="https://calendar.google.com/calendar/u/0?cid=MDQ4ZWJhZGUwYTlhMTVhZGY3ZDNlYjQ3NzQ1YWVlYTNlNDk2ZDc1OTYxYmI2NDEwNjdjOGM5ZTBmYTZiM2IyZkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t"
            >
              <CalendarPlus size="16" />
              add calendar</a
            >
          </div>
          <div class="flex basis-2/5 flex-col justify-center xs:basis-1/2">
            <div class="relative h-max">
              <div
                class="variant-glass absolute flex h-full w-full animate-pulse items-center justify-center"
              >
                Loading map...
              </div>
              <div class="h-52 w-full md:h-80">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15866.900595191473!2d106.8331398!3d-6.1675483!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5cf0e80aa3b%3A0x6e69f14f3cea6a69!2sKapel%20Santa%20Ursula!5e0!3m2!1sen!2sid!4v1692687273297!5m2!1sen!2sid"
                  class="h-full w-full"
                  title="Map"
                  style="border:0;filter: grayscale(70%) invert(87%)"
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {#if $guest.priority != '3'}
        <Section id="reception" title="Intimate Dinner Reception">
          <h1 class="h1 mb-4 mt-12">30 December 2023</h1>
          <div
            class="flex opacity-0"
            use:inview={animOptions}
            class:animLeft={inviewFlag.reception}
            on:inview_change={({ detail }) => (inviewFlag.reception = detail.inView)}
          >
            <div class="flex basis-2/5 flex-col justify-center xs:basis-1/2">
              <div class="relative h-max">
                <div
                  class="variant-glass absolute flex h-full w-full animate-pulse items-center justify-center"
                >
                  Loading map...
                </div>
                <div class="h-52 w-full md:h-80">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.5950986142097!2d106.8278623749492!3d-6.184907160599727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f43040ae2d5d%3A0x869c6c7a536c5938!2sPark%20Hyatt%20Jakarta!5e0!3m2!1sen!2sid!4v1691750152536!5m2!1sen!2sid"
                    class="h-full w-full"
                    title="Map"
                    style="border:0;filter: grayscale(70%) invert(87%)"
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
            <div class="relative ml-4 basis-3/5 text-left xs:basis-1/2">
              <p>
                <span class="h2 mr-4 text-primary-200">06:30 PM</span>
              </p>
              <h3 class="h3 mt-4">The Observatory at Level 36</h3>
              <p>Park Hyatt Jakarta, Jl. Kebon Sirih No.17-19, Menteng</p>
              <h3 class="h3 mt-4 max-md:hidden">Dress Code</h3>
              <p class="max-md:hidden">
                Wear your finest <span class="font-bold text-white">NON WHITE</span>
                formal attire and enjoy the
                <span class="gradient-heading from-rose-700 via-emerald-200 to-sky-700">party</span>
              </p>
              <a
                class="variant-ringed-primary absolute bottom-0 left-0 flex items-center gap-2 rounded-md px-2"
                target="_blank"
                href="https://calendar.google.com/calendar/u/0?cid=MDQ4ZWJhZGUwYTlhMTVhZGY3ZDNlYjQ3NzQ1YWVlYTNlNDk2ZDc1OTYxYmI2NDEwNjdjOGM5ZTBmYTZiM2IyZkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t"
              >
                <CalendarPlus size="16" />
                add calendar</a
              >
            </div>
          </div>

          <p class="mt-8 md:hidden">
            Feel free to wear your finest <span class="font-bold text-white">NON WHITE</span>
            formal attire and enjoy the
            <span class="gradient-heading from-rose-700 via-emerald-200 to-sky-700">party</span>
          </p>
        </Section>
      {/if}

      <Section id="gallery" title="Moments" class="mb-12">
        <span slot="logo"><Image size={32} class="stroke-primary-300" /></span>
        <div class="mb-10 mt-10 flex justify-center object-none object-bottom">
          <div class="variant-glass flex items-center justify-center">
            <img
              class="aspect-square max-h-full w-full max-w-xl rounded-md object-cover"
              src="/images/meet.gif"
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

      {#if $guest.priority == '1'}
        <Section id="registry" title="Gift" class="mb-12">
          <div
            class="opacity-0"
            use:inview={animOptions}
            class:animFade={inviewFlag.gift}
            on:inview_change={({ detail }) => (inviewFlag.gift = detail.inView)}
          >
            <p class="mt-8">
              Your love and presence on our special day mean the world to us, and if you'd like to
              celebrate our new chapter with a gift, here are our registry details.
            </p>

            <a href="/{$guest.id}/gift" class="variant-filled btn btn-lg mt-8">Gift Page</a>
          </div>
        </Section>
      {/if}

      <Section id="rsvp" title="Attendance Confirmation">
        <div
          class="mb-64 mt-8 flex justify-center object-none object-bottom opacity-0"
          use:inview={{ unobserveOnEnter: true }}
          class:animFade={inviewFlag.rsvp}
          on:inview_change={({ detail }) => (inviewFlag.rsvp = detail.inView)}
        >
          <div class="flex max-h-full w-full max-w-lg flex-col justify-center gap-8">
            <p class="text-center">
              Please kindly RSVP by clicking the button below. If you have any questions or require
              further information, please don't hesitate to contact our whatsapp <a
                class="text-primary-300 underline"
                target="_blank"
                href="https://wa.me/6287777438727">here.</a
              >
            </p>
            <a href="/{$guest.id}/rsvp" class="flex w-full flex-col items-center justify-center"
              ><div class="relative">
                <div
                  class="gradient-heading animScale rounded-lg border border-primary-200 from-primary-500 to-primary-50 px-8 py-4 text-3xl shadow-primary-300 text-shadow-sm md:text-5xl"
                >
                  RSVP Now!
                </div>
                <img
                  class="animClick absolute -bottom-6 -right-16 w-12 object-cover"
                  src="/images/click.png"
                  alt="click"
                />
              </div>
            </a>
          </div>
        </div>
      </Section>

      <p
        class="mb-20 text-center text-sm text-primary-200 [&>*]:pointer-events-none"
        use:popup={popupHover}
      >
        created with much ❤️ by the groom & bride
      </p>
      <div class="card variant-glass px-4 py-2" data-popup="popupHover">
        <p>Ask Nikolas to learn more about it</p>
        <div class="variant-glass arrow" />
      </div>
    </div>
    {#if visible}
      <Nav id={$guest.id} priority={$guest.priority} />

      <button
        class="fixed right-3 opacity-70 backdrop-blur-sm max-md:top-3 md:bottom-6 md:right-6"
        on:click={() => {
          if ($muted) {
            $audio?.play();
            $muted = false;
          } else {
            $audio?.pause();
            $muted = true;
          }
        }}
        transition:fade={{ duration: 1000 }}
      >
        <div class="variant-filled relative aspect-square rounded-full p-2">
          {#if $muted}
            <VolumeX class="rotate-180" />
          {:else}
            <Volume2 class="rotate-180" />
            <span
              class="absolute left-0 top-0 inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"
            ></span>
          {/if}
        </div>
      </button>
    {/if}
  </div>
{/if}
