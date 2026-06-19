import type { DetectionResult } from '@/services/detection'
import { scoringRules, type ScoringContext } from './scoringRules'

export function calculatePrivacyScore(
  result: DetectionResult,
  context?: ScoringContext,
): number {
  const totalPenalty = scoringRules
    .filter((rule) => rule.applies(result, context))
    .reduce((sum, rule) => sum + rule.penalty, 0)

  return Math.max(0, Math.min(100, 100 - totalPenalty))
}

export {
  getScoreDeductions,
  type ScoreDeduction,
} from './scoreBreakdown'

export type { ScoringContext } from './scoringRules'
