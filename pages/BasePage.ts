import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a specific URL
   */
  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }

  /**
   * Wait for a locator to be visible
   */
  async waitForVisible(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
  }

  /**
   * Click on an element with optional wait
   */
  async click(locator: Locator, waitForVisible: boolean = true): Promise<void> {
    if (waitForVisible) {
      await this.waitForVisible(locator);
    }
    await locator.click();
  }

  /**
   * Fill an input field with text
   */
  async fill(locator: Locator, text: string, waitForVisible: boolean = true): Promise<void> {
    if (waitForVisible) {
      await this.waitForVisible(locator);
    }
    await locator.fill(text);
  }

  /**
   * Get text content from a locator
   */
  async getText(locator: Locator): Promise<string | null> {
    await this.waitForVisible(locator);
    return await locator.textContent();
  }

  /**
   * Wait for page to load (wait for load state)
   */
  async waitForPageLoad(state: 'load' | 'domcontentloaded' | 'networkidle' = 'load'): Promise<void> {
    await this.page.waitForLoadState(state);
  }

  /**
   * Wait for a selector to appear in the DOM
   */
  async waitForSelector(selector: string): Promise<void> {
    await this.page.waitForSelector(selector);
  }

  /**
   * Verify element is visible
   */
  async verifyVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }

  /**
   * Verify element contains text
   */
  async verifyContainsText(locator: Locator, text: string | RegExp): Promise<void> {
    await expect(locator).toContainText(text);
  }

  /**
   * Hover over an element
   */
  async hover(locator: Locator): Promise<void> {
    await this.waitForVisible(locator);
    await locator.hover();
  }
}
