<template>
  <div class="p-6">
    <div class="mb-6 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <UButton
          icon="i-heroicons-arrow-left"
          variant="ghost"
          @click="router.push('/admin/orders')"
        />
        <h1 class="text-2xl font-bold">
          {{ dataLoading ? '載入中...' : order?.order_no }}
        </h1>
      </div>
    </div>

    <template v-if="dataLoading">
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div class="space-y-4 lg:col-span-8">
          <USkeleton class="h-40 w-full" />
          <USkeleton class="h-60 w-full" />
        </div>
        <div class="space-y-4 lg:col-span-4">
          <USkeleton class="h-40 w-full" />
          <USkeleton class="h-40 w-full" />
        </div>
      </div>
    </template>

    <div v-else-if="order" class="grid grid-cols-1 gap-6 lg:grid-cols-12">
      <!-- 左欄：訂單商品 -->
      <div class="space-y-6 lg:col-span-8">
        <UCard>
          <template #header>
            <h2 class="text-lg font-semibold">訂購商品</h2>
          </template>
          <UTable
            :columns="itemColumns"
            :data="order.items"
            :ui="{
              root: 'border border-gray-200 rounded-md',
              th: 'border-b border-gray-200 bg-gray-50',
              td: 'border-b border-gray-100',
            }"
          />
          <div class="mt-4 text-right text-base font-bold">
            總金額：${{ order.total_amount.toLocaleString() }}
          </div>
        </UCard>
      </div>

      <!-- 右欄：訂單資訊 + 買家資訊 -->
      <div class="space-y-6 lg:col-span-4">
        <UCard>
          <template #header>
            <h2 class="text-lg font-semibold">訂單資訊</h2>
          </template>
          <dl class="space-y-3 text-sm">
            <div class="flex justify-between">
              <dt class="text-gray-500">狀態</dt>
              <dd>
                <UBadge :color="statusColor(order.status)" variant="subtle">
                  {{ statusLabel(order.status) }}
                </UBadge>
              </dd>
            </div>
            <div class="flex justify-between">
              <dt class="text-gray-500">建立時間</dt>
              <dd>{{ formatDate(order.created_at) }}</dd>
            </div>
            <div class="flex justify-between">
              <dt class="text-gray-500">付款時間</dt>
              <dd>{{ order.paid_at ? formatDate(order.paid_at) : '-' }}</dd>
            </div>
            <div class="flex justify-between">
              <dt class="text-gray-500">綠界交易編號</dt>
              <dd class="font-mono text-xs">
                {{ order.ecpay_trade_no ?? '-' }}
              </dd>
            </div>
            <div
              v-if="order.store_info"
              class="flex justify-between"
            >
              <dt class="text-gray-500">取貨門市</dt>
              <dd>{{ order.store_info.store_name }}</dd>
            </div>
          </dl>
        </UCard>

        <UCard>
          <template #header>
            <h2 class="text-lg font-semibold">買家資訊</h2>
          </template>
          <dl class="space-y-3 text-sm">
            <div class="flex justify-between">
              <dt class="text-gray-500">姓名</dt>
              <dd>{{ order.buyer_name }}</dd>
            </div>
            <div class="flex justify-between">
              <dt class="text-gray-500">Email</dt>
              <dd>{{ order.buyer_email }}</dd>
            </div>
            <div class="flex justify-between">
              <dt class="text-gray-500">電話</dt>
              <dd>{{ order.buyer_phone ?? '-' }}</dd>
            </div>
          </dl>
        </UCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, h } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { TableColumn } from '@nuxt/ui'
import { getAdminOrderById, type AdminOrderDetail } from '~/api/order'

definePageMeta({
  layout: 'admin',
  middleware: 'auth',
})

const route = useRoute()
const router = useRouter()
const toast = useToast()

const orderId = route.params.id as string
const dataLoading = ref(true)
const order = ref<AdminOrderDetail | null>(null)

type OrderItem = AdminOrderDetail['items'][number]

const itemColumns: TableColumn<OrderItem>[] = [
  {
    accessorKey: 'product',
    header: '商品',
    cell: ({ row }) => h('span', row.original.product.title),
  },
  {
    accessorKey: 'delivery_type',
    header: '類型',
    cell: ({ row }) =>
      h('span', row.original.delivery_type === 'digital' ? '數位' : '實體'),
  },
  { accessorKey: 'quantity', header: '數量' },
  {
    accessorKey: 'price',
    header: '單價',
    cell: ({ row }) => h('span', `$${row.original.price.toLocaleString()}`),
  },
  {
    accessorKey: 'subtotal',
    header: '小計',
    cell: ({ row }) => h('span', `$${row.original.subtotal.toLocaleString()}`),
  },
]

const statusLabel = (status: string) => {
  const map: Record<string, string> = {
    pending: '待付款',
    paid: '已付款',
  }
  return map[status] ?? status
}

const statusColor = (status: string) => {
  return status === 'paid' ? 'success' : 'warning'
}

const formatDate = (iso: string) => {
  return new Date(iso).toLocaleString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

onMounted(async () => {
  try {
    order.value = await getAdminOrderById(orderId)
  } catch {
    toast.add({
      title: '錯誤',
      description: '無法載入訂單資料，請稍後再試。',
      color: 'error',
      icon: 'i-heroicons-x-circle',
    })
    router.push('/admin/orders')
  } finally {
    dataLoading.value = false
  }
})
</script>
