/**
 * 上傳圖片
 */
export const uploadImage = async (file: File) => {
  const { $api } = useNuxtApp()

  // 建立 form-data
  const formData = new FormData()
  formData.append('image', file)

  // 發送 POST
  const res = await $api.post<{ url: string }>('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return { data: res.data, status: res.status }
}
