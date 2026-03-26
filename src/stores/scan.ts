import { defineStore } from 'pinia'

type DetectionResult = {
  browser: string
  os: string
  language: string
  timezone: string
  dnt: boolean
  cookiesEnabled: boolean
  https: boolean
  adblock: boolean
}

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
