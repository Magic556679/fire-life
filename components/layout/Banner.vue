<template>
  <section class="relative flex h-screen flex-col justify-center text-center">
    <img
      src="https://cdn.firelifedev.com/home-banner.jpg"
      class="absolute inset-0 z-0 h-full w-full object-cover"
      alt="背景圖"
    />

    <div class="absolute inset-0 z-5 bg-black/20"></div>

    <div class="relative z-10 space-y-4 text-white">
      <h1 class="text-4xl font-bold tracking-widest lg:text-5xl">
        打造專屬網站，創造有故事的品牌
      </h1>
      <h2 class="text-2xl font-semibold lg:text-3xl">
        不只是網站架設，我也協助企業前端開發
      </h2>

      <div class="mt-12">
        <NuxtLink to="/service">
          <button
            class="cursor-pointer rounded-xl bg-[linear-gradient(120deg,_#f6d365_0%,_#fda085_100%)] px-6 py-3 text-black transition hover:scale-105 hover:bg-gray-800 hover:shadow-lg"
          >
            查看方案價格
          </button>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
