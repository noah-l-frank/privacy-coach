import type { DetectionResult } from '@/services/detection'
import { scoringRules, type ScoringContext } from './scoringRules'

export type ScoreDeduction = {
  id: string
  title: string
  description: string
  penalty: number
}

export type SkippedScoreFactor = {
  id: string
  title: string
  description: string
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

export function getSkippedScoreFactors(
  result: DetectionResult,
  context?: ScoringContext,
): SkippedScoreFactor[] {
  return scoringRules
    .filter((rule) => !rule.applies(result, context))
    .map((rule) => ({
      id: rule.id,
      title: rule.title,
      description: rule.skippedDescription?.(result, context),
    }))
    .filter((factor): factor is SkippedScoreFactor => Boolean(factor.description))
}
