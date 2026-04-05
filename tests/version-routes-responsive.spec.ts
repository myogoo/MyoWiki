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
    rootPath: routes.myotus120Root,
    heading: 'Overview',
    context: 'Myotus · 1.20.1',
    links: ['Installation', 'Project Structure', 'Configuration'],
  },
  {
    name: 'Myotus 1.21.1',
    path: routes.myotus121,
    rootPath: routes.myotus121Root,
    heading: 'Overview',
    context: 'Myotus · 1.21.1',
    links: ['Installation', 'Project Structure', 'Version Matrix'],
  },
  {
    name: 'SSEC 26.1',
    path: routes.ssec261,
    rootPath: routes.ssec261Root,
    heading: 'Overview',
    context: 'SSEC · 26.1',
    links: ['Installation', 'API Overview', 'Event System'],
  },
] as const;

for (const [viewportName, viewport] of Object.entries(viewports)) {
  test.describe(`${viewportName} viewport`, () => {
    test.use({ viewport });

    for (const scenario of versionRoutes) {
      test(`${scenario.name} root redirects straight into the useful doc`, async ({ page }) => {
        await gotoApp(page, scenario.rootPath);

        await expect(page).toHaveURL(new RegExp(`${scenario.path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}?$`));
        await expect(page.getByRole('heading', { name: scenario.heading })).toBeVisible();
        await expect(page.locator('.site-title-context')).toHaveText(scenario.context);
        await expectNoHorizontalOverflow(page);
      });

      test(`${scenario.name} overview stays readable and navigable`, async ({ page }) => {
        await gotoApp(page, scenario.path);

        await expect(page.getByRole('heading', { name: scenario.heading })).toBeVisible();
        await expect(page.locator('.site-title-context')).toHaveText(scenario.context);
        await expectNoHorizontalOverflow(page);

        for (const label of scenario.links) {
          await expect(page.getByRole('main').getByRole('link', { name: label, exact: true })).toBeVisible();
        }
      });
    }
  });
}
