import { createRouter, createWebHistory } from 'vue-router'
import routes from './router.ts'
// @ts-ignore
import { sessionKey, DataInfo } from '../utils/auth.ts'
import { getToken } from '@/utils/auth.ts'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 路由守卫
// @ts-ignore
router.beforeEach((to, from, next) => {
  // 在其他脚本中调用 getToken() 函数
  getToken()
    .then((sessionData: DataInfo<number>) => {
      // 处理成功获取到的 sessionData 数据
      console.log(sessionData)
      if (!sessionData) {
        if (to.path === '/login') {
          next()
          return
        } else {
          next('/login')
        }
      }
      next()
    })
    .catch((error: Error) => {
      // 处理获取数据失败的情况
      console.error('Error:', error.message)
      next('/login')
    })
})

export default router
