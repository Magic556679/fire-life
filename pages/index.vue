<template>
  <div class="bg-cream-peach -mt-16 px-4">
    <section class="pt-10 text-center">
      <h2 class="tracking-widest">服務項目</h2>
      <div class="mt-8 flex flex-wrap justify-center gap-4 md:flex-nowrap">
        <div class="w-full rounded-xl bg-white px-5 py-10 md:max-w-sm">
          <h3>網站架設</h3>
          <div>
            <img
              src="/images/service-3.svg"
              alt="網站架設"
              class="mx-auto mt-2 h-[200px] w-[200px] rounded-md object-contain"
            />
          </div>
          <p class="mt-2">
            使用獨立
            VPS，不跟其他人共享資源，提供穩定、快速的網站架設服務，支援各種網站需求。
          </p>
        </div>
        <div class="w-full rounded-xl bg-white px-5 py-10 md:max-w-sm">
          <h3>形象網站</h3>
          <div>
            <img
              src="/images/service-2.svg"
              alt="形象網站"
              class="mx-auto mt-2 h-[200px] w-[200px] rounded-md object-contain"
            />
          </div>
          <p class="mt-2">
            使用 Nuxt 前端技術，打造現代化、響應式的形象網站，提升品牌形象。
          </p>
        </div>
        <div class="w-full rounded-xl bg-white px-5 py-10 md:max-w-sm">
          <h3>部落格</h3>
          <div>
            <img
              src="/images/service-1.svg"
              alt="形象網站"
              class="mx-auto mt-2 h-[200px] w-[200px] rounded-md object-contain"
            />
          </div>
          <p class="mt-2">
            擁有完整的部落格系統，支援文章發佈與搜尋功能，讓你輕鬆分享內容。
          </p>
        </div>
      </div>
    </section>
    <section class="container mx-auto mt-40 text-center lg:max-w-5xl">
      <div class="flex flex-col justify-around lg:flex-row">
        <div
          class="mt-6 flex grow flex-col items-center justify-center lg:mt-0"
        >
          <h2 class="text-3xl font-bold tracking-widest">專屬的網站配置</h2>
          <div class="mt-6 max-w-xs px-6">
            <p class="text-xl leading-9">網站規劃</p>
            <!-- <p class="mt-2 text-gray-600">
              採用清爽易讀的設計風格，支援手機與電腦版，提升使用者體驗。
            </p> -->
          </div>

          <div class="max-w-xs px-6">
            <p class="text-xl leading-9">後台內容管理</p>
            <!-- <p class="mt-2 text-gray-600">
              自訂登入介面，可編輯文章與圖片，不需懂程式也能自己管理網站。
            </p> -->
          </div>

          <div class="max-w-xs px-6">
            <p class="text-xl leading-9">部落格系統</p>
            <!-- <p class="mt-2 text-gray-600">
              建立 SEO 友善的部落格，幫助網站自然成長流量與品牌曝光。
            </p> -->
          </div>

          <div class="max-w-xs px-6">
            <p class="text-xl leading-9">GA4 數據分析</p>
            <!-- <p class="mt-2 text-gray-600">
              串接追蹤碼，掌握使用者行為與行銷成效，幫助你優化策略。
            </p> -->
          </div>
        </div>

        <div
          class="order-first mx-auto w-full md:w-[400px] lg:order-none lg:w-[500px]"
        >
          <!-- <img src="/images/home-2.jpg" alt="專屬的網站配置" /> -->
          <img src="/images/only-1.svg" alt="專屬的網站配置" />
        </div>
      </div>
    </section>
    <!--  bg-gradient-to-b from-white -->
    <section
      class="container mx-auto mt-40 rounded-t-xl bg-white px-5 py-10 text-center"
    >
      <h2 class="text-3xl font-bold tracking-widest">合作流程</h2>
      <p class="mx-auto mt-2 max-w-xl text-gray-500">
        只要四步驟，輕鬆打造你的專屬網站。
      </p>

      <div class="mt-12">
        <ul
          class="grid grid-cols-1 gap-10 text-left md:grid-cols-2 lg:grid-cols-4"
        >
          <li class="text-center">
            <h3 class="text-xl font-semibold">1. 討論需求</h3>
            <p class="mt-1 text-gray-600">確認你的網站目標與設計風格。</p>
          </li>
          <li class="text-center">
            <h3 class="text-xl font-semibold">2. 網站建置</h3>
            <p class="mt-1 text-gray-600">開始設計與開發網站功能。</p>
          </li>
          <li class="text-center">
            <h3 class="text-xl font-semibold">3. 調整測試</h3>
            <p class="mt-1 text-gray-600">確認畫面與功能細節，確保順暢。</p>
          </li>
          <li class="text-center">
            <h3 class="text-xl font-semibold">4. 正式上線</h3>
            <p class="mt-1 text-gray-600">網站部署完成，交付使用說明。</p>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
