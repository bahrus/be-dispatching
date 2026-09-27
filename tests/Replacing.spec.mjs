import { test, expect } from '@playwright/test';
test('Replacing', async ({ page }) => {
    await page.goto('./tests/Replacing.html');
    await page.waitForTimeout(2000);
    const target = page.locator('#target');
    await expect(target).toHaveAttribute('mark', 'good');
});
