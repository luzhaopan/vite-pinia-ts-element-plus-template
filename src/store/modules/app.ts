import { defineStore } from 'pinia'
import { store } from '../index'

interface AppState {
  userInfo: string
  breadcrumb: boolean
  breadcrumbIcon: boolean
  collapse: boolean
  device: string
  footer: boolean
  title: string
}

export const useAppStore = defineStore('app', {
  state: (): AppState => {
    return {
      userInfo: 'userInfo', // 登录信息存储字段-建议每个项目换一个字段，避免与其他项目冲突
      device: 'desktop', // 桌面端，移动端 mobile
      title: import.meta.env.VITE_APP_TITLE, // 标题
      breadcrumb: true, // 面包屑
      breadcrumbIcon: true, // 面包屑图标
      collapse: false, // 折叠菜单
      footer: true // 显示页脚
    }
  },
  getters: {
    getBreadcrumb(): boolean {
      return this.breadcrumb
    },
    getBreadcrumbIcon(): boolean {
      return this.breadcrumbIcon
    },
    getCollapse(): boolean {
      return this.collapse
    },
    getDevice(): string {
      return this.device
    },
    getTitle(): string {
      return this.title
    },
    getUserInfo(): string {
      return this.userInfo
    },
    getFooter(): boolean {
      return this.footer
    }
  },
  actions: {
    setBreadcrumb(breadcrumb: boolean) {
      this.breadcrumb = breadcrumb
    },
    setBreadcrumbIcon(breadcrumbIcon: boolean) {
      this.breadcrumbIcon = breadcrumbIcon
    },
    setCollapse(collapse: boolean) {
      this.collapse = collapse
    },
    setTitle(title: string) {
      this.title = title
    },
    setDevice(device: string) {
      this.device = device
    },
    toggleDevice(device: string) {
      this.device = device
    },
    setFooter(footer: boolean) {
      this.footer = footer
    }
  }
})

export const useAppStoreWithOut = () => {
  return useAppStore(store)
}
