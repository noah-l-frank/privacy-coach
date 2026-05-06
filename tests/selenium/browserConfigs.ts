function getExpectedOs() {
  if (process.platform === 'win32') return 'windows'
  if (process.platform === 'darwin') return 'macos'

  return 'linux'
}

// The expected OS depends on the platform the Selenium tests are executed on.
// This keeps the tests portable across Linux, macOS, and Windows environments.
const expectedOs = getExpectedOs()

export const browserConfigs = [
  {
    name: 'firefox-default',
    browser: 'firefox',
    expected: {
      browserFamily: 'firefox',
      browser: 'firefox',
      os: expectedOs,
    },
  },
  {
    name: 'chrome-default',
    browser: 'chrome',
    expected: {
      browserFamily: 'chromium',
      browser: 'chrome',
      os: expectedOs,
    },
  },
  {
    name: 'edge-default',
    browser: 'MicrosoftEdge',
    expected: {
      browserFamily: 'chromium',
      browser: 'edge',
      os: expectedOs,
    },
  },
]
