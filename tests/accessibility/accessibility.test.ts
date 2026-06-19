import { test, expect, type Page } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const baseUrl = 'http://localhost:4173'

async function expectNoAccessibilityViolations(page: Page) {
  const results = await new AxeBuilder({ page }).analyze()

  expect(results.violations).toEqual([])
}

async function completeFlowUntilResults(page: Page) {
  await page.goto(baseUrl)

  await page.getByRole('button', { name: /start scan/i }).click()
  await page.getByRole('button', { name: /i prefer more privacy/i }).click()
  await page.getByRole('button', { name: /google/i }).click()
  await page.getByRole('switch', { name: /password manager/i }).click()
  await page.getByRole('switch', { name: /vpn/i }).click()
  await page.getByRole('switch', { name: /ad blocker/i }).click()
  await page.getByRole('button', { name: /continue/i }).click()
  await page.getByRole('button', { name: /^yes$/i }).click()
  await page.getByRole('button', { name: /very important/i }).click()
  await page.getByRole('button', { name: /yes, as much as possible/i }).click()

  await expect(
    page.getByRole('heading', {
      name: /privacy recommendations/i,
    }),
  ).toBeVisible()
}

test('homepage should not have accessibility violations', async ({ page }) => {
  await page.goto(baseUrl)

  await expectNoAccessibilityViolations(page)
})

test('questions page should not have accessibility violations', async ({ page }) => {
  await page.goto(baseUrl)

  await page.getByRole('button', { name: /start scan/i }).click()

  await expect(
    page.getByRole('heading', {
      name: /what matters more to you while browsing/i,
    }),
  ).toBeVisible()

  await expectNoAccessibilityViolations(page)
})

test('results page should not have accessibility violations', async ({ page }) => {
  await completeFlowUntilResults(page)

  await expectNoAccessibilityViolations(page)
})
