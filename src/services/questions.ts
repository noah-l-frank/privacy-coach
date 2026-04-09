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

export function getFollowUpQuestions(result: DetectionResult): FollowUpQuestion[] {
  const questions: FollowUpQuestion[] = []

  if (!result.dnt) {
    questions.push({
      id: 'dnt_preference',
      title: 'How important is tracking protection to you?',
      description: 'Your browser is not sending a Do Not Track signal.',
      options: [
        { value: 'high', label: 'Very important' },
        { value: 'medium', label: 'Somewhat important' },
        { value: 'low', label: 'Not very important' },
      ],
    })
  }

  if (result.cookiesEnabled) {
    questions.push({
      id: 'cookie_preference',
      title: 'How do you feel about website convenience vs. privacy?',
      description: 'Cookies are enabled in your browser.',
      options: [
        { value: 'privacy', label: 'I prefer more privacy' },
        { value: 'balanced', label: 'I want a balance' },
        { value: 'convenience', label: 'I prefer convenience' },
      ],
    })
  }

  if (result.browser === 'chrome') {
    questions.push({
      id: 'browser_switch_similarity',
      title: 'How important is it to keep a similar look and feel when switching browsers?',
      description: 'You are currently using Google Chrome.',
      options: [
        { value: 'high', label: 'Very important' },
        { value: 'medium', label: 'Somewhat important' },
        { value: 'low', label: 'Not important' },
      ],
    })
  }

  if (result.browser === 'edge' || result.browser === 'opera') {
    questions.push({
      id: 'browser_switch_willingness',
      title: 'How willing are you to switch to a different browser for better privacy?',
      description: 'You are currently using a Chromium-based browser.',
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'maybe', label: 'Maybe' },
        { value: 'no', label: 'No' },
      ],
    })
  }

  if (result.browser === 'firefox') {
    questions.push({
      id: 'firefox_privacy_importance',
      title: 'How important is privacy to you when browsing the web?',
      description: 'You are already using Firefox.',
      options: [
        { value: 'high', label: 'Very important' },
        { value: 'medium', label: 'Somewhat important' },
        { value: 'low', label: 'Not very important' },
      ],
    })
  }

  return questions
}
