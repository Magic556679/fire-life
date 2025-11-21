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
        <nav class="hidden items-center gap-8 text-sm font-medium md:flex">
          <NuxtLink
            v-for="item in menuItems"
            :key="item.name"
            :to="item.link"
            class="group relative transition duration-300"
          >
            {{ item.name }}
            <span
              class="bg-orange-light absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full"
            ></span>
          </NuxtLink>
        </nav>

        <button type="button" class="md:hidden" @click="toggleMenu">
          <Icon
            :name="isMenu ? 'i-lucide:x' : 'i-lucide:menu'"
            class="h-6 w-6 text-gray-900 transition"
          />
        </button>
      </div>
      <LayoutMobileMenu v-if="isMenu" :toggle-menu="toggleMenu" />
    </div>
  </header>
</template>

<script setup lang="ts">
const isMenu = ref(false)
const isScrolled = ref(false)

const menuItems = [
  { name: '作品參考', link: '/works' },
  { name: '服務項目', link: '/service' },
  { name: '合作流程', link: '/process' },
  { name: '文章列表', link: '/blog' },
  { name: '聯絡資訊', link: '/contact' },
]

const toggleMenu = (): void => {
  isMenu.value = !isMenu.value
}

onMounted(() => {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 40
  })
})
</script>
