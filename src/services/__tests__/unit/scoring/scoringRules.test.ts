import { describe, expect, it } from 'vitest'
import { scoringRules } from '../../../scoring/scoringRules'
import type { DetectionResult } from '../../../detection'

function createDetectionResult(overrides: Partial<DetectionResult> = {}): DetectionResult {
  return {
    browserFamily: 'firefox',
    browser: 'Firefox',
    os: 'Linux',
    gpc: true,
    cookiesEnabled: false,
    https: true,
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
  it('applies chromium browser family penalty', () => {
    const rule = getRule('chromium-browser-family')

    expect(rule.applies(createDetectionResult({ browserFamily: 'chromium' }))).toBe(true)
    expect(rule.applies(createDetectionResult({ browserFamily: 'firefox' }))).toBe(false)
  })

  it('applies google chrome penalty', () => {
    const rule = getRule('google-chrome')

    expect(rule.applies(createDetectionResult({ browser: 'chrome' }))).toBe(true)
    expect(rule.applies(createDetectionResult({ browser: 'Firefox' }))).toBe(false)
  })

  it('applies no https penalty', () => {
    const rule = getRule('no-https')

    expect(rule.applies(createDetectionResult({ https: false }))).toBe(true)
    expect(rule.applies(createDetectionResult({ https: true }))).toBe(false)
  })

  it('applies disabled gpc penalty', () => {
    const rule = getRule('gpc-disabled')

    expect(rule.applies(createDetectionResult({ gpc: false }))).toBe(true)
    expect(rule.applies(createDetectionResult({ gpc: true }))).toBe(false)
  })

  it('applies enabled cookies penalty', () => {
    const rule = getRule('cookies-enabled')

    expect(rule.applies(createDetectionResult({ cookiesEnabled: true }))).toBe(true)
    expect(rule.applies(createDetectionResult({ cookiesEnabled: false }))).toBe(false)
  })

  it('uses positive penalty values', () => {
    scoringRules.forEach((rule) => {
      expect(rule.penalty).toBeGreaterThan(0)
    })
  })
})
