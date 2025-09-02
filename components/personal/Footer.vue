<template>
  <div class="bg-[#FDF2E0]/90 py-4 text-center">
    <ul class="flex justify-center gap-6">
      <li class="bg-mint-500 flex cursor-pointer items-center">
        <div
          class="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm"
        >
          <Icon name="i-fa-brands:facebook" class="text-black" />
        </div>
      </li>
      <li class="bg-mint-500 flex cursor-pointer items-center">
        <div
          class="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm"
        >
          <Icon name="i-fa-brands:youtube" class="text-black" />
        </div>
      </li>
      <li class="bg-mint-500 flex cursor-pointer items-center">
        <div
          class="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm"
        >
          <Icon name="i-fa-brands:instagram" class="text-black" />
        </div>
      </li>
    </ul>
    <ul class="mt-8 flex justify-center gap-6">
      <li class="bg-mint-500 flex cursor-pointer items-center">
        <span>關於我</span>
      </li>
      <li class="bg-mint-500 flex cursor-pointer items-center">
        <span>部落格</span>
      </li>
      <li class="bg-mint-500 flex cursor-pointer items-center">
        <NuxtLink to="/contact">聯絡資訊</NuxtLink>
      </li>
    </ul>
    <p class="pt-4 text-xs">© {{ year }} Li Yen Wei. All rights reserved.</p>
  </div>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>
