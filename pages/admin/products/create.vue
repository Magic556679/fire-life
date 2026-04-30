<template>
  <div class="p-6">
    <div class="flex justify-between">
      <h1 class="mb-4 text-2xl font-bold">新增商品</h1>
      <div>
        <UButton
          icon="i-heroicons-check-circle"
          label="發佈商品"
          size="lg"
          form="product-form"
          type="submit"
          :loading="isLoading"
        />
      </div>
    </div>

    <UForm
      id="product-form"
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

        <UFormField label="庫存數量" name="stock">
          <UInput
            v-if="formState.product_type === 'physical'"
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

        <!-- 商品圖片管理區塊 -->
        <UFormField label="商品圖片" name="images">
          <UFileUpload
            v-model="filesUpload"
            icon="i-heroicons-photo"
            label="拖曳或點擊這裡上傳圖片"
            description="SVG, PNG, JPG or GIF (max. 2MB)"
            layout="grid"
            multiple
            accept="image/png, image/jpeg, image/jpg, image/gif"
            :interactive="(formState.images?.length ?? 0) < maxImages"
            :class="{
              'cursor-not-allowed opacity-50':
                (formState.images?.length ?? 0) >= maxImages,
            }"
            :disabled="(formState.images?.length ?? 0) >= maxImages"
          >
            <!-- #actions 插槽：自定義選擇按鈕 -->
            <template #actions="{ open }">
              <UButton
                label="選擇圖片檔案"
                icon="i-heroicons-plus-circle"
                color="primary"
                variant="solid"
                :disabled="(formState.images?.length ?? 0) >= maxImages"
                @click="open()"
              />
            </template>

            <!-- #files-top 插槽：顯示待上傳數量 -->
            <template #files-top="{ files }">
              <div
                v-if="files?.length"
                class="mb-2 flex items-center justify-between"
              >
                <p class="text-sm font-bold text-gray-700 dark:text-gray-200">
                  正在處理檔案 ({{ files?.length }})
                </p>
              </div>
            </template>
          </UFileUpload>
        </UFormField>

        <p v-if="uploadError" class="mt-2 text-sm text-red-500">
          {{ uploadError }}
        </p>
      </div>

      <div class="space-y-6 lg:col-span-4"></div>
    </UForm>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import type { FormSubmitEvent } from '#ui/types'
import { createProduct } from '~/api/products/index'
import type { BaseProduct, ProductCreate } from '~/api/products/schema'
import { ProductCreateSchema } from '~/api/products/schema'

definePageMeta({
  layout: 'admin',
  middleware: 'auth',
})

const router = useRouter()
const toast = useToast()

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

const isLoading = ref(false)

const productTypeOptions = [
  { label: '實體商品 (Physical)', value: 'physical' },
  { label: '數位服務 (Digital)', value: 'digital' },
]

const statusOptions = [
  { label: '啟用中 (Active)', value: 'active' },
  { label: '未啟用 (Inactive)', value: 'inactive' },
]

// 處理商品類型切換
function handleTypeChange() {
  // 如果切換到數位商品，清空庫存
  if (formState.product_type === 'digital') {
    formState.stock = null
  }
}

// --- upload images rules ---
const filesUpload = ref<File[]>([])
const maxImages = 2
const { uploadError } = useImageLimitWatcher({
  filesUpload,
  formImages: computed(() => formState.images ?? []),
  maxImages,
})

async function handleSubmit(event: FormSubmitEvent<ProductCreate>) {
  isLoading.value = true

  const formState = event.data

  const dataPayload = {
    ...JSON.parse(JSON.stringify(formState)),
    price: Number(formState.price).toFixed(2),
    special_price: formState.special_price
      ? Number(formState.special_price).toFixed(2)
      : undefined,
    is_favorites: formState.is_favorites ? 1 : 0,
  }

  const formData = new FormData()

  // 將所有檔案欄位添加到 FormData
  Object.entries(dataPayload).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value as string | Blob)
    }
  })

  // FormData 只能存字串或 Blob，我們需要將物件轉成 JSON 字串
  formData.append('data', JSON.stringify(dataPayload))

  // 將 filesUpload 中的 File 物件添加到 FormData
  if (filesUpload.value.length > 0) {
    filesUpload.value.forEach(file => {
      // Laravel 接收多檔案使用的命名：images[]
      formData.append('images[]', file)
    })
  }

  try {
    await createProduct(formData)

    isLoading.value = false
    toast.add({
      title: '成功',
      description: '商品新增成功！',
      color: 'success',
      icon: 'i-heroicons-check-circle',
    })
    router.push('/admin/products')
  } catch (e) {
    toast.add({
      title: '錯誤',
      description: '商品新增失敗，請稍後再試。',
      color: 'error',
      icon: 'i-heroicons-x-circle',
    })
    console.error(e)
  }
}
</script>
