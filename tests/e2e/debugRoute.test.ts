import { expect, test } from '@playwright/test'

const baseUrl = 'http://localhost:4173'

test('debug scan route is not available in normal production preview builds', async ({ page }) => {
  await page.goto(`${baseUrl}/debug/scan`)

  await expect(page.locator('[data-testid="scan-result"]')).toHaveCount(0)
})
