import { Builder } from 'selenium-webdriver'

export function createDriver(browser: string) {
  return new Builder().forBrowser(browser).build()
}
