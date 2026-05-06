import { createDriver } from './helpers/createDriver'
import { readScanResult } from './helpers/readScanResult'

async function run() {
  const driver = await createDriver('firefox')

  try {
    const result = await readScanResult(driver)

    if (result.browserFamily !== 'firefox') {
      throw new Error(`Expected firefox browserFamily but got ${result.browserFamily}`)
    }

    if (result.browser !== 'firefox') {
      throw new Error(`Expected firefox browser but got ${result.browser}`)
    }

    console.log('✅ Firefox scan test passed')
    console.log(result)
  } finally {
    await driver.quit()
  }
}

run()
