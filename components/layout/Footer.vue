<template>
  <div class="border-t border-gray-200 py-4 text-center">
    <ul class="flex justify-center gap-6 text-xs xl:text-base">
      <li class="flex items-center">
        <NuxtLink to="/works">作品參考</NuxtLink>
      </li>
      <li class="flex items-center">
        <NuxtLink to="/Service">服務項目</NuxtLink>
      </li>
      <li class="flex items-center">
        <NuxtLink to="/process">合作流程</NuxtLink>
      </li>
      <li class="flex items-center">
        <NuxtLink to="/blog">文章列表</NuxtLink>
      </li>
      <li class="flex items-center">
        <NuxtLink to="/contact">聯絡資訊</NuxtLink>
      </li>
    </ul>
    <p class="pt-4 text-xs">© {{ year }} Li Yen Wei. All rights reserved.</p>
  </div>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>
