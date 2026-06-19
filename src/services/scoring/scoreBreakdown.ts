import type { DetectionResult } from '@/services/detection'
import { scoringRules, type ScoringContext } from './scoringRules'

export type ScoreDeduction = {
  id: string
  title: string
  description: string
  penalty: number
}

export function getScoreDeductions(
  result: DetectionResult,
  context?: ScoringContext,
): ScoreDeduction[] {
  return scoringRules
    .filter((rule) => rule.applies(result, context))
    .map((rule) => ({
      id: rule.id,
      title: rule.title,
      description: rule.description,
      penalty: rule.penalty,
    }))
}
