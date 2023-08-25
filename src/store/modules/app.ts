import { defineStore } from 'pinia'
import { store } from '../index'

interface AppState {
  userInfo: string
  breadcrumb: boolean
  collapse: boolean
  device: string
}

export const useAppStore = defineStore('app', {
  state: (): AppState => {
    return {
      userInfo: 'userInfo', // 登录信息存储字段-建议每个项目换一个字段，避免与其他项目冲突
      device: 'desktop', // 桌面端，移动端 mobile
      breadcrumb: true, // 面包屑
      collapse: false, // 折叠菜单
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
    }
  }
})

export const useAppStoreWithOut = () => {
  return useAppStore(store)
}
