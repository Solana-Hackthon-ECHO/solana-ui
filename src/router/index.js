import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    
    name: 'Home',
    component: () => import("@/views/Home"),
    meta: {
      title: 'ECHO'}
  },
  {
    path: '/create',
    name: 'create',
    component: () => import("@/views/create"),
    meta: {
      title: 'ECHO'}
  },
  {
    path: '/manage',
    name: 'manage',
    component: () => import("@/views/manage"),
    meta: {
      title: 'ECHO'}
  },
  {
    path: '/resume/:address',
    name: 'resume',
    component: () => import("@/views/resume"),
    meta: {
      title: 'ECHO'}
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
      document.title = to.meta.title
  }
  next();
})


export default router
