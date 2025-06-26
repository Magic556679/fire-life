<template>
  <div class="mt-10 px-4 lg:px-0">
    <h2>{{ item.title }}</h2>
    <div>
      <h3>
        {{ item.content }}
      </h3>
      <NuxtLink :to="`/blog/${item.id}`" class="font-medium">
        Read more
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  item: {
    id: number
    title: string
    summary: string
    content: string
  }
}>()
</script>
