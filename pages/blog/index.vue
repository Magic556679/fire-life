<template>
  <div class="container mx-auto pt-14 lg:max-w-5xl">
    <div class="grid gap-2 lg:grid-cols-3">
      <div class="col-span-2">
        <BlogPost
          v-for="item in blogResponse.documents"
          :key="item.id"
          :item="item"
        />
      </div>
      <div class="mt-10 hidden lg:block">Recommended topics</div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface BlogData {
  id: number
  title: string
  summary: string
  content: string
}

interface BlogResponse {
  documents: BlogData[]
}

interface BlogDocument {
  id: number
  title: string
  summary: string
  content: string
}

// Firebase SDK API
function generateRandomBlogs(count = 5): BlogResponse {
  const base: BlogDocument = {
    id: 1,
    title: 'How I Review Code As a Senior Developer For Better Results',
    summary:
      'I have been doing code reviews for quite some time and have become better at it. From my experience here I have compiled a list of…',
    content:
      'I have been doing code reviews for quite some time and have learned some common patterns that helped me do better code reviews. From my experience here, I have compiled a list of things I look for in any Pull Request I am reviewing.',
  }

  const blogs: BlogDocument[] = Array.from({ length: count }, (_, index) => {
    const id = index + 1
    return {
      ...base,
      id,
      title: `${base.title} #${id}`,
      summary: `${base.summary} (Summary version ${id})`,
      content: `${base.content} (Content version ${id})`,
    }
  })

  return { documents: blogs }
}

const blogResponse = generateRandomBlogs(5)
</script>
