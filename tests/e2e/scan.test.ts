import { expect, test } from '@playwright/test'

test('answers follow up questions', async ({ page }) => {
  await page.goto('http://localhost:4173')

  await page.getByRole('button', { name: /start scan/i }).click()

  await page.getByRole('button', { name: /i prefer more privacy/i }).click()

  await expect(
    page.getByText(/which search engine do you usually use/i),
  ).toBeVisible()
})
