<div
  style="
				top: {Math.floor(Math.random() * 30)}%;
		  	left: {20 + Math.floor(Math.random() * 80)}%;
				--star-size: {1 + Math.random() * 4}px;
		  	width: var(--star-size); height: var(--star-size);
		  	animation: shooting {2 + Math.random() * 10}s linear infinite;
		  	animation-delay: {1 + Math.random() * 10}s;
			"
  class="absolute rounded-full bg-primary-200 opacity-0 shadow-[0_0_10px_#fff]"
></div>

<style>
  div::before {
    content: '';
    position: absolute;
    top: 50%;
    width: 300px;
    height: 1px;
    background: linear-gradient(90deg, #fff, transparent);
  }

  @keyframes -global-shooting {
    0% {
      opacity: 1;
      transform: rotate(315deg) translateX(0);
    }
    4% {
      opacity: 1;
    }
    20% {
      transform: rotate(315deg) translateX(-500px);
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }
</style>
