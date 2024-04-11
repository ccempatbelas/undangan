<script lang="ts">
  import { fly } from 'svelte/transition';
  import { audio, cover } from '@/lib/stores';

  export let nickName = '';

  const enter = () => {
    window.umami?.track('Enter button');
    $cover = false;
    $audio?.play();
  };
</script>

<div
  class="bg-nebula fixed left-0 top-0 z-20 h-full w-full p-4 lg:p-12"
  transition:fly={{ y: -700, duration: 1500 }}
>
  <div
    class="fixed right-0 top-0 -z-10 h-full w-full border-2 border-primary-100 blur-sm backdrop-blur-sm lg:border-4 lg:blur-md"
  ></div>
  <div class="invitation-bg flex h-full flex-col justify-center border border-primary-100">
    <div class="h-16"></div>
    <div class="flex justify-center">
      <p class="text-md max-w-[16rem] text-center md:text-lg lg:max-w-sm">
        Dear <span class="">{nickName}</span>, we cordially invite you to the Wedding of
      </p>
    </div>
    <div
      class="gradient-heading via flex flex-col items-center gap-4 bg-primary-50 from-primary-400 to-primary-200 px-4 pt-4 text-center md:gap-5"
    >
      <div>
        <p class="py-2 font-glester text-3xl leading-relaxed xs:text-4xl md:py-6 md:text-5xl">
          Nikolas Kurnia Setiawan
        </p>
        <p class="text-sm">Son of Mr. Suwardi Setiawan and Mrs. Mieke Sudirgio</p>
      </div>
      <p class="pt-5 font-glester text-4xl xs:text-5xl md:text-6xl">&</p>
      <div>
        <p class="py-2 font-glester text-3xl leading-relaxed xs:text-4xl md:py-6 md:text-5xl">
          Michely Arista Tenardi
        </p>
        <p class="text-sm">Daughter of Mr. Pinarwan Tenardi and Mrs. Yuliyati Tjokrowinata</p>
      </div>
    </div>
    <button class="animFloat btn btn-lg mt-4 xs:btn-xl md:mt-10" on:click={enter}
      ><span class="variant-ringed-primary flex justify-center rounded-full p-4 md:scale-125"
        >Click to Enter
      </span></button
    >
  </div>
</div>

<style>
  /* Backgrounds */
  .invitation-bg {
    background-image: url('/images/veil_bot.png'), url('/images/veil_top.png');
    background-position:
      bottom right,
      top left;
    background-origin: border-box;
    background-size: contain;
    background-repeat: no-repeat;
  }
</style>
