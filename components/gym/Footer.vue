<template>
  <footer
    class="bg-gradient-to-b from-green-950 to-black py-12 text-center text-white"
  >
    <div class="flex justify-center gap-6">
      <div
        v-for="icon in icons"
        :key="icon.name"
        class="group flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition hover:bg-green-500/20"
      >
        <Icon
          :name="icon.name"
          class="h-5 w-5 text-white transition group-hover:scale-110 group-hover:text-green-400"
        />
      </div>
    </div>

    <ul
      class="mt-10 flex flex-wrap justify-center gap-8 text-sm font-medium tracking-wider"
    >
      <li class="cursor-pointer transition hover:text-green-400">
        關於 Balance
      </li>
      <li class="cursor-pointer transition hover:text-green-400">課程介紹</li>
      <li class="cursor-pointer transition hover:text-green-400">會員回饋</li>
      <li class="cursor-pointer transition hover:text-green-400">立即預約</li>
    </ul>

    <p class="mt-8 text-xs text-gray-400">
      本網站為 Balance GYM 首頁示範頁面，僅供設計與開發展示使用
    </p>

    <div class="mt-6 border-t border-white/10 pt-4 text-xs text-gray-500">
      © {{ year }} Balance GYM. All rights reserved.
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()

const icons = [
  { name: 'i-fa-brands:facebook' },
  { name: 'i-fa-brands:youtube' },
  { name: 'i-fa-brands:instagram' },
]
</script>
