import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as {
      token: string
      id: number
      name: string
      email: string
    } | null,
  }),
  getters: {
    isLoggedIn: state => !!state.user?.token,
  },
  actions: {
    setUser(user: { token: string; email: string; id: number; name: string }) {
      this.user = user
    },
    logout() {
      this.user = null
    },
  },
  persist: {
    key: 'fire-life-auth',
    storage: typeof window !== 'undefined' ? localStorage : undefined,
  },
})
