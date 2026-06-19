import { describe, expect, it } from 'vitest'
import { classifyFingerprintingProtectionSignals } from '../../detection'

describe('classifyFingerprintingProtectionSignals', () => {
  it('returns likely-active when canvas readback noise is detected', () => {
    expect(
      classifyFingerprintingProtectionSignals({
        canvasNoise: true,
        hardwareConcurrencyBucketed: false,
        touchPointsBucketed: false,
        screenDimensionsStandardized: false,
      }),
    ).toBe('likely-active')
  })

  it('returns likely-active when all weaker standardization signals are present', () => {
    expect(
      classifyFingerprintingProtectionSignals({
        canvasNoise: false,
        hardwareConcurrencyBucketed: true,
        touchPointsBucketed: true,
        screenDimensionsStandardized: true,
      }),
    ).toBe('likely-active')
  })

  it('returns inconclusive when only weak standardization signals are present', () => {
    expect(
      classifyFingerprintingProtectionSignals({
        canvasNoise: false,
        hardwareConcurrencyBucketed: true,
        touchPointsBucketed: false,
        screenDimensionsStandardized: false,
      }),
    ).toBe('inconclusive')
  })

  it('returns not-detected when no protection signals are present', () => {
    expect(
      classifyFingerprintingProtectionSignals({
        canvasNoise: false,
        hardwareConcurrencyBucketed: false,
        touchPointsBucketed: false,
        screenDimensionsStandardized: false,
      }),
    ).toBe('not-detected')
  })
})
