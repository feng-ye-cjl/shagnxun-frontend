import { createRouter, createWebHistory } from 'vue-router'
import Company from '@/views/Company/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Company
    }
  ]
})

export default router
