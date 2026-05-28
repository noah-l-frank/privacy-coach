import { defineStore } from 'pinia'

import { detectEnvironment } from '@/services/detection'

import { useQuestionsStore } from './questionsStore'

import type { DetectionResult } from '@/services/detection'

export const useScanStore = defineStore('scan', {
  state: () => ({
    result: null as DetectionResult | null,
  }),

  actions: {
    setResult(result: DetectionResult) {
      this.result = result
    },

    async runScan() {
      const result = detectEnvironment()

      this.setResult(result)
    },

    async restartScan() {
      const questionsStore = useQuestionsStore()

      this.$reset()
      questionsStore.$reset()

      this.runScan()
    },
  },
})
