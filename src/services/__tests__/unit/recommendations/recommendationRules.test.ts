import { describe, expect, it } from 'vitest'
import { recommendationRules } from '../../../recommendations/recommendationRules'
import type { DetectionResult } from '../../../detection'

function createDetectionResult(overrides: Partial<DetectionResult> = {}): DetectionResult {
  return {
    browserFamily: 'firefox',
    browser: 'firefox',
    os: 'linux',
    gpc: true,
    cookiesEnabled: false,
    https: true,
    ...overrides,
  }
}

function getRule(recommendation: string) {
  const rule = recommendationRules.find((rule) => rule.recommendation === recommendation)

  if (!rule) {
    throw new Error(`Rule not found: ${recommendation}`)
  }

  return rule
}

describe('recommendationRules', () => {
  it('matches firefox recommendation for privacy focused firefox users', () => {
    const rule = getRule('optimize_firefox')

    expect(
      rule.shouldRecommend({
        result: createDetectionResult({
          browser: 'firefox',
        }),
        answers: {
          privacy_preference: 'privacy',
        },
      }),
    ).toBe(true)
  })

  it('matches firefox switch recommendation for chrome users with low similarity preference', () => {
    const rule = getRule('switch_to_firefox')

    expect(
      rule.shouldRecommend({
        result: createDetectionResult({
          browser: 'chrome',
        }),
        answers: {
          privacy_preference: 'privacy',
          browser_switch_similarity: 'low',
        },
      }),
    ).toBe(true)
  })

  it('does not match firefox switch recommendation for high similarity preference', () => {
    const rule = getRule('switch_to_firefox')

    expect(
      rule.shouldRecommend({
        result: createDetectionResult({
          browser: 'chrome',
        }),
        answers: {
          privacy_preference: 'privacy',
          browser_switch_similarity: 'high',
        },
      }),
    ).toBe(false)
  })

  it('matches brave recommendation for chrome users with high similarity preference', () => {
    const rule = getRule('switch_to_brave')

    expect(
      rule.shouldRecommend({
        result: createDetectionResult({
          browser: 'chrome',
        }),
        answers: {
          privacy_preference: 'privacy',
          browser_switch_similarity: 'high',
        },
      }),
    ).toBe(true)
  })

  it('matches gpc recommendation when gpc is disabled', () => {
    const rule = getRule('enable_gpc')

    expect(
      rule.shouldRecommend({
        result: createDetectionResult({
          gpc: false,
        }),
        answers: {
          tracking_protection_preference: 'high',
        },
      }),
    ).toBe(true)
  })

  it('matches cookie recommendation for privacy focused users with cookies enabled', () => {
    const rule = getRule('reduce_cookies')

    expect(
      rule.shouldRecommend({
        result: createDetectionResult({
          cookiesEnabled: true,
        }),
        answers: {
          privacy_preference: 'privacy',
        },
      }),
    ).toBe(true)
  })

  it('matches adblock recommendation when user does not use one', () => {
    const rule = getRule('use_adblock')

    expect(
      rule.shouldRecommend({
        result: createDetectionResult(),
        answers: {
          privacy_preference: 'privacy',
          adblock_usage: 'no',
        },
      }),
    ).toBe(true)
  })

  it('matches password manager recommendation when passwords are reused', () => {
    const rule = getRule('use_password_manager')

    expect(
      rule.shouldRecommend({
        result: createDetectionResult(),
        answers: {
          privacy_preference: 'privacy',
          password_management: 'reuse',
        },
      }),
    ).toBe(true)
  })

  it('matches vpn recommendation for privacy focused users without vpn', () => {
    const rule = getRule('use_vpn')

    expect(
      rule.shouldRecommend({
        result: createDetectionResult(),
        answers: {
          privacy_preference: 'privacy',
          vpn_usage: 'no',
        },
      }),
    ).toBe(true)
  })

  it('matches adblock recommendation for balanced users', () => {
    const rule = getRule('use_adblock')

    expect(
      rule.shouldRecommend({
        result: createDetectionResult(),
        answers: {
          privacy_preference: 'balanced',
          adblock_usage: 'no',
        },
      }),
    ).toBe(true)
  })

  it('does not match adblock recommendation when adblock is already used', () => {
    const rule = getRule('use_adblock')

    expect(
      rule.shouldRecommend({
        result: createDetectionResult(),
        answers: {
          privacy_preference: 'privacy',
          adblock_usage: 'yes',
        },
      }),
    ).toBe(false)
  })

  it('matches password manager recommendation for balanced users who reuse passwords', () => {
    const rule = getRule('use_password_manager')

    expect(
      rule.shouldRecommend({
        result: createDetectionResult(),
        answers: {
          privacy_preference: 'balanced',
          password_management: 'reuse',
        },
      }),
    ).toBe(true)
  })
})
