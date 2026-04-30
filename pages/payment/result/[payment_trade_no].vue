<template>
  <div class="mx-auto max-w-2xl p-6">
    <!-- 載入中 -->
    <div v-if="pending" class="py-20 text-center text-gray-500">
      查詢付款結果中...
    </div>

    <!-- 付款失敗 -->
    <div v-else-if="isFailed" class="py-20 text-center">
      <div
        class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100"
      >
        <UIcon name="i-heroicons-x-mark" class="h-8 w-8 text-red-600" />
      </div>
      <p class="text-lg font-semibold text-red-500">付款失敗</p>
      <p class="mt-2 text-sm text-gray-500">請重新嘗試或聯繫客服</p>
      <NuxtLink
        to="/cart"
        class="mt-6 inline-block rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        回到購物車
      </NuxtLink>
    </div>

    <!-- 錯誤 -->
    <div v-else-if="error" class="py-20 text-center">
      <p class="text-lg font-semibold text-red-500">無法查詢訂單結果</p>
      <p class="mt-2 text-sm text-gray-500">{{ errorMessage }}</p>
      <NuxtLink
        to="/products"
        class="mt-6 inline-block rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        回到商品頁
      </NuxtLink>
    </div>

    <!-- 付款成功 -->
    <div v-else-if="order">
      <div class="mb-6 text-center">
        <div
          class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100"
        >
          <UIcon name="i-heroicons-check" class="h-8 w-8 text-green-600" />
        </div>
        <h1 class="text-2xl font-bold text-gray-800">付款成功！</h1>
        <p class="mt-1 text-gray-500">訂單編號：{{ order.order_no }}</p>
      </div>

      <!-- 買家資訊 -->
      <div class="mb-4 rounded-lg border p-4">
        <h2 class="mb-3 font-semibold text-gray-700">買家資訊</h2>
        <div class="space-y-1 text-sm text-gray-600">
          <p>姓名：{{ order.buyer_name }}</p>
          <p>Email：{{ order.buyer_email }}</p>
          <p v-if="order.buyer_phone">電話：{{ order.buyer_phone }}</p>
        </div>
      </div>

      <!-- 訂購商品 -->
      <div class="mb-4 rounded-lg border p-4">
        <h2 class="mb-3 font-semibold text-gray-700">訂購商品</h2>
        <div
          v-for="item in order.items_snapshot"
          :key="item.product_id"
          class="flex justify-between border-b py-2 text-sm last:border-b-0"
        >
          <span class="text-gray-700"
            >{{ item.title }} × {{ item.quantity }}</span
          >
          <span class="font-medium">${{ item.price * item.quantity }}</span>
        </div>
        <div class="mt-3 text-right font-bold">
          總金額：${{ order.total_amount }}
        </div>
      </div>

      <!-- 超商取貨資訊 -->
      <div v-if="order.store_info" class="mb-4 rounded-lg border p-4">
        <h2 class="mb-3 font-semibold text-gray-700">取貨門市</h2>
        <div class="text-sm text-gray-600">
          <p>門市名稱：{{ order.store_info.store_name }}</p>
          <p>門市代號：{{ order.store_info.store_id }}</p>
        </div>
      </div>

      <div class="text-center">
        <NuxtLink
          to="/products"
          class="inline-block rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
        >
          繼續購物
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getOrderResult } from '@/api/order'
import { getCart } from '@/api/cart/index'

const route = useRoute()
const cartStore = useCartStore()
const paymentTradeNo = route.params.payment_trade_no as string
const isFailed = route.query.status === 'failed'

const order = ref<Awaited<ReturnType<typeof getOrderResult>> | null>(null)
const pending = ref(!isFailed)
const error = ref(false)
const errorMessage = ref('')

onMounted(async () => {
  const cartData = await getCart()
  cartStore.setCartData(cartData)

  if (isFailed) return

  try {
    order.value = await getOrderResult(paymentTradeNo)
  } catch (err: unknown) {
    error.value = true
    const status = (err as { response?: { status?: number } })?.response?.status
    if (status === 404) {
      errorMessage.value = '找不到對應訂單'
    } else if (status === 400) {
      errorMessage.value = '訂單尚未完成付款'
    } else {
      errorMessage.value = '查詢失敗，請聯繫客服'
    }
  } finally {
    pending.value = false
  }
})
</script>
