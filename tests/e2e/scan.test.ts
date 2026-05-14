import { expect, test } from '@playwright/test'

test('loads the application', async ({ page }) => {
  await page.goto('http://localhost:4173')

  await expect(page.locator('body')).toBeVisible()
})
