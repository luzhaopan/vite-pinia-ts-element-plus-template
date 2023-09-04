import router from '@/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useAppStoreWithOut } from '@/store/modules/app'
import { useCache } from '@/hooks/useCache'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const appStore = useAppStoreWithOut()

const { wsCache } = useCache()

const whiteList = ['/login'] // 不重定向白名单

router.beforeEach(async (to, from, next) => {
  // 开启进度条
  NProgress.start()
  // 设置标题
  if (typeof to.meta.title === 'string') {
    document.title = to.meta.title || 'vite-admin-pro'
  }
  if (wsCache.get(appStore.getUserInfo)) {
    if (to.path === '/login') {
      // 如果已登录，请重定向到主页
      next({ path: '/' })
    } else {
      next()
      return
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
