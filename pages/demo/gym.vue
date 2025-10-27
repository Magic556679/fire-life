<template>
  <div>
    <section class="relative overflow-hidden bg-white py-16">
      <div
        class="mx-auto flex max-w-7xl flex-col items-center px-4 md:flex-row"
      >
        <div class="mb-8 text-center md:mb-0 md:w-1/2 md:pr-12">
          <h2 class="mb-4 text-3xl font-bold">為什麼選擇 Balance？</h2>
          <p class="mb-6 text-gray-600">
            不只是運動，從訓練到飲食，一次到位，讓你達到理想體態。
          </p>
        </div>
        <div class="relative md:w-1/2">
          <img
            src="https://cdn.firelifedev.com/gym/health-food.jpg"
            alt="健康飲食示意"
            class="h-full w-full transform rounded-2xl object-cover shadow-xl transition duration-500 select-none hover:scale-105"
          />
        </div>
      </div>
    </section>

    <section ref="swiperContainer" class="swiper h-[68vh] w-full">
      <div class="swiper-wrapper">
        <div v-for="(place, index) in places" :key="index" class="swiper-slide">
          <div
            class="relative flex h-full w-full flex-col items-center justify-center"
          >
            <img
              :src="place.image"
              :alt="place.name"
              class="mb-4 h-full w-full object-cover select-none"
            />

            <div
              class="group absolute right-8 bottom-10 flex cursor-pointer items-center border border-white px-3 py-1 text-sm tracking-widest text-white transition-all duration-300 hover:bg-white/10"
            >
              <h4
                class="transition-colors duration-300 group-hover:text-white/90"
              >
                {{ place.name }}
              </h4>
              <Icon
                name="i-mi:arrow-right"
                class="ml-1 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>

      <div class="swiper-pagination"></div>
    </section>

    <section class="bg-gray-50 py-16">
      <div class="mx-auto max-w-6xl px-4">
        <h2 class="mb-12 text-center text-3xl font-bold">特色課程與服務項目</h2>
        <p class="mb-16 text-center text-gray-600">
          一站式方案，讓訓練與飲食完美結合，幫你打造理想體態。
        </p>

        <div class="mb-16 flex flex-col items-center md:flex-row">
          <div class="text-center md:w-1/2 md:pr-12 md:text-left">
            <h3 class="mb-4 text-2xl font-semibold">個人訓練課程</h3>
            <p class="mb-4 text-gray-600">
              專屬教練為你量身打造訓練計畫，讓每一步都朝理想體態前進。
            </p>
            <a
              href="#booking"
              class="inline-block rounded-lg bg-green-500 px-6 py-2 text-white transition hover:bg-green-600"
            >
              預約體驗
            </a>
          </div>

          <div class="mt-6 md:mt-0 md:w-1/2">
            <img
              src="https://cdn.firelifedev.com/gym/course1.jpg"
              alt="個人訓練"
              class="h-80 w-full rounded-2xl object-cover shadow-lg transition hover:scale-105 md:h-96"
            />
          </div>
        </div>

        <div class="mb-16 flex flex-col items-center md:flex-row-reverse">
          <div class="text-center md:w-1/2 md:pl-12 md:text-left">
            <h3 class="mb-4 text-2xl font-semibold">專屬飲食計畫</h3>
            <p class="mb-4 text-gray-600">
              營養師設計每日健康餐，幫你輕鬆控制飲食，不再為吃什麼煩惱。
            </p>
            <a
              href="#meal-plan"
              class="inline-block rounded-lg bg-green-500 px-6 py-2 text-white transition hover:bg-green-600"
            >
              了解餐飲方案
            </a>
          </div>

          <div class="mt-6 md:mt-0 md:w-1/2">
            <img
              src="https://cdn.firelifedev.com/gym/course2.jpg"
              alt="飲食計畫"
              class="h-80 w-full rounded-2xl object-cover shadow-lg transition hover:scale-105 md:h-96"
            />
          </div>
        </div>

        <div class="flex flex-col items-center md:flex-row">
          <div class="text-center md:w-1/2 md:pr-12 md:text-left">
            <h3 class="mb-4 text-2xl font-semibold">平衡生活教練</h3>
            <p class="mb-4 text-gray-600">
              結合有氧運動與伸展，帶你放鬆身心，讓運動成為生活中輕鬆愉快的習慣。
            </p>

            <a
              href="#coaches"
              class="inline-block rounded-lg bg-green-500 px-6 py-2 text-white transition hover:bg-green-600"
            >
              了解更多
            </a>
          </div>

          <div class="mt-6 md:mt-0 md:w-1/2">
            <img
              src="https://cdn.firelifedev.com/gym/course3.jpg"
              alt="生活教練"
              class="h-80 w-full rounded-2xl object-cover shadow-lg transition hover:scale-105 md:h-96"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="bg-gray-100 py-16">
      <div
        class="mx-auto flex max-w-6xl flex-col items-center px-4 md:flex-row md:items-start"
      >
        <div class="mb-10 md:mb-0 md:w-1/2 md:pr-10">
          <h2 class="mb-4 text-3xl font-bold">會員回饋</h2>
          <h3 class="mb-6 text-2xl text-gray-800">
            真實會員的感受，見證 Balance 幫助他們達到體態與生活平衡
          </h3>
          <!-- <p class="leading-relaxed text-gray-600">
            從專業教練指導、放鬆身心的有氧運動，到幫你準備的均衡健康餐， Balance
            提供全方位的訓練與飲食支持，讓你在生活與體態間找到真正的平衡。
          </p> -->
        </div>

        <div class="w-full md:w-1/2">
          <div ref="testimonialSwiper" class="swiper h-96 w-full">
            <div class="swiper-wrapper">
              <div
                v-for="(feature, index) in testimonial"
                :key="index"
                class="swiper-slide"
              >
                <div
                  class="relative flex h-full flex-col overflow-hidden rounded-2xl shadow-lg"
                >
                  <img
                    :src="feature.image"
                    :alt="feature.title"
                    class="h-full w-full object-cover select-none"
                  />
                  <div class="absolute inset-0 bg-black/10"></div>

                  <div class="absolute bottom-0 p-6 text-white">
                    <h4 class="mb-2 text-xl font-semibold">
                      {{ feature.title }}
                    </h4>
                    <p>{{ feature.description }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div ref="testimonialPrev" class="swiper-button-prev"></div>
            <div ref="testimonialNext" class="swiper-button-next"></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import SwiperCore from 'swiper'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

definePageMeta({
  layout: 'gym',
})

useHead({
  title: 'Fire Life - Balance GYM 健身房形象網站',
  htmlAttrs: {
    lang: 'zh-TW',
  },
  meta: [
    {
      name: 'description',
      content:
        'Balance GYM 不只是訓練中心，我們結合專業教練指導與健康飲食，幫助你達到體態與生活的平衡。',
    },
    {
      name: 'keywords',
      content:
        '健身房, Balance GYM, 一對一教練, 飲食控制, 健身課程, 健康餐, 體態改善, 運動訓練, 健康生活, 網站架設, Fire Life',
    },
    { property: 'og:title', content: 'Balance GYM - 飲食與訓練的完美平衡' },
    {
      property: 'og:description',
      content:
        '在 Balance GYM，我們不只是幫你鍛鍊身體，更透過飲食與運動計畫，打造長期健康與自信的生活方式。',
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://firelifedev.com/demo/gym' },
    {
      property: 'og:image',
      content: 'https://cdn.firelifedev.com/gym/gym-og-image.png',
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://firelifedev.com/demo/gym',
    },
  ],
})

const places = [
  {
    name: 'Balance 1店',
    image: 'https://cdn.firelifedev.com/gym/room1.jpg',
  },
  {
    name: 'Balance 2店',
    image: 'https://cdn.firelifedev.com/gym/room2.jpg',
  },
  {
    name: '各店備有免費廚房',
    image: 'https://cdn.firelifedev.com/gym/room3.jpg',
  },
]

const testimonial = ref([
  {
    title: '陳志豪',
    description:
      '「Balance的教練幫我找到適合自己的訓練節奏，加上每日健康餐，體態改善真的很明顯！」',
    image: 'https://cdn.firelifedev.com/gym/people1.jpg',
  },
  {
    title: '林小美',
    description:
      '「不只是運動，Balance幫我調整飲食計畫，有氧課程讓我放鬆身心，每週都期待來上課。」',
    image: 'https://cdn.firelifedev.com/gym/people2.jpg',
  },
  {
    title: '黃庭宇',
    description:
      '「從來沒想過運動可以這麼輕鬆，教練會注意每個細節，搭配健康餐真的改變了我的生活習慣。」',
    image: 'https://cdn.firelifedev.com/gym/people3.jpg',
  },
  {
    title: '王佳怡 ',
    description:
      '「Balance 讓我重新找回運動的樂趣，教練專業又親切，飲食控制也不再痛苦，成果超出預期！」',
    image: 'https://cdn.firelifedev.com/gym/people5.jpg',
  },
])

const swiperContainer = ref(null)
const testimonialSwiper = ref(null)

const testimonialPrev = ref(null)
const testimonialNext = ref(null)

onMounted(() => {
  new SwiperCore(swiperContainer.value!, {
    modules: [Navigation, Pagination, Autoplay],
    slidesPerView: 1,
    loop: true,
    speed: 1000,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      640: { slidesPerView: 1 },
      768: { slidesPerView: 1 },
      1024: { slidesPerView: 1 },
    },
  })

  new SwiperCore(testimonialSwiper.value!, {
    modules: [Navigation, Pagination, Autoplay],
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    speed: 1000,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: testimonialNext.value,
      prevEl: testimonialPrev.value,
    },
    breakpoints: {
      640: { slidesPerView: 1 },
      768: { slidesPerView: 1 },
      1024: { slidesPerView: 2.5 },
    },
  })
})
</script>
<style lang="scss" scoped>
::v-deep(.swiper-slide) {
  width: auto;
  transition: transform 0.8s ease-in-out;
}

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
</style>
