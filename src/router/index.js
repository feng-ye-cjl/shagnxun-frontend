import { createRouter, createWebHistory } from 'vue-router'
import Company from '@/views/Company/index.vue'
import Company2 from '@/views/Company2/index.vue'
import Company3 from '@/views/Company3/index.vue'
import Company4 from '@/views/Company4/index.vue'
import Company5 from '@/views/Company5/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name:'首页',
      component: Company
    },
    {
      path: '/company2',
      name:'消息',
      component: Company2
    },
    {
      path: '/company3',
      name:'页面',
      component: Company3
    },
    {
      path: '/company4',
      name:'事件',
      component: Company4
    },
    {
      path: '/company5',
      name:'跳转',
      component: Company5
    }
  ]
})

export default router
