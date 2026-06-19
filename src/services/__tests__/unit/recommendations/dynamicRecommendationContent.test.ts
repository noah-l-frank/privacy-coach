import { describe, expect, it } from 'vitest'
import type { DetectionResult } from '../../../detection'
import { recommendationContent } from '../../../recommendations/recommendationContent'
import { enhanceRecommendation } from '../../../recommendations/dynamicRecommendationContent'

function createDetectionResult(overrides: Partial<DetectionResult> = {}): DetectionResult {
  return {
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

describe('dynamic recommendation content', () => {
  it('returns static recommendations unchanged', () => {
    const recommendation = recommendationContent.use_adblock

    expect(enhanceRecommendation(recommendation, createDetectionResult())).toBe(recommendation)
  })

  it('uses Firefox-specific cookie steps and link', () => {
    const recommendation = enhanceRecommendation(
      recommendationContent.reduce_cookies,
      createDetectionResult({ browser: 'firefox' }),
    )

    expect(recommendation.steps).toContain('Navigate to Privacy & Security')
    expect(recommendation.links).toContainEqual(
      expect.objectContaining({
        label: 'Firefox cookie settings',
      }),
    )
  })

  it('uses Chrome-specific cookie steps and link', () => {
    const recommendation = enhanceRecommendation(
      recommendationContent.reduce_cookies,
      createDetectionResult({ browser: 'chrome', browserFamily: 'chromium' }),
    )

    expect(recommendation.steps).toContain('Open Third-party cookies')
    expect(recommendation.links).toContainEqual(
      expect.objectContaining({
        label: 'Chrome cookie settings',
      }),
    )
  })

  it('uses Edge-specific cookie steps and link', () => {
    const recommendation = enhanceRecommendation(
      recommendationContent.reduce_cookies,
      createDetectionResult({ browser: 'edge', browserFamily: 'chromium' }),
    )

    expect(recommendation.steps).toContain('Review exceptions for sites you trust')
    expect(recommendation.links).toContainEqual(
      expect.objectContaining({
        label: 'Edge cookie settings',
      }),
    )
  })

  it('falls back to generic cookie guidance for unknown browsers', () => {
    const recommendation = enhanceRecommendation(
      recommendationContent.reduce_cookies,
      createDetectionResult({ browser: 'unknown', browserFamily: 'unknown' }),
    )

    expect(recommendation.steps).toContain('Review cookie and tracking settings')
    expect(recommendation.links).toContainEqual(
      expect.objectContaining({
        label: 'Browser cookie settings',
      }),
    )
  })

  it('uses Brave-specific GPC steps', () => {
    const recommendation = enhanceRecommendation(
      recommendationContent.enable_gpc,
      createDetectionResult({ browser: 'brave', browserFamily: 'chromium' }),
    )

    expect(recommendation.steps).toContain('Open Brave settings')
  })

  it('falls back to generic GPC guidance for unknown browsers', () => {
    const recommendation = enhanceRecommendation(
      recommendationContent.enable_gpc,
      createDetectionResult({ browser: 'unknown', browserFamily: 'unknown' }),
    )

    expect(recommendation.steps).toContain('Search for Global Privacy Control')
  })

  it('returns unknown dynamic recommendations unchanged', () => {
    const recommendation = {
      ...recommendationContent.enable_gpc,
      id: 'unknown-dynamic-recommendation',
    }

    expect(enhanceRecommendation(recommendation, createDetectionResult())).toEqual(recommendation)
  })
})
