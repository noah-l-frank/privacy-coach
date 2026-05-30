import { expect, test, type Page } from '@playwright/test'

const baseUrl = 'http://localhost:4173'

async function completeFlowUntilResults(page: Page, browserName: string) {
  await page.goto(baseUrl)

  await page.getByRole('button', { name: /start scan/i }).click()

  await expect(
    page.getByRole('heading', {
      name: /what matters more to you while browsing/i,
    }),
  ).toBeVisible()

  await page.getByRole('button', { name: /i prefer more privacy/i }).click()
  await page.getByRole('button', { name: /google/i }).click()
  await page.getByRole('button', { name: /i use a password manager/i }).click()
  await page.getByRole('button', { name: /yes, regularly/i }).click()
  await page.getByRole('button', { name: /^yes$/i }).click()

  if (browserName === 'chromium') {
    await page.getByRole('button', { name: /^yes$/i }).click()
    await page.getByRole('button', { name: /very important/i }).click()
  }

  await page.getByRole('button', { name: /yes, as much as possible/i }).click()

  await expect(
    page.getByRole('heading', {
      name: /privacy recommendations/i,
    }),
  ).toBeVisible()
}

test('home page survives reload', async ({ page }) => {
  await page.goto(baseUrl)

  await page.reload()

  await expect(page.getByRole('button', { name: /start scan/i })).toBeVisible()
})

test('scan transition recreates scan state after reload and continues to questions', async ({ page }) => {
  await page.goto(`${baseUrl}/scan`)

  await page.reload()

  await expect(page.getByText(/analyzing your setup/i)).toBeVisible()
  await expect(page).toHaveURL(`${baseUrl}/questions`)
  await expect(
    page.getByRole('heading', {
      name: /what matters more to you while browsing/i,
    }),
  ).toBeVisible()
})


test('questions page redirects after reload because scan state is lost', async ({ page }) => {
  await page.goto(baseUrl)

  await page.getByRole('button', { name: /start scan/i }).click()

  await expect(
    page.getByRole('heading', {
      name: /what matters more to you while browsing/i,
    }),
  ).toBeVisible()

  await page.reload()

  await expect(page).toHaveURL(`${baseUrl}/`)
})

test('results page redirects after reload because scan state is lost', async ({
  page,
  browserName,
}) => {
  await completeFlowUntilResults(page, browserName)

  await page.reload()

  await expect(page).toHaveURL(`${baseUrl}/`)
})

test('scan transition does not redirect after leaving the page quickly', async ({ page }) => {
  await page.goto(`${baseUrl}/scan`)

  await expect(page.getByText(/analyzing your setup/i)).toBeVisible()

  await page.goto(baseUrl)
  await expect(page.getByRole('button', { name: /start scan/i })).toBeVisible()

  await page.waitForTimeout(5000)

  await expect(page).toHaveURL(`${baseUrl}/`)
  await expect(page.getByRole('button', { name: /start scan/i })).toBeVisible()
})
