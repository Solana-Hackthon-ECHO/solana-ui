import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import("@/views/Home")
  },
  {
    path: '/create',
    name: 'create',
    component: () => import("@/views/create")
  },
  {
    path: '/manage',
    name: 'manage',
    component: () => import("@/views/manage")
  },
  {
    path: '/resume/:address',
    name: 'resume',
    component: () => import("@/views/resume")
  },
]

const router = new VueRouter({
  routes
})

export default router
