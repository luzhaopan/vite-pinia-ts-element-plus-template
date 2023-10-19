import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0', //自定义主机名
    port: '8000', // 自定义端口
    open: true, // 自动在浏览器打开
    https: false, // 是否开启 https
    // 设置反向代理，跨域
    proxy: {
      '/api': {
        // 后台地址
        target: 'http://127.0.0.1:8000/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
