import { watch, ref } from 'vue'

interface UseImageLimitWatcherProps {
  filesUpload: Ref<File[]>
  formImages: Ref<unknown[]>
  maxImages: number
}

export function useImageLimitWatcher({
  filesUpload,
  formImages,
  maxImages,
}: UseImageLimitWatcherProps) {
  const uploadError = ref<string | null>(null)

  watch(
    filesUpload,
    newFiles => {
      const existingImagesCount = formImages.value?.length ?? 0
      const currentTotal = existingImagesCount + newFiles.length

      if (currentTotal > maxImages) {
        const availableSlots = maxImages - existingImagesCount

        if (availableSlots > 0) {
          // 保留可放入的檔案
          filesUpload.value = newFiles.slice(0, availableSlots)

          uploadError.value = `圖片數量超過限制，最多只能上傳 ${maxImages} 張。已自動移除多餘的檔案。`
        } else {
          // 舊圖已滿
          filesUpload.value = []
          uploadError.value = `圖片數量已滿，無法再新增圖片。`
        }

        setTimeout(() => {
          uploadError.value = null
        }, 5000)
      }
    },
    { deep: true },
  )

  return {
    uploadError,
  }
}
