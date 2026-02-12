export default defineNuxtRouteMiddleware(to => {
  const auth = useAdminAuthStore()

  if (to.path === '/admin/login' && auth.isLoggedIn) {
    return navigateTo('/admin')
  }
})
