import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxt/test-utils',
    '@nuxt/scripts',
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxt/eslint',
    '@pinia/nuxt',
    'nuxt-gtag',
  ],

  devtools: { enabled: true },

  icon: {
    serverBundle: 'remote',
  },

  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/png', href: '/logo.png' }],
    },
  },

  gtag: {
    enabled: import.meta.env.MODE === 'production',
    id: 'G-F72V5D6Q4H',
  },

  css: ['~/assets/css/main.scss', '~/assets/css/tailwind.css'],

  ui: {
    colorMode: false,
  },

  compatibilityDate: '2025-05-15',

  vite: {
    plugins: [tailwindcss()],
    // 解決切換頁面 svg 抓不到
    assetsInclude: ['**/*.svg'],
  },

  typescript: {
    typeCheck: true,
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  routeRules: {
    // admin 下的所有頁面不做 SSR
    '/admin/**': { ssr: false },
  },
})
