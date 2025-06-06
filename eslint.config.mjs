// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt().override('nuxt/typescript', {
  rules: {
    // turn off nuxt.confing.ts error
    'nuxt/nuxt-config-keys-order': 'off',
  },
})
