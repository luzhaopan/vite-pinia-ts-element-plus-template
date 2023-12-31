import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { Layout } from '@/utils/authority'

export const constantRoutes: AppRouteRecordRaw[]  = [
  {
    path: '/',
    component: Layout,
    name: 'Root',
    meta: { title: 'Home', icon: 'House', hidden: true, },
    redirect: '/home/index'
  },
  {
    path: '/login',
    name: 'login',
    meta: { title: 'Login', hidden: true, },
    component: () => import('@/views/login/index.vue')
  }
]

export const asyncRoutes: AppRouteRecordRaw[]  = [
  {
    path: '/home',
    name: 'Home',
    component: Layout,
    meta: { icon: 'Home' },
    redirect: '/Home/index',
    children: [
      {
        path: '/home/index',
        name: 'Home',
        component: () => import('@/views/home/index.vue'),
        meta: { title: 'Home', icon: 'House' }
      }
    ]
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Layout,
    meta: { icon: 'Odometer' },
    redirect: '/dashboard/index',
    children: [
      {
        path: '/dashboard/index',
        name: 'Analysis',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: 'Analysis', icon: 'Odometer' }
      }
    ]
  },
  {
    path: '/demo',
    name: 'Demo',
    component: Layout,
    meta: { title: 'Demo', icon: 'Fries' },
    children: [
      {
        path: '/demo/calendar',
        name: 'Calendar',
        component: () => import('@/views/demo/calendarDemo.vue'),
        meta: { title: 'Calendar', icon: 'SetUp' }
      },
      {
        path: '/demo/autoInput',
        name: 'AutoInput',
        component: () => import('@/views/demo/autoInput1.vue'),
        meta: { title: 'AutoInput', icon: 'ScaleToOriginal' }
      }
    ]
  },
  {
    path: '/echarts',
    name: 'Echarts',
    component: Layout,
    meta: { title: 'Echarts', icon: 'PieChart', roles: ['admin', 'visitor'] },
    children: [
      {
        path: '/echarts/barEcharts',
        name: 'BarEcharts',
        component: () => import('@/views/echarts/barEcharts.vue'),
        meta: { title: 'BarEcharts', icon: 'Chicken', roles: ['visitor'] }
      },
      {
        path: '/echarts/radarEcharts',
        name: 'RadarEcharts',
        component: () => import('@/views/echarts/radarEcharts.vue'),
        meta: { title: 'RadarEcharts', icon: 'Sunny', roles: ['admin'] }
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
