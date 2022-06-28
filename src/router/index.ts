import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'HomeView',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/about',
    name: 'AboutView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/AboutView.vue')
  },
  {
    path: '/books',
    name: 'BookView',
    component: () => import('@/views/BookView.vue'),
    children: [
      {
        path: '/book_insert',
        name: 'book_insert',
        component: () => import('@/pages/Books/BookInsert.vue'),
      },
      {
        path: '/book_update',
        name: 'book_update',
        component: () => import('@/pages/Books/BookUpdate.vue'),
      },
      {
        path: '/book_delete',
        name: 'book_delete',
        component: () => import('@/pages/Books/BookDelete.vue'),
      },
    ]
  },
  {
    path: '/authors',
    name: 'AuthorView',
    component: () => import('@/views/AuthorView.vue')
  },
  {
    path: '/loans',
    name: 'LoanView',
    component: () => import('@/views/LoanView.vue')
  },
  {
    path: '/publishers',
    name: 'PublisherView',
    component: () => import('@/views/PublisherView.vue')
  },
  {
    path: '/borrowers',
    name: 'BorrowerView',
    component: () => import('@/views/BorrowerView.vue')
  },
  {
    path: '/:catchAll(.*)*',
    name: "PageNotFound",
    component: () => import('@/components/PageNotFound.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
