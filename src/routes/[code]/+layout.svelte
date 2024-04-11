<script lang="ts">
  import TwinkleStar from '@/lib/components/TwinkleStar.svelte';
  import { audio, cover, muted } from '@/lib/stores';
  import { onMount } from 'svelte';

  onMount(() => {
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible' && !$cover && !$muted) {
        $audio?.play();
      } else {
        $audio?.pause();
      }
    });
  });
</script>

<audio loop bind:this={$audio}>
  <source id="audio" src="/musics/background.mp3" type="audio/mp3" />
</audio>

<div class=" fixed right-0 top-0 h-screen w-screen blur-[2px]">
  {#each { length: 100 } as _}
    <TwinkleStar />
  {/each}
</div>

<div class="relative z-10">
  <slot />
</div>
