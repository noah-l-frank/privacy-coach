export function detectBrowser(userAgent: string): { browserFamily: string; browser: string } {
  if (userAgent.includes('firefox')) {
    return {
      browserFamily: 'firefox',
      browser: 'firefox',
    }
  }

  if (userAgent.includes('edg')) {
    return {
      browserFamily: 'chromium',
      browser: 'edge',
    }
  }

  if (userAgent.includes('opr') || userAgent.includes('opera')) {
    return {
      browserFamily: 'chromium',
      browser: 'opera',
    }
  }

  // Chrome and Chromium user agents also contain "safari"
  if (
    userAgent.includes('safari') &&
    !userAgent.includes('chrome') &&
    !userAgent.includes('chromium')
  ) {
    return {
      browserFamily: 'webkit',
      browser: 'safari',
    }
  }

  if (userAgent.includes('chrome') || userAgent.includes('chromium')) {
    return {
      browserFamily: 'chromium',
      browser: 'chrome',
    }
  }

  return {
    browserFamily: 'unknown',
    browser: 'unknown',
  }
}
