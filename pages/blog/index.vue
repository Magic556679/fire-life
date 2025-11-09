<template>
  <div class="container mx-auto lg:max-w-5xl">
    <div class="grid gap-2 lg:grid-cols-3">
      <div class="col-span-2">
        <div v-if="posts">
          <BlogPost v-for="item in postsData" :key="item.id" :item="item" />
          <div class="my-10 flex justify-center">
            <UPagination
              v-model:page="page"
              :items-per-page="perPage"
              :total="postsData.length"
            />
          </div>
        </div>
        <div v-else class="mt-10 bg-white px-4 text-center lg:p-4">
          尚未新增文章
        </div>
      </div>
      <div class="mt-10 hidden px-7 lg:block">
        <Icon name="fa-solid:tag" class="h-4 w-4 text-[#5DADE2]" />
        <span class="pl-2">熱門標籤</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PostsResponse } from '~/api/posts/types'
import { getPosts } from '~/api/posts/index'

useHead({
  title: 'Fire Life - 網站架設與前端技術與接案分享',
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

const perPage = ref(10)
let page = ref(1)
const {
  data: posts,
  pending,
  error,
  refresh,
} = await useAsyncData<PostsResponse>(`posts-1`, () =>
  getPosts({
    page: page.value,
    perPage: perPage.value,
  }),
)

const postsData = computed(() => {
  if (!posts.value?.data.length) return []

  return posts.value.data
})

watch([page], () => {
  refresh()
})
</script>
