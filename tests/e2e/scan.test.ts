import { expect, test } from '@playwright/test'

test('completes the full privacy coach flow', async ({ page, browserName }) => {
  await page.goto('http://localhost:4173')

  await page.getByRole('button', { name: /start scan/i }).click()

  await expect(
    page.getByRole('heading', {
      name: /what matters more to you while browsing/i,
    }),
  ).toBeVisible()

  await page
    .getByRole('button', {
      name: /i prefer more privacy/i,
    })
    .click()

  await expect(
    page.getByRole('heading', {
      name: /which search engine do you usually use/i,
    }),
  ).toBeVisible()

  await page
    .getByRole('button', {
      name: /google/i,
    })
    .click()

  await expect(
    page.getByRole('heading', {
      name: /how do you manage your passwords/i,
    }),
  ).toBeVisible()

  await page
    .getByRole('button', {
      name: /i use a password manager/i,
    })
    .click()

  await expect(
    page.getByRole('heading', {
      name: /do you use a vpn/i,
    }),
  ).toBeVisible()

  await page
    .getByRole('button', {
      name: /yes, regularly/i,
    })
    .click()

  await expect(
    page.getByRole('heading', {
      name: /do you use an ad blocker/i,
    }),
  ).toBeVisible()

  await page
    .getByRole('button', {
      name: /^yes$/i,
    })
    .click()

  if (browserName === 'chromium') {
    await expect(
      page.getByRole('heading', {
        name: /would you be open to trying a different browser/i,
      }),
    ).toBeVisible()

    await page
      .getByRole('button', {
        name: /^yes$/i,
      })
      .click()

    await expect(
      page.getByRole('heading', {
        name: /how important is it that a new browser feels familiar/i,
      }),
    ).toBeVisible()

    await page
      .getByRole('button', {
        name: /very important/i,
      })
      .click()
  }

  await expect(
    page.getByRole('heading', {
      name: /would you like your browser to reduce tracking/i,
    }),
  ).toBeVisible()

  await page
    .getByRole('button', {
      name: /yes, as much as possible/i,
    })
    .click()

  await expect(page.getByText(/reduce cookie and tracking exposure/i)).toBeVisible()

  await expect(page.getByRole('heading', { name: /score deductions/i })).toBeVisible()

  await expect(
    page.getByRole('heading', {
      name: /privacy recommendations/i,
    }),
  ).toBeVisible()

  await expect(
    page.getByRole('button', {
      name: /start new scan/i,
    }),
  ).toBeVisible()
})
