import type { DetectionResult } from '@/services/detection'

type ScoringRule = {
  id: string
  penalty: number
  applies: (result: DetectionResult) => boolean
}

export const scoringRules: ScoringRule[] = [
  {
    id: 'chromium-browser-family',
    penalty: 15,
    applies: (result) => result.browserFamily === 'chromium',
  },

  {
    id: 'google-chrome',
    penalty: 5,
    applies: (result) => result.browser === 'Google Chrome',
  },

  {
    id: 'no-https',
    penalty: 25,
    applies: (result) => !result.https,
  },

  {
    id: 'gpc-disabled',
    penalty: 10,
    applies: (result) => !result.gpc,
  },

  {
    id: 'cookies-enabled',
    penalty: 10,
    applies: (result) => result.cookiesEnabled,
  },
]
