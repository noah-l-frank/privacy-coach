import { afterEach, describe, it, expect, vi } from 'vitest'
import {
  detectOS,
  detectBrowser,
  detectDeviceType,
  detectEnvironment,
  getFingerprintingRiskLevel,
} from '../../detection'
import { detectBrowserEnvironment } from '@/services/detection/browserDetection'

vi.mock('@/services/detection/fingerprintingDetection', () => ({
  detectFingerprintingExposure: () => ({
    deviceMemory: false,
    hardwareConcurrency: false,
    webGl: false,
    canvas: false,
    audioContext: false,
    screen: false,
    timezone: false,
    languages: false,
    platform: false,
    touchSupport: false,
  }),
}))

afterEach(() => {
  Object.defineProperty(navigator, 'brave', {
    configurable: true,
    value: undefined,
  })
})

describe('detectOS', () => {
  it('detects windows', () => {
    expect(detectOS('windows nt 10.0')).toBe('windows')
  })

  it('detects macos', () => {
    expect(detectOS('macintosh')).toBe('macos')
  })

  it('detects ios before macos', () => {
    expect(detectOS('mozilla/5.0 (iphone; cpu iphone os 17_0 like mac os x)')).toBe('ios')
  })

  it('detects android before linux', () => {
    expect(detectOS('mozilla/5.0 (linux; android 14; pixel 8)')).toBe('android')
  })

  it('detects linux', () => {
    expect(detectOS('linux x86_64')).toBe('linux')
  })

  it('returns unknown for unsupported systems', () => {
    expect(detectOS('some-random-os')).toBe('unknown')
  })
})

describe('detectDeviceType', () => {
  it('detects desktop devices', () => {
    expect(detectDeviceType('mozilla/5.0 (x11; linux x86_64)')).toBe('desktop')
  })

  it('detects mobile devices', () => {
    expect(detectDeviceType('mozilla/5.0 (iphone; cpu iphone os 17_0 like mac os x)')).toBe(
      'mobile',
    )
  })

  it('detects tablets', () => {
    expect(detectDeviceType('mozilla/5.0 (linux; android 14; tablet)')).toBe('tablet')
  })

  it('returns unknown for unsupported devices', () => {
    expect(detectDeviceType('some-random-device')).toBe('unknown')
  })
})

describe('detectEnvironment', () => {
  it('returns all required fields', async () => {
    const result = await detectEnvironment()

    expect(result).toHaveProperty('browserFamily')
    expect(result).toHaveProperty('browser')
    expect(result).toHaveProperty('os')
    expect(result).toHaveProperty('deviceType')
    expect(result).toHaveProperty('gpc')
    expect(result).toHaveProperty('cookiesEnabled')
    expect(result).toHaveProperty('https')
  })

  it('returns values with the expected types', async () => {
    const result = await detectEnvironment()

    expect(typeof result.browserFamily).toBe('string')
    expect(typeof result.browser).toBe('string')
    expect(typeof result.os).toBe('string')
    expect(typeof result.deviceType).toBe('string')
    expect(typeof result.gpc).toBe('boolean')
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

  it('detects Safari correctly', () => {
    const result = detectBrowser(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_4) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15'.toLowerCase(),
    )

    expect(result).toEqual({
      browserFamily: 'webkit',
      browser: 'safari',
    })
  })

  it('detects Chrome on iOS separately from Safari', () => {
    const result = detectBrowser(
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/122.0.0.0 Mobile/15E148 Safari/604.1'.toLowerCase(),
    )

    expect(result).toEqual({
      browserFamily: 'webkit',
      browser: 'chrome-ios',
    })
  })

  it('detects Firefox on iOS separately from Safari', () => {
    const result = detectBrowser(
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/124.0 Mobile/15E148 Safari/605.1.15'.toLowerCase(),
    )

    expect(result).toEqual({
      browserFamily: 'webkit',
      browser: 'firefox-ios',
    })
  })

  it('detects Samsung Internet correctly', () => {
    const result = detectBrowser(
      'Mozilla/5.0 (Linux; Android 14; SAMSUNG SM-S928B) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/24.0 Chrome/122.0.0.0 Mobile Safari/537.36'.toLowerCase(),
    )

    expect(result).toEqual({
      browserFamily: 'chromium',
      browser: 'samsung-internet',
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

  it('detects Brave via navigator.brave API', async () => {
    Object.defineProperty(navigator, 'brave', {
      configurable: true,
      value: {
        isBrave: async () => true,
      },
    })

    const result = await detectBrowserEnvironment(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'.toLowerCase(),
    )

    expect(result).toEqual({
      browserFamily: 'chromium',
      browser: 'brave',
    })
  })

  it('returns unknown for unsupported browsers', () => {
    const result = detectBrowser('some-random-browser')

    expect(result).toEqual({
      browserFamily: 'unknown',
      browser: 'unknown',
    })
  })


})

describe('getFingerprintingRiskLevel', () => {
  it('returns low when few fingerprinting signals are exposed', () => {
    expect(
      getFingerprintingRiskLevel({
        deviceMemory: true,
        hardwareConcurrency: false,
        webGl: false,
        canvas: false,
        audioContext: false,
        screen: false,
        timezone: false,
        languages: false,
        platform: false,
        touchSupport: false,
      }),
    ).toBe('low')
  })

  it('returns medium when several fingerprinting signals are exposed', () => {
    expect(
      getFingerprintingRiskLevel({
        deviceMemory: true,
        hardwareConcurrency: true,
        webGl: true,
        canvas: true,
        audioContext: false,
        screen: false,
        timezone: false,
        languages: false,
        platform: false,
        touchSupport: false,
      }),
    ).toBe('medium')
  })

  it('returns high when many fingerprinting signals are exposed', () => {
    expect(
      getFingerprintingRiskLevel({
        deviceMemory: true,
        hardwareConcurrency: true,
        webGl: true,
        canvas: true,
        audioContext: true,
        screen: true,
        timezone: true,
        languages: false,
        platform: false,
        touchSupport: false,
      }),
    ).toBe('high')
  })
})
