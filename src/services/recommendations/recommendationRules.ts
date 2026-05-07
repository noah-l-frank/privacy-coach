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

export const recommendationRules: RecommendationRule[] = [
  {
    recommendation: 'switch_to_firefox',
    shouldRecommend: ({ result, answers }) =>
      result.browser.toLowerCase().includes('chrome') &&
      answers.privacy_preference === 'privacy' &&
      answers.browser_switch_similarity === 'low',
  },

  {
    recommendation: 'switch_to_brave',
    shouldRecommend: ({ result, answers }) =>
      result.browser.toLowerCase().includes('chrome') &&
      answers.privacy_preference === 'privacy' &&
      answers.browser_switch_similarity === 'high',
  },

  {
    recommendation: 'optimize_firefox',
    shouldRecommend: ({ result, answers }) =>
      result.browser.toLowerCase().includes('firefox') && answers.privacy_preference === 'privacy',
  },

  {
    recommendation: 'enable_gpc',
    shouldRecommend: ({ result, answers }) =>
      !result.gpc && answers.tracking_protection_preference === 'high',
  },

  {
    recommendation: 'reduce_cookies',
    shouldRecommend: ({ result, answers }) =>
      result.cookiesEnabled && answers.privacy_preference === 'privacy',
  },

  {
    recommendation: 'use_adblock',
    shouldRecommend: ({ answers }) =>
      (answers.privacy_preference === 'privacy' || answers.privacy_preference === 'balanced') &&
      answers.adblock_usage === 'no',
  },

  {
    recommendation: 'use_password_manager',
    shouldRecommend: ({ answers }) =>
      Boolean(
        (answers.privacy_preference === 'privacy' || answers.privacy_preference === 'balanced') &&
        answers.password_management &&
        answers.password_management !== 'manager',
      ),
  },

  {
    recommendation: 'use_vpn',
    shouldRecommend: ({ answers }) =>
      answers.privacy_preference === 'privacy' && answers.vpn_usage === 'no',
  },
]
