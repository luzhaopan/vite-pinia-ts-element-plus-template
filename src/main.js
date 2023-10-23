import { createApp } from 'vue'
import '@/styles/index.scss'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css' // 按需引入的弹窗没有样式需单独引入
import App from '@/App.vue'
import router from '@/router'
import { setupStore } from '@/stores'
import './permission'

const app = createApp(App)

// 需要从 @element-plus/icons-vue 中导入所有图标并进行全局注册。
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(setupStore)
app.use(router)

app.mount('#app')
