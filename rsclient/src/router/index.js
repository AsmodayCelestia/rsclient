import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../pages/HomeView.vue'
import LoginView from "../pages/LoginView.vue"
import DetailView from '../pages/DetailView.vue'
import BookMark from '../pages/BookMark.vue'
import Register from '../pages/RegisterView.vue'
import AddPatient from '../pages/AddReward.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/admin',
      name: 'AdminDashboard',
      component: () => import('../pages/AdminDashboard.vue'),
      meta: { requiresAuth: true, role: 'admin' }
    },  
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true, role: 'karyawan' }
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
      path: '/addReward',
      name: 'addReward',
      component: AddPatient
    },
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('Authorization');
  const role = localStorage.getItem('role');

  // 1. Kalau belum login dan mau ke halaman yg perlu auth
  if (to.meta.requiresAuth && !token) {
    return next('/login');
  }

  // 2. Kalau sudah login tapi role tidak sesuai dengan route yang diminta
  if (to.meta.role && role !== to.meta.role) {
    // Redirect berdasarkan role yang dia miliki
    if (role === 'admin') return next('/admin');
    if (role === 'karyawan') return next('/home');
    return next('/login'); // fallback
  }

  // 3. Kalau udah login dan masuk ke halaman login, lempar sesuai role
  if (to.path === '/login' && token) {
    if (role === 'admin') return next('/admin');
    if (role === 'karyawan') return next('/home');
  }

  // 4. Aman, lanjut
  next();
});


export default router
