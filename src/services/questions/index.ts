import type { DetectionResult } from '@/services/detection'
import type { FollowUpQuestion } from './types'
import { questionContent } from './questionContent'

export function getNextFollowUpQuestion(
  result: DetectionResult,
  answers: Record<string, string>,
): FollowUpQuestion | null {
  const browser = result.browser.toLowerCase()

  if (result.cookiesEnabled && !answers.privacy_preference) {
    return questionContent.privacy_preference
  }

  if (
    (answers.privacy_preference === 'privacy' || answers.privacy_preference === 'balanced') &&
    !answers.search_engine
  ) {
    return questionContent.search_engine
  }

  if (answers.privacy_preference !== 'convenience' && !answers.password_management) {
    return questionContent.password_management
  }

  if (answers.privacy_preference === 'privacy' && !answers.vpn_usage) {
    return questionContent.vpn_usage
  }

  if (answers.privacy_preference !== 'convenience' && !answers.adblock_usage) {
    return questionContent.adblock_usage
  }

  if (isChromiumLike(browser) && !answers.browser_switch_willingness) {
    return questionContent.browser_switch_willingness
  }

  if (
    isChromiumLike(browser) &&
    (answers.browser_switch_willingness === 'yes' ||
      answers.browser_switch_willingness === 'maybe') &&
    !answers.browser_switch_similarity
  ) {
    return questionContent.browser_switch_similarity
  }

  if (!result.gpc && !answers.tracking_protection_preference) {
    return questionContent.tracking_protection_preference
  }

  return null
}

function isChromiumLike(browser: string): boolean {
  return (
    browser.includes('chrome') ||
    browser.includes('edge') ||
    browser.includes('opera') ||
    browser.includes('brave')
  )
}
