type BrowserDetection = {
  browserFamily: string
  browser: string
}

const UNKNOWN_BROWSER: BrowserDetection = {
  browserFamily: 'unknown',
  browser: 'unknown',
}

// Order matters because Chromium-based browsers often include "chrome" in their user agent string.
const browserRules = [
  {
    tokens: ['firefox'],
    browserFamily: 'firefox',
    browser: 'firefox',
  },
  {
    tokens: ['edg'],
    browserFamily: 'chromium',
    browser: 'edge',
  },
  {
    tokens: ['opr', 'opera'],
    browserFamily: 'chromium',
    browser: 'opera',
  },
  {
    tokens: ['brave'],
    browserFamily: 'chromium',
    browser: 'brave',
  },
  {
    tokens: ['chrome', 'chromium'],
    browserFamily: 'chromium',
    browser: 'chrome',
  },
] satisfies Array<
  BrowserDetection & {
    tokens: string[]
  }
>

export function detectBrowser(userAgent: string): BrowserDetection {
  const ua = userAgent.toLowerCase()

  const match = browserRules.find((rule) =>
    rule.tokens.some((token) => ua.includes(token)),
  )

  if (!match) return UNKNOWN_BROWSER

  return {
    browserFamily: match.browserFamily,
    browser: match.browser,
  }
}
