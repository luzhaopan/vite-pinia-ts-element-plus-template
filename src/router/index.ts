import { createRouter, createWebHashHistory } from 'vue-router'
// import Layout from '@/layout/index.vue'
// import EmptyLayout from '@/layout/components/EmptyLayout.vue'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('@/views/dashboard/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    // hidden: true,
    component: () => import('@/views/login/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

export default router
