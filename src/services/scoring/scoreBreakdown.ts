import type { DetectionResult } from '@/services/detection'
import { scoringRules } from './scoringRules'

export type ScoreDeduction = {
  id: string
  title: string
  description: string
  penalty: number
}

export function getScoreDeductions(result: DetectionResult): ScoreDeduction[] {
  return scoringRules
    .filter((rule) => rule.applies(result))
    .map((rule) => ({
      id: rule.id,
      title: rule.title,
      description: rule.description,
      penalty: rule.penalty,
    }))
}
