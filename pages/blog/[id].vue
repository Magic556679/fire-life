<template>
  <div class="container mx-auto pt-14">
    <div class="mt-10">
      <p>文章編號：{{ id }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const id = route.params.id
</script>

<style scoped></style>
