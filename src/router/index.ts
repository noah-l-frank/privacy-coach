import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import ResultView from '@/views/ResultView.vue'
import QuestionsView from '@/views/QuestionsView.vue'
import ScanTransition from '@/views/ScanTransition.vue'
import DebugScanView from '@/views/DebugScanView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
    {
      path: '/debug/scan',
      name: 'debug-scan',
      component: DebugScanView,
    },
  ],
})

export default router
