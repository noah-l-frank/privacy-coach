import { createDriver } from './helpers/createDriver'
import { readScanResult } from './helpers/readScanResult'
import { browserConfigs } from './browserConfigs'
import { assertScanResult } from './helpers/assertScanResult'

async function run() {
  const config = browserConfigs[0]

  const driver = await createDriver(config.browser)

  try {
    const result = await readScanResult(driver)

    assertScanResult(result, config)

    console.log('✅ Firefox scan test passed')
    console.log(result)
  } finally {
    await driver.quit()
  }
}

run()
