<template>
  <article class="group border-b border-gray-100 py-8 last:border-b-0">
    <NuxtLink
      :to="`/blog/${item.id}/${item.slug}`"
      class="flex items-start gap-6 sm:gap-8"
    >
      <div class="flex min-w-0 flex-1 flex-col">
        <h2
          class="line-clamp-2 text-lg leading-snug font-bold text-gray-900 transition-colors group-hover:text-gray-500 sm:text-xl"
        >
          {{ item.title }}
        </h2>

        <p
          v-if="item.meta_description"
          class="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-500 sm:text-base"
        >
          {{ item.meta_description }}
        </p>

        <div
          class="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-400"
        >
          <span
            v-if="item.is_pinned"
            class="rounded-full bg-gray-100 px-2.5 py-0.5 font-medium text-gray-600"
          >
            置頂
          </span>
          <span>{{ formatDate(item.updated_at) }}</span>
          <span aria-hidden="true">·</span>
          <span>{{ readingTime }} 分鐘閱讀</span>
        </div>
      </div>

      <div v-if="item.og_image" class="shrink-0">
        <img
          :src="item.og_image"
          :alt="item.title"
          class="h-24 w-36 rounded object-cover sm:h-28 sm:w-44"
        />
      </div>
    </NuxtLink>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Post } from '~/api/posts/types'

const props = defineProps<{ item: Post }>()

const readingTime = computed(() => {
  const text = props.item.content?.replace(/<[^>]*>/g, '') ?? ''
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
})

const formatDate = (date?: string) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>
