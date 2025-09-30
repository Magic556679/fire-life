export default defineNuxtRouteMiddleware(to => {
  const auth = useAuthStore()

  if (to.path === '/admin/login' && auth.isLoggedIn) {
    return navigateTo('/admin')
  }
})
