<template>
  <header class="fixed inset-x-0 z-50 border-b border-gray-200 bg-white">
    <div class="max-w-8xl mx-auto">
      <div class="flex h-14 items-center justify-between px-6">
        <div>
          <NuxtLink to="/">
            <h2 class="tracking-widest">數位遊牧</h2>
          </NuxtLink>
        </div>
        <div class="max-md:hidden">
          <ul class="flex gap-6">
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
        </div>
        <div v-if="!isMenu" class="md:hidden">
          <button type="button" @click="toggleMenu">
            <Icon name="i-lucide:menu" style="color: black" />
          </button>
        </div>
      </div>
      <PersonalMobileMenu v-if="isMenu" :toggle-menu="toggleMenu" />
    </div>
  </header>
</template>

<script setup lang="ts">
const isMenu = ref(false)

const toggleMenu = (): void => {
  isMenu.value = !isMenu.value
}
</script>

<style lang="scss" scoped></style>
