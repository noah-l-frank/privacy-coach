import { describe, expect, it } from 'vitest'
import {
  getPositiveScoreFactors,
  getScoreDeductions,
} from '../../../scoring'
import type { DetectionResult } from '../../../detection'

function createDetectionResult(overrides: Partial<DetectionResult> = {}): DetectionResult {
  return {
    browserFamily: 'firefox',
    browser: 'firefox',
    os: 'linux',
    gpc: true,
    cookiesEnabled: false,
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
      cookiesEnabled: false,
      firstPartyCookieWritable: false,
      sessionCookieWritable: false,
      persistentCookieWritable: false,
      ...overrides.cookieSettings,
    },
    ...overrides,
  }
}

describe('score breakdown', () => {
  it('returns score deductions with user-facing explanations', () => {
    const deductions = getScoreDeductions(createDetectionResult({
      browser: 'chrome',
      browserFamily: 'chromium',
      gpc: false,
      cookiesEnabled: true,
    }))

    expect(deductions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 'google-chrome',
          title: 'Google Chrome detected',
          penalty: 15,
        }),
        expect.objectContaining({
          id: 'gpc-disabled',
          title: 'Global Privacy Control is disabled',
          penalty: 10,
        }),
        expect.objectContaining({
          id: 'cookies-enabled',
          title: 'Cookies are enabled',
          penalty: 10,
        }),
      ]),
    )
  })

  it('returns positive score factors for privacy-friendly signals', () => {
    const factors = getPositiveScoreFactors(createDetectionResult())

    expect(factors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 'https-enabled',
          title: 'HTTPS is enabled',
        }),
        expect.objectContaining({
          id: 'gpc-enabled',
          title: 'Global Privacy Control is enabled',
        }),
        expect.objectContaining({
          id: 'persistent-cookies-limited',
          title: 'Persistent cookies are limited',
        }),
        expect.objectContaining({
          id: 'fingerprinting-exposure-limited',
          title: 'Fingerprinting exposure is limited',
        }),
      ]),
    )
  })

  it('does not return positive fingerprinting factor for high exposure', () => {
    const factors = getPositiveScoreFactors(createDetectionResult({
      fingerprintingExposure: {
        deviceMemory: true,
        hardwareConcurrency: true,
        webGl: true,
        canvas: true,
        audioContext: true,
        screen: true,
        timezone: true,
        languages: false,
        platform: false,
        touchSupport: false,
      },
    }))

    expect(factors).not.toContainEqual(
      expect.objectContaining({
        id: 'fingerprinting-exposure-limited',
      }),
    )
  })
})
