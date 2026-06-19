import type { DetectionResult } from '@/services/detection'
import {
  hasHighFingerprintingExposure,
  hasMediumFingerprintingExposure,
} from '@/services/detection'
import { recommendationContent } from './recommendationContent'

type RecommendationContext = {
  result: DetectionResult
  answers: Record<string, string>
}

type RecommendationId = keyof typeof recommendationContent

type RecommendationRule = {
  recommendation: RecommendationId
  shouldRecommend: (context: RecommendationContext) => boolean
}

function supportsGPC(browser: string): boolean {
  return ['firefox', 'brave'].includes(browser)
}

function lacksNativeGPCSupport(browser: string): boolean {
  return !supportsGPC(browser)
}

function isChromiumBrowser(result: DetectionResult): boolean {
  return result.browserFamily === 'chromium'
}

function isChromeLikeButNotBrave(result: DetectionResult): boolean {
  return isChromiumBrowser(result) && result.browser !== 'brave'
}

function wantsPrivacyOrBalancedGuidance(answers: Record<string, string>): boolean {
  return answers.privacy_preference !== 'convenience'
}

function wantsTrackingProtection(answers: Record<string, string>): boolean {
  return answers.tracking_protection_preference !== 'low'
}

function hasCookieExposure(result: DetectionResult): boolean {
  return (
    result.cookiesEnabled ||
    result.cookieSettings.firstPartyCookieWritable ||
    result.cookieSettings.sessionCookieWritable ||
    result.cookieSettings.persistentCookieWritable
  )
}

function hasMeaningfulFingerprintingExposure(result: DetectionResult): boolean {
  if (
    result.browser === 'firefox' &&
    result.fingerprintingProtection?.status === 'likely-active'
  ) {
    return false
  }

  return (
    hasMediumFingerprintingExposure(result.fingerprintingExposure) ||
    hasHighFingerprintingExposure(result.fingerprintingExposure)
  )
}


export const recommendationRules: RecommendationRule[] = [
  {
    recommendation: 'switch_to_firefox',
    shouldRecommend: ({ result, answers }) =>
      isChromeLikeButNotBrave(result) &&
      answers.privacy_preference === 'privacy' &&
      answers.browser_switch_similarity === 'low',
  },

  {
    recommendation: 'switch_to_brave',
    shouldRecommend: ({ result, answers }) =>
      isChromeLikeButNotBrave(result) &&
      answers.privacy_preference === 'privacy' &&
      (answers.browser_switch_similarity === 'medium' ||
        answers.browser_switch_similarity === 'high'),
  },

  // Firefox and Brave support GPC natively. Other Chromium-based browsers are handled
  // through browser switch recommendations instead of extension-specific guidance.
  {
    recommendation: 'enable_gpc',
    shouldRecommend: ({ result, answers }) =>
      supportsGPC(result.browser) &&
      !result.gpc &&
      wantsTrackingProtection(answers),
  },

  {
    recommendation: 'use_gpc_extension',
    shouldRecommend: ({ result, answers }) =>
      lacksNativeGPCSupport(result.browser) &&
      !result.gpc &&
      wantsTrackingProtection(answers),
  },

  {
    recommendation: 'reduce_cookies',
    shouldRecommend: ({ result, answers }) =>
      hasCookieExposure(result) &&
      wantsPrivacyOrBalancedGuidance(answers),
  },

  {
    recommendation: 'reduce_fingerprinting',
    shouldRecommend: ({ result, answers }) =>
      hasMeaningfulFingerprintingExposure(result) &&
      wantsPrivacyOrBalancedGuidance(answers),
  },

  {
    recommendation: 'use_adblock',
    shouldRecommend: ({ answers }) =>
      (answers.privacy_preference === 'privacy' ||
        answers.privacy_preference === 'balanced') &&
      answers.adblock_usage === 'no',
  },

  {
    recommendation: 'use_password_manager',
    shouldRecommend: ({ answers }) =>
      Boolean(
        (answers.privacy_preference === 'privacy' ||
          answers.privacy_preference === 'balanced') &&
        answers.password_management &&
        answers.password_management !== 'manager',
      ),
  },

  {
    recommendation: 'use_vpn',
    shouldRecommend: ({ answers }) =>
      answers.privacy_preference === 'privacy' &&
      answers.vpn_usage === 'no',
  },
]
