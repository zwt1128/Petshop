import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
  nitro:{},
  meta: {
    title: 'ElementPlus + Nuxt3',
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/bitbug_favicon.ico' }],
  },
  buildModules: [
    '@vueuse/core/nuxt',
    '@pinia/nuxt',
  ],
  css: [
    'assets/scss/index.scss',
    'assets/css/public/footer.scss'
  ],
  components: [
    '~/components/',
    // {
    //   path: 'node_modules/element-plus/lib/components/*/index.js',
    // }
  ],
  vite: {
    logLevel: 'info',
    base: '/',
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:8888",
          changeOrigin: true,
        }
      }
    }
  },
  privateRuntimeConfig: {
    API_BASE: 'http://localhost:8888'
  }
})
