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
    adblock: true,
    ...overrides,
  }
}

describe('calculatePrivacyScore', () => {
  it('returns 100 for a privacy-friendly baseline result', () => {
    const result = createDetectionResult()

    expect(calculatePrivacyScore(result)).toBe(100)
  })

  it('subtracts points for a chromium browser family', () => {
    const result = createDetectionResult({
      browserFamily: 'chromium',
    })

    expect(calculatePrivacyScore(result)).toBe(85)
  })

  it('subtracts extra points for Google Chrome', () => {
    const result = createDetectionResult({
      browserFamily: 'chromium',
      browser: 'Google Chrome',
    })

    expect(calculatePrivacyScore(result)).toBe(80)
  })

  it('subtracts points when https is disabled', () => {
    const result = createDetectionResult({
      https: false,
    })

    expect(calculatePrivacyScore(result)).toBe(75)
  })

  it('subtracts points when dnt is disabled', () => {
    const result = createDetectionResult({
      dnt: false,
    })

    expect(calculatePrivacyScore(result)).toBe(90)
  })

  it('subtracts points when cookies are enabled', () => {
    const result = createDetectionResult({
      cookiesEnabled: true,
    })

    expect(calculatePrivacyScore(result)).toBe(90)
  })

  it('subtracts points when no adblocker is detected', () => {
    const result = createDetectionResult({
      adblock: false,
    })

    expect(calculatePrivacyScore(result)).toBe(85)
  })

  it('combines all deductions correctly', () => {
    const result = createDetectionResult({
      browserFamily: 'chromium',
      browser: 'Google Chrome',
      https: false,
      dnt: false,
      cookiesEnabled: true,
      adblock: false,
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
      adblock: false,
    })

    expect(calculatePrivacyScore(result)).toBeGreaterThanOrEqual(0)
  })
})
