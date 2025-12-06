<template>
  <div class="flex w-40 items-center">
    <UButton
      icon="i-heroicons-minus"
      color="neutral"
      variant="outline"
      class="rounded-r-none"
      :disabled="quantity <= 1"
      @click="decrementQuantity"
    />

    <UInput
      id="quantity"
      v-model="quantity"
      color="warning"
      variant="outline"
      type="number"
      min="1"
      :ui="{
        base: 'rounded-none text-center',
      }"
      @input="handleInput"
    />

    <UButton
      icon="i-heroicons-plus"
      color="neutral"
      variant="outline"
      class="rounded-l-none"
      @click="incrementQuantity"
    />
  </div>
</template>

<script setup lang="ts">
const quantity = defineModel<number>('quantity', { default: 1 })

const incrementQuantity = () => {
  quantity.value++
}

const decrementQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

// 確保輸入的數字有效 (> 1 且為整數)
const handleInput = () => {
  // 過濾掉非數字字符，並確保最小為 1
  const value = parseInt(String(quantity.value))
  if (isNaN(value) || value < 1) {
    quantity.value = 1
  } else {
    quantity.value = value
  }
}
</script>
