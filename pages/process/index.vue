<template>
  <div class="container mx-auto px-6 lg:max-w-5xl">
    <h2
      class="my-10 text-center text-3xl font-bold tracking-wide text-gray-900"
    >
      合作流程
    </h2>

    <div class="mb-6 grid gap-4 lg:grid-cols-2">
      <div
        v-for="(item, index) in steps"
        :key="index"
        :class="['flex gap-3', lgGridPosition(index)]"
      >
        <div class="relative flex flex-col items-center gap-1.5">
          <span
            class="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-orange-500 text-white"
          >
            <Icon :name="item.icon" />
          </span>
          <div
            v-if="index !== steps.length - 1"
            class="w-0.5 flex-1 bg-gray-300"
          ></div>
        </div>

        <div class="mt-1.5 w-full pb-6">
          <div class="text-sm font-medium text-gray-900">
            {{ index + 1 }}. {{ item.title }}
          </div>
          <p class="mt-1 text-sm leading-relaxed text-gray-700">
            {{ item.description }}
          </p>
          <ul
            v-if="item.tasks"
            class="mt-2 list-inside list-disc text-sm leading-relaxed text-gray-700"
          >
            <li v-for="(task, tIndex) in item.tasks" :key="tIndex">
              {{ task }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Fire Life - 合作流程',
  htmlAttrs: { lang: 'zh-TW' },
  meta: [
    {
      name: 'description',
      content:
        '了解 Fire Life 的網站合作流程，從需求討論到網站上線，全程透明、專業、高效率。',
    },
    {
      name: 'keywords',
      content: '合作流程, 網站架設, 接案流程, 前端開發, 品牌網站',
    },

    { property: 'og:title', content: 'Fire Life - 合作流程' },
    {
      property: 'og:description',
      content:
        '從需求討論到網站上線，完整呈現 Fire Life 的網站合作流程，專業、高效率。',
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://firelifedev.com/process' },
    {
      property: 'og:image',
      content: 'https://firelifedev.com/images/logo.png',
    },
  ],
  link: [{ rel: 'canonical', href: 'https://firelifedev.com/process' }],
})

const steps = [
  {
    title: '前置作業',
    description: '雙方深入討論需求與網站風格，確立合作目標',
    icon: 'i-lucide:rocket',
    tasks: [
      '需求確認與網站目標',
      '預算範圍及付款條件',
      '網站風格與視覺設計討論',
      '報價與簽訂合約',
      '支付 40% 訂金以啟動專案',
    ],
  },
  {
    title: '設計確認',
    description: '雙方確認網站設計與風格',
    icon: 'i-lucide-palette',
    tasks: [
      '提供 Figma Wireframe 確認畫面',
      '畫面設計與內容調整',
      '素材提供',
      '開始進行網站開發與',
    ],
  },
  {
    title: '網站展示與測試',
    description: '展示網站，進行功能測試與內容調整',
    icon: 'i-lucide-palette',
    tasks: ['內容調整', '網站功能測試'],
  },
  {
    title: '網站建置',
    description: '網站驗收後，進行網站部署',
    icon: 'i-lucide-code',
    tasks: ['網域購買', '虛擬主機架設', '帳號申請與設定(網域、GA、Firebase)'],
  },
  {
    title: '正式上線',
    description: '完成專案交付',
    icon: 'i-lucide-check-circle',
    tasks: [
      '網站正式上線',
      '提供簡易教學與操作說明',
      '交付網站相關帳號與管理權限',
      '支付專案尾款',
    ],
  },
]

const lgGridPosition = (index: number) => {
  const positions = [
    'lg:row-start-1 lg:col-start-1',
    'lg:row-start-2 lg:col-start-1',
    'lg:row-start-1 lg:col-start-2',
    'lg:row-start-2 lg:col-start-2',
    'lg:row-start-3 lg:col-start-2',
  ]
  return positions[index] || ''
}
</script>
