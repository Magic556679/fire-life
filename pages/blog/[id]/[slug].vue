<template>
  <div class="py-14">
    <div class="max-full mx-auto mt-12 bg-white p-8 md:max-w-3xl">
      <div class="mt-10">
        <div class="text-left">
          <h1>
            {{ title }}
          </h1>
          <div class="mt-2 text-gray-500">
            <span>
              最後更新：
              {{ updatedDate }}
            </span>
          </div>
        </div>
      </div>
      <div v-html="data?.data.content" class="tiptap"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getPost } from '~/api/posts/index'
import type { Post, ApiResponse } from '~/api/posts/types'

const route = useRoute()
const id = Number(route.params.id)
const slugParam = route.params.slug

const { data } = await useAsyncData<ApiResponse<Post>>('post', () =>
  getPost(id),
)

const post = data.value?.data || null
const title = post?.title || ''
const slug = post?.slug || ''
const metaDescription = post?.meta_description
const updated = post?.updated_at || ''

const updatedDate = updated ? new Date(updated).toISOString().split('T')[0] : ''

if (import.meta.env.SSR) {
  console.log('SSR Date:', updatedDate.toString())
}

if (!import.meta.env.SSR) {
  console.log('CSR Date:', updatedDate.toString())
}

if (!post) {
  throw createError({ statusCode: 404, statusMessage: '文章不存在' })
}

if (post.slug && post.slug !== slugParam) {
  await navigateTo(`/blog/${post.id}/${post.slug}`, { redirectCode: 301 })
}

useHead({
  title: `Fire Life - ${title}`,
  meta: [
    { name: 'description', content: metaDescription },
    { name: 'keywords', content: '個人形象網站, 企業形象網站, 接案, 網站架設' },
    { property: 'og:title', content: `Fire Life - ${title}` },
    { property: 'og:description', content: metaDescription },
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: `https://firelifedev.com/blog/${slug}` },
    {
      property: 'og:image',
      content:
        post?.og_image ||
        'https://firelifedev.com/images/firelife-homepage-og.png',
    },
  ],
  link: [{ rel: 'canonical', href: `https://firelifedev.com/blog/${slug}` }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description: metaDescription,
        author: {
          '@type': 'Person',
          name: 'Li Yen Wei',
        },
        datePublished: post?.created_at,
        dateModified: post?.updated_at,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://firelifedev.com/blog/${slug}`,
        },
        image:
          post?.og_image ||
          'https://firelifedev.com/images/firelife-homepage-og.png',
      }),
    },
  ],
})
</script>
