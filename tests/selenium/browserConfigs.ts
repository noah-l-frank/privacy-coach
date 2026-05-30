import type { CookieSettings, FingerprintingExposure } from '../../src/services/detection/types'

type BrowserConfig = {
  name: string
  browser: string
  expected: {
    browserFamily: string
    browser: string
    os: string
    gpc: boolean
    cookiesEnabled: boolean
    https: boolean,
    fingerprintingExposure?: Partial<FingerprintingExposure>,
    cookieSettings?: Partial<CookieSettings>
  }
  settings?: Record<string, string | number | boolean>
}

function getExpectedOs() {
  if (process.platform === 'win32') return 'windows'
  if (process.platform === 'darwin') return 'macos'

  return 'linux'
}

// Future validation could run these checks against real operating systems
// with Selenium Grid or BrowserStack instead of relying on the local host OS.

const expectedOs = getExpectedOs()

const firefoxDefault: BrowserConfig = {
  name: 'firefox-default',
  browser: 'firefox',
  expected: {
    browserFamily: 'firefox',
    browser: 'firefox',
    os: expectedOs,
    gpc: false,
    cookiesEnabled: true,
    https: false,
    fingerprintingExposure: {
      deviceMemory: false,
    },
    cookieSettings: {
      cookiesEnabled: true,
      firstPartyCookieWritable: true,
      sessionCookieWritable: true,
      persistentCookieWritable: true,
    },
  },
}

const chromeDefault: BrowserConfig = {
  name: 'chrome-default',
  browser: 'chrome',
  expected: {
    browserFamily: 'chromium',
    browser: 'chrome',
    os: expectedOs,
    gpc: false,
    cookiesEnabled: true,
    https: false,
    fingerprintingExposure: {
      deviceMemory: true,
    },
    cookieSettings: {
      cookiesEnabled: true,
      firstPartyCookieWritable: true,
      sessionCookieWritable: true,
      persistentCookieWritable: true,
    },
  },
}

const edgeDefault: BrowserConfig = {
  name: 'edge-default',
  browser: 'MicrosoftEdge',
  expected: {
    browserFamily: 'chromium',
    browser: 'edge',
    os: expectedOs,
    gpc: false,
    cookiesEnabled: true,
    https: false,
    fingerprintingExposure: {
      deviceMemory: true,
    },
    cookieSettings: {
      cookiesEnabled: true,
      firstPartyCookieWritable: true,
      sessionCookieWritable: true,
      persistentCookieWritable: true,
    },
  },
}

export const browserConfigs: BrowserConfig[] = [
  firefoxDefault,
  chromeDefault,
  edgeDefault,
  {
    ...firefoxDefault,
    name: 'firefox-gpc-enabled',

    settings: {
      'privacy.globalprivacycontrol.enabled': true,
    },

    expected: {
      ...firefoxDefault.expected,
      gpc: true,
    },
  },
  {
    ...firefoxDefault,
    name: 'firefox-cookies-disabled',

    settings: {
      'network.cookie.cookieBehavior': 2,
    },

    expected: {
      ...firefoxDefault.expected,
      cookiesEnabled: false,
      cookieSettings: {
        cookiesEnabled: false,
        firstPartyCookieWritable: false,
        sessionCookieWritable: false,
        persistentCookieWritable: false,
      }
    },
  },
]
