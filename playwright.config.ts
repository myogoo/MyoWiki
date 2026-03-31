import { defineConfig } from '@playwright/test';
import { withBasePath } from './tests/base-path';

const port = 4323;
const host = '127.0.0.1';
const origin = `http://${host}:${port}`;
const baseURL = new URL(withBasePath('/'), `${origin}/`).toString();
const webServerCommand =
  process.env.PLAYWRIGHT_WEB_SERVER_COMMAND ??
  `npm run dev -- --host ${host} --port ${port}`;

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  retries: process.env.CI ? 1 : 0,
  expect: {
    timeout: 5_000,
  },
  reporter: process.env.CI
    ? [['list'], ['html', { open: 'never' }]]
    : [['list']],
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  webServer: {
    command: webServerCommand,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    {
      name: 'chromium',
    },
  ],
});
