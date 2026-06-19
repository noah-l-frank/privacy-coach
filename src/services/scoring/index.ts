import type { DetectionResult } from '@/services/detection'
import { scoringRules } from './scoringRules'

export function calculatePrivacyScore(result: DetectionResult): number {
  const totalPenalty = scoringRules
    .filter((rule) => rule.applies(result))
    .reduce((sum, rule) => sum + rule.penalty, 0)

  return Math.max(0, Math.min(100, 100 - totalPenalty))
}

export {
  getPositiveScoreFactors,
  getScoreDeductions,
  type PositiveScoreFactor,
  type ScoreDeduction,
} from './scoreBreakdown'
