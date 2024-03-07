import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './router.ts'
const options_router = createRouter({
  history: createWebHashHistory(),
  routes,
})
export default options_router
