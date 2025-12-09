import { Page, Locator, expect, FrameLocator } from '@playwright/test';

export class ContactFormPage {
  readonly page: Page;
  readonly formFrame: FrameLocator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly companyInput: Locator;
  readonly emailInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessages: Locator;
  readonly getstartedFormContainer: Locator;

  constructor(page: Page) {
    this.page = page;
    
    this.formFrame = page.frameLocator('iframe.hs-form-iframe').first();
    
    this.getstartedFormContainer = page.locator('.hbspt-form[data-hs-forms-root="true"]');
    
    this.firstNameInput = this.formFrame.locator('input[name="firstname"]');
    this.lastNameInput = this.formFrame.locator('input[name="lastname"]');
    this.companyInput = this.formFrame.locator('input[name="company"]');
    this.emailInput = this.formFrame.locator('input[name="email"]');
    
    this.submitButton = this.formFrame.locator('input[type="submit"]');
    
    this.errorMessages = this.formFrame.locator('.hs-error-msgs');
  }

  async waitForFormLoad() {
    try {
      await this.page.waitForSelector('iframe.hs-form-iframe', { timeout: 15000 });
      console.log('getstarted form iframes detected');
      
      await this.page.waitForTimeout(1000);
      
      await this.formFrame.locator('form').waitFor({ state: 'visible', timeout: 10000 });
      console.log('Main contact form inside iframe is visible');
      
      await this.firstNameInput.waitFor({ state: 'visible', timeout: 5000 });
      console.log('Form fields are ready');
    } catch (error) {
      console.error('Error loading getstarted form:', error);
      throw new Error('Failed to load getstarted form in iframe');
    }
  }

  async fillFirstName(firstName: string) : Promise<void> {
    await this.firstNameInput.waitFor({ state: 'visible' });
    await this.firstNameInput.fill(firstName);
  }

  async fillLastName(lastName: string) {
    await this.lastNameInput.waitFor({ state: 'visible' });
    await this.lastNameInput.fill(lastName);
  }

  async fillCompany(company: string) {
    await this.companyInput.waitFor({ state: 'visible' });
    await this.companyInput.fill(company);
  }

  async fillEmail(email: string) {
    await this.emailInput.waitFor({ state: 'visible' });
    await this.emailInput.fill(email);
  }

  async fillForm(data: { 
    firstName?: string; 
    lastName?: string; 
    company?: string; 
    email?: string 
  }) {
    await this.waitForFormLoad();
    
    if (data.firstName !== undefined) {
      await this.fillFirstName(data.firstName);
    }
    if (data.lastName !== undefined) {
      await this.fillLastName(data.lastName);
    }
    if (data.company !== undefined) {
      await this.fillCompany(data.company);
    }
    if (data.email !== undefined) {
      await this.fillEmail(data.email);
    }
    
    await this.page.waitForTimeout(500);
  }

  async submitForm() {
    await this.submitButton.waitFor({ state: 'visible' });
    await this.submitButton.click();
    
    await this.page.waitForTimeout(1000);
  }

  async waitForErrorMessages() {
    await this.errorMessages.first().waitFor({ state: 'visible', timeout: 5000 });
  }

  async getFirstErrorMessage(): Promise<Locator> {
    await this.waitForErrorMessages();
    return this.errorMessages.first();
  }

  async getAllErrorMessages(): Promise<Locator[]> {
    await this.waitForErrorMessages();
    return await this.errorMessages.all();
  }

  async verifyErrorMessageVisible() {
    await this.waitForErrorMessages();
    const errorMessage = this.errorMessages.first();
    await expect(errorMessage).toBeVisible();
  }

  async verifyErrorMessageContains(pattern: string | RegExp) {
    const errorMessage = await this.getFirstErrorMessage();
    const errorText = await errorMessage.textContent();
    if (typeof pattern === 'string') {
      expect(errorText).toContain(pattern);
    } else {
      expect(errorText).toMatch(pattern);
    }
    return errorText;
  }

  async verifyMultipleErrorsExist() {
    await this.waitForErrorMessages();
    const errors = await this.getAllErrorMessages();
    expect(errors.length).toBeGreaterThan(0);
    await expect(errors[0]).toBeVisible();
    return errors.length;
  }

  async takeScreenshot(screenshotName: string) {
    await this.page.screenshot({ 
      path: `test-results/${screenshotName}`, 
      fullPage: true 
    });
  }

  async close() {
    await this.page.close();
  }
}
