import type { LogoutResponse } from '~/api/auth/types/index'

export const logout = async () => {
  const { $api } = useNuxtApp()
  const res = await $api.post<LogoutResponse>('/logout')
  return { data: res.data, status: res.status }
}
