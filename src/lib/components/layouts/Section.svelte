<script lang="ts">
  export let title: string;
  let clas = '';
  export { clas as class };
  export let id: string;
</script>

<div {id} class="mb-48 md:mb-64 {clas}">
  <section class="dresscode-bg mt-12 px-6 text-center">
    <div class="flex justify-center decoration-primary-200">
      <div class="relative flex justify-center px-10 md:px-16">
        <div class="absolute left-0 md:scale-150">
          <slot name="logo" />
        </div>
        <h1 class="gradient-heading h1 from-primary-400 via-primary-100 to-primary-300">{title}</h1>
      </div>
    </div>
    <slot />
  </section>
</div>
