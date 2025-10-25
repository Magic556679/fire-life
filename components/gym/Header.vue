<template>
  <header
    :class="[
      'fixed inset-x-0 top-0 z-50 transition-all duration-500',
      isScrolled
        ? 'border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur-md'
        : 'bg-transparent',
    ]"
  >
    <div class="mx-auto max-w-7xl px-6">
      <div class="flex h-16 items-center justify-between">
        <NuxtLink to="/" class="text-xl font-bold tracking-widest transition">
          <span :class="isScrolled ? 'text-gray-900' : 'text-white'">
            Balance
          </span>
        </NuxtLink>

        <nav class="hidden items-center gap-8 text-sm font-medium md:flex">
          <a
            v-for="item in menuItems"
            :key="item"
            href="#"
            class="relative transition duration-300"
            :class="
              isScrolled
                ? 'text-gray-800 hover:text-green-600'
                : 'text-white hover:text-green-400'
            "
          >
            {{ item }}
            <span
              class="absolute -bottom-1 left-0 h-0.5 w-0 bg-green-500 transition-all duration-300 group-hover:w-full"
            ></span>
          </a>
        </nav>

        <button
          class="hidden cursor-pointer rounded-full bg-green-500 px-5 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-green-600 hover:shadow-xl md:block"
        >
          立即預約體驗
        </button>

        <button type="button" class="md:hidden" @click="toggleMenu">
          <Icon
            :name="isMenu ? 'i-lucide:x' : 'i-lucide:menu'"
            :class="isScrolled ? 'text-gray-900' : 'text-white'"
            class="h-6 w-6 transition"
          />
        </button>
      </div>
    </div>

    <GymMobileMenu v-if="isMenu" :toggle-menu="toggleMenu" />
  </header>
</template>

<script setup lang="ts">
const isMenu = ref(false)
const isScrolled = ref(false)
const toggleMenu = () => (isMenu.value = !isMenu.value)

const menuItems = ['關於 Balance', '課程介紹', '會員回饋']

onMounted(() => {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 40
  })
})
</script>
