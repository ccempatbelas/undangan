<div
  style="
				top: {Math.floor(Math.random() * 100)}%;
		  	left: {Math.floor(Math.random() * 100)}%;
				--star-size: {1 + Math.random() * 4}px;
		  	width: var(--star-size); height: var(--star-size);
		  	animation: twinkle {2 + Math.random() * 5}s linear infinite;
			"
  class="absolute rounded-full bg-primary-200 shadow-[0_0_10px_#fff]"
></div>

<style>
  @keyframes -global-twinkle {
    0% {
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
</style>
