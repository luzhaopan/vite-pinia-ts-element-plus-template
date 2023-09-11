import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import type { RouteRecordRaw } from 'vue-router'
import router from '@/router'
import { useCache } from '@/hooks/useStorage'
import { useAppStoreWithOut } from '@/store/modules/app'
import { usePermissionStoreWithOut } from '@/store/modules/permission'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const appStore = useAppStoreWithOut()
const permissionStore = usePermissionStoreWithOut()

const { useStorage } = useCache()

const whiteList = ['/login'] // 不重定向白名单

router.beforeEach(async (to, from, next) => {
  // 开启进度条
  NProgress.start()
  // 设置标题
  if (typeof to.meta.title === 'string') {
    document.title = to.meta.title || 'vite-admin-pro'
  }
  if (useStorage.get(appStore.getUserInfo)) {
    if (to.path === '/login') {
      // 如果已登录，请重定向到主页
      next({ path: '/' })
    } else {
      if (permissionStore.getIsAddRouters) {
        next()
        return
      }
     
      // 开发者可根据实际情况进行修改
      const roleRouters = useStorage.get('roleRouters') || []

      const userInfo = useStorage.get('userInfo')

      // 是否使用动态路由
      if (appStore.getDynamicRouter) {
        await permissionStore.generateRoutes('admin', roleRouters as AppRouteRecordRaw[])
      } else {
        if(userInfo.role === 'admin'){
          await permissionStore.generateRoutes('none')
        } else {
          // 前端过滤
          await permissionStore.generateRoutes('visitor')
        }
      }
      
      permissionStore.getAddRouters.forEach((route) => {
        router.addRoute(route as unknown as RouteRecordRaw) // 动态添加可访问路由表
      })
      
      const redirectPath = from.query.redirect || to.path
      const redirect = decodeURIComponent(redirectPath as string)
      const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect }
      // 是router.addRoute之后next()可能会失效，因为可能next()的时候路由并没有完全add完成,添加动态路由表完毕之后设置isAddRouters = true，然后路由跳转之前先去判断isAddRouters = true，路由放行；否则再次动态添加路由
      permissionStore.setIsAddRouters(true)

      next(nextData)
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
