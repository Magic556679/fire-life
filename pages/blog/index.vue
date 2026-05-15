<template>
  <div class="container mx-auto px-4 py-12 lg:max-w-5xl">
    <div class="grid gap-12 lg:grid-cols-3">
      <div class="col-span-2">
        <div v-if="postsData.length > 0">
          <BlogPost v-for="item in postsData" :key="item.id" :item="item" />
          <div class="mt-10 flex justify-center">
            <UPagination
              v-model:page="page"
              active-color="neutral"
              active-variant="subtle"
              :items-per-page="perPage"
              :total="posts?.total ?? 0"
            />
          </div>
        </div>
        <div v-else class="py-20 text-center text-gray-400">尚未新增文章</div>
      </div>

      <aside class="hidden lg:block">
        <div class="sticky top-12">
          <h3
            class="mb-4 text-xs font-semibold tracking-widest text-gray-400 uppercase"
          >
            熱門標籤
          </h3>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in popularTags"
              :key="tag"
              class="cursor-pointer rounded-full border border-gray-200 px-3 py-1 text-sm text-gray-500 transition-colors hover:border-gray-400 hover:text-gray-700"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PostsResponse } from '~/api/posts/types'
import { getPosts } from '~/api/posts/index'

useHead({
  title: 'Fire Life - 網站架設與前端技術與接案分享',
  htmlAttrs: { lang: 'zh-TW' },
  meta: [
    {
      name: 'description',
      content: 'Fire Life - 部落格，分享網站架設、前端開發與接案經驗。',
    },
    { name: 'keywords', content: '前端開發, 網站架設, Nuxt, 接案, 部落格' },
    { property: 'og:title', content: 'Fire Life - 部落格' },
    {
      property: 'og:description',
      content: '學習網站架設與前端技術，打造專屬品牌網站。',
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://firelifedev.com/blog' },
    {
      property: 'og:image',
      content: 'https://firelifedev.com/images/firelife-homepage-og.png',
    },
  ],
  link: [{ rel: 'canonical', href: 'https://firelifedev.com/blog' }],
})

const popularTags = ['前端開發', 'Nuxt', 'Vue', '接案', '網站架設']

const perPage = ref(10)
const page = ref(1)

const { data: posts } = await useAsyncData<PostsResponse>(
  () => `posts-page-${page.value}`,
  () => getPosts({ page: page.value, perPage: perPage.value }),
)

const postsData = computed(() => posts.value?.data ?? [])
</script>
