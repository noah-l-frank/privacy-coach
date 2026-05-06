import { Builder, By, until } from 'selenium-webdriver'

const appUrl = 'http://localhost:5173'

async function run() {
  const driver = await new Builder().forBrowser('firefox').build()

  try {
    await driver.get(appUrl)

    const heading = await driver.wait(until.elementLocated(By.css('h1')), 5000)

    const text = await heading.getText()

    if (!text.includes('Understand your browser privacy setup')) {
      throw new Error(`Unexpected heading: ${text}`)
    }

    console.log('✅ Selenium test passed')
  } finally {
    await driver.quit()
  }
}

run()
