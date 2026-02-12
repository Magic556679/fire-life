export default defineNuxtRouteMiddleware(_to => {
  const auth = useAdminAuthStore()

  if (!auth.isLoggedIn) {
    return navigateTo('/admin/login')
  }
})
