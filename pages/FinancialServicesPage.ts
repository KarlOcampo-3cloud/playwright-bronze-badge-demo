import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class FinancialServicesPage extends BasePage {
  readonly letsTalkButtonBottom: Locator;

  constructor(page: Page) {
    super(page);
    this.letsTalkButtonBottom = page.locator('a.cta_link.btn-primary[href="https://3cloudsolutions.com/get-started/"]');
  }

  async clickLetsTalkBottom(): Promise<void> {
    // need to scroll to end of page
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    await this.click(this.letsTalkButtonBottom);
    await this.waitForPageLoad('load');
  }
}
