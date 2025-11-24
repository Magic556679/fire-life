<template>
  <div class="mt-10 border-b border-gray-200 px-4 text-left lg:p-4">
    <NuxtLink :to="`/blog/${item.id}/${item.slug}`">
      <h3 class="">{{ item.title }}</h3>
      <h5 class="mt-4 font-normal text-gray-600">
        {{ item.meta_description }}
      </h5>
      <p class="mt-4 text-gray-500">
        最後更新：
        {{ formateUpdateDate(item.updated_at) }}
      </p>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import type { Post } from '~/api/posts/types'

defineProps<{
  item: Post
}>()

const formateUpdateDate = (updated?: string) => {
  if (!updated) return ''
  return new Date(updated).toISOString().split('T')[0] || ''
}
</script>
