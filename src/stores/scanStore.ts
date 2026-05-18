import { defineStore } from 'pinia'
import { detectEnvironment } from '@/services/detection'
import type { DetectionResult } from '@/services/detection'

export const useScanStore = defineStore('scan', {
  state: () => ({
    result: null as DetectionResult | null,
  }),

  actions: {
    setResult(result: DetectionResult) {
      this.result = result
    },

    runScan() {
      const result = detectEnvironment()
      this.setResult(result)
    },
  },
})
