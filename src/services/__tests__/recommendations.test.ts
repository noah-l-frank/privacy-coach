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

it('returns an Edge-specific recommendation for Edge users', () => {
  const result = {
    browserFamily: 'chromium',
    browser: 'edge',
    os: 'windows',
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
    id: 'edge-privacy',
    title: 'Review Microsoft Edge privacy settings',
    description:
      'Microsoft Edge includes tracking prevention features, but some settings may still share data with Microsoft services.',
  })
})

it('returns a Firefox-specific recommendation for Firefox users', () => {
  const result = {
    browserFamily: 'firefox',
    browser: 'firefox',
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
    id: 'firefox-privacy',
    title: 'Check Firefox privacy protections',
    description:
      'Firefox already offers strong privacy features. Reviewing its privacy settings can further improve protection.',
  })
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

  const recommendations = generateRecommendations(result)

  expect(recommendations).toHaveLength(0)
})
