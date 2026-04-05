import { expect, test, type Page } from '@playwright/test';
import { gotoApp, routes } from './responsive';

const viewports = [
  {
    name: 'desktop',
    size: { width: 1440, height: 1024 },
    stackedCards: false,
  },
  {
    name: 'tablet',
    size: { width: 820, height: 1180 },
    stackedCards: true,
  },
  {
    name: 'mobile',
    size: { width: 390, height: 844 },
    stackedCards: true,
  },
] as const;

async function openHome(page: Page) {
  await gotoApp(page, routes.home);
  await expect(page.getByRole('heading', { name: 'Choose a project and version' })).toBeVisible();
  await expect(
    page.getByText(/open the project you need\. then choose the latest version/i),
  ).toBeVisible();
}

test.describe('home page responsive layout', () => {
  for (const viewport of viewports) {
    test(`stays usable on ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize(viewport.size);
      await openHome(page);

      const cards = page.locator('.home-card');
      await expect(cards).toHaveCount(2);
      await expect(page.locator('.home-directory__grid')).toBeVisible();
      await expect(page.getByRole('link', { name: /open docs/i }).first()).toBeVisible();

      const first = await cards.nth(0).boundingBox();
      const second = await cards.nth(1).boundingBox();

      expect(first).not.toBeNull();
      expect(second).not.toBeNull();

      if (!first || !second) {
        return;
      }

      const sideBySide = second.x > first.x + first.width * 0.5;
      expect(sideBySide).toBe(!viewport.stackedCards);

      const hasOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth + 1,
      );
      expect(hasOverflow).toBe(false);
    });
  }
});
