<template>
  <section class="relative flex h-screen flex-col justify-center text-center">
    <img
      src="https://cdn.firelifedev.com/home-banner.jpg"
      class="absolute inset-0 z-0 h-full w-full object-cover"
      alt="背景圖"
    />

    <div class="absolute inset-0 z-5 bg-black/20"></div>

    <div class="relative z-10 space-y-4 px-4 text-white lg:p-0">
      <h1
        class="animate-fade-in-up text-3xl font-bold tracking-widest lg:text-5xl"
      >
        打造專屬網站，創造有故事的品牌
      </h1>
      <h2
        class="animate-fade-in-up animation-delay-300 text-lg font-semibold lg:text-3xl"
      >
        不只是網站架設，我也協助企業前端開發
      </h2>

      <div class="mt-12">
        <NuxtLink to="/service">
          <button
            class="relative cursor-pointer overflow-hidden rounded-xl bg-[linear-gradient(120deg,_#f6d365_0%,_#fda085_100%)] px-6 py-3 text-black transition hover:scale-105 hover:shadow-lg"
          >
            查看方案價格
            <span
              class="before:animate-shine pointer-events-none absolute inset-0 before:absolute before:inset-0 before:-left-full before:w-1/3 before:skew-x-[-20deg] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent"
            ></span>
          </button>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
<style scoped>
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 1s ease forwards;
}

.animation-delay-300 {
  animation-delay: 0.3s;
}

.animation-delay-600 {
  animation-delay: 0.6s;
}

@keyframes shine {
  0% {
    left: -100%;
  }
  100% {
    left: 150%;
  }
}

.before\:animate-shine::before {
  animation: shine 1.5s infinite;
}
</style>
