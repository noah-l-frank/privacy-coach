import { describe, expect, it } from 'vitest'
import { scoringRules } from '../../../scoring/scoringRules'
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

function getRule(id: string) {
  const rule = scoringRules.find((rule) => rule.id === id)

  if (!rule) {
    throw new Error(`Rule not found: ${id}`)
  }

  return rule
}

describe('scoringRules', () => {
  it('applies brave penalty', () => {
    const rule = getRule('brave')

    expect(rule.applies(createDetectionResult({ browser: 'brave' }))).toBe(true)
    expect(rule.applies(createDetectionResult({ browser: 'firefox' }))).toBe(false)
  })

  it('applies microsoft edge penalty', () => {
    const rule = getRule('microsoft-edge')

    expect(rule.applies(createDetectionResult({ browser: 'edge' }))).toBe(true)
    expect(rule.applies(createDetectionResult({ browser: 'firefox' }))).toBe(false)
  })

  it('applies opera penalty', () => {
    const rule = getRule('opera')

    expect(rule.applies(createDetectionResult({ browser: 'opera' }))).toBe(true)
    expect(rule.applies(createDetectionResult({ browser: 'firefox' }))).toBe(false)
  })

  it('does not apply any browser penalty for firefox', () => {
    const firefoxResult = createDetectionResult({ browser: 'firefox', browserFamily: 'firefox' })

    const browserRules = ['google-chrome', 'opera', 'microsoft-edge', 'brave', 'unknown-browser']

    browserRules.forEach((id) => {
      expect(getRule(id).applies(firefoxResult)).toBe(false)
    })
  })

  it('applies google chrome penalty', () => {
    const rule = getRule('google-chrome')

    expect(rule.applies(createDetectionResult({ browser: 'chrome' }))).toBe(true)
    expect(rule.applies(createDetectionResult({ browser: 'firefox' }))).toBe(false)
  })

  it('applies unknown browser penalty', () => {
    const rule = getRule('unknown-browser')

    expect(rule.applies(createDetectionResult({ browser: 'unknown' }))).toBe(true)
    expect(rule.applies(createDetectionResult({ browser: 'firefox' }))).toBe(false)
  })

  it('applies no https penalty', () => {
    const rule = getRule('no-https')

    expect(rule.applies(createDetectionResult({ https: false }))).toBe(true)
    expect(rule.applies(createDetectionResult({ https: true }))).toBe(false)
  })

  it('does not apply no https penalty on the development server', () => {
    const rule = getRule('no-https')

    expect(
      rule.applies(createDetectionResult({ https: false }), {
        isDevelopmentServer: true,
      }),
    ).toBe(false)
  })

  it('applies disabled gpc penalty', () => {
    const rule = getRule('gpc-disabled')

    expect(rule.applies(createDetectionResult({ gpc: false }))).toBe(true)
    expect(rule.applies(createDetectionResult({ gpc: true }))).toBe(false)
  })

  it('applies third-party cookie penalty for maximum privacy users', () => {
    const rule = getRule('third-party-cookies-likely-allowed')

    expect(
      rule.applies(
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
        {
          answers: { privacy_preference: 'maximum_privacy' },
        },
      ),
    ).toBe(true)
    expect(rule.applies(createDetectionResult({ cookiesEnabled: false }))).toBe(false)
  })

  it('does not apply third-party cookie penalty below maximum privacy', () => {
    const rule = getRule('third-party-cookies-likely-allowed')

    expect(
      rule.applies(
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
        {
          answers: { privacy_preference: 'privacy' },
        },
      ),
    ).toBe(false)
  })

  it('does not apply cookie penalty when only first-party cookies are writable', () => {
    const rule = getRule('third-party-cookies-likely-allowed')

    expect(
      rule.applies(
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
    ).toBe(false)
  })

  it('applies medium fingerprinting exposure penalty', () => {
    const rule = getRule('medium-fingerprinting-exposure')

    expect(
      rule.applies(
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
    ).toBe(true)
    expect(rule.applies(createDetectionResult())).toBe(false)
  })

  it('does not apply medium fingerprinting exposure penalty for high exposure', () => {
    const rule = getRule('medium-fingerprinting-exposure')

    expect(
      rule.applies(createDetectionResult({
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
      })),
    ).toBe(false)
  })

  it('applies high fingerprinting exposure penalty for balanced users', () => {
    const rule = getRule('high-fingerprinting-exposure')

    expect(
      rule.applies(
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
    ).toBe(true)
  })

  it('does not apply fingerprinting exposure penalty for convenience users', () => {
    const rule = getRule('high-fingerprinting-exposure')

    expect(
      rule.applies(
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
    ).toBe(false)
  })

  it('does not apply fingerprinting exposure penalty for Firefox with likely active protection', () => {
    const rule = getRule('high-fingerprinting-exposure')

    expect(
      rule.applies(
        createDetectionResult({
          browser: 'firefox',
          browserFamily: 'firefox',
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
          fingerprintingProtection: {
            status: 'likely-active',
            signals: {
              canvasNoise: true,
              hardwareConcurrencyBucketed: true,
              touchPointsBucketed: false,
              screenDimensionsStandardized: false,
            },
          },
        }),
        { answers: { privacy_preference: 'maximum_privacy' } },
      ),
    ).toBe(false)
  })

  it('applies high fingerprinting exposure penalty', () => {
    const rule = getRule('high-fingerprinting-exposure')

    expect(
      rule.applies(
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
    ).toBe(true)
    expect(rule.applies(createDetectionResult())).toBe(false)
  })

  it('uses positive penalty values', () => {
    scoringRules.forEach((rule) => {
      expect(rule.penalty).toBeGreaterThan(0)
    })
  })
})
