import { describe, expect, it } from 'vitest'
import { questionFlow } from '../../../questions/questionFlow'
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
  const rule = questionFlow.find((rule) => rule.id === id)

  if (!rule) {
    throw new Error(`Rule not found: ${id}`)
  }

  return rule
}

describe('questionFlow', () => {
  it('asks privacy preference when it has not been answered yet', () => {
    const rule = getRule('privacy_preference')

    expect(
      rule.shouldAsk({
        result: createDetectionResult(),
        answers: {},
      }),
    ).toBe(true)
  })


  it('does not ask privacy preference when it is already answered', () => {
    const rule = getRule('privacy_preference')

    expect(
      rule.shouldAsk({
        result: createDetectionResult(),
        answers: {
          privacy_preference: 'privacy',
        },
      }),
    ).toBe(false)
  })

  it('asks search engine for privacy focused users', () => {
    const rule = getRule('search_engine')

    expect(
      rule.shouldAsk({
        result: createDetectionResult(),
        answers: {
          privacy_preference: 'privacy',
        },
      }),
    ).toBe(true)
  })

  it('asks search engine for balanced users', () => {
    const rule = getRule('search_engine')

    expect(
      rule.shouldAsk({
        result: createDetectionResult(),
        answers: {
          privacy_preference: 'balanced',
        },
      }),
    ).toBe(true)
  })

  it('does not ask search engine for convenience users', () => {
    const rule = getRule('search_engine')

    expect(
      rule.shouldAsk({
        result: createDetectionResult(),
        answers: {
          privacy_preference: 'convenience',
        },
      }),
    ).toBe(false)
  })

  it('asks vpn usage only for privacy users', () => {
    const rule = getRule('vpn_usage')

    expect(
      rule.shouldAsk({
        result: createDetectionResult(),
        answers: {
          privacy_preference: 'privacy',
        },
      }),
    ).toBe(true)

    expect(
      rule.shouldAsk({
        result: createDetectionResult(),
        answers: {
          privacy_preference: 'balanced',
        },
      }),
    ).toBe(false)
  })

  it('asks browser switch willingness for chromium browsers', () => {
    const rule = getRule('browser_switch_willingness')

    expect(
      rule.shouldAsk({
        result: createDetectionResult({
          browser: 'chrome',
        }),
        answers: {},
      }),
    ).toBe(true)

    expect(
      rule.shouldAsk({
        result: createDetectionResult({
          browser: 'firefox',
        }),
        answers: {},
      }),
    ).toBe(false)
  })

  it('asks browser switch similarity only when user is open to switching', () => {
    const rule = getRule('browser_switch_similarity')

    expect(
      rule.shouldAsk({
        result: createDetectionResult({
          browser: 'chrome',
        }),
        answers: {
          browser_switch_willingness: 'yes',
        },
      }),
    ).toBe(true)

    expect(
      rule.shouldAsk({
        result: createDetectionResult({
          browser: 'chrome',
        }),
        answers: {
          browser_switch_willingness: 'no',
        },
      }),
    ).toBe(false)
  })

  it('asks tracking protection preference when gpc is disabled', () => {
    const rule = getRule('tracking_protection_preference')

    expect(
      rule.shouldAsk({
        result: createDetectionResult({
          gpc: false,
        }),
        answers: {},
      }),
    ).toBe(true)
  })

  it('does not ask password management when it is already answered', () => {
    const rule = getRule('password_management')

    expect(
      rule.shouldAsk({
        result: createDetectionResult(),
        answers: {
          privacy_preference: 'privacy',
          password_management: 'manager',
        },
      }),
    ).toBe(false)
  })

  it('does not ask adblock usage when it is already answered', () => {
    const rule = getRule('adblock_usage')

    expect(
      rule.shouldAsk({
        result: createDetectionResult(),
        answers: {
          privacy_preference: 'privacy',
          adblock_usage: 'yes',
        },
      }),
    ).toBe(false)
  })
})
