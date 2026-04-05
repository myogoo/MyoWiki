import { expect, type Page } from '@playwright/test';
import { withBasePath } from './base-path';

export const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://127.0.0.1:4323';

export const viewports = {
  desktop: { width: 1440, height: 1024 },
  tablet: { width: 1024, height: 768 },
  mobile: { width: 390, height: 844 },
} as const;

export const routes = {
  home: withBasePath('/'),
  myotus120: withBasePath('/myotus/1.20.1/getting-started/overview/'),
  myotus121: withBasePath('/myotus/1.21.1/getting-started/overview/'),
  ssec261: withBasePath('/ssec/26.1/getting-started/overview/'),
  myotus120Root: withBasePath('/myotus/1.20.1/'),
  myotus121Root: withBasePath('/myotus/1.21.1/'),
  ssec261Root: withBasePath('/ssec/26.1/'),
} as const;

const normalizedBaseURL = baseURL.endsWith('/') ? baseURL : `${baseURL}/`;

export function appUrl(path: string) {
  return new URL(path, normalizedBaseURL).toString();
}

export async function gotoApp(page: Page, path: string) {
  await page.goto(appUrl(path), { waitUntil: 'domcontentloaded' });
}

export async function expectNoHorizontalOverflow(page: Page) {
  const hasOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth + 1,
  );

  expect(hasOverflow).toBe(false);
}

export async function openMobileMenu(page: Page) {
  const button = page.locator('starlight-menu-button button');
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.locator('body')).toHaveAttribute('data-mobile-menu-expanded', '');
}
