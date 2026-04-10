import { defineStore } from 'pinia'
import type { DetectionResult } from '@/services/detection'

export const useScanStore = defineStore('scan', {
  state: () => ({
    result: null as DetectionResult | null,
  }),
  actions: {
    setResult(result: DetectionResult) {
      this.result = result
    },
  },
})
