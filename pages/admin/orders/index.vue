<template>
  <div>
    <UTable
      :columns="columns"
      :data="data"
      :ui="{
        root: 'border border-gray-300 rounded-md',
        th: 'border-b border-gray-300 bg-gray-50',
        td: 'border-b border-gray-100',
        tr: 'hover:bg-gray-50',
      }"
      :loading="pending"
      loading-color="primary"
      loading-animation="carousel"
      class="flex-1"
    />
    <div class="my-10 flex justify-center">
      <UPagination
        v-model:page="page"
        active-color="neutral"
        active-variant="subtle"
        :items-per-page="perPage"
        :total="perPage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, h } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import { useRouter } from 'vue-router'
import { getAdminOrders, type AdminOrder } from '~/api/order'

definePageMeta({
  layout: 'admin',
  middleware: 'auth',
})

const router = useRouter()
const page = ref(1)
const perPage = ref(10)
const data = computed<AdminOrder[]>(() => orders.value?.data ?? [])

const {
  data: orders,
  pending,
  refresh,
} = await useAsyncData('admin-orders', () =>
  getAdminOrders({ page: page.value, perPage: perPage.value }),
)

const columns: TableColumn<AdminOrder>[] = [
  {
    accessorKey: 'order_no',
    header: '訂單編號',
    cell: ({ row }) =>
      h(
        'button',
        {
          class: 'text-blue-500 hover:text-blue-700 cursor-pointer font-mono text-sm',
          onClick: () => router.push(`/admin/orders/detail/${row.original.id}`),
        },
        row.original.order_no,
      ),
  },
  { accessorKey: 'buyer_name', header: '買家姓名' },
  { accessorKey: 'buyer_email', header: 'Email' },
  {
    accessorKey: 'status',
    header: '訂單狀態',
    cell: ({ row }) => {
      const status = row.original.status
      const map: Record<string, string> = {
        pending: '待付款',
        paid: '已付款',
      }
      return h('span', map[status] ?? status)
    },
  },
  {
    accessorKey: 'buyer_phone',
    header: '電話',
    cell: ({ row }) => h('span', row.original.buyer_phone ?? '-'),
  },
  {
    accessorKey: 'items_snapshot',
    header: '商品',
    cell: ({ row }) => {
      const items = row.original.items_snapshot
      return h('span', items.map(i => `${i.title} × ${i.quantity}`).join('、'))
    },
  },
]

watch([page, perPage], () => {
  refresh()
})
</script>
