<template>
  <Teleport to="body">
    <div
      class="fixed inset-0 z-[999] bg-white/90 backdrop-blur-md transition-all duration-500"
    >
      <div
        class="flex h-16 items-center justify-between border-b border-gray-200 px-6"
      >
        <NuxtLink to="/">
          <div class="flex items-center justify-center gap-2">
            <h2 class="text-xl tracking-widest md:text-3xl">Balance</h2>
          </div>
        </NuxtLink>
        <button
          type="button"
          @click="toggleMenu"
          class="rounded-full p-1 transition"
        >
          <Icon name="i-lucide:x" class="h-6 w-6 text-gray-800" />
        </button>
      </div>

      <nav
        class="flex h-[calc(100vh-3.5rem)] flex-col items-center justify-center space-y-8 text-lg font-medium"
      >
        <a
          v-for="item in menuItems"
          :key="item"
          href="#"
          class="group relative text-gray-800 transition hover:text-green-600"
          @click="toggleMenu"
        >
          {{ item }}
          <span
            class="absolute -bottom-1 left-0 h-0.5 w-0 bg-green-500 transition-all duration-300 group-hover:w-full"
          ></span>
        </a>

        <button
          class="mt-6 rounded-full bg-green-500 px-6 py-2 text-white shadow-md transition hover:bg-green-600 hover:shadow-lg"
          @click="toggleMenu"
        >
          立即預約體驗
        </button>
      </nav>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
interface Props {
  toggleMenu: () => void
}

defineProps<Props>()

const menuItems = ['關於 Balance', '課程介紹', '會員回饋']
</script>
