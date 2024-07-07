<script lang="ts">
  export let url: string;
  export let image: string;
  export let desc: string;
</script>

<style>
.card-border {
border-image: linear-gradient(117deg, #ffb36b, #6d87de) 30;
border-width: 5px;
border-style: solid;
}
</style>

<a
  target="_blank"
  rel="noopener noreferrer"
  href="{url}"
  class="flex w-full flex-col items-center justify-center"
  >
  <div class="relative border card-border">
    <img src="/images/logo-backers/{image}.jpg" alt="{image}" />
  </div>
  <div><span class="text-surface-900"><b>{desc}</b></span></div>
</a>