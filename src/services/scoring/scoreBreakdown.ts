import type { DetectionResult } from '@/services/detection'
import {
  hasHighFingerprintingExposure,
  hasMediumFingerprintingExposure,
} from '@/services/detection'
import { scoringRules } from './scoringRules'

export type ScoreDeduction = {
  id: string
  title: string
  description: string
  penalty: number
}

export type PositiveScoreFactor = {
  id: string
  title: string
  description: string
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

export function getPositiveScoreFactors(result: DetectionResult): PositiveScoreFactor[] {
  const factors: PositiveScoreFactor[] = []

  if (result.https) {
    factors.push({
      id: 'https-enabled',
      title: 'HTTPS is enabled',
      description: 'The current page is loaded over an encrypted connection.',
    })
  }

  if (result.gpc) {
    factors.push({
      id: 'gpc-enabled',
      title: 'Global Privacy Control is enabled',
      description: 'Your browser is sending a privacy preference signal.',
    })
  }

  if (!result.cookieSettings.persistentCookieWritable) {
    factors.push({
      id: 'persistent-cookies-limited',
      title: 'Persistent cookies are limited',
      description: 'Privacy Coach could not write a persistent test cookie.',
    })
  }

  if (
    !hasMediumFingerprintingExposure(result.fingerprintingExposure) &&
    !hasHighFingerprintingExposure(result.fingerprintingExposure)
  ) {
    factors.push({
      id: 'fingerprinting-exposure-limited',
      title: 'Fingerprinting exposure is limited',
      description: 'Only a small number of browser fingerprinting signals are exposed.',
    })
  }

  return factors
}
