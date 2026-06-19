import { expect, test } from '@playwright/test'

test.use({
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
  userAgent:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1',
})

test('mobile devices can start the privacy coach flow', async ({ page }) => {
  await page.goto('http://localhost:4173')

  await expect(
    page.getByRole('heading', {
      name: /understand your browser privacy setup/i,
    }),
  ).toBeVisible()
  await expect(page.getByText(/desktop only/i)).toHaveCount(0)

  await page.getByRole('button', { name: /start scan/i }).click()

  await expect(
    page.getByRole('heading', {
      name: /what matters more to you while browsing/i,
    }),
  ).toBeVisible()
})
