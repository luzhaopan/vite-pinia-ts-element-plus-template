import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/index.vue'

const routes = [
  {
    path: '/',
    component: Layout,
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
    path: '/demo',
    name: 'Demo',
    component: Layout,
    meta: { title: 'Demo', icon: 'Odometer' },
    children: [
      {
        path: '/demo/baseTable',
        name: 'BaseTable',
        component: () => import('@/views/demo/baseTable.vue'),
        meta: { title: 'Dashboard', icon: 'Bicycle' }
      },
      {
        path: '/demo/aboutView',
        name: 'About',
        component: () => import('@/views/demo/aboutView.vue'),
        meta: { title: 'About', icon: 'Connection' }
      }
    ]
  },
  {
    path: '/login',
    hidden: true,
    component: () => import('@/views/login/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
