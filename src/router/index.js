import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/dashBoard',
    component: () => import('../views/dashBoard.vue'),
    children: [
      {
        path: 'products',
        name: 'products',
        component: () => import('../views/productsView.vue')
      },
      {
        path: 'orderList',
        name: 'orderList',
        component: () => import('../views/OrderList.vue')
      },
      {
        path: 'coupon',
        name: 'coupon',
        component: () => import('../views/CouponList.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
