import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const root = '/';
const routes = ['', 'installation', 'versions', 'quickstart', 'api', 'architecture', 'workflows', 'terminal-settings', 'items', 'about'];

test('home page uses the wiki root canonical URL', async ({ page }) => {
  await page.goto(root);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://wiki.myogoo.me/');
});

test('all documentation pages render without broken local links or overflow', async ({ page, request }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  const links = new Set<string>();
  for (const route of routes) {
    const response = await page.goto(`${root}${route ? `${route}/` : ''}`);
    expect(response?.status(), route).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
    expect(overflow, `horizontal overflow on ${route}`).toBe(false);
    for (const href of await page.locator('a[href]').evaluateAll(elements => elements.map(a => (a as HTMLAnchorElement).getAttribute('href')!))) {
      if (href.startsWith(root)) links.add(href);
    }
  }
  for (const href of links) {
    const response = await request.get(href);
    expect(response.status(), href).toBe(200);
    const fragment = href.split('#')[1];
    if (fragment) expect(await response.text(), href).toContain(`id="${decodeURIComponent(fragment)}"`);
  }
  expect(errors).toEqual([]);
});

test('search finds the XP API and has a no-results state', async ({ page }) => {
  await page.goto(`${root}api/`);
  await page.getByRole('button', { name: 'Search', exact: true }).click();
  const dialog = page.getByRole('dialog', { name: 'Search' });
  await expect(dialog).toBeVisible();
  const input = dialog.getByRole('textbox', { name: 'Search' });
  await input.fill('ExperienceMath');
  await expect(dialog.locator('a').filter({ hasText: /Experience|API|Architecture/i }).first()).toBeVisible();
  await input.fill('zzzxxyynotarealmyotusmethod');
  await expect(dialog).toContainText(/No results/i);
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
});

test('JRip themes persist, home links work, and mobile navigation opens', async ({ page, isMobile }, testInfo) => {
  await page.goto(root);
  await page.screenshot({ path: testInfo.outputPath('home-light.png'), fullPage: true });
  await page.getByRole('link', { name: 'Start building', exact: true }).click();
  await expect(page.locator('h1')).toHaveText('Addon quickstart');
  if (isMobile) await page.getByRole('button', { name: 'Menu', exact: true }).click();
  const theme = page.locator('starlight-theme-select select:visible').first();
  await theme.selectOption('dark');
  if (isMobile) await page.getByRole('button', { name: 'Menu', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.screenshot({ path: testInfo.outputPath('quickstart-dark.png'), fullPage: true });
  if (isMobile) {
    await page.getByRole('button', { name: 'Menu', exact: true }).click();
    await page.locator('#starlight__sidebar').getByRole('link', { name: 'API reference', exact: true }).click();
    await expect(page.locator('h1')).toHaveText('API reference');
  }
});

test('keyboard search shortcut opens and returns focus', async ({ page, isMobile }) => {
  test.skip(isMobile, 'Desktop keyboard shortcut');
  await page.goto(`${root}quickstart/`);
  const search = page.getByRole('button', { name: 'Search', exact: true });
  await expect(search).toBeEnabled();
  await search.focus();
  await page.keyboard.press('Control+k');
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(search).toBeFocused();
});

test('key pages pass automated accessibility checks in both themes', async ({ page }, testInfo) => {
  for (const theme of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme: theme, reducedMotion: 'reduce' });
    for (const route of ['', 'quickstart', 'api']) {
      await page.goto(`${root}${route ? `${route}/` : ''}`);
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
      await page.evaluate(() => document.fonts.ready);
      // Expressive Code adds keyboard focus to overflow regions after a debounced resize check.
      await expect.poll(() => page.locator('.expressive-code pre').evaluateAll(blocks =>
        blocks.every(block => block.scrollWidth <= block.clientWidth || block.getAttribute('tabindex') === '0')
      )).toBe(true);
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      expect(results.violations, `${theme} / ${route}`).toEqual([]);
      await page.screenshot({ path: testInfo.outputPath(`${route || 'home'}-${theme}-viewport.png`) });
    }
  }
});
