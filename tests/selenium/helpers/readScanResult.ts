import { By, until, type WebDriver } from 'selenium-webdriver'
import type { DetectionResult } from '../../../src/services/detection'

const appUrl = 'http://localhost:4173/debug/scan'

export async function readScanResult(driver: WebDriver): Promise<DetectionResult> {
  await driver.get(appUrl)

  const pre = await driver.wait(until.elementLocated(By.css('[data-testid="scan-result"]')), 5000)
  const rawJson = await pre.getText()

  return JSON.parse(rawJson) as DetectionResult
}
