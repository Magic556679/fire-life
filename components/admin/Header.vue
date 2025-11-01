<template>
  <div class="flex w-full justify-between border-b border-gray-200 p-4">
    <UBreadcrumb :items="breadcrumbItems" />
    <span @click="submitLogout" class="cursor-pointer">登出</span>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { logout } from '~/api/auth/logout'
import type { AxiosError } from 'axios'

const route = useRoute()
const menuStore = useMenuStore()
const auth = useAuthStore()

const breadcrumbItems = computed(() => {
  const found = menuStore.findBreadcrumbPath(menuStore.menu, route.path)
  return found ?? []
})

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
