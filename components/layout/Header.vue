<template>
  <header class="fixed inset-x-0 border-b border-gray-200 bg-white">
    <div class="max-w-8xl mx-auto">
      <div class="flex h-14 items-center justify-between px-6">
        <div>
          <Icon name="logos:adroll" />
        </div>
        <div class="max-md:hidden">
          <ul class="flex gap-6">
            <li class="flex items-center">
              <NuxtLink to="/">Home</NuxtLink>
            </li>
            <li class="bg-mint-500 flex items-center">
              <NuxtLink to="/blog">Blog</NuxtLink>
            </li>
          </ul>
        </div>
        <div v-if="!isMenu" class="md:hidden">
          <button type="button" @click="toggleMenu">
            <Icon name="i-lucide:menu" style="color: black" />
          </button>
        </div>
      </div>
      <LayoutMoblieMenu v-if="isMenu" :toggle-menu="toggleMenu" />
    </div>
  </header>
</template>

<script setup lang="ts">
const isMenu = ref(false)

const toggleMenu = (): void => {
  isMenu.value = !isMenu.value
  console.log('isToggle', isMenu.value)
}
</script>
