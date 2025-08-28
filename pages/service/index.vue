<template>
  <div class="container mx-auto lg:max-w-5xl">
    <h2 class="my-10 text-center">服務項目</h2>
    <sections-services-section />
    <USeparator class="py-6" />
    <section>
      <h3 class="my-6 text-center">形象網站</h3>
      <div class="flex flex-col gap-6 md:flex-row">
        <div class="basis-1/2 bg-white p-5">
          <div class="bg-orange-light">
            <h5 class="text-center font-normal">基礎方案</h5>
          </div>
          <ul class="space-y-2 p-6 text-sm leading-relaxed">
            <li>基本頁面：首頁、關於我、服務項目、聯絡頁</li>
            <li>支援 RWD 響應式設計，手機與電腦皆可瀏覽</li>
            <li>Google SEO 基本優化</li>
            <li>提供操作教學文件</li>
            <li>1 個月免費維護</li>
          </ul>
        </div>
        <div class="basis-1/2 bg-white p-5">
          <div class="bg-orange-accent">
            <h5 class="text-center font-normal">升級方案</h5>
          </div>
          <ul class="space-y-2 p-6 text-sm leading-relaxed">
            <li>包含基礎方案所有功能</li>
            <li>部落格系統，可自行發佈文章</li>
            <li>作品集專區，展示案例與圖片</li>
            <li>串接 Google Analytics 追蹤流量</li>
            <li>客製化設計</li>
            <li>支援簡單表單（聯絡、報價需求）</li>
            <li>2 個月免費維護與技術支援</li>
          </ul>
        </div>
      </div>
    </section>
    <USeparator class="py-6" />
    <section class="mb-10">
      <h3 class="my-6 text-center">部落格網站</h3>
      <div class="flex flex-col gap-6 md:flex-row">
        <!-- 基礎方案 -->
        <div class="basis-1/2 rounded-xl bg-white p-5">
          <div class="bg-orange-light">
            <h5 class="text-center text-lg font-normal">基礎方案</h5>
          </div>
          <ul class="space-y-2 p-6 text-sm leading-relaxed">
            <li>基本頁面：文章列表、單篇文章、關於我、聯絡頁</li>
            <li>後台管理系統，可新增/編輯/刪除文章</li>
            <li>支援 RWD 響應式設計，手機與電腦皆可瀏覽</li>
            <li>文章分類與標籤功能</li>
            <li>SEO 基本優化（文章標題與描述設定）</li>
            <li>1 個月免費維護</li>
          </ul>
        </div>

        <!-- 升級方案 -->
        <div class="basis-1/2 rounded-xl bg-white p-5">
          <div class="bg-orange-accent">
            <h5 class="text-center text-lg font-normal">升級方案</h5>
          </div>
          <ul class="space-y-2 p-6 text-sm leading-relaxed">
            <li>包含基礎方案所有功能</li>
            <li>圖片與檔案上傳（整合 Firebase Storage）</li>
            <li>進階 SEO 功能（自訂網址 slug、文章結構化資料）</li>
            <li>串接 Google Analytics 追蹤流量</li>
            <li>支援搜尋功能（依關鍵字或分類）</li>
            <li>2 個月免費維護與技術支援</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Fire Life - 服務項目',
  htmlAttrs: { lang: 'zh-TW' },
  meta: [
    {
      name: 'description',
      content:
        'Fire Life 提供個人與企業網站架設服務，包含設計、前端開發與網站維護，打造專屬品牌網站。',
    },
    {
      name: 'keywords',
      content: '網站架設, 個人網站, 企業網站, 前端開發, 接案',
    },

    { property: 'og:title', content: 'Fire Life - 服務項目' },
    {
      property: 'og:description',
      content:
        '專業網站架設服務，包括設計、前端開發與網站維護，打造專屬品牌網站。',
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://firelifedev.com/service' },
    {
      property: 'og:image',
      content: 'https://firelifedev.com/images/logo.png',
    },
  ],
  link: [{ rel: 'canonical', href: 'https://firelifedev.com/service' }],
})
</script>

<style scoped></style>
