import type { FingerprintingExposure } from './types'

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
