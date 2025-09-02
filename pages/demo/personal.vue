<template>
  <div>
    <section class="bg-white py-16">
      <div class="mx-auto max-w-5xl px-4">
        <div class="text-center">
          <h2 class="personal-heading-highlight">
            工作不是只有朝九晚五，打造全新工作型態
          </h2>
        </div>

        <div class="mt-12 flex flex-col gap-12">
          <div
            v-for="(benefit, index) in benefits"
            :key="index"
            class="group relative flex flex-col items-center gap-6 overflow-hidden rounded-2xl bg-white/80 shadow-md transition md:flex-row md:justify-between md:gap-10"
            :class="index % 2 === 1 ? 'md:flex-row-reverse' : ''"
          >
            <div
              :class="
                index % 2 === 1 ? 'md:rounded-l-full' : 'md:rounded-r-full'
              "
              class="w-full rounded-t-2xl md:max-w-sm"
            >
              <img
                :src="benefit.img"
                :alt="benefit.title"
                class="1 h-56 w-full object-cover transition-transform duration-500 ease-out group-hover:brightness-110"
              />
            </div>

            <div
              class="mb-6 md:mb-0"
              :class="index % 2 === 1 ? 'md:pl-10' : 'md:pr-10'"
            >
              <h2 class="text-lg font-semibold">{{ benefit.title }}</h2>
              <p class="text-sm text-gray-600">{{ benefit.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-[#FDF2E0] py-16">
      <div class="mx-auto max-w-7xl px-4">
        <h2 class="text-center text-2xl font-bold tracking-widest md:text-3xl">
          需要具備哪些技能？
        </h2>
        <p class="mt-4 text-center text-slate-600">嘗試從以下技能開始</p>

        <div class="mt-12 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
          <div
            v-for="(skill, index) in skills"
            :key="index"
            class="group flex flex-col overflow-hidden rounded-xl bg-white text-center shadow-md"
          >
            <div
              v-if="skill.img"
              class="h-32 overflow-hidden will-change-transform"
            >
              <img
                :src="skill.img"
                :alt="skill.title"
                class="h-full w-full transform-gpu rounded-t-xl object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div class="p-2">
              <h3 class="mb-1 text-lg font-semibold">{{ skill.title }}</h3>
              <p class="text-sm text-gray-500">{{ skill.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <PersonalNomadChallenges />

    <section class="relative bg-cover bg-center py-16">
      <div class="mx-auto max-w-7xl px-4">
        <div class="mx-auto mb-10 max-w-3xl text-center">
          <h2 class="personal-heading-highlight">最新文章</h2>
        </div>

        <div class="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div
            v-for="(article, index) in articles"
            :key="index"
            class="group relative flex cursor-pointer flex-col bg-white"
          >
            <article class="relative h-48 overflow-hidden">
              <div v-if="article.img" class="h-full w-full overflow-hidden">
                <img
                  :src="article.img"
                  :alt="article.title"
                  class="h-full w-full transform-gpu object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <div
                class="absolute inset-0 bg-gradient-to-t from-black/10 to-black/0 transition-opacity duration-300 group-hover:opacity-0"
              ></div>

              <div
                class="absolute right-2 bottom-2 flex items-center border border-white p-1 text-sm tracking-widest text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              >
                閱讀更多
                <Icon
                  name="i-mi:arrow-right"
                  class="ml-1 h-4 w-4 [clip-path:inset(0_0_45%_0)]"
                />
              </div>
            </article>

            <div class="flex flex-1 flex-col p-6">
              <h3
                class="mb-3 text-lg font-bold text-gray-800 transition-colors duration-300"
              >
                {{ article.title }}
              </h3>
              <p class="flex-1 text-sm text-gray-600">
                {{ article.summary }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section
      class="newsletter-section relative flex items-center justify-center py-8 md:py-24"
    >
      <div class="w-full max-w-2xl">
        <div
          class="relative z-10 mx-4 rounded-4xl bg-[#FDF2E0]/90 p-4 text-center"
        >
          <h2 class="mb-10 text-2xl font-bold tracking-widest md:text-3xl">
            訂閱電子報
          </h2>
          <p class="mb-6 text-sm md:text-base">獲取最新消息與活動資訊</p>

          <form class="flex flex-col items-center">
            <div class="flex w-full flex-col gap-2 md:flex-row">
              <input
                type="text"
                placeholder="名字"
                class="w-full rounded-full border border-gray-300 p-3 text-gray-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
              <input
                type="email"
                placeholder="電子郵件"
                class="w-full rounded-full border border-gray-300 p-3 text-gray-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            <button
              type="button"
              class="mt-8 rounded-4xl bg-sky-500 px-6 py-3 font-medium text-white transition hover:bg-sky-300/90"
            >
              訂閱
            </button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import websiteSetup from '~/assets/images/personal/websiteSetup.jpg'
import dev from '~/assets/images/personal/dev.jpg'
import writing from '~/assets/images/personal/writing.jpg'
import marketing from '~/assets/images/personal/marketing.jpg'
import ads from '~/assets/images/personal/ads.jpg'
import digitalNomad from '~/assets/images/personal/digitalNomad.jpg'
import freeLife from '~/assets/images/personal/freeLife.jpg'

import remoteWork from '~/assets/images/personal/post/remoteWork.jpg'
import personalBranding from '~/assets/images/personal/post/personalBranding.jpg'
import focus from '~/assets/images/personal/post/focus.jpg'
import freelancer from '~/assets/images/personal/post/freelancer.jpg'
import laptop from '~/assets/images/personal/post/laptop.jpg'

definePageMeta({
  layout: 'personal',
})

useHead({
  title: 'Fire Life - 數位遊牧形象網站',
  htmlAttrs: {
    lang: 'zh-TW',
  },
  meta: [
    {
      name: 'description',
      content:
        '想成為數位遊牧？Fire Life 提供完整指南，從網站架設、自由接案、遠距工作到生活技能，帶你打造專屬的遊牧人生。',
    },
    {
      name: 'keywords',
      content:
        '數位遊牧, 遊牧生活, 遠距工作, 自由接案, 個人形象網站, 網站架設, Fire Life',
    },

    { property: 'og:title', content: 'Fire Life - 數位遊牧形象網站' },
    {
      property: 'og:description',
      content:
        '探索數位遊牧的生活型態，學習必要技能，打造專屬於你的遠距工作與自由接案之路。',
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://firelifedev.com/digital-nomad' },
    {
      property: 'og:image',
      content: 'https://firelifedev.com/images/logo.png',
    },
  ],
  link: [{ rel: 'canonical', href: 'https://firelifedev.com/digital-nomad' }],
})

const benefits = [
  {
    img: digitalNomad,
    icon: '🌍',
    title: '自由彈性',
    desc: '隨時隨地工作，不受限於地點，掌握自己的時間。',
  },
  {
    img: freeLife,
    icon: '⚖️',
    title: '生活平衡',
    desc: '在旅途中兼顧工作，打造屬於自己的理想生活。',
  },
]

const skills = [
  {
    img: websiteSetup,
    title: '網站架設',
    desc: '建置與維護網站，接案利器',
  },
  {
    img: dev,
    title: '程式開發',
    desc: '前端/後端開發，打造功能完整產品',
  },
  {
    img: writing,
    title: '文案寫作',
    desc: '撰寫行銷與內容文案，提高轉換率',
  },
  {
    img: marketing,
    title: '行銷策劃',
    desc: '社群、品牌、產品策略規劃',
  },
  {
    img: ads,
    title: '廣告投放',
    desc: 'Facebook / Google 廣告操作與優化',
  },
]

const articles = [
  {
    img: remoteWork,
    title: '遠距工作新趨勢',
    summary:
      '探索數位遊牧生活與遠距工作的最新方法與工具，了解如何在不同城市或國家自由工作，同時保持高效率與工作品質。',
  },
  {
    img: personalBranding,
    title: '如何打造個人品牌',
    summary:
      '學會自我行銷技巧，建立專業形象，讓你的專業能力被更多人看見，並吸引理想客戶或合作機會。',
  },
  {
    img: focus,
    title: '旅途中提升專注力',
    summary:
      '掌握環境與工作節奏，從咖啡廳到海邊，學會如何在旅途中專注工作，同時享受自由的生活方式。',
  },
  {
    img: freelancer,
    title: '自由工作者必備技能',
    summary:
      '從程式、設計到行銷，掌握多元技能，提升接案能力與競爭力，讓你的自由職涯更加穩定與豐富。',
  },
  {
    img: laptop,
    title: '遠距工作設備推薦',
    summary:
      '挑選適合的筆電、耳機、網路設備與辦公配件，打造舒適高效的遠距工作環境，讓你隨時隨地專注於工作。',
  },
]
</script>

<style scoped>
.newsletter-section {
  height: 550px;
  background-image: url('/images/personal/footer.svg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
