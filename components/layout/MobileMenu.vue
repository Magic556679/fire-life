<template>
  <Teleport to="body">
    <div class="fixed inset-x-0 top-0 bg-white">
      <div class="flex h-14 items-center justify-between px-6">
        <div class="w-12">
          <img src="/images/logo.png" alt="logo" />
        </div>
        <button type="button" @click="toggleMenu">
          <Icon name="lsicon:close-small-filled" style="color: black" />
        </button>
      </div>
      <nav
        class="flex h-[calc(100vh-3.5rem)] flex-col items-center justify-center space-y-8 text-lg font-medium"
      >
        <NuxtLink
          v-for="item in menuItems"
          :key="item.name"
          :href="item.link"
          class="group relative text-gray-800 transition hover:text-green-600"
          @click="toggleMenu"
        >
          {{ item.name }}
        </NuxtLink>
      </nav>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
interface Props {
  toggleMenu: () => void
}

defineProps<Props>()

const menuItems = [
  { name: '作品參考', link: '/works' },
  { name: '服務項目', link: '/service' },
  { name: '合作流程', link: '/process' },
  { name: '文章列表', link: '/blog' },
  { name: '聯絡資訊', link: '/contact' },
]
</script>
