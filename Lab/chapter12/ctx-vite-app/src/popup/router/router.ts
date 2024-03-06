import { RouteRecordRaw } from 'vue-router'
import Entry from '@/popup/views/entry/entry.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/popup/views/login/login.vue'),
    meta: {
      title: '内容转音频-登录',
    },
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/popup/views/home/home.vue'),
    meta: {
      title: '内容转音频-主页',
    },
  },
  {
    path: '',
    redirect: '/home',
  },
  {
    path: '/',
    component: Entry,
    children: [{ path: '/:pathMatch(.*)', redirect: '/home' }],
  },
]
export default routes
