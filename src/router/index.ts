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
    component: () => import('@/views/AboutView.vue')
  },
  {
    path: '/books',
    name: 'BookView',
    component: () => import('@/views/BookView.vue'),
    children: [
      {
        path: '/books/insert',
        name: 'book_insert',
        component: () => import('@/pages/Books/BookInsert.vue'),
      },
      {
        path: '/books/update',
        name: 'book_update',
        component: () => import('@/pages/Books/BookUpdate.vue'),
      },
    ]
  },
  {
    path: '/authors',
    name: 'AuthorView',
    component: () => import('@/views/AuthorView.vue'),
    children: [
      {
        path: '/author_insert',
        name: 'author_insert',
        component: () => import('@/pages/Authors/AuthorInsert.vue'),
      },
      {
        path: '/author_update',
        name: 'author_update',
        component: () => import('@/pages/Authors/AuthorUpdate.vue'),
      },
    ]
  },
  {
    path: '/loans',
    name: 'LoanView',
    component: () => import('@/views/LoanView.vue'),
    children: [
      {
        path: '/loan_insert',
        name: 'loan_insert',
        component: () => import('@/pages/Loans/LoanInsert.vue'),
      },
      {
        path: '/loan_update',
        name: 'loan_update',
        component: () => import('@/pages/Loans/LoanUpdate.vue'),
      },
    ]
  },
  {
    path: '/publishers',
    name: 'PublisherView',
    component: () => import('@/views/PublisherView.vue'),
    children: [
      {
        path: '/publisher_insert',
        name: 'publisher_insert',
        component: () => import('@/pages/Publishers/PublisherInsert.vue'),
      },
      {
        path: '/publisher_update',
        name: 'publisher_update',
        component: () => import('@/pages/Publishers/PublisherUpdate.vue'),
      },
    ]
  },
  {
    path: '/borrowers',
    name: 'BorrowerView',
    component: () => import('@/views/BorrowerView.vue'),
    children: [
      {
        path: '/borrower_insert',
        name: 'borrower_insert',
        component: () => import('@/pages/Borrowers/BorrowerInsert.vue'),
      },
      {
        path: '/borrower_update',
        name: 'borrower_update',
        component: () => import('@/pages/Borrowers/BorrowerUpdate.vue'),
      },
    ]
  },
  {
    path: '/:catchAll(.*)',
    name: "PageNotFound",
    component: () => import('@/components/PageNotFound.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
