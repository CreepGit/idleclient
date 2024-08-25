import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt','@primevue/nuxt-module','@nuxt/fonts','@vueuse/nuxt'],
  primevue: {
      options: {
          theme: {
              preset: Aura
          }
      }
  },
  css: ['/assets/main.scss','primeicons/primeicons.css'],
})
