type BrowserDetection = {
  browserFamily: string
  browser: string
}

type BraveNavigator = Navigator & {
  brave?: {
    isBrave?: () => Promise<boolean>
  }
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
    tokens: ['fxios'],
    browserFamily: 'webkit',
    browser: 'firefox-ios',
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
    tokens: ['samsungbrowser'],
    browserFamily: 'chromium',
    browser: 'samsung-internet',
  },
  {
    tokens: ['brave'],
    browserFamily: 'chromium',
    browser: 'brave',
  },
  {
    tokens: ['crios'],
    browserFamily: 'webkit',
    browser: 'chrome-ios',
  },
  {
    tokens: ['chrome', 'chromium'],
    browserFamily: 'chromium',
    browser: 'chrome',
  },
  {
    tokens: ['safari'],
    excludedTokens: ['chrome', 'chromium', 'crios', 'fxios', 'edg', 'opr', 'opera', 'android'],
    browserFamily: 'webkit',
    browser: 'safari',
  },
] satisfies Array<
  BrowserDetection & {
    tokens: string[]
    excludedTokens?: string[]
  }
>

async function detectBrave(): Promise<boolean> {
  const brave = (navigator as BraveNavigator).brave

  if (typeof brave?.isBrave !== 'function') {
    return false
  }

  try {
    return await brave.isBrave()
  } catch {
    return false
  }
}

export async function detectBrowserEnvironment(userAgent: string): Promise<BrowserDetection> {
  if (await detectBrave()) {
    return {
      browserFamily: 'chromium',
      browser: 'brave',
    }
  }

  return detectBrowser(userAgent)
}


export function detectBrowser(userAgent: string): BrowserDetection {
  const ua = userAgent.toLowerCase()

  const match = browserRules.find((rule) =>
    rule.tokens.some((token) => ua.includes(token)) &&
    !rule.excludedTokens?.some((token) => ua.includes(token)),
  )

  if (!match) return UNKNOWN_BROWSER

  return {
    browserFamily: match.browserFamily,
    browser: match.browser,
  }
}
