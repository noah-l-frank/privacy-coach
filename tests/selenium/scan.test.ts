import { createDriver } from './helpers/createDriver'
import { readScanResult } from './helpers/readScanResult'
import { browserConfigs } from './browserConfigs'
import { assertScanResult } from './helpers/assertScanResult'

async function run() {
  const verbose = process.env.VERBOSE === 'true'

  for (const config of browserConfigs) {
    const driver = await createDriver(config)

    try {
      const result = await readScanResult(driver)

      assertScanResult(result, config)

      console.log(`${config.name} ✅`)
      if (verbose) {
        console.log(result)
      }
    } finally {
      await driver.quit()
    }
  }
}

run()
