import type { DetectionResult } from '@/services/detection'
import type { Recommendation } from './types'
import { recommendationContent } from './recommendationContent'
import { recommendationRules } from './recommendationRules'
import { enhanceRecommendation } from './dynamicRecommendationContent'

export function generateRecommendations(
  result: DetectionResult,
  answers: Record<string, string>,
): Recommendation[] {
  return recommendationRules
    .filter((rule) => rule.shouldRecommend({ result, answers }))
    .map((rule) => recommendationContent[rule.recommendation])
    .map((recommendation) =>
      enhanceRecommendation(recommendation, result),
    )
}

export type { Recommendation } from './types'
