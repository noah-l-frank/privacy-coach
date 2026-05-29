import { describe, expect, it } from 'vitest'
import { generateRecommendations } from '../../recommendations'
import type { DetectionResult } from '@/services/detection/types'

describe('generateRecommendations', () => {
  const baseResult: DetectionResult = {
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
    },
    cookieSettings: {
      cookiesEnabled: false,
      firstPartyCookieWritable: false,
      sessionCookieWritable: false,
      persistentCookieWritable: false,
    },
  }

  it('recommends Firefox for Chrome users who prefer privacy and do not need a similar look and feel', () => {
    const recommendations = generateRecommendations(
      { ...baseResult, browserFamily: 'chromium', browser: 'chrome' },
      {
        privacy_preference: 'privacy',
        browser_switch_similarity: 'low',
        password_management: 'manager',
      },
    )

    expect(recommendations).toContainEqual(
      expect.objectContaining({
        id: 'switch-to-firefox',
        title: 'Switch to a privacy-focused browser',
        effort: 'medium',
      }),
    )
  })

  it('recommends a privacy-friendly Chromium browser for Chrome users who prefer privacy and want a similar look and feel', () => {
    const recommendations = generateRecommendations(
      { ...baseResult, browserFamily: 'chromium', browser: 'chrome' },
      {
        privacy_preference: 'privacy',
        browser_switch_similarity: 'high',
        password_management: 'manager',
      },
    )

    expect(recommendations).toContainEqual(
      expect.objectContaining({
        id: 'switch-to-brave',
        title: 'Consider a more private Chromium-based browser',
        effort: 'easy',
      }),
    )
  })

  it('returns no browser switch recommendation for Chrome users who do not prefer privacy', () => {
    const recommendations = generateRecommendations(
      { ...baseResult, browserFamily: 'chromium', browser: 'chrome', cookiesEnabled: true },
      {
        privacy_preference: 'convenience',
        browser_switch_similarity: 'low',
      },
    )

    expect(recommendations).toHaveLength(0)
  })

  it('recommends enabling Global Privacy Control when it is disabled and tracking protection is important', () => {
    const recommendations = generateRecommendations(
      {
        ...baseResult,
        browserFamily: 'firefox',
        browser: 'firefox',
        gpc: false,
      },
      {
        privacy_preference: 'privacy',
        tracking_protection_preference: 'high',
        browser_switch_willingness: 'no',
      },
    )

    expect(recommendations).toContainEqual(
      expect.objectContaining({
        id: 'enable-gpc',
        title: 'Enable Global Privacy Control',
        effort: 'easy',
      }),
    )
  })

  it('recommends reducing cookies when cookies are enabled and privacy is preferred', () => {
    const recommendations = generateRecommendations(
      { ...baseResult, browserFamily: 'chromium', browser: 'edge', cookiesEnabled: true },
      {
        privacy_preference: 'privacy',
        password_management: 'manager',
      },
    )

    expect(recommendations).toContainEqual(
      expect.objectContaining({
        id: 'reduce-cookies',
        title: 'Reduce cookie and tracking exposure',
        effort: 'medium',
      }),
    )
  })

  it('recommends an ad blocker when privacy-focused users do not use one', () => {
    const recommendations = generateRecommendations(baseResult, {
      privacy_preference: 'privacy',
      adblock_usage: 'no',
      password_management: 'manager',
    })

    expect(recommendations).toContainEqual(
      expect.objectContaining({
        id: 'use-adblock',
        title: 'Use an ad blocker',
        effort: 'easy',
      }),
    )
  })

  it('recommends a password manager when privacy-focused users do not use one', () => {
    const recommendations = generateRecommendations(baseResult, {
      privacy_preference: 'privacy',
      password_management: 'reuse',
    })

    expect(recommendations).toContainEqual(
      expect.objectContaining({
        id: 'use-password-manager',
        title: 'Use a password manager',
        effort: 'easy',
      }),
    )
  })

  it('recommends a VPN for privacy users who do not use one', () => {
    const recommendations = generateRecommendations(baseResult, {
      privacy_preference: 'privacy',
      password_management: 'manager',
      vpn_usage: 'no',
    })

    expect(recommendations).toContainEqual(
      expect.objectContaining({
        id: 'use-vpn',
        title: 'Use a VPN for better privacy',
        effort: 'advanced',
      }),
    )
  })

  it('returns no recommendations for unknown browser without relevant answers', () => {
    const recommendations = generateRecommendations(baseResult, {})

    expect(recommendations).toHaveLength(0)
  })

  it('uses Brave-specific steps for the Global Privacy Control recommendation', () => {
    const recommendations = generateRecommendations(
      {
        ...baseResult,
        browserFamily: 'chromium',
        browser: 'brave',
        gpc: false,
      },
      {
        privacy_preference: 'privacy',
        tracking_protection_preference: 'high',
      },
    )

    expect(recommendations).toContainEqual(
      expect.objectContaining({
        id: 'enable-gpc',
        steps: expect.arrayContaining([
          expect.stringContaining('Brave'),
        ]),
      }),
    )
  })

})
