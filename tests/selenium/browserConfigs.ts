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

export const browserConfigs = [
  {
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
  },
  {
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
  },
  {
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
  },

  // Safari tests only run on macOS environments with Safari WebDriver support
  ...(process.platform === 'darwin'
    ? [
        {
          name: 'safari-default',
          browser: 'safari',
          expected: {
            browserFamily: 'webkit',
            browser: 'safari',
            os: expectedOs,
            gpc: false,
            cookiesEnabled: true,
            https: false,
          },
        },
      ]
    : []),
]
