import { describe, expect, it } from 'vitest'
import { generateRecommendations } from '../recommendations'

describe('generateRecommendations', () => {
  it('returns a Chrome-specific recommendation for Chrome users', () => {
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

    const recommendations = generateRecommendations(result)

    expect(recommendations).toHaveLength(1)
    expect(recommendations[0]).toEqual({
      id: 'chrome-privacy',
      title: 'Consider a more privacy-focused browser',
      description:
        'Google Chrome is convenient and widely used, but it is less privacy-friendly than some alternatives.',
    })
  })
})
