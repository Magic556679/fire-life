<template>
  <Teleport to="body">
    <div class="fixed inset-x-0 top-0 bg-white">
      <div class="flex h-14 items-center justify-between px-6">
        <div class="w-12">
          <img src="/images/logo.png" alt="logo" />
        </div>
        <button type="button" @click="toggleMenu">
          <Icon name="lsicon:close-small-filled" style="color: black" />
        </button>
      </div>
      <nav>
        <ul class="px-4">
          <li class="bg-mint-500 flex items-center">
            <NuxtLink to="/demo/personal">作品集</NuxtLink>
          </li>
          <li class="bg-mint-500 flex items-center">
            <NuxtLink to="/service">服務項目</NuxtLink>
          </li>
          <li class="bg-mint-500 flex items-center">
            <NuxtLink to="/process">合作流程</NuxtLink>
          </li>
          <li class="bg-mint-500 flex items-center">
            <NuxtLink to="/contact">聯絡資訊</NuxtLink>
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
