import { detectBrowser } from './browserDetection'
import { detectOS } from './osDetection'

import type { DetectionResult, NavigatorWithGPC } from './types'
import { detectFingerprintingExposure } from './fingerprintingDetection'
import { detectCookieSettings } from './cookieDetection'

export function detectEnvironment(): DetectionResult {
  const userAgent = navigator.userAgent.toLowerCase()

  const { browserFamily, browser } = detectBrowser(userAgent)
  const os = detectOS(userAgent)

  const gpc = (navigator as NavigatorWithGPC).globalPrivacyControl === true

  const https = window.location.protocol === 'https:'

  const fingerprintingExposure = detectFingerprintingExposure()

  const cookieSettings = detectCookieSettings()

  return {
    browserFamily,
    browser,
    os,
    gpc,
    cookiesEnabled: cookieSettings.cookiesEnabled,
    https,
    fingerprintingExposure,
    cookieSettings
  }
}

export { detectBrowser } from './browserDetection'
export { detectOS } from './osDetection'

export type { DetectionResult, NavigatorWithGPC, CookieSettings } from './types'

export { detectFingerprintingExposure } from './fingerprintingDetection'
export { detectCookieSettings } from './cookieDetection'
