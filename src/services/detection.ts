// globalPrivacyControl is not yet included in TypeScript's Navigator type

const test: string = 123

type NavigatorWithGPC = Navigator & {
  globalPrivacyControl?: boolean
}

export type DetectionResult = {
  browserFamily: string
  browser: string
  os: string
  gpc: boolean
  cookiesEnabled: boolean
  https: boolean
}

export function detectOS(userAgent: string): string {
  if (userAgent.includes('win')) return 'windows'
  if (userAgent.includes('mac')) return 'macos'
  if (userAgent.includes('linux')) return 'linux'
  return 'unknown'
}

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

export function detectEnvironment(): DetectionResult {
  const userAgent = navigator.userAgent.toLowerCase()
  const { browserFamily, browser } = detectBrowser(userAgent)
  const os = detectOS(userAgent)
  const gpc = (navigator as NavigatorWithGPC).globalPrivacyControl === true
  const cookiesEnabled = navigator.cookieEnabled
  const https = window.location.protocol === 'https:'

  return {
    browserFamily,
    browser,
    os,
    gpc,
    cookiesEnabled,
    https,
  }
}
