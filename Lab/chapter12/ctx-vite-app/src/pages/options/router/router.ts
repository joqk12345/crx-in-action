import { RouteRecordRaw } from 'vue-router'
import SettingsComponent from '@/pages/options/components/SettingsComponent.vue'
import InformationComponent from '@/pages/options/components/InformationComponent.vue'
import PriceComponent from '@/pages/options/components/PriceComponent.vue'
import AboutComponent from '@/pages/options/components/AboutComponent.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: SettingsComponent },
  { path: '/settings', component: SettingsComponent },
  { path: '/information', component: InformationComponent },
  { path: '/price', component: PriceComponent },
  { path: '/about', component: AboutComponent },
]

export default routes
