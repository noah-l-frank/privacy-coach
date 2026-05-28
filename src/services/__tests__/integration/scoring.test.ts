import { describe, expect, it } from 'vitest'
import { calculatePrivacyScore } from '../../scoring'
import type { DetectionResult } from '../../detection'

function createDetectionResult(overrides: Partial<DetectionResult> = {}): DetectionResult {
  return {
    browserFamily: 'firefox',
    browser: 'Firefox',
    os: 'Linux',
    gpc: true,
    cookiesEnabled: false,
    https: true,

    ...overrides,

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
      cookiesEnabled: false,
      firstPartyCookieWritable: false,
      sessionCookieWritable: false,
      persistentCookieWritable: false,

      ...overrides.cookieSettings,
    },
  }
}

describe('calculatePrivacyScore', () => {
  it('returns 100 for a privacy-friendly baseline result', () => {
    expect(calculatePrivacyScore(createDetectionResult())).toBe(100)
  })

  it('subtracts points for a chromium browser family', () => {
    expect(calculatePrivacyScore(createDetectionResult({ browserFamily: 'chromium' }))).toBe(85)
  })

  it('subtracts extra points for Google Chrome', () => {
    expect(
      calculatePrivacyScore(
        createDetectionResult({
          browserFamily: 'chromium',
          browser: 'Google Chrome',
        }),
      ),
    ).toBe(80)
  })

  it('subtracts points when https is disabled', () => {
    expect(calculatePrivacyScore(createDetectionResult({ https: false }))).toBe(75)
  })

  it('subtracts points when gpc is disabled', () => {
    expect(calculatePrivacyScore(createDetectionResult({ gpc: false }))).toBe(90)
  })

  it('subtracts points when cookies are enabled', () => {
    expect(calculatePrivacyScore(createDetectionResult({ cookiesEnabled: true }))).toBe(90)
  })

  it('combines all deductions correctly', () => {
    const result = createDetectionResult({
      browserFamily: 'chromium',
      browser: 'Google Chrome',
      https: false,
      gpc: false,
      cookiesEnabled: true,
    })

    expect(calculatePrivacyScore(result)).toBe(35)
  })

  it('never returns less than 0', () => {
    const result = createDetectionResult({
      browserFamily: 'chromium',
      browser: 'Google Chrome',
      https: false,
      gpc: false,
      cookiesEnabled: true,
    })

    expect(calculatePrivacyScore(result)).toBeGreaterThanOrEqual(0)
  })
})
