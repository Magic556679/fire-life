<template>
  <section id="nomad-challenges" class="relative overflow-hidden">
    <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-4 lg:py-24">
      <div class="mx-auto max-w-3xl text-center">
        <h2 class="personal-heading-highlight">數位遊牧的挑戰與解方</h2>
        <p class="mt-4 text-slate-600">
          不只談嚮往，與你一起面對可能面臨的問題。
        </p>
      </div>
      <div class="mt-12 grid gap-10 lg:grid-cols-12">
        <div class="lg:col-span-12">
          <div class="grid gap-6 md:grid-cols-3">
            <article
              v-for="(item, idx) in challenges"
              :key="idx"
              class="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div class="mb-4 flex items-center gap-3">
                <h4
                  class="text-lg font-semibold text-slate-900 dark:text-white"
                >
                  {{ item.title }}
                </h4>
              </div>

              <p class="text-sm text-slate-600 dark:text-slate-300">
                {{ item.description }}
              </p>

              <div class="mt-4">
                <h5
                  class="mb-2 text-sm font-bold text-slate-900 dark:text-white"
                >
                  解決方案
                </h5>
                <ul
                  class="space-y-2 text-sm text-slate-700 dark:text-slate-300"
                >
                  <li v-for="(solution, sIdx) in item.solutions" :key="sIdx">
                    {{ solution }}
                  </li>
                </ul>
              </div>

              <div class="mt-4">
                <p
                  class="cursor-pointer text-sm font-medium text-sky-700 hover:underline dark:text-sky-300"
                >
                  立即行動
                </p>
                <ul
                  class="mt-2 list-disc pl-5 text-sm text-slate-700 dark:text-slate-300"
                >
                  <li v-for="(action, aIdx) in item.actions" :key="aIdx">
                    {{ action }}
                  </li>
                </ul>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const challenges = [
  {
    title: '收入不穩定',
    description: '專案型收入高低起伏，容易焦慮與過度接案。',
    solutions: [
      '建立固定月費制的維護方案（Retainer）',
      '用 70/20/10 規則：70% 穩定案、20% 成長案、10% 嘗試案',
      '收入分桶：生活、稅金、緊急預備金，分帳自動化',
    ],
    actions: [
      '為既有客戶設計「網站保養方案」NT$3,000–8,000/月',
      '用 Google 表單 + 合約樣板，標準化報價與簽約流程',
      '把收款改為每月固定日週期扣款',
    ],
  },
  {
    title: '孤單感 / 缺少人脈',
    description: '長期遠端，缺乏交流與合作機會，靈感與案源下降。',
    solutions: [
      '固定加入共同工作日（co-working day）',
      '每月 1 篇技術或案例文章，打造個人品牌',
      '設定「合作交換」：設計師/行銷夥伴互推案',
    ],
    actions: [
      '加入在地創業社群或線上 Slack/Discord',
      '建立 Notion「合作清單」與聯絡節奏（每月回訪）',
      '把作品發佈到 X/Threads/LinkedIn，附上行動呼籲',
    ],
  },
  {
    title: '生活節奏混亂 / 倦怠',
    description: '時差、移動與環境變動讓專注掉線，效率下滑。',
    solutions: [
      '設計時間框（time block）與例行儀式',
      '工作/旅行 3:1 週期，避免連續爆肝移動',
    ],
    actions: [
      '每天固定兩個深度工作區塊（各 90 分）',
      '建立「出發前 24 小時清單」與「抵達 24 小時清單」',
      '把會議統一壓在同一時段，避免破碎化',
    ],
  },
]
</script>
