<template>
  <div class="flex">
    <AdminSidebar />
    <div class="w-full">
      <AdminHeader />
      <AdminMain />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
})
</script>

<style scoped></style>
