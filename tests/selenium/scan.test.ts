import { Builder, By, until } from 'selenium-webdriver'

const appUrl = 'http://localhost:5173/debug/scan'

async function run() {
  const driver = await new Builder().forBrowser('firefox').build()

  try {
    await driver.get(appUrl)

    const pre = await driver.wait(until.elementLocated(By.css('[data-testid="scan-result"]')), 5000)

    const rawJson = await pre.getText()

    const result = JSON.parse(rawJson)

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
