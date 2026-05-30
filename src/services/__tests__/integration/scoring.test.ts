import { describe, expect, it } from 'vitest'
import { calculatePrivacyScore } from '../../scoring'
import type { DetectionResult } from '../../detection'

function createDetectionResult(overrides: Partial<DetectionResult> = {}): DetectionResult {
  return {
    browserFamily: 'firefox',
    browser: 'firefox',
    os: 'linux',
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
  it('returns 100 for a privacy-friendly firefox baseline', () => {
    expect(calculatePrivacyScore(createDetectionResult())).toBe(100)
  })

  it('subtracts 15 points for Google Chrome', () => {
    expect(calculatePrivacyScore(createDetectionResult({ browser: 'chrome', browserFamily: 'chromium' }))).toBe(85)
  })

  it('subtracts 12 points for Opera', () => {
    expect(calculatePrivacyScore(createDetectionResult({ browser: 'opera', browserFamily: 'chromium' }))).toBe(88)
  })

  it('subtracts 10 points for Microsoft Edge', () => {
    expect(calculatePrivacyScore(createDetectionResult({ browser: 'edge', browserFamily: 'chromium' }))).toBe(90)
  })

  it('subtracts 5 points for Brave', () => {
    expect(calculatePrivacyScore(createDetectionResult({ browser: 'brave', browserFamily: 'chromium' }))).toBe(95)
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

  it('combines deductions correctly for chrome + https off + gpc off + cookies enabled', () => {
    const result = createDetectionResult({
      browser: 'chrome',
      browserFamily: 'chromium',
      https: false,
      gpc: false,
      cookiesEnabled: true,
    })

    expect(calculatePrivacyScore(result)).toBe(40)
  })

  it('never returns less than 0', () => {
    const result = createDetectionResult({
      browser: 'chrome',
      browserFamily: 'chromium',
      https: false,
      gpc: false,
      cookiesEnabled: true,
    })

    expect(calculatePrivacyScore(result)).toBeGreaterThanOrEqual(0)
  })
})
