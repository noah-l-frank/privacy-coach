import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useScanStore } from '../scanStore'

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
      gpc: false,
      cookiesEnabled: true,
      https: true,
    }

    scanStore.setResult(result)

    expect(scanStore.result).toEqual(result)
  })
})
