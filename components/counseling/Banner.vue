<template>
  <div class="relative aspect-[1.2/1] w-full md:aspect-[2/1]">
    <img
      src="https://cdn.firelifedev.com/counseling/zoom.jpg"
      alt="counselingBanner"
      class="absolute inset-0 h-full w-full object-cover"
    />

    <div
      class="absolute inset-0 flex flex-col items-center justify-center px-4 text-center"
    >
      <h1
        class="animate-fade-in-up translate-y-6 transform text-3xl leading-9 font-bold tracking-widest text-white opacity-0 drop-shadow-lg md:text-5xl"
      >
        陪你找回內心的平衡
      </h1>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(24px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}

.delay-200 {
  animation-delay: 0.2s;
}
</style>
