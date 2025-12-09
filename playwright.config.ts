import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
        video: {
      mode: 'on',
    },
    contextOptions: {
      recordVideo: {
        dir: 'test-results',
      }
    },
    trace: 'on-first-retry',
        launchOptions: {
      args: ["--start-maximized"],
    },
  },

  projects: [
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    }
  ],
});
