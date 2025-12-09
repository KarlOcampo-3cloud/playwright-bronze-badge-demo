import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly whoWeServeMenu: Locator;
  readonly financialServicesLink: Locator;
  readonly megaMenu: Locator;

  constructor(page: Page) {
    this.page = page;
    this.whoWeServeMenu = page.locator('#mega-menu-item-20797 > a.mega-menu-link');
    this.financialServicesLink = page.locator('#mega-menu-item-23581 a[href="https://3cloudsolutions.com/financial-services-technology-solutions/"]');
    this.megaMenu = page.locator('#mega-menu-primary-menu');
  }

  async navigate() {
    await this.page.goto('https://3cloudsolutions.com');
    await this.page.waitForLoadState('networkidle');
  }

  async hoverWhoWeServe() {
    await this.whoWeServeMenu.hover();
    await this.page.waitForSelector('#mega-menu-item-20797', { state: 'visible', timeout: 5000 });
    await this.page.waitForTimeout(500);
  }

  async clickFinancialServices() {
    await this.financialServicesLink.waitFor({ state: 'visible', timeout: 5000 });
    await this.financialServicesLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToFinancialServices() {
    await this.hoverWhoWeServe();
    await this.clickFinancialServices();
  }
}
