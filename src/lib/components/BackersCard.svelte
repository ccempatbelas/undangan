<script lang="ts">
  export let url: string;
  export let image: string;
  export let desc: string;
</script>

<a
  target="_blank"
  rel="noopener noreferrer"
  href="{url}"
  class="flex w-full flex-col items-center justify-center"
  >
  <div class="relative border border-primary-200 shadow-primary-300">
    <img src="/images/logo-backers/{image}.jpg" alt="{image}" />
  </div>
  <div><span>{desc}</span></div>
</a>