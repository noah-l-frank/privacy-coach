import { createDriver } from './helpers/createDriver'
import { readScanResult } from './helpers/readScanResult'
import { browserConfigs } from './browserConfigs'

async function run() {
  const config = browserConfigs[0]

  const driver = await createDriver(config.browser)

  try {
    const result = await readScanResult(driver)

    if (result.browserFamily !== config.expected.browserFamily) {
      throw new Error(`Expected firefox browserFamily but got ${result.browserFamily}`)
    }

    if (result.browser !== config.expected.browser) {
      throw new Error(`Expected firefox browser but got ${result.browser}`)
    }

    console.log('✅ Firefox scan test passed')
    console.log(result)
  } finally {
    await driver.quit()
  }
}

run()
