import { describe, it, expect } from 'vitest'
import { detectOS, detectBrowser, detectEnvironment } from '../detection'

describe('detectOS', () => {
  it('detects windows', () => {
    expect(detectOS('windows nt 10.0')).toBe('windows')
  })

  it('detects macos', () => {
    expect(detectOS('macintosh')).toBe('macos')
  })

  it('detects linux', () => {
    expect(detectOS('linux x86_64')).toBe('linux')
  })

  it('returns unknown for unsupported systems', () => {
    expect(detectOS('some-random-os')).toBe('unknown')
  })
})

describe('detectEnvironment', () => {
  it('returns all required fields', () => {
    const result = detectEnvironment()

    expect(result).toHaveProperty('browserFamily')
    expect(result).toHaveProperty('browser')
    expect(result).toHaveProperty('os')
    expect(result).toHaveProperty('language')
    expect(result).toHaveProperty('timezone')
    expect(result).toHaveProperty('dnt')
    expect(result).toHaveProperty('cookiesEnabled')
    expect(result).toHaveProperty('https')
  })

  it('returns values with the expected types', () => {
    const result = detectEnvironment()

    expect(typeof result.browserFamily).toBe('string')
    expect(typeof result.browser).toBe('string')
    expect(typeof result.os).toBe('string')
    expect(typeof result.language).toBe('string')
    expect(typeof result.timezone).toBe('string')
    expect(typeof result.dnt).toBe('boolean')
    expect(typeof result.cookiesEnabled).toBe('boolean')
    expect(typeof result.https).toBe('boolean')
  })
})

describe('detectBrowser', () => {
  it('detects Firefox correctly', () => {
    const result = detectBrowser(
      'Mozilla/5.0 (X11; Linux x86_64; rv:123.0) Gecko/20100101 Firefox/123.0'.toLowerCase(),
    )

    expect(result).toEqual({
      browserFamily: 'firefox',
      browser: 'firefox',
    })
  })

  it('detects Edge correctly', () => {
    const result = detectBrowser(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 Edg/122.0.0.0'.toLowerCase(),
    )

    expect(result).toEqual({
      browserFamily: 'chromium',
      browser: 'edge',
    })
  })

  it('detects Opera correctly', () => {
    const result = detectBrowser(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 OPR/106.0.0.0'.toLowerCase(),
    )

    expect(result).toEqual({
      browserFamily: 'chromium',
      browser: 'opera',
    })
  })

  it('detects Chrome correctly', () => {
    const result = detectBrowser(
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'.toLowerCase(),
    )

    expect(result).toEqual({
      browserFamily: 'chromium',
      browser: 'chrome',
    })
  })

  it('prioritizes Edge over Chrome when both tokens are present', () => {
    const result = detectBrowser(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 Edg/122.0.0.0'.toLowerCase(),
    )

    expect(result.browser).toBe('edge')
  })

  it('prioritizes Opera over Chrome when both tokens are present', () => {
    const result = detectBrowser(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 OPR/106.0.0.0'.toLowerCase(),
    )

    expect(result.browser).toBe('opera')
  })

  it('returns unknown for unsupported browsers', () => {
    const result = detectBrowser('some-random-browser')

    expect(result).toEqual({
      browserFamily: 'unknown',
      browser: 'unknown',
    })
  })
})
