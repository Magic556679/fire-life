<template>
  <NuxtLink
    :to="`/products/${props.product.id}`"
    class="group flex flex-col overflow-hidden bg-white shadow-lg"
  >
    <div class="relative">
      <img
        :src="getImageUrl(props.product)"
        :alt="props.product.title"
        class="h-52 w-full transform object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>

    <div class="flex grow flex-col items-center p-2">
      <h2
        class="mb-2 truncate text-lg font-semibold text-gray-800 transition-colors duration-300 hover:text-blue-600"
      >
        {{ props.product.title }}
      </h2>

      <div class="mb-4 flex items-baseline gap-2">
        <span class="text-2xl font-bold text-gray-900">
          ${{ props.product.price }}
        </span>
        <span
          v-if="props.product.special_price"
          class="text-sm text-gray-500 line-through"
        >
          ${{ props.product.special_price }}
        </span>
      </div>

      <div>
        <div class="flex justify-center gap-3">
          <button
            type="button"
            class="bg-orange-light hover:bg-orange-accent cursor-pointer px-4 py-2 font-semibold text-balance"
            @click.prevent="addToCart(props.product.id)"
          >
            加入購物車
          </button>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Product } from '~/api/products'

const props = defineProps<{
  product: Product
}>()

const emit = defineEmits<{
  (e: 'add-to-cart', productId: number): void
}>()

const addToCart = (productId: number) => {
  emit('add-to-cart', productId)
}

const getImageUrl = (product: Product): string => {
  return product.images?.[0]?.image_url ?? 'https://placehold.co/600x400'
}
</script>
