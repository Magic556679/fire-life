<template>
  <div class="p-6">
    <div class="flex justify-between">
      <h1 class="mb-4 text-2xl font-bold">編輯商品：{{ formState.title }}</h1>
      <div>
        <UButton
          v-if="!dataLoading"
          icon="i-heroicons-check-circle"
          label="儲存修改"
          size="lg"
          form="product-edit-form"
          type="submit"
          :loading="isLoading"
        />
        <USkeleton v-else class="h-10 w-32" />
      </div>
    </div>

    <template v-if="dataLoading">
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div class="space-y-4 lg:col-span-8">
          <USkeleton class="h-10 w-full" />
          <USkeleton class="h-20 w-full" />
          <USkeleton class="h-10 w-full" />
          <USkeleton class="h-10 w-full" />
          <USkeleton class="h-10 w-1/2" />
          <USkeleton class="h-40 w-full" />
        </div>
        <div class="space-y-4 lg:col-span-4">
          <USkeleton class="h-40 w-full" />
        </div>
      </div>
    </template>

    <UForm
      v-else
      id="product-edit-form"
      class="grid grid-cols-1 gap-6 lg:grid-cols-12"
      :state="formState"
      :schema="ProductCreateSchema"
      @submit="handleSubmit"
    >
      <div class="lg:col-span-8">
        <UFormField label="商品名稱" name="title">
          <UInput
            v-model="formState.title"
            type="text"
            placeholder="商品名稱"
            class="mb-4 w-full"
          />
        </UFormField>

        <UFormField label="商品描述" name="description">
          <UTextarea
            v-model="formState.description"
            placeholder="商品描述"
            class="mb-4 w-full"
          ></UTextarea>
        </UFormField>

        <UFormField label="商品類型" name="product_type">
          <USelect
            v-model="formState.product_type"
            option-attribute="label"
            class="mb-4 w-full"
            :items="productTypeOptions"
            @change="handleTypeChange"
          />
        </UFormField>

        <UFormField label="商品狀態" name="status">
          <USelect
            v-model="formState.status"
            option-attribute="label"
            class="mb-4 w-full"
            :items="statusOptions"
          />
        </UFormField>

        <UFormField
          v-if="formState.product_type === 'physical'"
          label="庫存數量"
          name="stock"
        >
          <UInput
            v-model.number="formState.stock"
            type="number"
            placeholder="庫存數量"
            class="mb-4 w-full"
          />
        </UFormField>

        <UFormField label="價格" name="price">
          <UInput
            v-model.number="formState.price"
            type="number"
            placeholder="價格"
            class="mb-4 w-full"
          />
        </UFormField>

        <UFormField label="特價" name="special_price">
          <UInput
            v-model.number="formState.special_price"
            type="number"
            placeholder="特價"
            class="mb-4 w-full"
          />
        </UFormField>

        <UFormField name="is_favorites">
          <UCheckbox
            v-model="formState.is_favorites"
            label="設為熱門商品"
            class="mb-4"
          />
        </UFormField>

        <UFormField label="商品圖片" name="images">
          <div
            v-if="currentImageCount > 0"
            class="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4"
          >
            <div
              v-for="(image, index) in formState.images"
              :key="image.id || index"
              class="group relative"
            >
              <img
                :src="image.image_url"
                alt="商品圖片"
                class="aspect-square w-full rounded-lg object-cover shadow-md"
              />
              <UButton
                icon="i-heroicons-x-mark-solid"
                size="sm"
                color="info"
                variant="solid"
                class="absolute top-1 right-1 opacity-0 transition-opacity group-hover:opacity-100"
                title="刪除此圖片"
                @click="removeExistingImage(image.id)"
              />
            </div>

            <div
              v-for="(file, index) in filesPreview"
              :key="`new-${index}`"
              class="group relative"
            >
              <img
                :src="file.url"
                :alt="file.name"
                class="aspect-square w-full rounded-lg object-cover opacity-80 shadow-md"
              />
              <span
                class="bg-primary-100/80 dark:bg-primary-900/80 absolute bottom-1 left-2 rounded px-1 text-xs font-semibold"
              >
                待上傳
              </span>

              <UButton
                icon="i-heroicons-x-mark-solid"
                size="sm"
                color="info"
                variant="solid"
                class="absolute top-1 right-1 opacity-0 transition-opacity group-hover:opacity-100"
                title="移除此新圖片"
                @click="removeNewFile(index)"
              />
            </div>
          </div>
          <UFileUpload
            v-model="filesUpload"
            icon="i-heroicons-photo"
            label="拖曳或點擊這裡上傳圖片"
            description="SVG, PNG, JPG or GIF (max. 2MB)"
            layout="grid"
            multiple
            accept="image/png, image/jpeg, image/jpg, image/gif"
            :interactive="currentImageCount < maxImages"
            :class="{
              'cursor-not-allowed opacity-50': currentImageCount >= maxImages,
            }"
            :disabled="currentImageCount >= maxImages"
          ></UFileUpload>
        </UFormField>

        <p v-if="uploadError" class="mt-2 text-sm text-red-500">
          {{ uploadError }}
        </p>
      </div>

      <div class="space-y-6 lg:col-span-4">
        <UCard>
          <template #header>
            <h3 class="text-lg font-semibold">圖片上傳規則</h3>
          </template>
          <p class="text-sm">
            目前圖片數量：
            <span class="font-bold">{{ currentImageCount }}</span>
            /
            <span class="font-bold">{{ maxImages }}</span>
          </p>
          <p class="mt-2 text-sm">
            **已刪除**舊圖片數量：
            <span class="font-bold text-red-500">
              {{ imagesToDelete.length }}
            </span>
          </p>
        </UCard>
      </div>
    </UForm>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { FormSubmitEvent } from '#ui/types'
