// import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',

  modules: [
    '@nuxt/content',
    '@nuxt/ui',
    '@nuxt/test-utils',
    '@nuxt/scripts',
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxt/eslint',
  ],
  devtools: { enabled: true },

  typescript: {
    typeCheck: true,
  },

  css: ['~/assets/css/main.css'],

  eslint: {
    config: {
      stylistic: true,
    },
  },

  ui: {
    // Disable font loading
    fonts: false,
  },
})
