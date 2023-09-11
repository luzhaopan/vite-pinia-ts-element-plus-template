import { defineStore } from 'pinia'
import { asyncRoutes, constantRoutes } from '@/router'
import { generateRoutesFn1, generateRoutesFn2 } from '@/utils/authority'
import { store } from '../index'
import { cloneDeep } from 'lodash-es'

export interface PermissionState {
  addRouters: AppRouteRecordRaw[]
  isAddRouters: boolean
}

export const usePermissionStore = defineStore('permission', {
  state: (): PermissionState => ({
    addRouters: [],
    isAddRouters: false
  }),
  getters: {
    getAddRouters(): AppRouteRecordRaw[] {
      return this.addRouters
    },
    getIsAddRouters(): boolean {
      return this.isAddRouters
    }
  },
  actions: {
    generateRoutes(
      type: 'admin' | 'visitor' | 'none',
      routers?: AppRouteRecordRaw[] | string[]
    ): Promise<unknown> {
      return new Promise<void>((resolve) => {
        let routerMap: AppRouteRecordRaw[] = []
        if (type === 'admin') {
          // 模拟后端过滤菜单
          routerMap = generateRoutesFn2(routers as AppRouteRecordRaw[])
        } else if(type === 'visitor') {
          // 模拟前端静态路由表过滤
          routerMap = generateRoutesFn1(cloneDeep(asyncRoutes), [type])
        } else {
          // 直接读取静态路由表
          routerMap = cloneDeep(asyncRoutes)
        }
    
        this.addRouters = constantRoutes.concat(routerMap)
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
