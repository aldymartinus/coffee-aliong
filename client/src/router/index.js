import { createRouter, createWebHashHistory } from 'vue-router'
import Menu from '../views/Menu.vue'

const routes = [
  {
    path: '/menu',
    name: 'Menu',
    component: Menu
  },
  {
    path: '/',
    name: 'Cashier',
    
    component: function () {
      return import('../views/Cashier.vue')
    }
  },
  {
    path: '/laporan',
    name: 'Analytics',
    
    component: function () {
      return import('../views/Analytics.vue')
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
