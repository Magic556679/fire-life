<template>
  <Teleport to="body">
    <div class="fixed inset-x-0 top-0 bg-white">
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
        <button type="button" @click="toggleMenu">
          <Icon name="lsicon:close-small-filled" style="color: black" />
        </button>
      </div>
      <nav>
        <ul class="space-y-4 px-4 pb-4">
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
      </nav>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
interface Props {
  toggleMenu: () => void
}

defineProps<Props>()
</script>
