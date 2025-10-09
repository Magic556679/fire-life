<template>
  <div class="bg-[#FDF2E0]/90 py-4 text-center">
    <ul class="flex justify-center gap-6">
      <li class="flex cursor-pointer items-center">
        <div
          class="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm"
        >
          <Icon name="i-fa-brands:facebook" class="text-black" />
        </div>
      </li>
      <li class="flex cursor-pointer items-center">
        <div
          class="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm"
        >
          <Icon name="i-fa-brands:youtube" class="text-black" />
        </div>
      </li>
      <li class="flex cursor-pointer items-center">
        <div
          class="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm"
        >
          <Icon name="i-fa-brands:instagram" class="text-black" />
        </div>
      </li>
    </ul>
    <ul class="mt-8 flex justify-center gap-6">
      <li class="flex cursor-pointer items-center">
        <span>服務項目</span>
      </li>
      <li class="flex cursor-pointer items-center">
        <span>相關文章</span>
      </li>
      <li class="flex cursor-pointer items-center">
        <span>關於我們</span>
      </li>
    </ul>
    <p class="mt-6 text-center text-xs text-gray-500">
      本網站為心理諮商所首頁示範頁面，僅供設計與開發展示使用，
      不提供實際心理諮商或醫療服務。
    </p>

    <p class="pt-4 text-xs">
      © {{ year }} 趴趴熊心理諮商所 All rights reserved.
    </p>
  </div>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>
