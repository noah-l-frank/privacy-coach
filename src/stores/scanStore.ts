import { defineStore } from 'pinia'

import { detectEnvironment } from '@/services/detection'

import { useQuestionsStore } from './questionsStore'
import {
  readSessionValue,
  removeSessionValue,
  writeSessionValue,
} from './sessionStorage'

import type { DetectionResult } from '@/services/detection'

const SCAN_RESULT_STORAGE_KEY = 'privacy-coach.scan-result'

export const useScanStore = defineStore('scan', {
  state: () => ({
    result: readSessionValue<DetectionResult | null>(SCAN_RESULT_STORAGE_KEY, null),
  }),

  actions: {
    setResult(result: DetectionResult) {
      this.result = result
      writeSessionValue(SCAN_RESULT_STORAGE_KEY, result)
    },

    clearResult() {
      this.result = null
      removeSessionValue(SCAN_RESULT_STORAGE_KEY)
    },

    async runScan(options: { resetAnswers?: boolean } = {}) {
      if (options.resetAnswers) {
        const questionsStore = useQuestionsStore()

        questionsStore.resetAnswers()
      }

      const result = await detectEnvironment()

      this.setResult(result)
    },

    async restartScan() {
      const questionsStore = useQuestionsStore()

      this.clearResult()
      questionsStore.resetAnswers()

      await this.runScan()
    },
  },
})
