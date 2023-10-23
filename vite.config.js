import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { viteMockServe } from "vite-plugin-mock";

// https://vitejs.dev/config/
const root = process.cwd()
export default defineConfig (({ command, mode }) => {
  const isBuild = command === 'build' // 保证开发阶段可以使用mock，生产环境禁止开启
  const env = loadEnv(mode, root)

  return {
    plugins: [
      vue(),
      vueJsx(),
      AutoImport({ // 匹配的文件，也就是哪些后缀的文件需要自动引入
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      // 配置mock
      viteMockServe({
        mockPath: "./mock",
        localEnabled: !isBuild, // 开发环境
        prodEnabled: isBuild // 生产环境
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "./src/styles/variables.scss";'
        }
      }
    },
    server: {
      host: '0.0.0.0', //自定义主机名
      port: env.VITE_PORT, // 自定义端口
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
  }
})
