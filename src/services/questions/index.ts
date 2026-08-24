import type { DetectionResult } from '@/services/detection'
import type { FollowUpQuestion } from './types'
import { questionContent } from './questionContent'
import { questionFlow } from './questionFlow'

export function getNextFollowUpQuestion(
  result: DetectionResult,
  answers: Record<string, string>,
): FollowUpQuestion | null {
  const nextQuestionRule = questionFlow.find((rule) => rule.shouldAsk({ result, answers }))

  if (!nextQuestionRule) return null

  return questionContent[nextQuestionRule.id]
}
