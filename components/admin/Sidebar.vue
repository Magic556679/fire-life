<template>
  <div class="hidden h-svh border-r border-gray-200 lg:block">
    <UNavigationMenu
      orientation="vertical"
      class="w-[255px]"
      :items="items"
      :ui="{
        item: 'p-2',
        link: 'p-2',
      }"
    />
  </div>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items = ref<NavigationMenuItem[][]>([
  [
    {
      label: 'Dashboard',
      icon: 'i-lucide-layout-dashboard',
      to: '/admin',
      // active: true,
      // defaultOpen: true,
    },
    {
      label: '內容管理',
      icon: 'i-lucide-file-text',
      children: [
        {
          label: '文章列表',
          icon: 'i-lucide-list',
          to: '/admin/blog',
        },
        {
          label: '新增文章',
          icon: 'i-lucide-file-plus',
          to: '/admin/blog/create',
        },
        {
          label: '作品集列表',
          icon: 'i-lucide-folder',
          to: '/admin/portfolio',
        },
        {
          label: '新增作品',
          icon: 'i-lucide-plus-circle',
          to: '/admin/portfolio/create',
        },
      ],
    },
    {
      label: '分類管理',
      icon: 'i-lucide-tags',
      children: [
        {
          label: '文章分類',
          icon: 'i-lucide-tag',
          to: '/admin/categories/blog',
        },
        {
          label: '作品分類',
          icon: 'i-lucide-tag',
          to: '/admin/categories/portfolio',
        },
      ],
    },
    {
      label: '媒體庫',
      icon: 'i-lucide-image',
      to: '/admin/media',
    },
    {
      label: '使用者與權限',
      icon: 'i-lucide-users',
      children: [
        {
          label: '使用者列表',
          icon: 'i-lucide-user',
          to: '/admin/users',
        },
        {
          label: '角色與權限',
          icon: 'i-lucide-shield-check',
          to: '/admin/roles',
        },
      ],
    },
    {
      label: '系統設定',
      icon: 'i-lucide-settings',
      to: '/admin/settings',
    },
  ],
])
</script>
