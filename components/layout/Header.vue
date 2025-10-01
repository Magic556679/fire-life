<template>
  <header class="fixed inset-x-0 z-50 border-b border-gray-200 bg-white">
    <div class="max-w-8xl mx-auto">
      <div class="flex h-14 items-center justify-between px-6">
        <div>
          <NuxtLink to="/">
            <div class="w-12">
              <img src="/images/logo.png" alt="logo" />
            </div>
          </NuxtLink>
        </div>
        <div class="max-md:hidden">
          <ul class="flex gap-6">
            <li class="flex items-center">
              <NuxtLink to="/works">網站範例</NuxtLink>
            </li>
            <li class="flex items-center">
              <NuxtLink to="/service">服務項目</NuxtLink>
            </li>
            <!-- <li class="  flex items-center">
              <NuxtLink to="/about">關於我</NuxtLink>
            </li> -->
            <li class="flex items-center">
              <NuxtLink to="/process">合作流程</NuxtLink>
            </li>
            <!-- <li class="  flex items-center">
              <NuxtLink to="/blog">文章列表</NuxtLink>
            </li> -->
            <li class="flex items-center">
              <NuxtLink to="/contact">聯絡資訊</NuxtLink>
            </li>
          </ul>
        </div>
        <div v-if="!isMenu" class="md:hidden">
          <button type="button" @click="toggleMenu">
            <Icon name="i-lucide:menu" style="color: black" />
          </button>
        </div>
      </div>
      <LayoutMobileMenu v-if="isMenu" :toggle-menu="toggleMenu" />
    </div>
  </header>
</template>

<script setup lang="ts">
const isMenu = ref(false)

const toggleMenu = (): void => {
  isMenu.value = !isMenu.value
}
</script>
