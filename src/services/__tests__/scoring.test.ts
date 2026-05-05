import { describe, expect, it } from 'vitest'
import { calculatePrivacyScore } from '../scoring'
import type { DetectionResult } from '../detection'

function createDetectionResult(overrides: Partial<DetectionResult> = {}): DetectionResult {
  return {
    browserFamily: 'firefox',
    browser: 'Firefox',
    os: 'Linux',
    language: 'en-US',
    timezone: 'Europe/Berlin',
    dnt: true,
    cookiesEnabled: false,
    https: true,
    ...overrides,
  }
}

describe('calculatePrivacyScore', () => {
  it('returns 85 for a privacy-friendly baseline result', () => {
    expect(calculatePrivacyScore(createDetectionResult())).toBe(85)
  })

  it('subtracts points for a chromium browser family', () => {
    expect(calculatePrivacyScore(createDetectionResult({ browserFamily: 'chromium' }))).toBe(70)
  })

  it('subtracts extra points for Google Chrome', () => {
    expect(
      calculatePrivacyScore(
        createDetectionResult({
          browserFamily: 'chromium',
          browser: 'Google Chrome',
        }),
      ),
    ).toBe(65)
  })

  it('subtracts points when https is disabled', () => {
    expect(calculatePrivacyScore(createDetectionResult({ https: false }))).toBe(60)
  })

  it('subtracts points when dnt is disabled', () => {
    expect(calculatePrivacyScore(createDetectionResult({ dnt: false }))).toBe(75)
  })

  it('subtracts points when cookies are enabled', () => {
    expect(calculatePrivacyScore(createDetectionResult({ cookiesEnabled: true }))).toBe(75)
  })

  it('subtracts points when no adblocker is detected', () => {
    expect(calculatePrivacyScore(createDetectionResult())).toBe(85)
  })

  it('combines all deductions correctly', () => {
    const result = createDetectionResult({
      browserFamily: 'chromium',
      browser: 'Google Chrome',
      https: false,
      dnt: false,
      cookiesEnabled: true,
    })

    expect(calculatePrivacyScore(result)).toBe(20)
  })

  it('never returns less than 0', () => {
    const result = createDetectionResult({
      browserFamily: 'chromium',
      browser: 'Google Chrome',
      https: false,
      dnt: false,
      cookiesEnabled: true,
    })

    expect(calculatePrivacyScore(result)).toBeGreaterThanOrEqual(0)
  })
})
