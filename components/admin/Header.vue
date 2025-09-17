<template>
  <div class="flex w-full justify-between border-b border-gray-200 p-4">
    <UBreadcrumb :items="items" />
    <span @click="submitLogout">登出</span>
  </div>
</template>

<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui'
import { logout } from '~/api/auth/logout'
import type { AxiosError } from 'axios'

const items = ref<BreadcrumbItem[]>([
  {
    label: 'Home',
    icon: 'i-lucide-house',
  },
  {
    label: 'Components',
    icon: 'i-lucide-box',
    to: '/components',
  },
  {
    label: 'Breadcrumb',
    icon: 'i-lucide-link',
    to: '/components/breadcrumb',
  },
])

const auth = useAuthStore()

const submitLogout = async () => {
  if (!auth.user) return
  try {
    const { status } = await logout()

    if (status === 200) {
      auth.logout()
      navigateTo('/admin/login')
    }
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>
    console.error('登出失敗:', error.response?.data?.message || error.message)
  }
}
</script>
