import { fileURLToPath, URL } from 'node:url'
import type { UserConfig, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { viteMockServe } from 'vite-plugin-mock'


// https://vitejs.dev/config/
export default ({ command }: ConfigEnv): UserConfig => {
  const isBuild = command === 'build' // 保证开发阶段可以使用mock，生产环境禁止开启
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
      },
      extensions: ['.js', '.json', '.ts', '.vue'] // 使用路径别名时想要省略的后缀名，可以自己 增减
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "./src/styles/variables.scss";'
        }
      }
    },
    // 配置前端服务地址和端口
    server: {
      host: '0.0.0.0',//自定义主机名
      port: 8000,//自定义端口
      // 是否开启 https
      https: false,
    },
    // 设置反向代理，跨域
    // proxy: {
    // 	'/api': {
    // 		// 后台地址
    // 		target: 'http://127.0.0.1:8000/',
    // 		changeOrigin: true,
    // 		rewrite: path => path.replace(/^\/api/, '')
    // 	}
  }
}
