import { Page, Locator } from '@playwright/test';

export class FinancialServicesPage {
  readonly page: Page;
  readonly letsTalkButton: Locator;
  readonly letsTalkButtonBottom: Locator;

  constructor(page: Page) {
    this.page = page;
    this.letsTalkButton = page.locator('a[href="https://3cloudsolutions.com/get-started/"]').filter({ hasText: "Let's Talk" }).first();
    this.letsTalkButtonBottom = page.getByRole('link', { name: "Let's Talk" }).last();
  }

  async clickLetsTalk(): Promise<Page> {
    await this.letsTalkButtonBottom.waitFor({ state: 'visible', timeout: 10000 });
    
    await this.letsTalkButtonBottom.scrollIntoViewIfNeeded();
    await this.page.evaluate(() => window.scrollBy(0, -100));
    
    await this.page.waitForTimeout(500);
    
    const pagePromise = this.page.context().waitForEvent('page');
    await this.letsTalkButtonBottom.click();
    const newPage = await pagePromise;
    await newPage.waitForLoadState('networkidle');
    return newPage;
  }

  async clickLetsTalkBottom(): Promise<Page> {
    await this.letsTalkButtonBottom.waitFor({ state: 'visible', timeout: 10000 });
    
    await this.letsTalkButtonBottom.scrollIntoViewIfNeeded();
    await this.page.evaluate(() => window.scrollBy(0, -100));
    
    await this.page.waitForTimeout(500);
    
    const pagePromise = this.page.context().waitForEvent('page');
    await this.letsTalkButtonBottom.click();
    const newPage = await pagePromise;
    await newPage.waitForLoadState('networkidle');
    return newPage;
  }
}
