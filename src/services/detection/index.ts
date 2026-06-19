import { detectBrowser } from './browserDetection'
import { detectDeviceType, detectOS } from './osDetection'

import type { DetectionResult, NavigatorWithGPC } from './types'
import {
  detectFingerprintingExposure,
  detectFingerprintingProtection,
} from './fingerprintingDetection'
import { detectCookieSettings } from './cookieDetection'
import { detectBrowserEnvironment } from './browserDetection'

export async function detectEnvironment(): Promise<DetectionResult> {
  const userAgent = navigator.userAgent.toLowerCase()

  const { browserFamily, browser } = await detectBrowserEnvironment(userAgent)

  const os = detectOS(userAgent)

  const deviceType = detectDeviceType(userAgent)

  const gpc = (navigator as NavigatorWithGPC).globalPrivacyControl === true

  const https = window.location.protocol === 'https:'

  const fingerprintingExposure = detectFingerprintingExposure()

  const fingerprintingProtection = detectFingerprintingProtection()

  const cookieSettings = detectCookieSettings(browser)

  return {
    browserFamily,
    browser,
    os,
    deviceType,
    gpc,
    cookiesEnabled: cookieSettings.cookiesEnabled,
    https,
    fingerprintingExposure,
    fingerprintingProtection,
    cookieSettings
  }
}

export { detectBrowser } from './browserDetection'
export { detectDeviceType, detectOS } from './osDetection'

export type {
  DetectionResult,
  DeviceType,
  FingerprintingProtection,
  FingerprintingProtectionSignals,
  FingerprintingProtectionStatus,
  FingerprintingRiskLevel,
  NavigatorWithGPC,
  CookieSettings,
  ThirdPartyCookieStatus,
} from './types'

export {
  classifyFingerprintingProtectionSignals,
  detectFingerprintingExposure,
  detectFingerprintingProtection,
} from './fingerprintingDetection'
export { detectCookieSettings } from './cookieDetection'
export {
  countFingerprintingExposure,
  getFingerprintingRiskLevel,
  hasHighFingerprintingExposure,
  hasMediumFingerprintingExposure,
} from './fingerprintingRisk'
