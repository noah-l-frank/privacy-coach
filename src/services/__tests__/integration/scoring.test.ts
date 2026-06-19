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

  it('subtracts cookie points when maximum privacy users likely allow third-party cookies', () => {
    expect(
      calculatePrivacyScore(
        createDetectionResult({
          cookiesEnabled: true,
          cookieSettings: {
            cookiesEnabled: true,
            firstPartyCookieWritable: true,
            sessionCookieWritable: true,
            persistentCookieWritable: true,
            thirdPartyCookieStatus: 'likely-allowed',
          },
        }),
        { answers: { privacy_preference: 'maximum_privacy' } },
      ),
    ).toBe(90)
  })

  it('does not subtract cookie points below maximum privacy', () => {
    expect(
      calculatePrivacyScore(
        createDetectionResult({
          cookiesEnabled: true,
          cookieSettings: {
            cookiesEnabled: true,
            firstPartyCookieWritable: true,
            sessionCookieWritable: true,
            persistentCookieWritable: true,
            thirdPartyCookieStatus: 'likely-allowed',
          },
        }),
        { answers: { privacy_preference: 'privacy' } },
      ),
    ).toBe(100)
  })

  it('does not subtract cookie points when only first-party cookies are writable', () => {
    expect(
      calculatePrivacyScore(
        createDetectionResult({
          cookieSettings: {
            cookiesEnabled: true,
            firstPartyCookieWritable: true,
            sessionCookieWritable: true,
            persistentCookieWritable: true,
            thirdPartyCookieStatus: 'likely-blocked',
          },
        }),
        { answers: { privacy_preference: 'maximum_privacy' } },
      ),
    ).toBe(100)
  })

  it('subtracts points for medium fingerprinting exposure', () => {
    expect(
      calculatePrivacyScore(
        createDetectionResult({
          fingerprintingExposure: {
            deviceMemory: true,
            hardwareConcurrency: true,
            webGl: true,
            canvas: true,
            audioContext: false,
            screen: false,
            timezone: false,
            languages: false,
            platform: false,
            touchSupport: false,
          },
        }),
        { answers: { privacy_preference: 'maximum_privacy' } },
      ),
    ).toBe(94)
  })

  it('subtracts points for high fingerprinting exposure', () => {
    expect(
      calculatePrivacyScore(
        createDetectionResult({
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
        }),
        { answers: { privacy_preference: 'maximum_privacy' } },
      ),
    ).toBe(88)
  })

  it('subtracts fingerprinting points for balanced users', () => {
    expect(
      calculatePrivacyScore(
        createDetectionResult({
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
        }),
        { answers: { privacy_preference: 'balanced' } },
      ),
    ).toBe(88)
  })

  it('does not subtract fingerprinting points for convenience users', () => {
    expect(
      calculatePrivacyScore(
        createDetectionResult({
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
        }),
        { answers: { privacy_preference: 'convenience' } },
      ),
    ).toBe(100)
  })

  it('combines deductions correctly for chrome + https off + gpc off + cookies enabled', () => {
    const result = createDetectionResult({
      browser: 'chrome',
      browserFamily: 'chromium',
      https: false,
      gpc: false,
      cookiesEnabled: true,
      cookieSettings: {
        cookiesEnabled: true,
        firstPartyCookieWritable: true,
        sessionCookieWritable: true,
        persistentCookieWritable: true,
        thirdPartyCookieStatus: 'likely-allowed',
      },
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
    })

    expect(
      calculatePrivacyScore(result, {
        answers: { privacy_preference: 'maximum_privacy' },
      }),
    ).toBe(28)
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
