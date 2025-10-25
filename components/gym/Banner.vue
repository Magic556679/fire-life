<template>
  <div class="relative min-h-[100dvh] w-full">
    <img
      src="https://cdn.firelifedev.com/gym/banner.jpg"
      alt="gymBanner"
      class="absolute inset-0 h-full w-full object-cover"
    />

    <div class="absolute inset-0 bg-black/40"></div>

    <div
      class="absolute inset-0 flex flex-col items-center justify-center px-4 text-center"
    >
      <div>
        <h1
          class="animate-fade-in-up transform text-3xl leading-9 font-bold tracking-widest text-white opacity-0 drop-shadow-lg md:text-5xl"
        >
          不是沒時間，是還沒開始。
        </h1>
      </div>

      <p
        class="animate-fade-in-up animation-delay-300 mt-4 max-w-2xl text-base text-white/90 opacity-0 md:text-lg"
      >
        重新喚醒你的身體，從一次體驗開始。感受改變的第一步。
      </p>

      <button
        class="relative mt-8 cursor-pointer overflow-hidden rounded-full bg-green-500 px-6 py-3 text-lg font-semibold text-white shadow-lg transition hover:bg-green-600 hover:shadow-xl"
      >
        <span class="relative z-10">立即預約體驗</span>

        <span
          class="before:animate-shine absolute inset-0 before:absolute before:inset-0 before:-left-full before:w-1/3 before:skew-x-[-20deg] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent"
        ></span>
      </button>
    </div>
  </div>
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
