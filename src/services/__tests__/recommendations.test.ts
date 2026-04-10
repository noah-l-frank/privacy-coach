import { describe, expect, it } from 'vitest'
import { generateRecommendations } from '../recommendations'

describe('generateRecommendations', () => {
  it('recommends Firefox for Chrome users who prefer privacy and do not need a similar look and feel', () => {
    const result = {
      browserFamily: 'chromium',
      browser: 'chrome',
      os: 'linux',
      language: 'de-DE',
      timezone: 'Europe/Berlin',
      dnt: false,
      cookiesEnabled: true,
      https: true,
      adblock: false,
    }

    const answers = {
      cookie_preference: 'privacy',
      browser_switch_similarity: 'low',
    }

    const recommendations = generateRecommendations(result, answers)

    expect(recommendations).toHaveLength(1)

    const [recommendation] = recommendations
    if (!recommendation) throw new Error('Expected one recommendation')

    expect(recommendation).toEqual({
      id: 'switch-to-firefox',
      title: 'Switch to a privacy-focused browser',
      description:
        'Since privacy is important to you and you do not mind a different look and feel, consider switching to Firefox for stronger built-in privacy protections.',
    })
  })

  it('recommends a privacy-friendly Chromium browser for Chrome users who prefer privacy and want a similar look and feel', () => {
    const result = {
      browserFamily: 'chromium',
      browser: 'chrome',
      os: 'linux',
      language: 'de-DE',
      timezone: 'Europe/Berlin',
      dnt: false,
      cookiesEnabled: true,
      https: true,
      adblock: false,
    }

    const answers = {
      cookie_preference: 'privacy',
      browser_switch_similarity: 'high',
    }

    const recommendations = generateRecommendations(result, answers)

    expect(recommendations).toHaveLength(1)

    const [recommendation] = recommendations
    if (!recommendation) throw new Error('Expected one recommendation')

    expect(recommendation).toEqual({
      id: 'switch-to-brave',
      title: 'Consider a more private Chromium-based browser',
      description:
        'Since you prefer a familiar experience, you might consider a privacy-focused Chromium browser like Brave, which offers better default privacy settings than Chrome.',
    })
  })

  it('returns no browser switch recommendation for Chrome users who do not prefer privacy', () => {
    const result = {
      browserFamily: 'chromium',
      browser: 'chrome',
      os: 'linux',
      language: 'de-DE',
      timezone: 'Europe/Berlin',
      dnt: false,
      cookiesEnabled: true,
      https: true,
      adblock: false,
    }

    const answers = {
      cookie_preference: 'convenience',
      browser_switch_similarity: 'low',
    }

    const recommendations = generateRecommendations(result, answers)

    expect(recommendations).toHaveLength(0)
  })

  it('returns no recommendations for unknown browser', () => {
    const result = {
      browserFamily: 'unknown',
      browser: 'unknown',
      os: 'linux',
      language: 'de-DE',
      timezone: 'Europe/Berlin',
      dnt: false,
      cookiesEnabled: true,
      https: true,
      adblock: false,
    }

    const answers = {}

    const recommendations = generateRecommendations(result, answers)

    expect(recommendations).toHaveLength(0)
  })
})
