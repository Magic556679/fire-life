<template>
  <div class="min-h-screen bg-white">
    <div
      v-if="pending"
      class="container mx-auto px-4 py-20 text-center sm:px-6 lg:px-8"
    >
      <p class="text-xl text-gray-600">商品資訊載入中...</p>
    </div>
    <div
      v-else-if="error"
      class="container mx-auto px-4 py-20 text-center sm:px-6 lg:px-8"
    >
      <p class="text-xl text-red-500">載入商品資訊時發生錯誤。</p>
    </div>
    <div
      v-else-if="!product"
      class="container mx-auto px-4 py-20 text-center sm:px-6 lg:px-8"
    >
      <p class="text-xl text-gray-500">找不到此商品。</p>

      <UButton
        type="button"
        class="bg-orange-light hover:bg-orange-light mt-2 cursor-pointer text-black"
        @click="goBack"
      >
        返回商品列表
      </UButton>
    </div>

    <div v-else class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div class="lg:flex lg:items-start lg:gap-12">
        <div class="mb-10 lg:mb-0 lg:w-1/2">
          <div class="sticky top-12 rounded-xl bg-gray-100 p-4 shadow-lg">
            <img
              :src="
                product.images?.[0]?.image_url ?? 'https://placehold.co/800x600'
              "
              :alt="product.title"
              class="h-auto w-full rounded-lg object-cover shadow-md"
            />
          </div>
        </div>

        <div class="lg:w-1/2">
          <nav class="mb-4 text-sm font-medium text-gray-500">
            <NuxtLink to="/" class="hover:text-gray-700">首頁</NuxtLink>
            <span class="mx-2">/</span>
            <NuxtLink to="/products" class="hover:text-gray-700">
              所有商品
            </NuxtLink>
            <span class="mx-2">/</span>
            <span class="text-gray-900">{{ product.title }}</span>
          </nav>

          <h1 class="mb-4 text-4xl font-extrabold text-gray-900">
            {{ product.title }}
          </h1>

          <div class="mb-6 flex items-baseline gap-4">
            <span class="text-4xl font-bold text-gray-900">
              ${{ product.price }}
            </span>
            <span
              v-if="product.special_price"
              class="text-xl text-gray-500 line-through"
            >
              ${{ product.special_price }}
            </span>
          </div>

          <div class="mb-8 border-t border-b py-6">
            <h2 class="mb-3 text-xl font-semibold text-gray-800">商品簡述</h2>
            <p class="leading-relaxed text-gray-700">
              {{ product.description ?? '此商品尚無詳細描述。' }}
            </p>
            <p class="mt-4 text-sm text-gray-500">
              商品類型：
              <span class="font-medium text-gray-600">
                {{
                  product.product_type === 'digital' ? '數位商品' : '實體商品'
                }}
              </span>
            </p>
          </div>

          <div class="my-2">
            <ProductQuantitySelector v-model:quantity="selectedQuantity" />
          </div>

          <div class="flex items-center gap-4">
            <button
              type="button"
              class="bg-orange-light hover:bg-orange-accent flex-1 transform cursor-pointer rounded-lg px-6 py-3 font-bold text-white shadow-md transition-colors duration-300 hover:scale-[1.02]"
              @click="handleAddToCart(product.id)"
            >
              加入購物車
            </button>
          </div>

          <div class="mt-6 text-sm text-gray-600">
            <p>
              <strong>庫存狀態:</strong>
              有庫存
            </p>
            <p v-if="product.product_type === 'physical'">
              <strong>運送:</strong>
              預計 3-5 個工作天
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { fetchProductById } from '~/api/products'
import type { Product } from '~/api/products'

const selectedQuantity = ref<number>(1)
const route = useRoute()
const router = useRouter()
const productId = computed(() => Number(route.params.id) || null)

const {
  data: product,
  pending,
  error,
} = await useAsyncData<Product>(`product-${productId.value}`, () =>
  fetchProductById(productId.value),
)

useHead({
  title: computed(() =>
    product.value ? `${product.value.title} - 商品詳情` : '商品詳情',
  ),
})

function handleAddToCart(id: number | undefined) {
  if (id === undefined) return

  console.log(`商品 ID: ${id} 已加入購物車 (待實作)`)
}

function goBack() {
  router.push('/products')
}
</script>
