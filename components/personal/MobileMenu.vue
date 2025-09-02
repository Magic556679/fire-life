<template>
  <Teleport to="body">
    <div class="fixed inset-x-0 top-0 bg-white">
      <div class="flex h-14 items-center justify-between px-6">
        <div>
          <NuxtLink to="/">
            <h2 class="tracking-widest">數位遊牧</h2>
          </NuxtLink>
        </div>
        <button type="button" @click="toggleMenu">
          <Icon name="lsicon:close-small-filled" style="color: black" />
        </button>
      </div>
      <nav>
        <ul class="px-4">
          <li class="flex items-center py-2">
            <span>關於我</span>
          </li>
          <li class="flex items-center py-2">
            <span>部落格</span>
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
