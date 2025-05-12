import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  base: '/test-vueStream-zapping/',
  plugins: [vue(), vueJsx(), vueDevTools()],
  server: {
    proxy: {
      '/api': {
        target: 'https://dev-alquinta.zappingtv.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/v1/web'),
        secure: false,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
