import type { DetectionResult } from '@/services/detection'

type QuestionContext = {
  result: DetectionResult
  answers: Record<string, string>
}

export type QuestionFlowRule = {
  id: string
  shouldAsk: (context: QuestionContext) => boolean
}

function isChromiumLike(browser: string): boolean {
  return (
    browser.includes('chrome') ||
    browser.includes('edge') ||
    browser.includes('opera') ||
    browser.includes('brave')
  )
}

export const questionFlow: QuestionFlowRule[] = [
  {
    id: 'privacy_preference',
    shouldAsk: ({ result, answers }) => result.cookiesEnabled && !answers.privacy_preference,
  },

  {
    id: 'search_engine',
    shouldAsk: ({ answers }) =>
      (answers.privacy_preference === 'privacy' || answers.privacy_preference === 'balanced') &&
      !answers.search_engine,
  },

  {
    id: 'password_management',
    shouldAsk: ({ answers }) =>
      answers.privacy_preference !== 'convenience' && !answers.password_management,
  },

  {
    id: 'vpn_usage',
    shouldAsk: ({ answers }) => answers.privacy_preference === 'privacy' && !answers.vpn_usage,
  },

  {
    id: 'adblock_usage',
    shouldAsk: ({ answers }) =>
      answers.privacy_preference !== 'convenience' && !answers.adblock_usage,
  },

  {
    id: 'browser_switch_willingness',
    shouldAsk: ({ result, answers }) =>
      isChromiumLike(result.browser.toLowerCase()) && !answers.browser_switch_willingness,
  },

  {
    id: 'browser_switch_similarity',
    shouldAsk: ({ result, answers }) =>
      isChromiumLike(result.browser.toLowerCase()) &&
      (answers.browser_switch_willingness === 'yes' ||
        answers.browser_switch_willingness === 'maybe') &&
      !answers.browser_switch_similarity,
  },

  {
    id: 'tracking_protection_preference',
    shouldAsk: ({ result, answers }) => !result.gpc && !answers.tracking_protection_preference,
  },
]
