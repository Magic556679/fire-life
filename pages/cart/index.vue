<template>
  <div class="container mx-auto mt-7 lg:max-w-5xl">
    <h2 class="my-10 text-center text-3xl font-bold tracking-widest">購物車</h2>
    <ClientOnly>
      <div v-if="cartItems.length === 0" class="text-center text-gray-500">
        購物車目前是空的。
      </div>

      <div v-else class="space-y-4">
        <!-- 標題列：桌面版才顯示 -->
        <div
          class="hidden border-b border-gray-300 px-4 py-2 font-semibold md:flex"
        >
          <!-- 左側：圖片 + 商品名稱 -->
          <div class="flex w-2/3 items-center space-x-4">
            <div class="w-16"></div>
            <span>商品名稱</span>
          </div>

          <div class="flex w-1/3 items-center justify-end space-x-4">
            <span class="w-16 text-center">數量</span>
            <span class="w-16 text-right">單價</span>
            <span class="w-16 text-right">小計</span>
            <span class="w-16 text-right">操作</span>
          </div>
        </div>

        <!-- 商品列 -->
        <div
          v-for="item in cartItems"
          :key="item.id"
          class="flex flex-wrap items-center justify-between rounded border border-gray-300 p-4 md:flex-nowrap"
        >
          <nuxt-link
            :to="`/products/${item.product_id}`"
            class="mb-2 flex w-full items-center space-x-4 md:mb-0 md:w-2/3"
          >
            <img
              :src="item.image"
              alt=""
              class="h-16 w-16 rounded object-cover"
            />
            <div>
              <h2 class="font-semibold">{{ item.name }}</h2>
            </div>
          </nuxt-link>

          <!-- 右側：桌面版水平排列 / 手機版垂直排列 -->
          <div
            class="flex w-full flex-col justify-start md:w-1/3 md:flex-row md:items-center md:justify-end md:space-x-4"
          >
            <!-- 手機版顯示標籤 -->
            <div class="mb-1 flex w-full justify-between md:hidden">
              <span class="text-gray-500">數量：</span>
              <ProductQuantitySelector
                :quantity="item.quantity"
                @update="quantity => updateQuantity(item.id, quantity)"
              />
            </div>
            <div class="mb-1 flex w-full justify-between md:hidden">
              <span class="text-gray-500">價格：</span>
              <span class="font-semibold">{{ item.price }}</span>
            </div>
            <div class="mb-1 flex w-full justify-between md:hidden">
              <span class="text-gray-500">數量：</span>
            </div>
            <div class="mb-1 flex w-full justify-between md:hidden">
              <span class="text-gray-500">小計：</span>
              <span class="font-semibold">
                {{ item.price * item.quantity }}
              </span>
            </div>

            <!-- 桌面版原本水平排列 -->
            <div
              class="hidden w-full items-center justify-end space-x-4 md:flex"
            >
              <ProductQuantitySelector
                :quantity="item.quantity"
                @update="quantity => updateQuantity(item.id, quantity)"
              />
              <p class="w-16 text-right font-semibold">{{ item.price }}</p>
              <p class="w-16 text-right font-semibold">
                {{ item.price * item.quantity }}
              </p>

              <button
                class="w-16 cursor-pointer text-right text-gray-400"
                @click="removeItem(item.id)"
              >
                刪除
              </button>
            </div>
          </div>
        </div>

        <div class="mt-6 flex items-center justify-end">
          <p class="mr-4 text-lg font-bold">總計：$ {{ totalPrice }}</p>
          <UButton class="cursor-pointer" @click="checkout">結帳</UButton>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  getCart,
  updateCartItemQuantity,
  deleteCartItem,
} from '@/api/cart/index'
import { useRouter } from 'vue-router'

const router = useRouter()
const cartStore = useCartStore()
const toast = useToast()

const cartItems = computed(() =>
  cartStore.items.map(item => ({
    id: item.id,
    product_id: item.product_id,
    name: item.product.name,
    price: Number(item.price),
    quantity: item.quantity,
    image: item.product.image?.[0]?.image_url ?? '',
    stock: item.product.stock,
    product_type: item.product.product_type,
  })),
)

const updateQuantity = (productId: number, quantity: number) => {
  const item = cartStore.findItem(productId)

  if (!item) {
    return
  }

  const prev = item.quantity

  cartStore.updateItemQuantity(productId, quantity)

  try {
    updateCartItemQuantity(productId, quantity)
  } catch (error) {
    console.error(error)
    cartStore.updateItemQuantity(productId, prev)
  }
}

onMounted(async () => {
  const res = await getCart()

  cartStore.setCartData(res)
})

const removeItem = async (itemId: number) => {
  try {
    await deleteCartItem(itemId)

    cartStore.removeItem(itemId)
  } catch (error) {
    console.error(error)

    toast.add({
      title: '錯誤',
      description: '商品刪除失敗，請稍後再試。',
      color: 'error',
      icon: 'i-heroicons-x-circle',
    })
  }
}

const totalPrice = computed(() =>
  cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0),
)

const checkout = () => {
  const insufficientItems = cartItems.value.filter(
    item =>
      item.product_type === 'physical' &&
      item.stock !== null &&
      item.stock !== undefined &&
      item.quantity > item.stock,
  )

  if (insufficientItems.length > 0) {
    toast.add({
      title: '庫存不足',
      description: `以下商品庫存不足，請調整數量：${insufficientItems.map(i => i.name).join('、')}`,
      color: 'error',
      icon: 'i-heroicons-exclamation-circle',
    })
    return
  }

  router.push('cart/checkout')
}
</script>
