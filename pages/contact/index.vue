<template>
  <div class="container mx-auto px-6 lg:max-w-5xl">
    <h2 class="my-10 text-center font-bold tracking-widest">聯絡資訊</h2>

    <div class="space-y-6 rounded-2xl">
      <p class="text-center text-gray-600">
        無論是合作、接案，歡迎透過以下方式聯絡我：
      </p>

      <div class="flex flex-col items-center space-y-4">
        <a
          href="mailto:magic556679@gmail.com"
          class="flex items-center gap-2 hover:underline"
          @mouseenter="imgSrc = '/images/contact-1.png'"
          @mouseleave="imgSrc = '/images/contact.png'"
        >
          <Icon name="i-logos:google-gmail" />
          firelifedev@gmail.com
        </a>

        <a
          href="https://www.instagram.com/sdycfr123"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2 hover:underline"
          @mouseenter="imgSrc = '/images/contact-1.png'"
          @mouseleave="imgSrc = '/images/contact.png'"
        >
          <Icon name="i-logos:instagram" />
          <span>@sdycfr123</span>
        </a>

        <span class="text-blue-700 hover:text-blue-500">
          <a href="https://forms.gle/xpEHkvgE3JJRfG5RA" target="_blank">
            Google 表單填寫
          </a>
        </span>
      </div>
    </div>
    <div class="mt-10 lg:mt-0">
      <img class="mx-auto w-52 lg:mx-0 lg:w-64" :src="imgSrc" alt="" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

useHead({
  title: 'Fire Life - 聯絡資訊',
  htmlAttrs: { lang: 'zh-TW' },
  meta: [
    {
      name: 'description',
      content:
        '聯絡 Fire Life，討論個人或企業網站需求，快速獲取專業網站架設建議與報價。',
    },
    { name: 'keywords', content: '聯絡, 網站諮詢, 接案, 網站架設, 前端開發' },

    { property: 'og:title', content: 'Fire Life - 聯絡資訊' },
    {
      property: 'og:description',
      content:
        '聯絡 Fire Life，獲取專業網站架設建議與報價，開始打造您的品牌網站。',
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://firelifedev.com/contact' },
    {
      property: 'og:image',
      content: 'https://firelifedev.com/images/logo.png',
    },
  ],
  link: [{ rel: 'canonical', href: 'https://firelifedev.com/contact' }],
})

const imgSrc = ref('/images/contact.png')
</script>
