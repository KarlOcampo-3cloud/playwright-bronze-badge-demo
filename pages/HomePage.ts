import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly whoWeServeMenu: Locator;
  readonly financialServicesLink: Locator;
  readonly megaMenu: Locator;
  readonly homeUrl = 'https://3cloudsolutions.com';

  constructor(page: Page) {
    super(page);
    this.whoWeServeMenu = page.locator('#mega-menu-item-20797 > a.mega-menu-link');
    this.financialServicesLink = page.locator('#mega-menu-item-23581 a[href="https://3cloudsolutions.com/financial-services-technology-solutions/"]');
    this.megaMenu = page.locator('#mega-menu-primary-menu');
  }

  async navigate() : Promise<void> {
    await this.goto(this.homeUrl);
    await this.waitForPageLoad('networkidle');
  }

  async hoverWhoWeServe() : Promise<void> {
    await this.hover(this.whoWeServeMenu);
    await this.waitForSelector('#mega-menu-item-20797');
  }

  async clickFinancialServices() : Promise<void> {
    await this.click(this.financialServicesLink);
    await this.waitForPageLoad('networkidle');
  }

  async navigateToFinancialServices() : Promise<void> {
    await this.hoverWhoWeServe();
    await this.clickFinancialServices();
  }
}
