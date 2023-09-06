import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout/index.vue'

export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    meta: { title: 'Dashboard', icon: 'Odometer' },
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: 'Dashboard', icon: 'Odometer' }
      }
    ]
  },
  // {
  //   path: '/echarts',
  //   name: 'Echarts',
  //   component: Layout,
  //   meta: { title: 'Echarts', icon: 'PieChart' },
  //   children: [
  //     {
  //       path: '/echarts/barEcharts',
  //       name: 'BarEcharts',
  //       component: () => import('@/views/echarts/barEcharts.vue'),
  //       meta: { title: 'BarEcharts' }
  //     },
  //     {
  //       path: '/echarts/radarEcharts',
  //       name: 'RadarEcharts',
  //       component: () => import('@/views/echarts/radarEcharts.vue'),
  //       meta: { title: 'RadarEcharts' }
  //     }
  //   ]
  // },
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: () => import('@/views/login/index.vue')
  }
]

export const asyncRoutes = [
  {
    path: '/timeline',
    component: Layout,
    children: [
      {
        path: '/timeline/index',
        name: 'Timeline',
        component: () => import('@/views/timeline/index.vue'),
        meta: { title: 'Timeline', icon: 'tab', permission: 1 }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  strict: true,
  routes: constantRoutes
})

export default router
