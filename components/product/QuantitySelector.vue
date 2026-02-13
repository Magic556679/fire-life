<template>
  <div class="flex w-40 items-center">
    <UButton
      icon="i-heroicons-minus"
      color="neutral"
      variant="outline"
      class="rounded-r-none"
      :disabled="quantity <= 1"
      @click="$emit('update', quantity - 1)"
    />

    <UInput
      id="quantity"
      color="warning"
      variant="outline"
      type="number"
      min="1"
      :model-value="quantity"
      :ui="{
        base: 'rounded-none text-center',
      }"
      @update:model-value="handleInput"
    />

    <UButton
      icon="i-heroicons-plus"
      color="neutral"
      variant="outline"
      class="rounded-l-none"
      @click="$emit('update', quantity + 1)"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{ quantity: number }>()
const emit = defineEmits<{
  (e: 'update', value: number): void
}>()

const handleInput = (value: number) => {
  emit('update', value)
}
</script>
