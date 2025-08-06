<!-- <template>
  <div class="container mx-auto px-6 lg:max-w-5xl">
    <h2
      class="my-10 text-center text-3xl font-bold tracking-wide text-gray-900"
    >
      合作流程
    </h2>

    <div class="grid gap-4 space-y-4 lg:grid-cols-2">
      <div class="flex gap-3">
        <div class="relative flex flex-col items-center gap-1.5">
          <span
            class="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-orange-500 text-white"
          >
            <Icon name="i-lucide:rocket" />
          </span>
          <div class="w-0.5 flex-1 bg-gray-300"></div>
        </div>

        <div class="mt-1.5 w-full pb-6">
          <div class="text-xs text-gray-500">前置作業</div>
          <div class="text-sm font-medium text-gray-900">
            1.雙方深入討論需求與網站風格，確立合作目標
          </div>
          <ul
            class="mt-2 list-inside list-disc text-sm leading-relaxed text-gray-700"
          >
            <li>需求確認與網站目標</li>
            <li>預算範圍及付款條件</li>
            <li>網站風格與視覺設計討論</li>
            <li>提出詳細報價並簽訂合約</li>
            <li>支付 30% 訂金以啟動專案</li>
          </ul>
        </div>
      </div>

      <div class="flex gap-3">
        <div class="relative flex flex-col items-center gap-1.5">
          <span
            class="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-orange-500 text-white"
          >
            <Icon name="i-lucide-palette" />
          </span>
          <div class="w-0.5 flex-1 bg-gray-300"></div>
        </div>
        <div class="mt-1.5 w-full pb-6">
          <div class="text-xs text-gray-500">網站展示與測試</div>
          <div class="text-sm font-medium text-gray-900">
            3.展示網站雛形，進行功能測試與內容調整
          </div>
          <ul
            class="mt-2 list-inside list-disc text-sm leading-relaxed text-gray-700"
          >
            <li>畫面設計與內容微調</li>
            <li>網站功能與使用流程測試</li>
          </ul>
        </div>
      </div>

      <div class="flex gap-3">
        <div class="relative flex flex-col items-center gap-1.5">
          <span
            class="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-orange-500 text-white"
          >
            <Icon name="i-lucide-code" />
          </span>
          <div class="w-0.5 flex-1 bg-gray-300"></div>
        </div>
        <div class="mt-1.5 w-full pb-6">
          <div class="text-xs text-gray-500">網站建置</div>
          <div class="text-sm font-medium text-gray-900">
            2.開始進行網站開發與內容編輯
          </div>
          <ul
            class="mt-2 list-inside list-disc text-sm leading-relaxed text-gray-700"
          >
            <li>網站架構與排版初步確認</li>
            <li>網站配色與字型風格建議</li>
            <li>帳號申請與設定（網域、GA、Firebase）</li>
          </ul>
        </div>
      </div>

      <div class="flex gap-3">
        <div class="relative flex flex-col items-center gap-1.5">
          <span
            class="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-orange-500 text-white"
          >
            <Icon name="i-lucide-check-circle" />
          </span>
        </div>
        <div class="mt-1.5 w-full pb-6">
          <div class="text-xs text-gray-500">正式上線</div>
          <div class="text-sm font-medium text-gray-900">
            4.確認網站無誤後正式上線，完成專案交付
          </div>
          <ul
            class="mt-2 list-inside list-disc text-sm leading-relaxed text-gray-700"
          >
            <li>網站正式上線與部署</li>
            <li>提供簡易教學與操作說明</li>
            <li>交付網站相關帳號與管理權限</li>
            <li>支付專案尾款</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template> -->
<template>
  <div class="container mx-auto px-6 lg:max-w-5xl">
    <h2
      class="my-10 text-center text-3xl font-bold tracking-wide text-gray-900"
    >
      合作流程
    </h2>

    <div class="grid gap-4 space-y-4 lg:grid-cols-2">
      <div v-for="(item, index) in steps" :key="index" class="flex gap-3">
        <!-- Icon + Vertical Line -->
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

        <!-- Content -->
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
const steps = [
  {
    title: '前置作業',
    description: '雙方深入討論需求與網站風格，確立合作目標',
    icon: 'i-lucide:rocket',
    tasks: [
      '需求確認與網站目標',
      '預算範圍及付款條件',
      '網站風格與視覺設計討論',
      '提出詳細報價並簽訂合約',
      '支付 30% 訂金以啟動專案',
    ],
  },
  {
    title: '網站建置',
    description: '開始進行網站開發與內容編輯',
    icon: 'i-lucide-code',
    tasks: [
      '網站架構與排版初步確認',
      '網站配色與字型風格建議',
      '帳號申請與設定（網域、GA、Firebase）',
    ],
  },
  {
    title: '網站展示與測試',
    description: '展示網站雛形，進行功能測試與內容調整',
    icon: 'i-lucide-palette',
    tasks: ['畫面設計與內容微調', '網站功能與使用流程測試'],
  },
  {
    title: '正式上線',
    description: '確認網站無誤後正式上線，完成專案交付',
    icon: 'i-lucide-check-circle',
    tasks: [
      '網站正式上線與部署',
      '提供簡易教學與操作說明',
      '交付網站相關帳號與管理權限',
      '支付專案尾款',
    ],
  },
]
</script>
