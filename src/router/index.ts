import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
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
    component: () => import(/* webpackChunkName: "about" */ '@/views/AboutView.vue')
  },
  {
    path: '/books',
    name: 'books',
    component: () => import('@/views/BooksView.vue'),
    children: [
      {
        path: 'book_list',
        name: 'book_list',
        component: () => import('@/Pages/Books/BookList.vue'),
      },
      {
        path: 'book_insert',
        name: 'book_insert',
        component: () => import('@/Pages/Books/BookInsert.vue'),
      },
      {
        path: 'book_update',
        name: 'book_update',
        component: () => import('@/Pages/Books/BookUpdate.vue'),
      },
      {
        path: 'book_delete',
        name: 'book_delete',
        component: () => import('@/Pages/Books/BookDelete.vue'),
      },
    ]
  },
  {
    path: '/authors',
    name: 'authors',
    component: () => import('@/views/AuthorsView.vue')
  },
  {
    path: '/loans',
    name: 'loans',
    component: () => import('@/views/LoansView.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
