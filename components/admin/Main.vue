<template>
  <div class="m-4">
    <UTable
      :data="data"
      class="flex-1"
      :ui="{
        root: 'border border-gray-300 rounded-md',
        th: 'border-b border-gray-300 bg-gray-50',
        td: 'border-b border-gray-100',
        tr: 'hover:bg-gray-50',
      }"
    />
  </div>
</template>

<script setup lang="ts">
const data = ref([
  {
    id: '4600',
    date: '2024-03-11T15:30:00',
    status: 'paid',
    email: 'james.anderson@example.com',
    amount: 594,
  },
  {
    id: '4599',
    date: '2024-03-11T10:10:00',
    status: 'failed',
    email: 'mia.white@example.com',
    amount: 276,
  },
  {
    id: '4598',
    date: '2024-03-11T08:50:00',
    status: 'refunded',
    email: 'william.brown@example.com',
    amount: 315,
  },
  {
    id: '4597',
    date: '2024-03-10T19:45:00',
    status: 'paid',
    email: 'emma.davis@example.com',
    amount: 529,
  },
  {
    id: '4596',
    date: '2024-03-10T15:55:00',
    status: 'paid',
    email: 'ethan.harris@example.com',
    amount: 639,
  },
])
</script>
