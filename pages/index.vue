<template>
  <div class="bg-cream-peach -mt-16 px-4">
    <section class="pt-10 text-center">
      <h2 class="tracking-widest">服務項目</h2>
      <sections-services-section />
    </section>
    <section class="container mx-auto mt-40 text-center lg:max-w-5xl">
      <div class="flex flex-col justify-around lg:flex-row">
        <div
          class="mt-6 flex grow flex-col items-center justify-center lg:mt-0"
        >
          <h2 class="text-3xl font-bold tracking-widest">專屬的網站配置</h2>
          <div class="mt-6 max-w-xs px-6">
            <p class="text-xl leading-9">網站規劃</p>
          </div>

          <div class="max-w-xs px-6">
            <p class="text-xl leading-9">後台內容管理</p>
          </div>

          <div class="max-w-xs px-6">
            <p class="text-xl leading-9">部落格系統</p>
          </div>

          <div class="max-w-xs px-6">
            <p class="text-xl leading-9">GA4 數據分析</p>
          </div>
        </div>

        <div
          class="order-first mx-auto w-full md:w-[400px] lg:order-none lg:w-[500px]"
        >
          <img src="/images/only-1.svg" alt="專屬的網站配置" />
        </div>
      </div>
    </section>
    <section
      class="container mx-auto mt-40 mb-10 rounded-xl bg-white px-5 py-10 text-center"
    >
      <h2 class="text-3xl font-bold tracking-widest">合作流程</h2>
      <p class="mx-auto mt-2 max-w-xl text-gray-500">
        只要四步驟，輕鬆打造你的專屬網站。
      </p>

      <div class="mt-12">
        <ul
          class="grid grid-cols-1 gap-10 text-left md:grid-cols-2 lg:grid-cols-4"
        >
          <li class="text-center">
            <h3 class="text-xl font-semibold">1. 討論需求</h3>
            <p class="mt-1 text-gray-600">確認你的網站目標與設計風格。</p>
          </li>
          <li class="text-center">
            <h3 class="text-xl font-semibold">2. 網站建置</h3>
            <p class="mt-1 text-gray-600">開始設計與開發網站功能。</p>
          </li>
          <li class="text-center">
            <h3 class="text-xl font-semibold">3. 調整測試</h3>
            <p class="mt-1 text-gray-600">確認畫面與功能細節，確保順暢。</p>
          </li>
          <li class="text-center">
            <h3 class="text-xl font-semibold">4. 正式上線</h3>
            <p class="mt-1 text-gray-600">網站部署完成，交付使用說明。</p>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
useHead({
  title: 'Fire Life - 網站架設服務',
  htmlAttrs: {
    lang: 'zh-TW',
  },
  meta: [
    {
      name: 'description',
      content:
        'Fire Life 提供個人與企業形象網站架設服務，打造專屬網站，提升品牌形象。',
    },
    { name: 'keywords', content: '個人形象網站, 企業形象網站, 接案, 網站架設' },

    { property: 'og:title', content: 'Fire Life - 網站架設服務' },
    {
      property: 'og:description',
      content: '專業網站架設服務，為個人與企業打造專屬網站，提升品牌形象。',
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://firelifedev.com/' },
    {
      property: 'og:image',
      content: 'https://firelifedev.com/images/firelife-homepage-og.png',
    },
  ],
  link: [{ rel: 'canonical', href: 'https://firelifedev.com/' }],
})
</script>
