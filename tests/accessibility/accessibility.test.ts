import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('homepage should not have accessibility violations', async ({ page }) => {
  await page.goto('http://127.0.0.1:4173')

  const results = await new AxeBuilder({ page }).analyze()

  expect(results.violations).toEqual([])
})
