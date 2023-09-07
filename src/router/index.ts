import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { Layout } from '@/utils/authority'

export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    name: 'Root',
    hidden: true,
    meta: { title: 'Dashboard', icon: 'Odometer' },
    redirect: '/dashboard/index',
    // children: [
    //   {
    //     path: '/dashboard',
    //     name: 'Dashboard',
    //     component: () => import('@/views/dashboard/index.vue'),
    //     meta: { title: 'Dashboard', icon: 'Odometer' }
    //   }
    // ]
  },
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: () => import('@/views/login/index.vue')
  }
]

export const asyncRoutes = [
  {
    path: '/dashboard',
    component: Layout,
    meta: { title: 'Dashboard', icon: 'Odometer' },
    redirect: '/dashboard/index',
    children: [
      {
        path: '/dashboard/index',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: 'Dashboard', icon: 'Odometer' }
      }
    ]
  },
  {
    path: '/echarts',
    name: 'Echarts',
    component: Layout,
    meta: { title: 'Echarts', icon: 'PieChart' },
    children: [
      {
        path: '/echarts/barEcharts',
        name: 'BarEcharts',
        component: () => import('@/views/echarts/barEcharts.vue'),
        meta: { title: 'BarEcharts' }
      }
    ]
  },
  {
    path: '/timeline',
    component: Layout,
    children: [
      {
        path: '/timeline/index',
        name: 'Timeline',
        component: () => import('@/views/timeline/index.vue'),
        meta: { title: 'Timeline', icon: 'Timer' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  strict: true,
  routes: constantRoutes as RouteRecordRaw[]
})

export const resetRouter = (): void => {
  const resetWhiteNameList = ['login']
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !resetWhiteNameList.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export default router
