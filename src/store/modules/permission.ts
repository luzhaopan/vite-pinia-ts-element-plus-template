import { defineStore } from 'pinia'
import { asyncRoutes } from '@/router'
import { generateRoutesFn2 } from '@/utils/authority'
import { store } from '../index'
import { cloneDeep } from 'lodash-es'

export interface PermissionState {
  addRouters: any[]
  isAddRouters: boolean
}

export const usePermissionStore = defineStore('permission', {
  state: (): PermissionState => ({
    addRouters: [],
    isAddRouters: false
  }),
  getters: {
    getAddRouters(): any[] {
      return this.addRouters
    },
    getIsAddRouters(): boolean {
      return this.isAddRouters
    }
  },
  actions: {
    generateRoutes(
      type: 'admin' | 'test' | 'none',
      routers?: any[] | string[]
    ): Promise<unknown> {
      return new Promise<void>((resolve) => {
        let routerMap: any[] = []
        if (type === 'admin') {
          // 模拟后端过滤菜单
          routerMap = generateRoutesFn2(routers as any[])
          
        } else {
          // 直接读取静态路由表
          routerMap = cloneDeep(asyncRoutes)
        }
        
        this.addRouters = routerMap
        resolve()
      })
    },
    setIsAddRouters(state: boolean): void {
      this.isAddRouters = state
    }
  }
})

export const usePermissionStoreWithOut = () => {
  return usePermissionStore(store)
}
