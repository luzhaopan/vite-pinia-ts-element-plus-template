// import './assets/main.css'

import { createApp } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css' // 按需引入的弹窗没有样式需单独引入

import '@/styles/index.scss'
import App from './App.vue'
import router from './router'
import { setupStore } from '@/store'
import '@/utils/permission'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 引入状态管理
setupStore(app)

app.use(router)
app.mount('#app')
