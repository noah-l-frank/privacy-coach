import { describe, expect, it } from 'vitest'
import {
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
})
