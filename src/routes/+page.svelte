<script lang="ts">
  import { inview } from 'svelte-inview';
  import Section from '@/lib/components/layouts/Section.svelte';
  import { CalendarPlus, ArrowLeft, ArrowRight } from 'lucide-svelte';
  import { superForm } from 'sveltekit-superforms/client';
  import { getModalStore, type ModalSettings, type ModalComponent } from '@skeletonlabs/skeleton';
  import ImageModal from '@/lib/components/modals/ImageModal.svelte';
  import { onMount } from 'svelte';
  import NavBar from '@/lib/components/NavBar.svelte';
  import SupportedBy from '@/lib/components/SupportedBy.svelte';
  import PageHeader from '@/lib/components/PageHeader.svelte';
  // Load Data
  export let data;
  const modalStore = getModalStore();

  const { form: guest } = superForm(data.guest, {
    dataType: 'json'
  });

  // Gallery Images
  const allImages = Object.keys(import.meta.glob('static/images/placeholder/*')).map((p) =>
    p.replace('/static', '')
  );
  let imagePaths = allImages;
  onMount(() => {
    if ($guest.id) {
      localStorage.setItem('code', $guest.id);
    }
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

  // Anmimation
  let animOptions = {
    rootMargin: '-100px',
    unobserveOnEnter: true
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
</script>

<style>
.card-border {
border-image: linear-gradient(117deg, #ffb36b, #6d87de) 30;
border-width: 5px;
border-style: solid;
}
.headline {
font-size: 50px;
}
</style>

<svelte:head>
  <title>CC14 10 tahun</title>
  <meta name="the description" content="Svelte demo app" />
</svelte:head>

<!-- For Eager loading -->
<div class="relative flex justify-center overflow-hidden">
  <div class="max-w-5xl">

    <PageHeader />
    <Section id="schedule" title="Makan Malam Santai">
      <div class="gradient-heading mt-4 justify-center flex flex-col items-center gap-8 from-primary-400 via-primary-200 to-primary-100 pt-4">
        <p class="font-mrheadline headline text-primary-500">CC<span class="font-mrheadline headline text-secondary-500">14</span>
        REUNION</p>
        <h4 class="h4 text-primary-500">Ketemuan lagi yuk!</h4>
      </div>
      <div class="mb-20 mt-10  px-6 text-center flex justify-center object-none object-bottom">
        <div class="variant-glass flex items-center justify-center">
          <img
            class="max-h-full w-full max-w-xl rounded-md object-cover"
            src="/images/0.jpg"
            alt="meet gif"
          />
        </div>
      </div>
      <SupportedBy />
    </Section>


    <Section id="schedule" title="Makan Malam Santai">
      <h1 class="h1 mb-4 mt-12">Sabtu, 27 Juli 2024</h1>
      <p>
        <span class="h2 text-primary-600">18:00 - 22:30</span><br>
        <span class="h3 text-primary-600">20:00 kita foto bareng</span>
      </p>
      <div class="mt-4 mb-4 justify-center flex flex-col items-center from-primary-400 via-primary-200 to-primary-100 pt-4 variant-ghost-surface card-border">
        <p class="h4 text-secondary-600">
          Acara ini <b>GRATIS!</b> Berkat <span class="text-primary-800 underline"><a
            href="/become-backers"
            target="_blank"
            rel="noopener noreferrer"
          >backers</a></span>
          <br><br>
          Dengan konsep House Party, mengutamakan <b>ngobrol</b> dan <b>hangout</b> sembari <b>main santai</b>.
          <br><b>Buffet</b> dinner dan ada <b>Beer</b>.<br>
        </p>
        <p class="h4 text-primary-600">
          Boleh bawa makanan dan minuman <b>sendiri</b> ya termasuk <b>alkohol ;)</b>
        </p>
      </div>
      <div class="flex opacity-0" use:inview={animOptions} class:animRight={true}>
        <div class="relative mr-4 basis-3/5 text-right xs:basis-1/2">
          <h3 class="h3 mt-4 text-secondary-600">Loca House</h3>
          <p>Jl. Cemp. Putih Tengah I No.2A, Jakarta Pusat</p>
          <a
            class="variant-ringed-primary absolute bottom-0 right-0 flex items-center gap-2 rounded-md px-2"
            target="_blank"
            href="https://calendar.google.com/calendar/u/0?cid=65bee9fe831bb8bdbc11839da5dc815951be49557eacbeaca6973d54f8674dc5%40group.calendar.google.com"
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
                src="https://www.google.com/maps/embed/v1/place?q=Loca+House,+Jalan+Cempaka+Putih+Tengah+I,+RT.6/RW.5,+East+Cempaka+Putih,+Central+Jakarta+City,+Jakarta,+Indonesia&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
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

      <div class="mt-4 variant-glass flex items-center justify-center">
        <img
          class="max-h-full w-full max-w-xl rounded-md object-cover"
          src="/images/lokasi-acara.jpg"
          alt="lokasi-acara.jpg"
        />
      </div>
    </Section>


    <Section id="gallery" title="" class="mb-12">
      <div class="mb-10 mt-10 flex justify-center object-none object-bottom">
        <div class="variant-glass flex items-center justify-center">
          <img
            class="aspect-square max-h-full w-full max-w-xl rounded-md object-cover"
            src="/images/marcho novaldo.jpg"
            alt="in memoriam marcho novaldo"
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
    
    <Section id="rsvp" title=" Mari menjadi Backers" class="mb-64">
      <div class="h3 font-headlinecrack mb-2 text-primary-900">Acara ini sudah <span class="text-secondary-500">fully-funded</span></div>
      <p class="h4 mb-2 text-primary-800">Masih menerima dukungan, dana akan masuk ke kas angkatan.</p>
      <div class="mt-8 flex justify-center object-none object-bottom">
        <p>Benefit yang didapatkan jika menjadi backers.</p>
      </div>
      <div class="mt-8 flex justify-center object-none object-bottom">
        <div class="flex max-h-full w-full max-w-lg flex-col justify-center gap-2">
          <a
            href="/become-backers"
            class="flex w-full flex-col items-center justify-center"
            ><div class="relative border border-secondary-200 shadow-primary-300">
              <img src="/images/sponsor-graph.png" alt="sponsor graph" />
            </div>
          </a>
        </div>
      </div>
      <div class="mt-8 flex justify-center object-none object-bottom">
        <p>
          Lihat benefit lebih detail dengan contoh <a
            class="text-secondary-300 underline"
            href="/become-backers">disini</a
          >. Untuk jadi backers, kontak
          <a class="text-primary-300 underline" target="_blank" href="https://wa.me/628999966385"
            >whatsapp DL</a
          > atau
          <a class="text-primary-300 underline" target="_blank" href="https://forms.gle/R8tGcz5UwGXbWn4V9"
          >isi ini</a>. Kelebihan dana akan masuk ke uang kas.
        </p>
      </div>
    </Section>
    <SupportedBy />
  </div>
</div>
<NavBar />
