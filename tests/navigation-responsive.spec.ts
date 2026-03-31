import { expect, test } from '@playwright/test';
import {
  expectNoHorizontalOverflow,
  gotoApp,
  openMobileMenu,
  routes,
  viewports,
} from './responsive';

for (const [viewportName, viewport] of Object.entries(viewports)) {
  test.describe(`${viewportName} viewport`, () => {
    test.use({ viewport });

    test('home cards route into the correct versioned docs', async ({ page }) => {
      await gotoApp(page, routes.home);

      await expect(page.locator('.home-card')).toHaveCount(2);
      await expect(page.getByRole('heading', { name: /Two projects, three live docs lines/i })).toBeVisible();
      await expectNoHorizontalOverflow(page);

      const myotusCard = page.locator('.home-card').filter({
        has: page.getByRole('heading', { name: 'Myotus' }),
      });
      await myotusCard.getByRole('link', { name: 'Start Here' }).click();
      await expect(page).toHaveURL(/\/myotus\/1\.21\.1\/getting-started\/overview\/?$/);
      await expect(page.getByRole('heading', { name: 'Overview' })).toBeVisible();
      await expect(page.locator('.site-title-context')).toHaveText('Myotus · 1.21.1');

      if (viewportName === 'mobile') {
        await openMobileMenu(page);
      }

      await gotoApp(page, routes.home);
      await expect(page.locator('.home-card')).toHaveCount(2);

      const ssecCard = page.locator('.home-card').filter({
        has: page.getByRole('heading', { name: 'SSEC' }),
      });
      await ssecCard.getByRole('link', { name: 'Start Here' }).click();
      await expect(page).toHaveURL(/\/ssec\/26\.1\/getting-started\/overview\/?$/);
      await expect(page.getByRole('heading', { name: 'Overview' })).toBeVisible();
      await expect(page.locator('.site-title-context')).toHaveText('SSEC · 26.1');
      await expectNoHorizontalOverflow(page);
    });
  });
}
