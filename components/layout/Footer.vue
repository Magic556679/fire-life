<template>
  <div class="border-t border-gray-200 py-4 text-center">
    <ul class="flex justify-center gap-6">
      <li class="bg-mint-500 flex items-center">
        <NuxtLink to="/Service">服務項目</NuxtLink>
      </li>
      <li class="bg-mint-500 flex items-center">
        <NuxtLink to="/blog">文章列表</NuxtLink>
      </li>
    </ul>
    <p class="pt-4 text-xs">© {{ year }} Li Yen Wei. All rights reserved.</p>
  </div>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>
