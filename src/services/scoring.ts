import type { DetectionResult } from '@/services/detection'

export function calculatePrivacyScore(result: DetectionResult): number {
  let score = 100

  if (result.browserFamily === 'chromium') score -= 15
  if (result.browser === 'Google Chrome') score -= 5
  if (!result.https) score -= 25
  if (!result.dnt) score -= 10
  if (result.cookiesEnabled) score -= 10

  return Math.max(0, Math.min(100, score))
}
