import { describe, expect, it } from 'vitest'
import type { DetectionResult } from '@/services/detection'
import { calculatePrivacyScore } from '../../scoring'
import { generateRecommendations } from '../../recommendations'

const baseResult: DetectionResult = {
  browserFamily: 'firefox',
  browser: 'firefox',
  os: 'linux',
  deviceType: 'desktop',
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
  },
  cookieSettings: {
    cookiesEnabled: false,
    firstPartyCookieWritable: false,
    sessionCookieWritable: false,
    persistentCookieWritable: false,
  },
}

function getRecommendationIds(result: DetectionResult, answers: Record<string, string>): string[] {
  return generateRecommendations(result, answers).map((recommendation) => recommendation.id)
}

describe('privacy profile regressions', () => {
  it('keeps a privacy-friendly Firefox profile at the maximum score without recommendations', () => {
    expect(calculatePrivacyScore(baseResult)).toBe(100)
    expect(getRecommendationIds(baseResult, {})).toEqual([])
  })

  it('keeps a risky balanced Chrome profile actionable without cookie guidance', () => {
    const result: DetectionResult = {
      ...baseResult,
      browserFamily: 'chromium',
      browser: 'chrome',
      gpc: false,
      cookiesEnabled: true,
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
      cookieSettings: {
        cookiesEnabled: true,
        firstPartyCookieWritable: true,
        sessionCookieWritable: true,
        persistentCookieWritable: true,
      },
    }

    expect(calculatePrivacyScore(result, {
      answers: { privacy_preference: 'balanced' },
    })).toBe(75)
    expect(
      getRecommendationIds(result, {
        privacy_preference: 'balanced',
        tracking_protection_preference: 'medium',
        adblock_usage: 'no',
        password_management: 'reuse',
      }),
    ).toEqual([
      'use-gpc-extension',
      'reduce-fingerprinting',
      'use-adblock',
      'use-password-manager',
    ])
  })

  it('respects low tracking-protection preference without cookie guidance for balanced users', () => {
    const result: DetectionResult = {
      ...baseResult,
      browserFamily: 'chromium',
      browser: 'edge',
      gpc: false,
      cookiesEnabled: true,
      cookieSettings: {
        cookiesEnabled: true,
        firstPartyCookieWritable: true,
        sessionCookieWritable: true,
        persistentCookieWritable: true,
      },
    }

    expect(getRecommendationIds(result, {
      privacy_preference: 'balanced',
      tracking_protection_preference: 'low',
      adblock_usage: 'yes',
      password_management: 'manager',
    })).toEqual([])
  })
})
