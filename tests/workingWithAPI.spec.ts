import { test, expect } from '@playwright/test';
import tags from '../data/tags.json';
test.beforeEach(async ({ page }) => {
  // Setup route interception
  await page.route('https://conduit-api.bondaracademy.com/api/tags', async (route) => {
    await route.fulfill({
      body: JSON.stringify(tags),
    });
  });

  // Navigate to the page before each test
  await page.goto('https://conduit.bondaracademy.com/');
});

test('Is the conduit text displayed correctly?', async ({ page }) => {
  // No need to navigate again - it's already done in beforeEach
  await expect(page.locator('.navbar-brand')).toHaveText('conduit');
});