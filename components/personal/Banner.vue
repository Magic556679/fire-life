<template>
  <section class="relative w-full pt-14">
    <!-- <div class="relative z-10 overflow-hidden bg-gray-400/50 text-black">
      <div class="relative overflow-hidden">
        <div
          class="animate-marquee flex py-2 text-sm tracking-widest whitespace-nowrap"
        >
          <span class="mx-8">此為形象網站 示範版本</span>
          <span class="mx-8">此為形象網站 示範版本</span>
          <span class="mx-8">此為形象網站 示範版本</span>
          <span class="mx-8">此為形象網站 示範版本</span>
          <span class="mx-8">此為形象網站 示範版本</span>
        </div>
      </div>
    </div> -->
    <div class="relative z-10 overflow-hidden bg-gray-400/40 text-black">
      <div class="relative overflow-hidden">
        <div
          class="animate-marquee flex py-2 text-sm font-semibold tracking-[.2em] whitespace-nowrap text-black/70"
        >
          <span class="mx-8">- 此為形象網站示範版本</span>
          <span class="mx-8">此為形象網站示範版本</span>
          <span class="mx-8">此為形象網站示範版本</span>
          <span class="mx-8">此為形象網站示範版本</span>
          <span class="mx-8">此為形象網站示範版本 -</span>
        </div>
      </div>
    </div>

    <img
      src="/images/personal/banner2.svg"
      alt="banner"
      class="absolute inset-0 h-full w-full object-cover"
    />
    <div class="justify-center md:flex">
      <div
        class="flex h-full w-full items-center justify-center py-8 md:w-[60%] md:py-36"
      >
        <div
          class="relative mx-4 w-full max-w-[960px] rounded-3xl bg-sky-300/90 p-4 md:mx-0"
        >
          <div class="text-center">
            <h1 class="mb-4 text-3xl leading-9 tracking-widest lg:text-4xl">
              數位遊牧的下一站，由你決定
            </h1>
          </div>

          <div ref="swiperContainer" class="swiper h-96 w-full rounded-2xl">
            <div class="swiper-wrapper">
              <div
                v-for="(place, index) in places"
                :key="index"
                class="swiper-slide"
              >
                <div
                  class="flex h-full w-full flex-col items-center justify-center rounded-2xl bg-white/80 p-6"
                >
                  <img
                    :src="place.image"
                    :alt="place.name"
                    class="mb-4 h-52 w-full rounded-2xl object-cover"
                  />
                  <h3 class="text-xl font-semibold">
                    {{ place.flag }} {{ place.name }}
                  </h3>
                  <p class="mt-2 text-center text-sm text-gray-700">
                    {{ place.description }}
                  </p>
                </div>
              </div>
            </div>

            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>

            <div class="swiper-pagination"></div>
          </div>
        </div>
      </div>
      <div class="ml-[-5%] flex flex-col justify-end">
        <picture class="pointer-events-none z-10 md:max-w-[600px]">
          <img :src="sofia" alt="sofia" />
        </picture>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import SwiperCore from 'swiper'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import sofia from '~/assets/images/personal/sofia.png'
import chiangmai from '~/assets/images/personal/chiangmai.jpg'
import bali from '~/assets/images/personal/bali.jpg'
import barcelona from '~/assets/images/personal/barcelona.jpg'
import lisbon from '~/assets/images/personal/lisbon.jpg'

const places = [
  {
    name: '泰國‧清邁',
    flag: '🇹🇭',
    description: '低生活成本，咖啡廳與共同工作空間多，是亞洲數位遊牧首選。',
    image: chiangmai,
  },
  {
    name: '印尼‧峇里島',
    flag: '🇮🇩',
    description: '熱帶天堂，適合結合工作與度假的島嶼生活。',
    image: bali,
  },
  {
    name: '西班牙‧巴塞隆納',
    flag: '🇪🇸',
    description: '地中海氣候，藝術與文化並存，歐洲數位遊牧熱門據點。',
    image: barcelona,
  },
  {
    name: '葡萄牙‧里斯本',
    flag: '🇵🇹',
    description:
      '歐洲數位遊牧熱門城市，陽光與共享工作空間充足，生活自由且充滿創意。',
    image: lisbon,
  },
]

const swiperContainer = ref(null)

onMounted(() => {
  new SwiperCore(swiperContainer.value!, {
    modules: [Navigation, Pagination, Autoplay],
    slidesPerView: 1,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      type: 'bullets',
    },
    breakpoints: {
      640: { slidesPerView: 1 },
      768: { slidesPerView: 1 },
      1024: { slidesPerView: 1 },
    },
  })
})
</script>

<style scoped>
::v-deep(.swiper-button-prev),
::v-deep(.swiper-button-next) {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  transition: background-color 0.3s;
}

::v-deep(.swiper-button-prev::after),
::v-deep(.swiper-button-next::after) {
  font-size: 20px;
}

::v-deep(.swiper-pagination-bullet-active) {
  width: 20px;
  height: 20px;
  background: url('/images/personal/Island.png') no-repeat center;
  background-size: contain;
  border-radius: 0;
}

@keyframes marquee {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.animate-marquee {
  display: inline-block;
  min-width: 100%;
  animation: marquee 20s linear infinite;
}
</style>
