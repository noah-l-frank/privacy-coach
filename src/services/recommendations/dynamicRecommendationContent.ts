import type { DetectionResult } from '@/services/detection'
import type { Recommendation } from './types'

export function enhanceRecommendation(
  recommendation: Recommendation,
  result: DetectionResult,
): Recommendation {
  if (!recommendation.dynamic) {
    return recommendation
  }

  if (recommendation.id === 'reduce-cookies') {
    return {
      ...recommendation,

      steps: getCookieSteps(result.browser),

      links: [getCookieLink(result.browser)],
    }
  }

  return recommendation
}

function getCookieSteps(browser: string): string[] {
  const normalizedBrowser = browser.toLowerCase()

  if (normalizedBrowser.includes('firefox')) {
    return [
      'Open Firefox settings',
      'Navigate to Privacy & Security',
      'Enable Strict Tracking Protection',
    ]
  }

  if (normalizedBrowser.includes('chrome')) {
    return [
      'Open Chrome settings',
      'Navigate to Privacy and security',
      'Block third-party cookies',
    ]
  }

  if (normalizedBrowser.includes('edge')) {
    return [
      'Open Edge settings',
      'Navigate to Cookies and site permissions',
      'Block third-party cookies',
    ]
  }

  return [
    'Open your browser privacy settings',
    'Review cookie and tracking settings',
  ]
}

function getCookieLink(browser: string) {
  const normalizedBrowser = browser.toLowerCase()

  if (normalizedBrowser.includes('firefox')) {
    return {
      label: 'Firefox cookie settings',
      url: 'https://support.mozilla.org/kb/third-party-cookies-firefox-tracking-protection',
    }
  }

  if (normalizedBrowser.includes('chrome')) {
    return {
      label: 'Chrome cookie settings',
      url: 'https://support.google.com/chrome/answer/95647',
    }
  }

  if (normalizedBrowser.includes('edge')) {
    return {
      label: 'Edge cookie settings',
      url: 'https://support.microsoft.com/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09',
    }
  }

  return {
    label: 'Browser cookie settings',
    url: 'https://www.allaboutcookies.org/',
  }
}
