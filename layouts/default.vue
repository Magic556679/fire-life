<template>
  <div class="flex min-h-screen flex-col">
    <LayoutHeader />
    <LayoutBanner v-if="route.path === '/'" />
    <main class="bg-cream-peach flex-1 pt-14">
      <slot />
    </main>
    <LayoutFooter />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
</script>
