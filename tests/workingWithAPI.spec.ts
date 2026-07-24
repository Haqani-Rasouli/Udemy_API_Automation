import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://conduit.bondaracademy.com/');

  // Expect a title "to contain" a substring.
  await expect(page.locator('.navbar-brand')).toHaveText('conduit');
});

