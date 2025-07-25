<template>
  <div class="mt-10 px-4 lg:px-0">
    <NuxtLink :to="`/blog/${item.id}`" class="font-medium">
      <h3 class="text-green-500">{{ item.title }}</h3>
      <div>
        <p>
          {{ item.content }}
        </p>
      </div>
    </NuxtLink>
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
