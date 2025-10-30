<template>
  <div class="py-20 text-center">
    <div class="mt-2 flex flex-wrap justify-center gap-6 md:flex-nowrap">
      <NuxtLink
        v-for="(service, index) in services"
        :key="index"
        class="w-full bg-white/50 px-5 py-10 transition-shadow duration-700 ease-in-out hover:shadow-md md:max-w-sm"
        to="/service"
      >
        <h3 class="mb-4 text-xl font-semibold tracking-wide">
          {{ service.title }}
        </h3>
        <img
          :src="service.image"
          :alt="service.alt"
          class="mx-auto mb-4 h-[200px] w-[200px] rounded-md object-contain"
        />
        <p class="text-base leading-relaxed text-gray-700">
          {{ service.description }}
        </p>
      </NuxtLink>
    </div>
  </div>
</template>
<script setup lang="ts">
const services = [
  {
    title: '網站架設',
    image: '/images/service-1.svg',
    alt: '企業/個人網站架設',
    description:
      '為企業或個人打造專屬網站，從形象網站到部落格，提供快速與穩定的高效網站。',
  },
  {
    title: '前端功能開發',
    image: '/images/service-2.svg',
    alt: '前端功能開發',
    description:
      '協助企業專案進行前端功能開發，熟悉 Vue、React，從規劃到上線提供完整前端解決方案。',
  },
  {
    title: '前端轉職諮詢',
    image: '/images/service-3.svg',
    alt: '前端轉職諮詢',
    description:
      '提供前端轉職規劃，分享前端開發實務經驗，幫助你順利進入前端職場。',
  },
]
</script>
