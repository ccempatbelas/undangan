<script lang="ts">
  import { superForm } from 'sveltekit-superforms/client';
  import SupportedBy from '@/lib/components/SupportedBy.svelte';
  import Section from '@/lib/components/layouts/Section.svelte';
  import { CalendarPlus } from 'lucide-svelte';
  import { ArrowBigLeft } from 'lucide-svelte';
  import { page } from '$app/stores';
  import { inview } from 'svelte-inview';

  export let data;
  let modify = $page.url.searchParams.get('modify') ? true : false;
  let submited = false;

  const { form: guest, enhance } = superForm(data.guest, {
    dataType: 'json',
    taintedMessage: null,
    onSubmit() {
      submited = true;
    },
    onUpdated() {
      submited = false;
    }
  });
  let animOptions = {
    rootMargin: '-100px',
    unobserveOnEnter: true
  };
</script>

<div class="relative flex justify-center overflow-hidden">
  <a href="/" class="btn absolute left-0 top-0 flex gap-2"><ArrowBigLeft />Home</a>
  <div class="max-w-5xl">
    <section class="dresscode-bg mt-24 text-center">
      <div
        class="gradient-heading flex flex-col items-center justify-center gap-8 from-primary-400 via-primary-200 to-primary-100 pt-4"
      >
        <p class="headline font-mrheadline text-primary-500">
          CC<span class="headline font-mrheadline text-secondary-500">14</span>
          REUNION
        </p>
      </div>
    </section>
    <Section id="schedule" title="Makan Malam Santai">
      <h1 class="h1 mb-4">Sabtu, 27 Juli 2024</h1>
      <p>
        <span class="h2 text-primary-600">18:00 - 22:30</span><br />
        <span class="h3 text-primary-600">20:00 kita foto bareng</span>
      </p>
      <div
        class="card-border variant-ghost-surface mb-4 mt-4 flex flex-col items-center justify-center from-primary-400 via-primary-200 to-primary-100 pt-4"
      >
        <p class="h4 text-secondary-600">
          Acara ini <b>GRATIS!</b> Berkat
          <span class="text-primary-800 underline"
            ><a href="/become-backers" target="_blank" rel="noopener noreferrer">backers</a></span
          >
          <br /><br />
          Dengan konsep House Party, mengutamakan <b>ngobrol</b> dan <b>hangout</b> sembari
          <b>main santai</b>.
          <br /><b>Buffet</b> dinner dan ada <b>Beer</b>.<br />
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

      <div class="variant-glass mt-4 flex items-center justify-center">
        <img
          class="max-h-full w-full max-w-xl rounded-md object-cover"
          src="/images/lokasi-acara.jpg"
          alt="lokasi-acara.jpg"
        />
      </div>
    </Section>
  </div>
</div>
<div class="relative grid min-h-screen place-items-center">
  <form class="prose mb-20 mt-10 p-5 dark:prose-invert" method="POST" action="?/submit" use:enhance>
    <h1 class="gradient-heading h1 from-primary-400 via-primary-300 to-primary-400 pb-4">
      Hi {$guest.nickName}!
    </h1>
    {#if $guest.reserved}
      {#if $guest.attendingReception}
        <p>
          You have <span class="font-bold text-green-800">sucessfully</span> reserve your spot to CC14
          reunion. See you :3
        </p>
      {:else}
        <p>
          You have opted <span class="font-bold text-error-200">not to join</span> CC14 reunion
        </p>
      {/if}

      <p>
        Sudah ada <span class="font-bold text-secondary-500">{data.sum}</span> teman yang akan ikut.
      </p>
      <p class="text-secondary-500">
        Tolong isi <a class="text-primary-300 underline" target="_blank" href="https://forms.gle/nBNAMbRc6MrBQqmU9" rel="noopener noreferrer">Form</a>
         buat Yearbook edisi 10 tahun ya.</p>

      <div class="flex justify-between">
        <a href="/" class="underline" data-sveltekit-preload-data="hover">Back To Home</a>
        {#if modify}
          <button class="underline" on:click={() => ($guest.reserved = false)}>Modify</button>
        {/if}
      </div>

      <p class="pt-24 text-sm text-primary-400">
        * Please contact Deel <a
          class="text-primary-300 underline"
          target="_blank"
          href="https://wa.me/6287777438727">here</a
        > to modify your reservation
      </p>
    {:else}
      <!-- Welcome Note -->
      <p>Yuk reuni 27 Juli 2024!</p>

      <!-- Main Input -->
      <div class="flex flex-wrap gap-x-4 sm:flex-nowrap">
        <label class="label w-full">
          <h4 class="h4">Ada Request, Saran, Ide?</h4>
          <textarea
            class="textarea"
            rows="6"
            maxlength="1000"
            placeholder="Masukkan request, saran, dan ide disini..."
            bind:value={$guest.wishes}
          ></textarea>
          <small class="flex justify-end">{$guest.wishes ? $guest.wishes.length : 0}/1000</small>
        </label>
      </div>

      <!-- Buttons -->
      <div class="relative mt-10 flex justify-between gap-10">
        <button
          class="variant-filled-primary btn min-w-28"
          type="submit"
          disabled={submited}
          on:click={() => ($guest.attendingReception = false)}
        >
          Gak bisa dateng :(
        </button>
        <button
          class="variant-filled-secondary btn min-w-28"
          type="submit"
          disabled={submited}
          on:click={() => ($guest.attendingReception = true)}
        >
          Gasss!
        </button>
      </div>
    {/if}
  </form>
  <SupportedBy />
</div>

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