import { fetchProductById, updateProduct } from '~/api/products/index'
import type {
  BaseProduct,
  ProductCreate,
  ProductImage,
} from '~/api/products/schema'
import { ProductCreateSchema } from '~/api/products/schema'

definePageMeta({
  layout: 'admin',
  middleware: 'auth',
})

const route = useRoute()
const router = useRouter()
const toast = useToast()

const productId = route.params.id as string

const dataLoading = ref(true)
const isLoading = ref(false)

const formState = reactive<BaseProduct>({
  title: '',
  description: null,
  product_type: 'physical',
  stock: 0,
  price: 0,
  special_price: 0,
  status: 'active',
  is_favorites: false,
  images: [],
})

const productTypeOptions = [
  { label: '實體商品 (Physical)', value: 'physical' },
  { label: '數位服務 (Digital)', value: 'digital' },
]

const statusOptions = [
  { label: '啟用中 (Active)', value: 'active' },
  { label: '未啟用 (Inactive)', value: 'inactive' },
]

function handleTypeChange() {
  // 切換到數位商品，清空庫存
  if (formState.product_type === 'digital') {
    formState.stock = null
  }
}

// 新增上傳的檔案
const filesUpload = ref<File[]>([])
// 儲存要刪除的舊圖片 ID
const imagesToDelete = ref<number[]>([])
const maxImages = 2

// 計算當前圖片總數 (舊圖 + 待上傳新圖)
const currentImageCount = computed(() => {
  const existingCount = formState.images?.length ?? 0
  return existingCount + filesUpload.value.length
})

async function fetchProductData() {
  dataLoading.value = true
  try {
    const productData = await fetchProductById(productId)

    // 確保 is_favorites 是布林值
    if (typeof productData.is_favorites === 'number') {
      // 將 0/1 轉換為 false/true
      productData.is_favorites = !!productData.is_favorites
    }

    Object.assign(formState, productData)
  } catch (error) {
    console.error('商品資料載入失敗', error)
    toast.add({
      title: '錯誤',
      description: '無法載入商品資料，請稍後再試。',
      color: 'error',
      icon: 'i-heroicons-x-circle',
    })

    router.push('/admin/products')
  } finally {
    dataLoading.value = false
  }
}

onMounted(() => {
  fetchProductData()
})

// --- 舊圖片刪除邏輯 ---
function removeExistingImage(imageId: number) {
  // 1. 將圖片 ID 加入 imagesToDelete 列表
  imagesToDelete.value.push(imageId)

  // 2. 從 formState.images 暫時移除，以更新顯示和計數
  if (formState.images) {
    formState.images = (formState.images as ProductImage[]).filter(
      image => image.id !== imageId,
    )
  }
}

// --- 新圖片上傳規則 (與新增商品邏輯類似，但需考慮舊圖數量) ---
const filesPreview = computed(() => {
  return filesUpload.value.map((file, index) => {
    // 使用 URL.createObjectURL() 創建瀏覽器可讀取的本地 URL
    const url = URL.createObjectURL(file)

    return {
      id: index,
      url: url,
      isNew: true,
      name: file.name,
    }
  })
})

// 當組件卸載時，釋放所有本地 URL，防止記憶體洩漏
onUnmounted(() => {
  filesPreview.value.forEach(file => {
    if (file.isNew && file.url) {
      URL.revokeObjectURL(file.url)
    }
  })
})

function removeNewFile(index: number) {
  // 釋放 object URL
  const fileToRemove = filesPreview.value.find((_, i) => i === index)
  if (fileToRemove?.url && fileToRemove.isNew) {
    URL.revokeObjectURL(fileToRemove.url)
  }

  filesUpload.value.splice(index, 1)
}

const { uploadError } = useImageLimitWatcher({
  filesUpload,
  formImages: computed(() => formState.images ?? []),
  maxImages,
})

async function handleSubmit(event: FormSubmitEvent<ProductCreate>) {
  isLoading.value = true

  const formPayload = event.data

  const dataPayload = {
    _method: 'PATCH',
    ...JSON.parse(JSON.stringify(formPayload)),
    price: Number(formPayload.price).toFixed(2),
    special_price: formPayload.special_price
      ? Number(formPayload.special_price).toFixed(2)
      : undefined,
    is_favorites: formPayload.is_favorites ? 1 : 0,
  }

  const formData = new FormData()

  if (productId) {
    formData.append('id', productId)
  }

  // 將所有文字/數字欄位添加到 FormData
  Object.entries(dataPayload).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (typeof value === 'boolean') {
        formData.append(key, value ? '1' : '0')
      } else {
        formData.append(key, String(value))
      }
    }
  })

  // 處理要刪除的舊圖片 ID 列表 (使用 remove_image_ids[])
  if (imagesToDelete.value.length > 0) {
    imagesToDelete.value.forEach(id => {
      formData.append('remove_image_ids[]', String(id))
    })
  }

  // filesUpload 中的 File 物件添加到 FormData (新增的圖片)
  if (filesUpload.value.length > 0) {
    filesUpload.value.forEach(file => {
      formData.append('images[]', file)
    })
  }

  try {
    await updateProduct(formData)

    isLoading.value = false
    toast.add({
      title: '成功',
      description: '商品更新成功！',
      color: 'success',
      icon: 'i-heroicons-check-circle',
    })
    router.push('/admin/products')
  } catch (error) {
    isLoading.value = false
    toast.add({
      title: '錯誤',
      description: '商品更新失敗，請稍後再試。',
      color: 'error',
      icon: 'i-heroicons-x-circle',
    })
    console.error('商品更新失敗', error)
  }
}
</script>
