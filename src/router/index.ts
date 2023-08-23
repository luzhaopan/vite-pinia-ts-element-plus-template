import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout/index.vue'

const routes = [
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
  {
    path: '/echarts',
    name: 'Echarts',
    component: Layout,
    meta: { title: 'Echarts', icon: 'Present' },
    children: [
      {
        path: '/echarts/barEcharts',
        name: 'BarEcharts',
        component: () => import('@/views/echarts/barEcharts/index.vue'),
        meta: { title: 'BarEcharts' }
      },
      {
        path: '/echarts/radarEcharts',
        name: 'RadarEcharts',
        component: () => import('@/views/echarts/radarEcharts/index.vue'),
        meta: { title: 'RadarEcharts' }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: () => import('@/views/login/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

export default router
