<template>
  <div class="hidden h-svh border-r border-gray-200 lg:block">
    <UNavigationMenu
      orientation="vertical"
      class="w-[255px]"
      :items="menuStore.menu"
      :ui="{
        item: 'p-2',
        link: 'p-2',
      }"
    />
  </div>
</template>

<script setup lang="ts">
const menuStore = useMenuStore()
</script>
