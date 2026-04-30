<template>
  <div class="mx-auto max-w-3xl p-4">
    <h1 class="mb-4 text-2xl font-bold">結帳頁面</h1>

    <!-- 商品列表 -->
    <div class="mb-6 rounded-lg border p-4">
      <h2 class="mb-3 text-xl font-semibold">購物車商品</h2>
      <div
        v-for="item in cartItems"
        :key="item.id"
        class="flex items-center justify-between border-b py-3 last:border-b-0"
      >
        <div class="flex items-center space-x-4">
          <img
            :src="item.image"
            alt=""
            class="h-16 w-16 rounded object-cover"
          />
          <div>
            <p class="font-medium">{{ item.name }}</p>
            <p class="text-gray-500">單價: ${{ item.price }}</p>
          </div>
        </div>
        <div class="text-right">
          <p class="text-gray-700">數量: {{ item.quantity }}</p>
          <p class="font-semibold">小計: ${{ item.price * item.quantity }}</p>
        </div>
      </div>

      <!-- 總金額 -->
      <div class="mt-4 text-right text-lg font-bold">
        總金額: ${{ totalAmount }}
      </div>
    </div>

    <!-- 購買人資訊表單 -->
    <div class="rounded-lg border p-4">
      <h2 class="mb-3 text-xl font-semibold">購買人資訊</h2>
      <form @submit.prevent="checkout">
        <div class="grid grid-cols-1 gap-4">
          <input
            v-model="buyer_name"
            type="text"
            placeholder="姓名"
            class="w-full rounded border p-2"
            required
          />
          <input
            v-model="buyer_email"
            type="email"
            placeholder="Email"
            class="w-full rounded border p-2"
            required
          />
          <input
            v-model="buyer_phone"
            type="text"
            placeholder="手機號碼"
            class="w-full rounded border p-2"
            required
          />
        </div>

        <UButton type="submit" class="mt-4" :loading="isSubmitting">
          確認購買
        </UButton>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { getCart } from '@/api/cart/index'
import {
  createOrder,
  checkoutOrder,
  type CreateOrderPayload,
} from '@/api/order'

interface CartItem {
  id: number
  product_id: number
  name: string
  price: number
  quantity: number
  image: string
}

// 1. 購物車資料
const cartItems = ref<CartItem[]>([])

onMounted(async () => {
  const res = await getCart()

  cartItems.value = res.items.map(item => ({
    id: item.id,
    product_id: item.product_id,
    name: item.product.name,
    price: Number(item.price),
    quantity: item.quantity,
    image: item.product.image?.[0]?.image_url ?? '',
  }))
})

// 計算總金額
const totalAmount = computed(() =>
  cartItems.value.reduce((acc, item) => acc + item.price * item.quantity, 0),
)

// 購買人資訊
const buyer_name = ref('')
const buyer_email = ref('')
const buyer_phone = ref('')

const isSubmitting = ref(false)

// 送出訂單
const checkout = async () => {
  if (isSubmitting.value) return
  isSubmitting.value = true

  try {
    const orderPayload: CreateOrderPayload = {
      buyer_name: buyer_name.value,
      buyer_email: buyer_email.value,
      buyer_phone: buyer_phone.value,
      items: cartItems.value.map(item => ({
        product_id: item.product_id,
        quantity: item.quantity,
      })),
      delivery_type: 'physical',
    }

    const orderRes = await createOrder(orderPayload)
    const orderNo: string = orderRes.data.data.order_no

    const html = await checkoutOrder(orderNo)

    // 將綠界回傳的 HTML form 注入 DOM 並自動送出，導向付款頁面
    const container = document.createElement('div')
    container.innerHTML = html
    document.body.appendChild(container)
    const form = container.querySelector('form')
    form?.submit()
  } catch (error) {
    console.error('Error submitting order:', error)
    alert('訂單送出失敗，請稍後再試')
    isSubmitting.value = false
  }
}
</script>
