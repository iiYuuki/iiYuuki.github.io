import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Client',
    component: () => import('../views/Client.vue'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('../views/Home.vue')
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue')
      },
      {
        path: '/test',
        name: 'Test',
        component: () => import('../views/test.vue')
      },
      {
        path: '/article/:id',
        component: () => import('../views/Article.vue'),
        props: true
      }
    ]
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/Admin.vue'),
    redirect: '/admin/user',
    children: [
      {
        path: '/admin/user',
        name: 'UserManagement',
        component: () => import('../components/Admin/UserManagement.vue')
      },
      {
        path: '/admin/article',
        name: 'ArticleManagement',
        component: () => import('../components/Admin/ArticleManagement.vue')
      }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('../views/404Error.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
