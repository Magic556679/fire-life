<template>
  <div class="mt-10 bg-white px-4 text-center lg:p-4">
    <h3 class="">{{ item.title }}</h3>
    <span class="mt-2 text-gray-500">
      最後更新：
      {{ formateUpdateDate(item.updated_at) }}
    </span>

    <p>{{ item.meta_description }}</p>

    <div class="mt-4 flex justify-end">
      <NuxtLink
        :to="`/blog/${item.id}/${item.slug}`"
        class="text-sm font-semibold text-gray-500 group-hover:underline"
      >
        閱讀更多 →
      </NuxtLink>
    </div>
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
