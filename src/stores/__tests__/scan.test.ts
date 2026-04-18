import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useScanStore } from '../scan'

describe('scan store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('initializes with a null result', () => {
    const scanStore = useScanStore()

    expect(scanStore.result).toBeNull()
  })

  it('stores the detection result', () => {
    const scanStore = useScanStore()

    const result = {
      browser: 'chromium',
      browserFamily: 'chromium',
      os: 'linux',
      language: 'de-DE',
      timezone: 'Europe/Berlin',
      dnt: false,
      cookiesEnabled: true,
      https: true,
      adblock: false,
    }

    scanStore.setResult(result)

    expect(scanStore.result).toEqual(result)
  })
})
