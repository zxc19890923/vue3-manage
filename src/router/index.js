import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  // 如果沒有找到路由，重定向到首頁
  {
    path: '/',
    redirect: '/user/user-list'
  },
  {
    path: '/user',
    name: 'user',
    redirect: '/user/user-list',
    component: () => import('../views/user/User.vue'),
    children: [
      {
        path: '/user/user-list',
        name: 'UserList',
        component: () => import('../views/user/UserList.vue')
      }
    ]
  },
  {
    path: '/case',
    name: 'case',
    redirect: '/case/case-list',
    component: () => import('../views/case/Case.vue'),
    children: [
      {
        path: 'evidence-list',
        name: 'evidenceList',
        component: () => import('../views/case/EvidenceList.vue')
      },
      {
        path: 'case-list',
        name: 'caseList',
        component: () => import('../views/case/CaseList.vue')
      },
      // {
      //   path: 'case-detail/:id',
      //   name: 'caseDetail',
      //   component: () => import('../views/case/CaseDetail.vue')
      // }
    ]
  },
  {
    path: '/test',
    name: 'test',
    redirect: '/test/test-list',
    component: () => import('../views/test/Test.vue'),
    children: [
      {
        path: 'test-list',
        name: 'TestList',
        component: () => import('../views/test/TestList.vue')
      }
    ]
  }
]
const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})
export default router
