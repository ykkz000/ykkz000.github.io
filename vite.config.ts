import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import path from 'path'

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': path.join(__dirname, './src'),
    },
  },
  server: {
    port: 80/*,
    proxy: {
      '/api': {
        target: 'http://localhost:8000/api/v1',
        secure: false,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^/api/, '')
      }
    }*/
  }
})
