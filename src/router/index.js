import { createRouter, createWebHistory } from 'vue-router'
import Company from '@/views/Company/index.vue'
import Company2 from '@/views/Company2/index.vue'
import Company3 from '@/views/Company3/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Company,
    },
    {
      path: '/company2',
      component: Company2,
    },
    {
      path: '/company3',
      component: Company3,
    }
  ]
})

export default router
