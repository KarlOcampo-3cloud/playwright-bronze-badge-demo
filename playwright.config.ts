import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  timeout: 30000,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  
  use: {
    screenshot: 'only-on-failure',
        video: {
      mode: 'on',
    },
    contextOptions: {
      recordVideo: {
        dir: 'test-results',
      }
    },
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'Google Chrome',
      use: { 
        ...devices['Desktop Chrome'], 
        channel: 'chrome',
        viewport: { width: 1920, height: 1080 },
      },
    }
  ],
});
