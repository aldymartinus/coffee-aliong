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
    path: '/arsip',
    name: 'Archive',
    
    component: function () {
      return import('../views/Archive.vue')
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
