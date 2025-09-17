<template>
  <div class="mt-[10%] flex flex-col items-center justify-center">
    <NuxtLink to="/">
      <div class="w-12">
        <img src="/images/logo.png" alt="logo" />
      </div>
    </NuxtLink>
    <div class="p-10">
      <form @submit.prevent="handleLoginForm">
        <UFormField label="信箱">
          <UInput
            id="email"
            v-model="email"
            class="w-full"
            type="text"
            placeholder="請輸入信箱"
          />
        </UFormField>
        <p class="my-1 h-4 text-sm text-red-500">
          {{ errors.email }}
        </p>

        <UFormField label="密碼">
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
          <p class="my-1 h-4 text-sm text-red-500">
            {{ errors.password }}
          </p>
        </UFormField>
        <UButton
          color="secondary"
          class="mt-1 w-full text-center"
          :block="true"
          type="submit"
        >
          登入
        </UButton>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import type { AxiosError } from 'axios'
import { login } from '~/api/auth/login'
import { loginSchema } from '~/composables/useLoginValidator'
import { z } from 'zod'

definePageMeta({
  layout: 'admin',
})

const email = ref('')
const password = ref('')
const show = ref(false)
const auth = useAuthStore()

const submitLogin = async () => {
  try {
    const { data } = await login(email.value, password.value)

    auth.setUser({
      token: data.token,
      id: data.user.id,
      name: data.user.name,
      email: data.user.email,
    })

    navigateTo('/admin')
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>
    console.error('登入失敗:', error.response?.data?.message || error.message)
  }
}

const errors = reactive<{ email?: string; password?: string }>({})

const handleLoginForm = () => {
  errors.email = undefined
  errors.password = undefined

  const result = loginSchema.safeParse({
    email: email.value,
    password: password.value,
  })

  if (!result.success) {
    const tree = z.treeifyError(result.error)

    if (tree.properties?.email?.errors) {
      errors.email = tree.properties.email.errors[0]
    }

    if (tree.properties?.password?.errors) {
      errors.password = tree.properties.password.errors[0]
    }

    console.log(tree.properties)
  }

  submitLogin()
}

const router = useRouter()

onMounted(() => {
  if (auth.isLoggedIn) {
    router.replace('/admin')
  }
})

watch(
  () => auth.isLoggedIn,
  loggedIn => {
    if (loggedIn) {
      router.replace('/admin')
    }
  },
)
</script>
