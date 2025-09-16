import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware(to => {
  const auth = useAuthStore()

  // SSR 階段不要直接碰 localStorage
  if (import.meta.client) {
    auth.loadFromStorage()
  }

  if (to.path === '/admin/login') return

  if (!auth.isLoggedIn) {
    return navigateTo('/admin/login')
  }
})
