<template>
  <div class="container mx-auto lg:max-w-5xl">
    <h2 class="my-10 text-center text-2xl font-bold tracking-widest">
      服務項目
    </h2>
    <sections-services-section />
    <section class="grid grid-cols-1 flex-wrap gap-6 pb-20 md:grid-cols-2">
      <div
        v-for="(service, index) in servicesCards"
        :key="index"
        class="bg-white p-5 shadow-sm"
      >
        <div
          :class="[
            'py-3 text-center font-medium tracking-wider text-gray-900',
            index % 2 === 0 ? 'bg-orange-light' : 'bg-orange-accent',
          ]"
        >
          {{ service.title }}
        </div>

        <div class="pt-6 text-center">
          <h4 class="text-lg font-semibold text-gray-700">
            {{ service.price }}
          </h4>
        </div>

        <ul class="space-y-2 p-6 text-sm leading-relaxed text-gray-600">
          <li v-for="(feature, i) in service.features" :key="i">
            {{ feature }}
          </li>
          <li>
            <a
              href="https://forms.gle/xpEHkvgE3JJRfG5RA"
              target="_blank"
              class="block w-full cursor-pointer border border-gray-400 px-2 py-1 text-center text-black transition-shadow hover:shadow-md"
            >
              立即諮詢
            </a>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Fire Life - 服務項目',
  htmlAttrs: { lang: 'zh-TW' },
  meta: [
    {
      name: 'description',
      content:
        'Fire Life 提供個人與企業網站架設服務，包含設計、前端開發與網站維護，打造專屬品牌網站。',
    },
    {
      name: 'keywords',
      content: '網站架設, 個人網站, 企業網站, 前端開發, 接案',
    },

    { property: 'og:title', content: 'Fire Life - 服務項目' },
    {
      property: 'og:description',
      content:
        '專業網站架設服務，包括設計、前端開發與網站維護，打造專屬品牌網站。',
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://firelifedev.com/service' },
    {
      property: 'og:image',
      content: 'https://firelifedev.com/images/logo.png',
    },
  ],
  link: [{ rel: 'canonical', href: 'https://firelifedev.com/service' }],
})

const servicesCards = [
  {
    title: '官方／個人形象網站',
    price: '$ 35,000',
    features: [
      '基本頁面：首頁、關於我、服務項目、聯絡頁',
      '支援 RWD 響應式設計，手機與電腦皆可瀏覽',
      '串接 Google Analytics 追蹤流量',
      'SEO 文章系統另外計價',
      '1 個月免費維護',
    ],
  },
  {
    title: '企業前端功能開發',
    price: '依專案內容報價',
    features: [
      '提供 Nuxt, Vue, React 技術支援',
      '先進行一次面談，確認功能需求',
      '確認開發時程',
      '解決短期找不到人力的問題',
      '不需提供電腦',
    ],
  },
  {
    title: '前端轉職諮詢',
    price: '30分鐘 $ 500',
    features: ['提供前端轉職規劃', '分享前端開發實務經驗'],
  },
]
</script>
