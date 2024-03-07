import { createRouter, createWebHistory } from 'vue-router'
import routes from './router.ts'
//@ts-ignore
import { sessionKey } from '../utils/auth.ts'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 路由守卫
//@ts-ignore
// router.beforeEach((to, from, next) => {
//   // 判断用户是否登录
//   const userInfo = localStorage.getItem(sessionKey)
//   if (!userInfo) {
//     if (to.path === '/login') {
//       next()
//       return
//     } else {
//       next('/login')
//     }
//   } else {
//     next()
//   }
// })

export default router
