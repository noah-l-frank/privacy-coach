import { describe, expect, it } from 'vitest'
import { generateRecommendations } from '../recommendations'

describe('generateRecommendations', () => {
  const baseResult = {
    browserFamily: 'unknown',
    browser: 'unknown',
    os: 'linux',
    gpc: true,
    cookiesEnabled: false,
    https: true,
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

    expect(recommendations).toContainEqual({
      id: 'switch-to-firefox',
      title: 'Switch to a privacy-focused browser',
      description:
        'Since privacy is important to you and you do not mind a different look and feel, consider switching to Firefox for stronger built-in privacy protections.',
      effort: 'medium',
    })
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

    expect(recommendations).toContainEqual({
      id: 'switch-to-brave',
      title: 'Consider a more private Chromium-based browser',
      description:
        'Since you prefer a familiar experience, you might consider a privacy-focused Chromium browser like Brave, which offers better default privacy settings than Chrome.',
      effort: 'easy',
    })
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

  it('recommends Firefox optimization for Firefox users who prefer privacy', () => {
    const recommendations = generateRecommendations(
      { ...baseResult, browserFamily: 'firefox', browser: 'firefox' },
      {
        privacy_preference: 'privacy',
        password_management: 'manager',
      },
    )

    expect(recommendations).toContainEqual({
      id: 'optimize-firefox',
      title: 'Optimize your Firefox privacy settings',
      description:
        'You are already using Firefox. Reviewing its privacy settings can further improve your protection.',
      effort: 'easy',
    })
  })

  it('recommends enabling Global Privacy Control when it is disabled and tracking protection is important', () => {
    const recommendations = generateRecommendations(
      { ...baseResult, gpc: false },
      {
        tracking_protection_preference: 'high',
      },
    )

    expect(recommendations).toContainEqual({
      id: 'enable-gpc',
      title: 'Enable Global Privacy Control',
      description:
        'Since tracking protection is important to you, consider enabling Global Privacy Control in your browser settings.',
      effort: 'easy',
    })
  })

  it('recommends reducing cookies when cookies are enabled and privacy is preferred', () => {
    const recommendations = generateRecommendations(
      { ...baseResult, browserFamily: 'chromium', browser: 'edge', cookiesEnabled: true },
      {
        privacy_preference: 'privacy',
        password_management: 'manager',
      },
    )

    expect(recommendations).toContainEqual({
      id: 'reduce-cookies',
      title: 'Reduce cookie and tracking exposure',
      description:
        'Since privacy is important to you, consider reducing tracking and third-party cookie usage in your browser.',
      effort: 'medium',
    })
  })

  it('recommends an ad blocker when privacy-focused users do not use one', () => {
    const recommendations = generateRecommendations(baseResult, {
      privacy_preference: 'privacy',
      adblock_usage: 'no',
      password_management: 'manager',
    })

    expect(recommendations).toContainEqual({
      id: 'use-adblock',
      title: 'Use an ad blocker',
      description:
        'An ad blocker can reduce tracking, improve privacy, and make browsing less distracting.',
      effort: 'easy',
    })
  })

  it('recommends a password manager when privacy-focused users do not use one', () => {
    const recommendations = generateRecommendations(baseResult, {
      privacy_preference: 'privacy',
      password_management: 'reuse',
    })

    expect(recommendations).toContainEqual({
      id: 'use-password-manager',
      title: 'Use a password manager',
      description:
        'A password manager helps you use strong, unique passwords and protects your accounts more effectively.',
      effort: 'easy',
    })
  })

  it('recommends a VPN for privacy users who do not use one', () => {
    const recommendations = generateRecommendations(baseResult, {
      privacy_preference: 'privacy',
      password_management: 'manager',
      vpn_usage: 'no',
    })

    expect(recommendations).toContainEqual({
      id: 'use-vpn',
      title: 'Use a VPN for better privacy',
      description:
        'A VPN can hide your IP address and protect your data, especially on public networks.',
      effort: 'advanced',
    })
  })

  it('returns no recommendations for unknown browser without relevant answers', () => {
    const recommendations = generateRecommendations(baseResult, {})

    expect(recommendations).toHaveLength(0)
  })
})
