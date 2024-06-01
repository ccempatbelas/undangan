<script lang="ts">
  import Section from '@/lib/components/layouts/Section.svelte';
  import NavBar from '@/lib/components/NavBar.svelte';
  import BackersCard from '@/lib/components/BackersCard.svelte';
  import PageHeader from '@/lib/components/PageHeader.svelte';
</script>

<svelte:head>
  <title>CC14 10 tahun</title>
  <meta name="the description" content="Svelte demo app" />
</svelte:head>

<!-- For Eager loading -->
<div class="relative flex justify-center overflow-hidden">
  <div class="max-w-5xl">
    <PageHeader />

    <Section id="rsvp" title="This event is supported by" class="h4 text-secondary-500">
      <div class="mb-64 mt-8 flex justify-center object-none object-bottom">
        <div class="flex max-h-full w-full max-w-lg flex-col justify-center gap-4" style="font-size: {14 + 'px'}">
          <BackersCard
            url="https://linktr.ee/colonytackle"
            image="logo-colony-tackle"
            desc="Distributor Fishing Hook | Adhe"
          />
          <BackersCard
            url="https://linktr.ee/DuniaAuto"
            image="logo-duniaauto"
            desc="Aksesoris mobil, emblem, stiker, dll. | Reinard"
          />
          <BackersCard
            url="https://www.halim-sakti.com/products"
            image="logo-halim-sakti"
            desc="Speciality and industrial chemicals supplier | Bampi"
          />
          <BackersCard
            url="https://g.co/kgs/QBSvL3K"
            image="logo-uma-sukalila"
            desc="Hotel UMA Sukalila | Willy"
          />
          <BackersCard
            url="https://bit.ly/about_am"
            image="logo-seknet"
            desc="Economics Researcher and Consultant | AM"
          />
          <BackersCard
            url="https://linktr.ee/locahouse.id"
            image="logo-loca-house"
            desc="Cafe, Resto, Catering, Private Event | Yosta"
          />
          <BackersCard
            url="https://www.vidio.com/categories/movies"
            image="logo-dl"
            desc="Nonton apa aja di Vidio | DL"
          />
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
