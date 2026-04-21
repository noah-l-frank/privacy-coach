import type { DetectionResult } from './detection'

export type FollowUpQuestion = {
  id: string
  title: string
  description: string
  options: {
    value: string
    label: string
  }[]
}

export function getNextFollowUpQuestion(
  result: DetectionResult,
  answers: Record<string, string>,
): FollowUpQuestion | null {
  const browser = result.browser.toLowerCase()

  if (result.cookiesEnabled && !answers.cookie_preference) {
    return {
      id: 'cookie_preference',
      title: 'What matters more to you while browsing?',
      description: 'Some browser settings improve convenience, while others improve privacy.',
      options: [
        { value: 'privacy', label: 'I prefer more privacy' },
        { value: 'balanced', label: 'I want a balance' },
        { value: 'convenience', label: 'I prefer convenience' },
      ],
    }
  }

  if (!result.adblock && !answers.adblock_interest) {
    return {
      id: 'adblock_interest',
      title: 'Would you like fewer ads and less tracking while browsing?',
      description: 'Ad and tracker blocking can improve privacy and reduce distractions.',
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'maybe', label: 'Maybe' },
        { value: 'no', label: 'No' },
      ],
    }
  }

  if (isChromiumLike(browser) && !answers.browser_switch_willingness) {
    return {
      id: 'browser_switch_willingness',
      title: 'Would you be open to trying a different browser for better privacy?',
      description: 'Some browsers offer stronger privacy protections by default.',
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'maybe', label: 'Maybe' },
        { value: 'no', label: 'No' },
      ],
    }
  }

  if (
    isChromiumLike(browser) &&
    (answers.browser_switch_willingness === 'yes' ||
      answers.browser_switch_willingness === 'maybe') &&
    !answers.browser_switch_similarity
  ) {
    return {
      id: 'browser_switch_similarity',
      title: 'How important is it that a new browser feels familiar?',
      description: 'Some alternatives feel very similar, while others are more different.',
      options: [
        { value: 'high', label: 'Very important' },
        { value: 'medium', label: 'Somewhat important' },
        { value: 'low', label: 'Not important' },
      ],
    }
  }

  if (!result.dnt && !answers.tracking_protection_preference) {
    return {
      id: 'tracking_protection_preference',
      title: 'Would you like your browser to reduce tracking as much as possible?',
      description: 'Some browsers and settings can reduce tracking more aggressively than others.',
      options: [
        { value: 'high', label: 'Yes, as much as possible' },
        { value: 'medium', label: 'Somewhat' },
        { value: 'low', label: 'Not really' },
      ],
    }
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
