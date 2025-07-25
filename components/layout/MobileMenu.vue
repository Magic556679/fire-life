<template>
  <Teleport to="body">
    <div class="fixed inset-x-0 top-0 bg-white">
      <div class="flex h-14 items-center justify-between px-6">
        <div>
          <Icon name="logos:adroll" />
        </div>
        <button type="button" @click="toggleMenu">
          <Icon name="lsicon:close-small-filled" style="color: black" />
        </button>
      </div>
      <nav>
        <ul class="px-4">
          <li class="flex items-center py-2">
            <NuxtLink to="/">Home</NuxtLink>
          </li>
          <li class="flex items-center py-2">
            <NuxtLink to="/blog">Blog</NuxtLink>
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
