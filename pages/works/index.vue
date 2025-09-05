<template>
  <div>
    <section class="py-16">
      <div class="mx-auto max-w-7xl px-4">
        <h2
          class="mb-12 text-center text-2xl font-bold tracking-widest md:text-3xl"
        >
          網站範例
        </h2>

        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(demo, index) in demos"
            :key="index"
            class="group relative flex flex-col overflow-hidden bg-white shadow-md"
          >
            <div class="h-48 w-full overflow-hidden">
              <img
                :src="demo.img"
                :alt="demo.title"
                class="h-full w-full object-cover"
              />
            </div>

            <div class="flex flex-1 flex-col p-6">
              <h3 class="mb-2 text-lg font-semibold text-gray-800">
                {{ demo.title }}
              </h3>
              <p class="flex-1 text-sm text-gray-600">{{ demo.desc }}</p>

              <div class="mt-4 flex justify-end">
                <NuxtLink
                  :to="demo.link"
                  class="text-sm font-semibold text-sky-500 group-hover:underline"
                >
                  查看範例 →
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Fire Life - 網站範例',
  htmlAttrs: {
    lang: 'zh-TW',
  },
  meta: [
    {
      name: 'description',
      content:
        'Fire Life 網站作品集，收錄多種設計範例與網站架設 Demo，展現個人與企業專屬網站的創意與實力。',
    },
    {
      name: 'keywords',
      content:
        '網站作品集, 網站設計範例, 個人形象網站, 企業形象網站, Fire Life',
    },

    { property: 'og:title', content: 'Fire Life - 網站範例' },
    {
      property: 'og:description',
      content:
        '瀏覽 Fire Life 的網站作品集，包含個人與企業網站設計範例，展現專業網站架設服務與創意風格。',
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://firelifedev.com/works' },
    {
      property: 'og:image',
      content: 'https://firelifedev.com/images/firelife-works-og.png',
    },
  ],
  link: [{ rel: 'canonical', href: 'https://firelifedev.com/works' }],
})

const demos = [
  {
    title: '數位遊牧首頁',
    desc: '展示自由工作者與遠距工作的網站設計範例。',
    img: '/images/personal/digital-nomad.png',
    link: '/demo/personal',
  },
  //   {
  //     title: '企業官網首頁',
  //     desc: '專業形象與服務導向的企業網站設計。',
  //     img: '/images/demo/corporate.jpg',
  //     link: '/demo/corporate',
  //   },
  //   {
  //     title: '個人品牌首頁',
  //     desc: '專屬於個人的品牌展示與履歷網站。',
  //     img: '/images/demo/personal.jpg',
  //     link: '/demo/personal',
  //   },
]
</script>
