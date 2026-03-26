import { describe, it, expect } from 'vitest'
import { detectEnvironment } from '../detection'

describe('detectEnvironment', () => {
  it('returns all required fields', () => {
    const result = detectEnvironment()

    expect(result).toHaveProperty('browser')
    expect(result).toHaveProperty('os')
    expect(result).toHaveProperty('language')
    expect(result).toHaveProperty('timezone')
    expect(result).toHaveProperty('dnt')
    expect(result).toHaveProperty('cookiesEnabled')
    expect(result).toHaveProperty('https')
    expect(result).toHaveProperty('adblock')
  })

  it('returns values with the expected types', () => {
    const result = detectEnvironment()

    expect(typeof result.browser).toBe('string')
    expect(typeof result.os).toBe('string')
    expect(typeof result.language).toBe('string')
    expect(typeof result.timezone).toBe('string')
    expect(typeof result.dnt).toBe('boolean')
    expect(typeof result.cookiesEnabled).toBe('boolean')
    expect(typeof result.https).toBe('boolean')
    expect(typeof result.adblock).toBe('boolean')
  })
})
