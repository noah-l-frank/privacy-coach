import { Builder } from 'selenium-webdriver'
import firefox from 'selenium-webdriver/firefox'
import type { browserConfigs } from '../browserConfigs'

type BrowserConfig = (typeof browserConfigs)[number]

export function createDriver(config: BrowserConfig) {
  const builder = new Builder().forBrowser(config.browser)

  if (config.browser === 'firefox') {
    const options = new firefox.Options()

    for (const [key, value] of Object.entries(config.settings ?? {})) {
      options.setPreference(key, value)
    }

    builder.setFirefoxOptions(options)
  }

  return builder.build()
}
