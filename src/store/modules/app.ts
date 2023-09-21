import { defineStore } from 'pinia'
import { store } from '../index'
import { useCache } from '@/hooks/useStorage'
interface AppState {
  userInfo: string
  breadcrumb: boolean
  collapse: boolean
  device: string
  dynamicRouter: boolean
  mobile: boolean
  layout: LayoutType
}

const { useStorage } = useCache()

export const useAppStore = defineStore('app', {
  state: (): AppState => {
    return {
      userInfo: 'userInfo', // 登录信息存储字段-建议每个项目换一个字段，避免与其他项目冲突
      device: 'desktop', // 桌面端，移动端 mobile
      breadcrumb: true, // 面包屑
      collapse: false, // 折叠菜单
      dynamicRouter:  false, // 是否动态路由
      mobile: false, // 是否是移动端
      layout: useStorage.get('layout') || 'sidemenu' // layout布局
      // layout: useStorage.get('layout') || 'topmenu' 
    }
  },
  getters: {
    getBreadcrumb(): boolean {
      return this.breadcrumb
    },
    getCollapse(): boolean {
      return this.collapse
    },
    getDevice(): string {
      return this.device
    },
    getUserInfo(): string {
      return this.userInfo
    },
    getDynamicRouter(): boolean {
      return this.dynamicRouter
    },
    getMobile(): boolean {
      return this.mobile
    },
    getLayout(): LayoutType {
      return this.layout
    }
  },
  actions: {
    setBreadcrumb(breadcrumb: boolean) {
      this.breadcrumb = breadcrumb
    },
    setCollapse(collapse: boolean) {
      this.collapse = collapse
    },
    setDevice(device: string) {
      this.device = device
    },
    toggleDevice(device: string) {
      this.device = device
    },
    setDynamicRouter(dynamicRouter: boolean) {
      useStorage.set('dynamicRouter', dynamicRouter)
      this.dynamicRouter = dynamicRouter
    },
    setMobile(mobile: boolean) {
      this.mobile = mobile
    },
    setLayout(layout: LayoutType) {
      if (this.mobile && layout !== 'sidemenu') {
        // ElMessage.warning('移动端模式下不支持切换其它布局')
        return
      }
      this.layout = layout
      useStorage.set('layout', this.layout)
    },
  }
})

export const useAppStoreWithOut = () => {
  return useAppStore(store)
}
