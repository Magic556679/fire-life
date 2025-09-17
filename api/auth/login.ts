import type { LoginResponse } from '~/api/auth/types/index'

export const login = async (email: string, password: string) => {
  const { $api } = useNuxtApp()
  const res = await $api.post<LoginResponse>('/login', { email, password })
  return { data: res.data, status: res.status }
}
