import type { DetectionResult } from '@/services/detection'

type ScoringRule = {
  id: string
  penalty: number
  applies: (result: DetectionResult) => boolean
}

export const scoringRules: ScoringRule[] = [
  {
    id: 'google-chrome',
    penalty: 15,
    applies: (result) => result.browser === 'chrome',
  },

  {
    id: 'opera',
    penalty: 12,
    applies: (result) => result.browser === 'opera',
  },

  {
    id: 'microsoft-edge',
    penalty: 10,
    applies: (result) => result.browser === 'edge',
  },

  {
    id: 'brave',
    penalty: 5,
    applies: (result) => result.browser === 'brave',
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
