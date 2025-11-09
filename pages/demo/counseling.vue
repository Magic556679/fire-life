<template>
  <div>
    <section class="bg-[#F9F7F1] py-16">
      <div
        class="container mx-auto flex flex-col-reverse items-center gap-10 px-4 md:flex-row md:gap-16"
      >
        <div class="md:w-1/2">
          <h2 class="mb-4 text-3xl font-bold">趴趴熊心理諮商所理念</h2>
          <p class="mb-4 leading-relaxed">我們相信每個人都值得被理解與支持。</p>
          <p class="mb-4 leading-relaxed">
            生活中難免有焦慮、壓力或情緒低落的時刻，而這些感受並不代表你的不足。
          </p>
          <p class="mb-4 leading-relaxed">
            希望成為你可以依靠的夥伴 ，
            傾聽你的心聲、陪伴你整理情緒，並引導你看見希望。
          </p>
        </div>

        <div class="flex justify-center md:w-1/2">
          <img
            src="https://cdn.firelifedev.com/counseling/do-not-cry.png"
            alt="趴趴熊心理諮商所插畫"
            class="w-full max-w-sm rounded-xl shadow-lg"
          />
        </div>
      </div>
    </section>

    <section class="bg-white py-16">
      <div class="container mx-auto px-4">
        <div class="mb-10 text-center">
          <h2
            class="text-2xl leading-9 font-bold tracking-widest text-black md:text-3xl"
          >
            服務項目
          </h2>
          <p class="mt-2 text-sm text-gray-600 md:text-base">
            我們提供多元的諮商與評估服務，協助你在不同階段找到支持與力量。
          </p>
        </div>

        <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(s, i) in services"
            :key="s.slug"
            class="group animate-fade-in-up flex translate-y-6 flex-col items-center text-center opacity-0"
            :style="{ animationDelay: `${i * 100}ms` }"
          >
            <div class="mb-4 h-48 w-full overflow-hidden rounded-xl">
              <img
                :src="s.image"
                :alt="s.title"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <h3 class="text-lg font-semibold text-[#2C3E50]">
              {{ s.title }}
            </h3>

            <p class="mt-2 min-h-[3rem] text-sm text-gray-600">
              {{ s.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-white py-16">
      <div class="container mx-auto px-4">
        <div class="mb-10 text-center">
          <h2
            class="text-2xl leading-9 font-bold tracking-widest text-black md:text-3xl"
          >
            團隊陣容
          </h2>
          <p class="mt-2 text-sm text-gray-600 md:text-base">
            我們的心理師團隊具備多元專業背景，致力於提供你最適切的支持。
          </p>
        </div>

        <div class="mt-10 flex flex-wrap justify-center gap-8">
          <div
            v-for="(member, i) in teamMembers"
            :key="i"
            class="group flex w-full max-w-sm flex-col items-center rounded-2xl bg-gray-50 text-center shadow-md transition duration-300 hover:shadow-xl sm:w-[45%] md:w-[40%] lg:w-[30%]"
          >
            <div class="h-80 w-full overflow-hidden rounded-t-lg">
              <img
                :src="member.image"
                :alt="member.name"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div class="p-6">
              <h3 class="text-lg font-semibold text-[#2C3E50]">
                {{ member.name }}
              </h3>
              <p class="mt-1 text-sm text-gray-600">{{ member.title }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-gray-50 py-16">
      <div class="container mx-auto px-4">
        <!-- 標題 -->
        <div class="mb-10 text-center">
          <h2 class="text-3xl leading-9 font-bold tracking-widest text-black">
            最新文章
          </h2>
          <p class="mt-2 text-gray-600">專業觀點，陪你探索心理世界</p>
        </div>

        <!-- 文章列表 -->
        <div class="space-y-8">
          <article
            v-for="(post, i) in posts"
            :key="post.slug"
            class="flex flex-col items-center gap-6 md:flex-row md:items-start"
          >
            <!-- 文章圖片 -->
            <nuxt-link :to="`/blog/${post.slug}`" class="block w-full md:w-3/6">
              <img
                :src="post.image"
                :alt="post.title"
                class="h-48 w-full rounded-xl object-cover shadow-sm md:h-56"
              />
            </nuxt-link>

            <div class="w-full md:w-3/6">
              <nuxt-link :to="`/blog/${post.slug}`">
                <h3
                  class="text-xl font-semibold text-[#2C3E50] transition hover:text-[#3498DB]"
                >
                  {{ post.title }}
                </h3>
              </nuxt-link>

              <div class="mt-2 flex flex-wrap gap-2">
                <span
                  v-for="tag in post.tags"
                  :key="tag"
                  class="inline-flex items-center gap-1 rounded-full border border-[#E0F3FA] bg-[#F3FBFF] px-3 py-1 text-xs text-[#2C3E50]"
                >
                  <Icon name="fa-solid:tag" class="h-2 w-2 text-[#5DADE2]" />
                  {{ tag }}
                </span>
              </div>

              <p class="mt-2 line-clamp-3 text-gray-600">
                {{ post.excerpt }}
              </p>

              <div class="mt-4 text-sm text-gray-400">
                {{ post.date }}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- 診所環境介紹 -->
    <section class="bg-gray-50 py-16">
      <div class="container mx-auto px-4">
        <div class="mb-10 text-center">
          <h2
            class="text-2xl leading-9 font-bold tracking-widest text-black md:text-3xl"
          >
            診所環境
          </h2>
          <p class="mt-2 text-sm text-gray-600 md:text-base">
            舒適、安全的空間，讓你能自在地表達自己。
          </p>
        </div>

        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <img
            src="https://cdn.firelifedev.com/counseling/room1.jpg"
            alt="診所環境1"
            class="h-48 w-full rounded-xl object-cover shadow-sm"
          />
          <img
            src="https://cdn.firelifedev.com/counseling/room2.jpg"
            alt="診所環境2"
            class="h-48 w-full rounded-xl object-cover shadow-sm"
          />
          <img
            src="https://cdn.firelifedev.com/counseling/room3.jpg"
            alt="診所環境3"
            class="h-48 w-full rounded-xl object-cover shadow-sm"
          />
        </div>
      </div>
    </section>

    <section class="bg-white py-16">
      <div class="container mx-auto px-4 text-center">
        <h2
          class="mb-4 text-2xl leading-9 font-bold tracking-widest text-black md:text-3xl"
        >
          準備好踏出第一步了嗎？
        </h2>
        <p class="mb-8 text-gray-600">
          聯繫我們，預約你的專屬諮商時段，讓我們一起開始這段療癒之旅。
        </p>

        <UButton class="mt-1 bg-[#E6C59A] hover:bg-[#D4A76A]" type="button">
          聯繫我們
        </UButton>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'counseling',
})

useHead({
  title: '趴趴熊心理諮商所 - 專業心理諮商與陪伴',
  htmlAttrs: {
    lang: 'zh-TW',
  },
  meta: [
    {
      name: 'description',
      content:
        '趴趴熊心理諮商所提供專業心理諮商，陪伴你走過焦慮、壓力與情緒低落，找回內心的平衡與安定。',
    },
    {
      name: 'keywords',
      content:
        '心理諮商, 趴趴熊, 壓力管理, 情緒調適, 焦慮舒緩, 心理健康, 個人形象網站, 網站架設, Fire Life',
    },
    { property: 'og:title', content: '趴趴熊心理諮商所 - 專業心理諮商與陪伴' },
    {
      property: 'og:description',
      content:
        '趴趴熊心理諮商所提供專業心理諮商，陪伴你走過焦慮、壓力與情緒低落，找回內心的平衡與安定。',
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://firelifedev.com/demo/counseling' },
    {
      property: 'og:image',
      content:
        'https://cdn.firelifedev.com/counseling/counselingOgImage%20.png',
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: 'https://cdn.firelifedev.com/counseling/logo2.png',
    },
    { rel: 'canonical', href: 'https://firelifedev.com/demo/counseling' },
  ],
})

const services = [
  {
    slug: 'individual-therapy',
    title: '個人諮商',
    description: '針對焦慮、憂鬱、情緒調節等議題，提供專屬的諮商計畫。',
    image: 'https://cdn.firelifedev.com/counseling/person-counseling.jpg',
  },
  {
    slug: 'couples-family',
    title: '夫妻 / 家庭諮商',
    description: '協助家庭與伴侶改善溝通、修復關係，建立更健康的互動模式。',
    image: 'https://cdn.firelifedev.com/counseling/family.jpg',
  },
  {
    slug: 'child-adol',
    title: '兒童與青少年諮商',
    description: '針對學校適應、情緒行為，提供年齡適切的介入與支持。',
    image: 'https://cdn.firelifedev.com/counseling/teenager.jpg',
  },
]

const teamMembers = [
  {
    name: '陳心理師',
    title: '臨床心理師',
    image: 'https://cdn.firelifedev.com/counseling/female-doctor1.jpg',
  },
  {
    name: '林心理師',
    title: '諮商心理師',
    image: 'https://cdn.firelifedev.com/counseling/male-doctor1.jpg',
  },
]

const posts = [
  {
    slug: 'stress-management',
    title: '面對壓力的 5 種方法',
    excerpt: '壓力是生活中難免的挑戰，透過這些方法，你可以逐步恢復平衡…',
    image: 'https://cdn.firelifedev.com/counseling/think.jpg',
    date: '2025-09-28',
    author: '陳心理師',
    category: '心理健康',
    tags: ['壓力調適', '心理健康'],
  },
  {
    slug: 'self-esteem',
    title: '提升自我價值感的小技巧',
    excerpt: '自我價值感影響著人際關係與生活滿意度，學會善待自己很重要…',
    image: 'https://cdn.firelifedev.com/counseling/self-esteem.jpg',
    date: '2025-09-15',
    author: '林心理師',
    category: '自我成長',
    tags: ['自我成長'],
  },
  {
    slug: 'anxiety-relief',
    title: '當焦慮來襲，可以怎麼做？',
    excerpt: '焦慮感往往讓人難以專注，這篇文章帶你認識有效舒緩方式…',
    image: 'https://cdn.firelifedev.com/counseling/read-book.jpg',
    date: '2025-09-05',
    author: '王心理師',
    category: '焦慮調適',
    tags: ['焦慮'],
  },
]
</script>

<style scoped>
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
  animation: fadeInUp 0.6s ease-out forwards;
}
</style>
