<template>
  <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
    <h1
      class="mb-12 text-center text-2xl font-bold tracking-widest md:text-3xl"
    >
      探索我們的商品
    </h1>

    <div class="flex flex-col gap-12 md:flex-row">
      <aside class="w-full md:w-1/4 lg:w-1/5">
        <div class="sticky top-12 bg-white p-6 shadow-lg">
          <h2
            class="mb-6 border-b border-gray-300 pb-4 text-2xl font-bold text-gray-800"
          >
            商品分類
          </h2>
          <ul class="space-y-3">
            <li v-for="category in categories" :key="category.id ?? 'all'">
              <a
                href="#"
                class="block px-3 py-2 font-medium transition-colors duration-200"
                :class="
                  selectedCategory === category.id
                    ? 'bg-orange-light'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                "
                @click.prevent="selectCategory(category.id)"
              >
                {{ category.name }}
              </a>
            </li>
          </ul>
        </div>
      </aside>

      <main class="w-full md:w-3/4 lg:w-4/5">
        <div
          v-if="filteredProducts.length > 0"
          class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          <ProductCard
            v-for="product in filteredProducts"
            :key="product.id"
            :product="product"
            @add-to-cart="handleAddToCart"
          />
        </div>
        <div v-else class="py-20 text-center">
          <p class="text-xl text-gray-500">此分類暫無商品</p>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { fetchPublicProducts } from '~/api/products'
import type { ProductsResponse } from '~/api/products'

const page = ref(1)
const perPage = ref(10)
const { data: publicProducts } = await useAsyncData<ProductsResponse>(
  'products',
  () =>
    fetchPublicProducts({
      page: page.value,
      perPage: perPage.value,
    }),
)

const productType = {
  physical: 'physical',
  digital: 'digital',
}

const categories = [
  { id: null, name: '全部商品' },
  { id: productType.physical, name: '實體商品' },
  { id: productType.digital, name: '數位商品' },
]

const selectedCategory = ref<string | null>(null)

const filteredProducts = computed(() => {
  const items = publicProducts?.value?.data ?? []

  if (selectedCategory.value === null) {
    return items
  }

  return items.filter(p => p.product_type === selectedCategory.value)
})

function selectCategory(categoryId: string | null) {
  selectedCategory.value = categoryId
}

function handleAddToCart(id: number) {
  console.log('addToCart', id)
}
</script>
