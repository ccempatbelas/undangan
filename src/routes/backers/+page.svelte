<script lang="ts">
  import Section from '@/lib/components/layouts/Section.svelte';
  import NavBar from '@/lib/components/NavBar.svelte';
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

    <Section id="rsvp" title="This event is supported by" class="h4 text-secondary-500">
      <div class="mb-64 mt-8 flex justify-center object-none object-bottom">
        <div class="flex max-h-full w-full max-w-lg flex-col justify-center gap-4" style="font-size: {14 + 'px'}">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="hhttps://linktr.ee/colonytackle"
            class="flex w-full flex-col items-center justify-center"
            ><div class="relative border border-primary-200 shadow-primary-300">
              <img src="/images/logo-backers/logo-colony-tackle.jpg" alt="logo-colony-tackle" />
            </div>
            <div>Distributor Fishing Hook | Adhe</div>
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://linktr.ee/DuniaAuto"
            class="flex w-full flex-col items-center justify-center"
            ><div class="relative border border-primary-200 shadow-primary-300">
              <img src="/images/logo-backers/logo-duniaauto.jpg" alt="logo-duniaauto" />
            </div>
            <div>Aksesoris mobil, emblem, stiker, dll. | Reinard</div>
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.halim-sakti.com/products"
            class="flex w-full flex-col items-center justify-center"
            ><div class="relative border border-primary-200 shadow-primary-300">
              <img src="/images/logo-backers/logo-halim-sakti.jpg" alt="logo-halim-sakti" />
            </div>
            <div>Speciality and industrial chemicals supplier | Bampi</div>
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.instagram.com/locahouse.id/"
            class="flex w-full flex-col items-center justify-center"
            
            ><div class="relative border border-primary-200 shadow-primary-300" >
              <img src="/images/logo-backers/logo-loca-house.png" alt="loca-house" />
            </div>
            <div>Cafe, Resto, Catering, Private Event | Yosta</div>
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.vidio.com/categories/movies"
            class="flex w-full flex-col items-center justify-center"
            ><div class="relative border border-primary-200 shadow-primary-300">
              <img src="/images/logo-backers/logo-dl.jpg" alt="logo-dl" />
            </div>
            <div>Nonton apa aja di Vidio | DL</div>
          </a>
        </div>
      </div>
      <p class="mb-20 text-center text-sm">
        Want to support this event? Check <a
          class="text-secondary-300 underline"
          href="/become-backers">here</a
        >
        or contact
        <a class="text-primary-300 underline" target="_blank" href="https://wa.me/628999966385"
          >DL</a
        > :)
      </p>
    </Section>
  </div>
</div>
<NavBar />
