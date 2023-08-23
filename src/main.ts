// import './assets/main.css'

import { createApp } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import '@/styles/index.scss'

import App from './App.vue'
import router from './router'
import { setupStore } from '@/store'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 引入状态管理
setupStore(app)

app.use(router)
app.mount('#app')
