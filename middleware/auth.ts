import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware(to => {
  const auth = useAuthStore()

  // 確保在瀏覽器環境執行
  if (!import.meta.env.SSR) {
    if (to.path === '/admin/login' && auth.isLoggedIn) {
      console.log('Redirecting to /admin because already logged in')
      return navigateTo('/admin')
    }

    if (to.path.startsWith('/admin') && !auth.isLoggedIn) {
      console.log('Redirecting to /admin/login because not logged in')
      return navigateTo('/admin/login')
    }
  }
})
