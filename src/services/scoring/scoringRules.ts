import type { DetectionResult } from '@/services/detection'
import {
  hasHighFingerprintingExposure,
  hasMediumFingerprintingExposure,
} from '@/services/detection'

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
    id: 'unknown-browser',
    penalty: 8,
    applies: (result) => result.browser === 'unknown',
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

  {
    id: 'persistent-cookies-writable',
    penalty: 5,
    applies: (result) => result.cookieSettings.persistentCookieWritable,
  },

  {
    id: 'medium-fingerprinting-exposure',
    penalty: 6,
    applies: (result) => hasMediumFingerprintingExposure(result.fingerprintingExposure),
  },

  {
    id: 'high-fingerprinting-exposure',
    penalty: 12,
    applies: (result) => hasHighFingerprintingExposure(result.fingerprintingExposure),
  },
]
