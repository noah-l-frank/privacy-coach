import type { FingerprintingExposure, FingerprintingRiskLevel } from './types'

export function countFingerprintingExposure(exposure: FingerprintingExposure): number {
  return Object.values(exposure).filter(Boolean).length
}

export function hasHighFingerprintingExposure(exposure: FingerprintingExposure): boolean {
  return countFingerprintingExposure(exposure) >= 7
}

export function hasMediumFingerprintingExposure(exposure: FingerprintingExposure): boolean {
  const exposedSignals = countFingerprintingExposure(exposure)

  return exposedSignals >= 4 && exposedSignals < 7
}

export function getFingerprintingRiskLevel(
  exposure: FingerprintingExposure,
): FingerprintingRiskLevel {
  if (hasHighFingerprintingExposure(exposure)) return 'high'
  if (hasMediumFingerprintingExposure(exposure)) return 'medium'

  return 'low'
}
