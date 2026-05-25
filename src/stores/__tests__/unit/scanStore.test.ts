import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { detectEnvironment } from '../../../services/detection'
import { useQuestionsStore } from '../../questionsStore'
import { useScanStore } from '../../scanStore'

vi.mock('@/services/detection', () => ({
  detectEnvironment: vi.fn(),
}))

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

  it('runs the environment scan', () => {
    const scanStore = useScanStore()

    const result = {
      browser: 'firefox',
      browserFamily: 'firefox',
      os: 'linux',
      gpc: true,
      cookiesEnabled: true,
      https: true,
    }

    vi.mocked(detectEnvironment).mockReturnValue(result)

    scanStore.runScan()

    expect(detectEnvironment).toHaveBeenCalled()
    expect(scanStore.result).toEqual(result)
  })

  it('restarts the scan and resets question answers', () => {
    const scanStore = useScanStore()
    const questionsStore = useQuestionsStore()

    questionsStore.setAnswer('vpn_usage', 'yes')

    const result = {
      browser: 'firefox',
      browserFamily: 'firefox',
      os: 'linux',
      gpc: true,
      cookiesEnabled: true,
      https: true,
    }

    vi.mocked(detectEnvironment).mockReturnValue(result)

    scanStore.restartScan()

    expect(questionsStore.answers).toEqual({})
    expect(scanStore.result).toEqual(result)
  })
})
