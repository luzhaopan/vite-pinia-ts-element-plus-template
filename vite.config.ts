import { fileURLToPath, URL } from 'node:url'
import { UserConfig, ConfigEnv, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
const root = process.cwd()
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const isBuild = command === 'build' // 保证开发阶段可以使用mock，生产环境禁止开启
  const env = loadEnv(mode, root) as any
  
  return {
    plugins: [
      vue(),
      vueJsx(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      viteMockServe({
        mockPath: 'mock', // 解析根目录下的mock文件夹
        localEnabled: !isBuild, // 开发环境
        prodEnabled: isBuild, // 生产环境
        injectCode: `
        import { setupProdMockServer } from '../mock/_createProductionServer'

        setupProdMockServer()
        `
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    // 全局变量+全局引入sass
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "./src/styles/variables.scss";'
        }
      }
    },
    // 配置前端服务地址和端口
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
          rewrite: (path: string) => path.replace(/^\/api/, '')
        }
      }
    }
  }
}
