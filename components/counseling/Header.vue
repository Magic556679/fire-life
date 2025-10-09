<template>
  <header
    class="fixed inset-x-0 z-50"
    :class="
      isScrolled ? 'bg-white text-black shadow-md' : 'bg-transparent text-white'
    "
  >
    <div class="max-w-8xl mx-auto md:py-2">
      <div class="flex h-14 items-center justify-between px-6">
        <div>
          <NuxtLink to="/">
            <div class="flex items-center justify-center gap-2">
              <div>
                <img
                  src="https://cdn.firelifedev.com/counseling/logo.png"
                  alt=""
                  class="h-[50px] w-[50px] object-contain md:h-[100px] md:w-[100px]"
                />
              </div>

              <h2 class="text-xl tracking-widest md:text-3xl">
                趴趴熊心理諮商所
              </h2>
            </div>
          </NuxtLink>
        </div>
        <div class="max-md:hidden">
          <ul class="flex gap-6">
            <li class="flex cursor-pointer items-center">
              <span>服務項目</span>
            </li>
            <li class="flex cursor-pointer items-center">
              <span>相關文章</span>
            </li>
            <li class="flex cursor-pointer items-center">
              <span>關於我們</span>
            </li>
          </ul>
        </div>
        <div v-if="!isMenu" class="md:hidden">
          <button type="button" @click="toggleMenu">
            <Icon
              name="i-lucide:menu"
              :class="isScrolled ? 'text-black' : 'text-white'"
            />
          </button>
        </div>
      </div>
      <CounselingMobileMenu v-if="isMenu" :toggle-menu="toggleMenu" />
    </div>
  </header>
</template>

<script setup lang="ts">
const isMenu = ref(false)

const toggleMenu = (): void => {
  isMenu.value = !isMenu.value
}

const isScrolled = ref(false)

const handleScroll = () => {
  // 只要有往下滾動 > 0px 就改樣式
  isScrolled.value = window.scrollY > 0
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
