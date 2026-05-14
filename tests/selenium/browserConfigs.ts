type BrowserConfig = {
  name: string
  browser: string
  expected: {
    browserFamily: string
    browser: string
    os: string
    gpc: boolean
    cookiesEnabled: boolean
    https: boolean
  }
  settings?: Record<string, string | number | boolean>
}

function getExpectedOs() {
  if (process.platform === 'win32') return 'windows'
  if (process.platform === 'darwin') return 'macos'

  return 'linux'
}

// The expected OS depends on the platform the Selenium tests are executed on.
// This keeps the tests portable across Linux, macOS, and Windows environments.
// TODO: Validate OS detection against real operating systems using
// Selenium Grid or BrowserStack instead of relying on the local host OS.
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
    },
  },
]
