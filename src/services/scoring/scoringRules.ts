import type { DetectionResult } from '@/services/detection'
import {
  hasHighFingerprintingExposure,
  hasMediumFingerprintingExposure,
} from '@/services/detection'

export type ScoringRule = {
  id: string
  title: string
  description: string
  penalty: number
  applies: (result: DetectionResult, context?: ScoringContext) => boolean
  skippedDescription?: (result: DetectionResult, context?: ScoringContext) => string | null
}

export type ScoringContext = {
  answers?: Record<string, string>
  isDevelopmentServer?: boolean
}

function wantsMaximumPrivacy(context?: ScoringContext): boolean {
  return context?.answers?.privacy_preference === 'maximum_privacy'
}

function wantsPrivacyOrBalancedGuidance(context?: ScoringContext): boolean {
  return context?.answers?.privacy_preference !== 'convenience'
}

function isDevelopmentServer(context?: ScoringContext): boolean {
  return context?.isDevelopmentServer === true
}

function areThirdPartyCookiesLikelyAllowed(result: DetectionResult): boolean {
  return result.cookieSettings.thirdPartyCookieStatus === 'likely-allowed'
}

function hasAnyFingerprintingExposure(result: DetectionResult): boolean {
  return (
    hasMediumFingerprintingExposure(result.fingerprintingExposure) ||
    hasHighFingerprintingExposure(result.fingerprintingExposure)
  )
}

function hasFirefoxFingerprintingProtectionSignal(result: DetectionResult): boolean {
  return Boolean(
    result.browser === 'firefox' &&
    result.fingerprintingProtection &&
    result.fingerprintingProtection.status !== 'not-detected',
  )
}

function hasMeaningfulFingerprintingExposure(result: DetectionResult): boolean {
  if (hasFirefoxFingerprintingProtectionSignal(result)) {
    return false
  }

  return hasAnyFingerprintingExposure(result)
}

export const scoringRules: ScoringRule[] = [
  {
    id: 'google-chrome',
    title: 'Google Chrome detected',
    description:
      'Chrome is widely compatible, but its default ecosystem and tracking model are less privacy-focused than dedicated privacy browsers.',
    penalty: 15,
    applies: (result) => result.browser === 'chrome',
  },

  {
    id: 'opera',
    title: 'Opera detected',
    description:
      'Opera is Chromium-based and does not provide the same privacy defaults as stronger privacy-focused browsers.',
    penalty: 12,
    applies: (result) => result.browser === 'opera',
  },

  {
    id: 'microsoft-edge',
    title: 'Microsoft Edge detected',
    description:
      'Edge is Chromium-based and includes Microsoft account and service integrations that can increase data exposure.',
    penalty: 10,
    applies: (result) => result.browser === 'edge',
  },

  {
    id: 'brave',
    title: 'Brave detected',
    description:
      'Brave has stronger privacy defaults than most Chromium browsers, but it still exposes some Chromium-based browser signals.',
    penalty: 5,
    applies: (result) => result.browser === 'brave',
  },

  {
    id: 'unknown-browser',
    title: 'Unknown browser',
    description:
      'The browser could not be identified, so Privacy Coach cannot confidently account for its privacy defaults.',
    penalty: 8,
    applies: (result) => result.browser === 'unknown',
  },

  {
    id: 'no-https',
    title: 'Connection is not HTTPS',
    description:
      'Without HTTPS, pages can be easier to inspect or manipulate on the network path.',
    penalty: 25,
    applies: (result, context) => !result.https && !isDevelopmentServer(context),
    skippedDescription: (result, context) => {
      if (result.https) return 'This connection already uses HTTPS.'
      if (isDevelopmentServer(context)) {
        return 'Local development HTTP is ignored so it does not distort the production score.'
      }

      return null
    },
  },

  {
    id: 'gpc-disabled',
    title: 'Global Privacy Control is disabled',
    description:
      'GPC sends a privacy preference signal to websites that support or legally recognize it.',
    penalty: 10,
    applies: (result) => !result.gpc,
  },

  {
    id: 'third-party-cookies-likely-allowed',
    title: 'Third-party cookies are likely allowed',
    description:
      'Third-party cookies can support cross-site tracking while normal first-party cookies stay useful for logins and site features.',
    penalty: 10,
    applies: (result, context) =>
      areThirdPartyCookiesLikelyAllowed(result) &&
      wantsMaximumPrivacy(context),
    skippedDescription: (result, context) => {
      if (!areThirdPartyCookiesLikelyAllowed(result)) {
        return 'Third-party cookies do not look allowed, so normal first-party cookies are not penalized.'
      }

      if (!wantsMaximumPrivacy(context)) {
        return 'This is only scored for a maximum-privacy profile.'
      }

      return null
    },
  },

  {
    id: 'medium-fingerprinting-exposure',
    title: 'Medium fingerprinting exposure',
    description:
      'Several browser and device signals are available, which can make repeat recognition easier.',
    penalty: 6,
    applies: (result, context) =>
      hasMediumFingerprintingExposure(result.fingerprintingExposure) &&
      hasMeaningfulFingerprintingExposure(result) &&
      wantsPrivacyOrBalancedGuidance(context),
    skippedDescription: (result, context) => {
      if (!hasAnyFingerprintingExposure(result)) return null
      if (hasFirefoxFingerprintingProtectionSignal(result)) {
        return 'Firefox protection signals are present, so this exposure is not counted as a score penalty.'
      }

      if (!wantsPrivacyOrBalancedGuidance(context)) {
        return 'Convenience-focused profiles do not receive fingerprinting score penalties.'
      }

      return null
    },
  },

  {
    id: 'high-fingerprinting-exposure',
    title: 'High fingerprinting exposure',
    description:
      'Many browser and device signals are available, increasing the chance that websites can recognize this setup without cookies.',
    penalty: 12,
    applies: (result, context) =>
      hasHighFingerprintingExposure(result.fingerprintingExposure) &&
      hasMeaningfulFingerprintingExposure(result) &&
      wantsPrivacyOrBalancedGuidance(context),
    skippedDescription: (result, context) => {
      if (!hasAnyFingerprintingExposure(result)) return null
      if (hasFirefoxFingerprintingProtectionSignal(result)) {
        return 'Firefox protection signals are present, so this exposure is not counted as a score penalty.'
      }

      if (!wantsPrivacyOrBalancedGuidance(context)) {
        return 'Convenience-focused profiles do not receive fingerprinting score penalties.'
      }

      return null
    },
  },
]
