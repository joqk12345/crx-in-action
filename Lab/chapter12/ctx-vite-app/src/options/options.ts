import { createApp } from 'vue'
import Options from '@/pages/options/options.vue'
import OptionsRouter from '@/pages/options/router/router.config'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

createApp(Options)
  .use(ElementPlus, { locale: zhCn })
  .use(OptionsRouter)
  .mount('#app')
