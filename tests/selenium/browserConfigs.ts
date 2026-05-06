export const browserConfigs = [
  {
    name: 'firefox-default',
    browser: 'firefox',
    expected: {
      browserFamily: 'firefox',
      browser: 'firefox',
    },
  },
  {
    name: 'chrome-default',
    browser: 'chrome',
    expected: {
      browserFamily: 'chromium',
      browser: 'chrome',
    },
  },
  {
    name: 'edge-default',
    browser: 'MicrosoftEdge',
    expected: {
      browserFamily: 'chromium',
      browser: 'microsoft-edge',
    },
  },
]
