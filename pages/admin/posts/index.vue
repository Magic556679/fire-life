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
        :items-per-page="perPage"
        :total="pageTotal"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import { getPosts, deletePost } from '~/api/posts/index'
import { useRouter } from 'vue-router'
import type { Post, PostsResponse } from '~/api/posts/types'

definePageMeta({
  layout: 'admin',
  middleware: 'auth',
})

const router = useRouter()
const page = ref(1)
const perPage = ref(10)
const pageTotal = computed(() => posts.value?.total)
const data = computed<Post[]>(() => posts.value?.data ?? [])

const columns: TableColumn<Post>[] = [
  {
    accessorKey: 'id',
    header: '編號',
    cell: ({ row }) => {
      return h(
        'button',
        {
          class: 'text-blue-500 hover:text-blue-700 cursor-pointer',
          onClick: () =>
            router.push(`/blog/${row.original.id}/${row.original.slug}`),
        },
        row.original.id,
      )
    },
  },
  { accessorKey: 'title', header: '文章標題' },
  { accessorKey: 'author', header: '作者' },
  { accessorKey: 'status', header: '狀態' },
  {
    accessorKey: 'actions',
    header: '操作',
    cell: ({ row }) => {
      const post = row.original
      const Icon = resolveComponent('Icon')

      return h('div', { class: 'flex gap-2' }, [
        // edit
        h(
          'button',
          {
            class: 'text-blue-500 hover:text-blue-700 cursor-pointer',
            onClick: () => router.push(`/admin/posts/edit/${post.id}`),
          },
          [
            h(Icon, {
              name: 'i-prime:pen-to-square',
              class: 'w-6 h-6',
            }),
          ],
        ),

        // delete
        h(
          'button',
          {
            class: 'text-blue-500 hover:text-blue-700 cursor-pointer',
            onClick: () => {
              handleDelete(post.id)
            },
          },
          [
            h(Icon, {
              name: 'i-material-symbols:delete',
              class: 'w-6 h-6',
            }),
          ],
        ),
      ])
    },
  },
]

const {
  data: posts,
  pending,
  error,
  refresh,
} = await useAsyncData<PostsResponse>('posts', () =>
  getPosts({
    page: page.value,
    perPage: perPage.value,
  }),
)

const handleDelete = async (id: number) => {
  if (!confirm('確定要刪除這篇文章嗎？')) return
  try {
    const { status } = await deletePost(id)
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
