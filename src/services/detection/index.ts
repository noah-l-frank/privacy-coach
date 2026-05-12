import { detectBrowser } from './browserDetection'
import { detectOS } from './osDetection'

import type { DetectionResult, NavigatorWithGPC } from './types'

export function detectEnvironment(): DetectionResult {
  const userAgent = navigator.userAgent.toLowerCase()

  const { browserFamily, browser } = detectBrowser(userAgent)
  const os = detectOS(userAgent)

  const gpc = (navigator as NavigatorWithGPC).globalPrivacyControl === true
  const cookiesEnabled = navigator.cookieEnabled
  const https = window.location.protocol === 'https:'

  return {
    browserFamily,
    browser,
    os,
    gpc,
    cookiesEnabled,
    https,
  }
}

export { detectBrowser } from './browserDetection'
export { detectOS } from './osDetection'

export type { DetectionResult, NavigatorWithGPC } from './types'
