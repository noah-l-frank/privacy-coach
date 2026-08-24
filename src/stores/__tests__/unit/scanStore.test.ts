import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { detectEnvironment } from '../../../services/detection'
import type { DetectionResult } from '../../../services/detection'
import { useQuestionsStore } from '../../questionsStore'
import { useScanStore } from '../../scanStore'

vi.mock('../../../services/detection', () => ({
  detectEnvironment: vi.fn<() => Promise<DetectionResult>>(),
}))

function createDetectionResult(overrides: Partial<DetectionResult> = {}): DetectionResult {
  return {
    browser: 'firefox',
    browserFamily: 'firefox',
    os: 'linux',
    gpc: true,
    cookiesEnabled: true,
    https: true,
    fingerprintingExposure: {
      deviceMemory: false,
      hardwareConcurrency: false,
      webGl: false,
      canvas: false,
      audioContext: false,
      screen: false,
      timezone: false,
      languages: false,
      platform: false,
      touchSupport: false,
      ...overrides.fingerprintingExposure,
    },
    cookieSettings: {
      cookiesEnabled: true,
      firstPartyCookieWritable: true,
      sessionCookieWritable: true,
      persistentCookieWritable: true,
      ...overrides.cookieSettings,
    },
    ...overrides,
  }
}

describe('scan store', () => {
  beforeEach(() => {
    sessionStorage.clear()
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('initializes with a null result', () => {
    const scanStore = useScanStore()

    expect(scanStore.result).toBeNull()
  })

  it('stores the detection result', () => {
    const scanStore = useScanStore()
    const result = createDetectionResult({
      browser: 'chrome',
      browserFamily: 'chromium',
      gpc: false,
    })

    scanStore.setResult(result)

    expect(scanStore.result).toEqual(result)
    expect(JSON.parse(sessionStorage.getItem('privacy-coach.scan-result') ?? 'null')).toEqual(result)
  })

  it('initializes with a stored detection result', () => {
    const result = createDetectionResult({
      browser: 'chrome',
      browserFamily: 'chromium',
    })

    sessionStorage.setItem('privacy-coach.scan-result', JSON.stringify(result))
    setActivePinia(createPinia())

    const scanStore = useScanStore()

    expect(scanStore.result).toEqual(result)
  })

  it('runs the environment scan', async () => {
    const scanStore = useScanStore()
    const result = createDetectionResult()

    vi.mocked(detectEnvironment).mockResolvedValue(result)

    await scanStore.runScan()

    expect(detectEnvironment).toHaveBeenCalled()
    expect(scanStore.result).toEqual(result)
  })

  it('can reset answers before running a new scan', async () => {
    const scanStore = useScanStore()
    const questionsStore = useQuestionsStore()
    const result = createDetectionResult()

    questionsStore.setAnswer('privacy_preference', 'privacy')
    vi.mocked(detectEnvironment).mockResolvedValue(result)

    await scanStore.runScan({ resetAnswers: true })

    expect(questionsStore.answers).toEqual({})
    expect(scanStore.result).toEqual(result)
  })

  it('restarts the scan and resets question answers', async () => {
    const scanStore = useScanStore()
    const questionsStore = useQuestionsStore()

    questionsStore.setAnswer('vpn_usage', 'yes')

    const result = createDetectionResult()

    vi.mocked(detectEnvironment).mockResolvedValue(result)

    await scanStore.restartScan()

    expect(questionsStore.answers).toEqual({})
    expect(scanStore.result).toEqual(result)
    expect(sessionStorage.getItem('privacy-coach.answers')).toBeNull()
    expect(JSON.parse(sessionStorage.getItem('privacy-coach.scan-result') ?? 'null')).toEqual(result)
  })
})
