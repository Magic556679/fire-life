import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as { token: string; email?: string } | null,
  }),
  getters: {
    isLoggedIn: state => !!state.user?.token,
  },
  actions: {
    setUser(user: { token: string; email?: string }) {
      this.user = user
      localStorage.setItem('token', user.token)
    },
    logout() {
      this.user = null
      localStorage.removeItem('token')
    },
    loadFromStorage() {
      const token = localStorage.getItem('token')
      if (token) {
        this.user = { token }
      }
    },
  },
})
