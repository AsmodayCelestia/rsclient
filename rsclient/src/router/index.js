import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../pages/HomeView.vue'
import LoginView from "../pages/LoginView.vue"
import DetailView from '../pages/DetailView.vue'
import BookMark from '../pages/BookMark.vue'
import Register from '../pages/RegisterView.vue'
import AddPatient from '../pages/AddPatient.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: DetailView
    },
    {
      path: '/bookmark',
      name: 'bookmark',
      component: BookMark
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/addPatient',
      name: 'addPatient',
      component: AddPatient
    },
  ]
})

router.beforeEach((to, from, next) =>{
  if(to.path === "/login" && localStorage.access_token)
    next({path: "/home"})
  else next()
})

export default router
