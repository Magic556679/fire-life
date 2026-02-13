<template>
  <NuxtLink :to="to" class="relative">
    <Icon name="material-symbols:shopping-cart-outline-sharp" class="text-xl" />
    <UBadge
      v-if="count > 0"
      :label="count > 99 ? '99+' : count"
      color="error"
      size="xs"
      class="absolute -top-1 -right-3 flex h-5 w-5 items-center justify-center rounded-full"
    />
  </NuxtLink>
</template>

<script setup lang="ts">
interface ShoppingCartBadgeProps {
  count: number
  to?: string
}

const props = defineProps<ShoppingCartBadgeProps>()
const to = props.to ?? '/cart'
</script>
