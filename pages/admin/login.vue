<template>
  <div class="mt-[10%] flex flex-col items-center justify-center">
    <NuxtLink to="/">
      <Icon name="logos:adroll" />
    </NuxtLink>
    <div class="p-10">
      <!-- https://ui.nuxt.com/components/form -->
      <!-- <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      > -->
      <UFormField label="帳號">
        <UInput
          id="username"
          v-model="username"
          class="w-full"
          type="text"
          placeholder="請輸入帳號"
        />
      </UFormField>
      <UFormField label="密碼" class="mt-4">
        <UInput
          id="password"
          v-model="password"
          :ui="{ trailing: 'pe-1' }"
          type="password"
          placeholder="請輸入密碼"
        >
          <template #trailing>
            <UButton
              color="neutral"
              variant="link"
              size="sm"
              :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
              :aria-label="show ? 'Hide password' : 'Show password'"
              :aria-pressed="show"
              aria-controls="password"
              @click="show = !show"
            />
          </template>
        </UInput>
      </UFormField>
      <UButton color="secondary" class="mt-4 w-full text-center" :block="true">
        登入
      </UButton>
      <!-- </UForm> -->
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
})

const username = ref('')
const password = ref('')
const show = ref(false)
</script>

<style scoped></style>
