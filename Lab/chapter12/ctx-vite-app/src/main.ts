import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import router from '@/popup/router/router.config.ts'
import popup from '@/popup.vue'

const app = createApp(popup)
app.use(ElementPlus, {
  //   locale: zhCn,
})
app.use(router)
app.mount('#app')
