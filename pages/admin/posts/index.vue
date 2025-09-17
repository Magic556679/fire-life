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
      class="flex-1"
    />
    <div class="my-10 flex justify-center">
      <UPagination
        v-model:page="page"
        :items-per-page="prePage"
        :total="pageTotal"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'

definePageMeta({
  layout: 'admin',
  middleware: 'auth',
})

type Post = {
  id: string
  title: string
  author: string
  status: string
}

const data = ref<Post[]>([
  { id: '4600', title: '文章 A', author: 'James', status: 'paid' },
  { id: '4601', title: '文章 B', author: 'Mia', status: 'failed' },
  { id: '4602', title: '文章 C', author: 'Liam', status: 'paid' },
  { id: '4603', title: '文章 D', author: 'Emma', status: 'pending' },
  { id: '4604', title: '文章 E', author: 'Noah', status: 'paid' },
  { id: '4605', title: '文章 F', author: 'Olivia', status: 'failed' },
  { id: '4606', title: '文章 G', author: 'Ava', status: 'paid' },
  { id: '4607', title: '文章 H', author: 'William', status: 'pending' },
  { id: '4608', title: '文章 I', author: 'Sophia', status: 'paid' },
  { id: '4609', title: '文章 J', author: 'James', status: 'failed' },
  { id: '4610', title: '文章 K', author: 'Mia', status: 'paid' },
])

const columns: TableColumn<Post>[] = [
  { accessorKey: 'id', header: '編號' },
  { accessorKey: 'title', header: '文章標題' },
  { accessorKey: 'author', header: '作者' },
  { accessorKey: 'status', header: '狀態' },
]

const page = ref(1)
const prePage = 10
const pageTotal = computed(() => {
  return data.value.length
})
</script>
