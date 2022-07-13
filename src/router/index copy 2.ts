import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'log-in',
    component: () => import('@/pages/Users/Log-In.vue'),
  },
  {
    path: '/log-out',
    name: 'log-out',
    component: () => import('@/pages/Users/Log-Out.vue'),
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: () => import('@/pages/Users/Sign-Up.vue'),
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('@/pages/Users/ForgotPassword.vue'),
  },
  {
    path: '/home',
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
        path: '/authors/insert',
        name: 'author_insert',
        component: () => import('@/pages/Authors/AuthorInsert.vue'),
      },
      {
        path: '/authors/update',
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
        path: '/loans/insert',
        name: 'loan_insert',
        component: () => import('@/pages/Loans/LoanInsert.vue'),
      },
      {
        path: '/loans/update',
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
        path: '/publishers/insert',
        name: 'publisher_insert',
        component: () => import('@/pages/Publishers/PublisherInsert.vue'),
      },
      {
        path: '/publishers/update',
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
        path: '/borrowers/insert',
        name: 'borrower_insert',
        component: () => import('@/pages/Borrowers/BorrowerInsert.vue'),
      },
      {
        path: '/borrowers/update',
        name: 'borrower_update',
        component: () => import('@/pages/Borrowers/BorrowerUpdate.vue'),
      },
    ]
  },
  {
    path: '/branches',
    name: 'BranchView',
    component: () => import('@/views/BranchView.vue'),
    children: [
      {
        path: '/branches/insert',
        name: 'branch_insert',
        component: () => import('@/pages/Branches/BranchInsert.vue'),
      },
      {
        path: '/branches/update',
        name: 'branch_update',
        component: () => import('@/pages/Branches/BranchUpdate.vue'),
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
