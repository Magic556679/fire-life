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
        :total="pageTotal"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import { useRouter } from 'vue-router'
import { getProducts, deleteProduct } from '~/api/products'
import type { Product, ProductsResponse } from '~/api/products'

definePageMeta({
  layout: 'admin',
  middleware: 'auth',
})

const router = useRouter()
const page = ref(1)
const perPage = ref(10)
const pageTotal = computed(() => products.value?.total)
const data = computed<Product[]>(() => products.value?.data ?? [])

const {
  data: products,
  pending,
  refresh,
} = await useAsyncData<ProductsResponse>('products', () =>
  getProducts({
    page: page.value,
    perPage: perPage.value,
  }),
)

const columns: TableColumn<Product>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => {
      return h(
        'button',
        {
          class: 'text-blue-500 hover:text-blue-700 cursor-pointer',
          onClick: () => router.push(`/admin/products/edit/${row.original.id}`),
        },
        row.original.id,
      )
    },
  },
  { accessorKey: 'title', header: '商品名稱' },
  { accessorKey: 'price', header: '價格' },
  { accessorKey: 'stock', header: '庫存' },
  { accessorKey: 'status', header: '狀態' },
  {
    accessorKey: 'actions',
    header: '操作',
    cell: ({ row }) => {
      const product = row.original
      const Icon = resolveComponent('Icon')

      return h('div', { class: 'flex gap-2' }, [
        h(
          'button',
          {
            class: 'text-blue-500 hover:text-blue-700 cursor-pointer',
            onClick: () => router.push(`/admin/products/edit/${product.id}`),
          },
          [h(Icon, { name: 'i-prime:pen-to-square', class: 'w-6 h-6' })],
        ),
        h(
          'button',
          {
            class: 'text-red-400 hover:text-red-500 cursor-pointer',
            onClick: () => handleDelete(product.id),
          },
          [h(Icon, { name: 'i-material-symbols:delete', class: 'w-6 h-6' })],
        ),
      ])
    },
  },
]

const handleDelete = async (id: number) => {
  if (!confirm('確定要刪除這篇文章嗎？')) return
  try {
    const { status } = await deleteProduct(id)
    if (status === 200) {
      await refresh()
    }
  } catch (err) {
    console.error(err)
    alert('刪除失敗，請稍後再試')
  }
}

watch([page, perPage], () => {
  refresh()
})
</script>
