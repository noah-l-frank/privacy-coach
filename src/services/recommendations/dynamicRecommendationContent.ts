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

  if (recommendation.id === 'enable-gpc') {
    return {
      ...recommendation,
      steps: getGpcSteps(result.browser),
    }
  }


  return recommendation
}

function getCookieSteps(browser: string): string[] {

  if (browser.includes('firefox')) {
    return [
      'Open Firefox settings',
      'Navigate to Privacy & Security',
      'Enable Strict Tracking Protection',
    ]
  }

  if (browser.includes('chrome')) {
    return [
      'Open Chrome settings',
      'Navigate to Privacy and security',
      'Block third-party cookies',
    ]
  }

  if (browser.includes('edge')) {
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


  if (browser.includes('firefox')) {
    return {
      label: 'Firefox cookie settings',
      url: 'https://support.mozilla.org/kb/third-party-cookies-firefox-tracking-protection',
    }
  }

  if (browser.includes('chrome')) {
    return {
      label: 'Chrome cookie settings',
      url: 'https://support.google.com/chrome/answer/95647',
    }
  }

  if (browser.includes('edge')) {
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


function getGpcSteps(browser: string): string[] {
  if (browser === 'firefox') {
    return [
      'Open Firefox settings',
      'Go to Privacy & Security',
      'Enable Global Privacy Control',
    ]
  }

  if (browser === 'brave') {
    return [
      'Open Brave settings',
      'Go to Privacy and security',
      'Open Security or Shields settings',
      'Enable Global Privacy Control',
    ]
  }

  return [
    'Open your browser privacy settings',
    'Search for Global Privacy Control',
    'Enable the setting if your browser supports it',
  ]
}

