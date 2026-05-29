import type { DetectionResult } from '@/services/detection'
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

function isChromiumBrowser(result: DetectionResult): boolean {
  return result.browserFamily === 'chromium'
}

function isChromeLikeButNotBrave(result: DetectionResult): boolean {
  return isChromiumBrowser(result) && result.browser !== 'brave'
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

  {
    recommendation: 'enable_gpc',
    shouldRecommend: ({ result, answers }) =>
      supportsGPC(result.browser) &&
      !result.gpc &&
      answers.tracking_protection_preference === 'high'
  },

  {
    recommendation: 'reduce_cookies',
    shouldRecommend: ({ result, answers }) =>
      result.cookiesEnabled &&
      answers.privacy_preference === 'privacy',
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
