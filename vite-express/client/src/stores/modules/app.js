import { defineStore } from 'pinia'
import { store } from '../index'

export const useAppStore = defineStore('app', {
  state: () => {
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
    getBreadcrumb() {
      return this.breadcrumb
    },
    getBreadcrumbIcon() {
      return this.breadcrumbIcon
    },
    getCollapse() {
      return this.collapse
    },
    getDevice() {
      return this.device
    },
    getTitle() {
      return this.title
    },
    getUserInfo() {
      return this.userInfo
    },
    getFooter() {
      return this.footer
    }
  },
  actions: {
    setBreadcrumb(breadcrumb) {
      this.breadcrumb = breadcrumb
    },
    setBreadcrumbIcon(breadcrumbIcon) {
      this.breadcrumbIcon = breadcrumbIcon
    },
    setCollapse(collapse) {
      this.collapse = collapse
    },
    setTitle(title) {
      this.title = title
    },
    setDevice(device) {
      this.device = device
    },
    toggleDevice(device) {
      this.device = device
    },
    setFooter(footer) {
      this.footer = footer
    }
  }
})

export const useAppStoreWithOut = () => {
  return useAppStore(store)
}
