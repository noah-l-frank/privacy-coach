import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import ResultView from '@/views/ResultView.vue'
import QuestionsView from '@/views/QuestionsView.vue'
import ScanTransition from '@/views/ScanTransition.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/results',
    name: 'results',
    component: ResultView,
  },
  {
    path: '/questions',
    name: 'questions',
    component: QuestionsView,
  },
  {
    path: '/scan',
    name: 'scan-transition',
    component: ScanTransition,
  },
]

if (import.meta.env.DEV || import.meta.env.VITE_ENABLE_DEBUG_ROUTES === 'true') {
  routes.push({
    path: '/debug/scan',
    name: 'debug-scan',
    component: () => import('@/views/DebugScanView.vue'),
  })
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
