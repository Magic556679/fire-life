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
          magic556679@gmail.com
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
      </div>
    </div>
    <div class="mt-10 lg:mt-0">
      <img class="mx-auto w-52 lg:mx-0 lg:w-64" :src="imgSrc" alt="" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const imgSrc = ref('/images/contact.png')
</script>
