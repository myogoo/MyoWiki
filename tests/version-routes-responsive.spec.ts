import { expect, test } from '@playwright/test';
import {
  expectNoHorizontalOverflow,
  gotoApp,
  routes,
  viewports,
} from './responsive';

const versionRoutes = [
  {
    name: 'Myotus 1.20.1',
    path: routes.myotus120,
    heading: 'Myotus 1.20.1',
    context: 'Myotus · 1.20.1',
    heroLinks: ['Start Here', 'Player Guide', 'Browse API'],
  },
  {
    name: 'Myotus 1.21.1',
    path: routes.myotus121,
    heading: 'Myotus 1.21.1',
    context: 'Myotus · 1.21.1',
    heroLinks: ['Start Here', 'Player Guide', 'Browse API'],
  },
  {
    name: 'SSEC 26.1',
    path: routes.ssec261,
    heading: 'SSEC 26.1',
    context: 'SSEC · 26.1',
    heroLinks: ['Start Here', 'Install', 'Browse API'],
  },
] as const;

for (const [viewportName, viewport] of Object.entries(viewports)) {
  test.describe(`${viewportName} viewport`, () => {
    test.use({ viewport });

    for (const scenario of versionRoutes) {
      test(`${scenario.name} stays readable and navigable`, async ({ page }) => {
        await gotoApp(page, scenario.path);

        await expect(page.getByRole('heading', { name: scenario.heading })).toBeVisible();
        await expect(page.locator('.site-title-context')).toHaveText(scenario.context);
        await expectNoHorizontalOverflow(page);

        for (const label of scenario.heroLinks) {
          await expect(page.getByRole('link', { name: label, exact: true })).toBeVisible();
        }
      });
    }
  });
}
