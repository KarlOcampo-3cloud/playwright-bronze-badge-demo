import { Page, Locator, expect, FrameLocator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ContactFormPage extends BasePage {
  readonly formFrame: FrameLocator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly companyInput: Locator;
  readonly emailInput: Locator;
  readonly submitButton: Locator;
  readonly firstNameError: Locator;
  readonly lastNameError: Locator;
  readonly companyError: Locator;
  readonly emailError: Locator;
  readonly getstartedFormContainer: Locator;

  constructor(page: Page) {
    super(page);
    
    this.formFrame = page.frameLocator('iframe.hs-form-iframe').first();
    
    this.getstartedFormContainer = page.locator('.hbspt-form[data-hs-forms-root="true"]');
    
    this.firstNameInput = this.formFrame.locator('input[name="firstname"]');
    this.lastNameInput = this.formFrame.locator('input[name="lastname"]');
    this.companyInput = this.formFrame.locator('input[name="company"]');
    this.emailInput = this.formFrame.locator('input[name="email"]');
    
    this.submitButton = this.formFrame.locator('input[type="submit"]');
    
    this.firstNameError = this.formFrame.locator('.hs_firstname .hs-error-msgs');
    this.lastNameError = this.formFrame.locator('.hs_lastname .hs-error-msgs');
    this.companyError = this.formFrame.locator('.hs_company .hs-error-msgs');
    this.emailError = this.formFrame.locator('.hs_email .hs-error-msgs');
  }

  async waitForFormLoad() : Promise<void>{
    try {
      await this.page.waitForSelector('iframe.hs-form-iframe');
      console.log('getstarted form iframes detected');
      
      await this.formFrame.locator('form').waitFor({ state: 'visible' });
      console.log('Main contact form inside iframe is visible');
      
      await this.firstNameInput.waitFor({ state: 'visible' });
      console.log('Form fields are ready');
    } catch (error) {
      console.error('Error loading getstarted form:', error);
      throw new Error('Failed to load getstarted form in iframe');
    }
  }

  async fillFirstName(firstName: string) : Promise<void> {
    await this.fill(this.firstNameInput, firstName);
  }

  async fillLastName(lastName: string) : Promise<void> {
    await this.fill(this.lastNameInput, lastName);
  }

  async fillCompany(company: string) : Promise<void> {
    await this.fill(this.companyInput, company);
  }

  async fillEmail(email: string) : Promise<void> {
    await this.fill(this.emailInput, email);
  }

  async fillForm(data: { 
    firstName?: string; 
    lastName?: string; 
    company?: string; 
    email?: string 
  }) : Promise<void>{
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
  }

  async submitForm() : Promise<void>{
    await this.click(this.submitButton);
  }

  async verifyFirstNameError(expectedMessage: string): Promise<void> {
    await this.waitForVisible(this.firstNameError);
    await this.verifyVisible(this.firstNameError);
    await this.verifyContainsText(this.firstNameError, expectedMessage);
  }

  async verifyLastNameError(expectedMessage: string): Promise<void> {
    await this.waitForVisible(this.lastNameError);
    await this.verifyVisible(this.lastNameError);
    await this.verifyContainsText(this.lastNameError, expectedMessage);
  }

  async verifyCompanyError(expectedMessage: string): Promise<void> {
    await this.waitForVisible(this.companyError);
    await this.verifyVisible(this.companyError);
    await this.verifyContainsText(this.companyError, expectedMessage);
  }

  async verifyEmailError(expectedMessage: string): Promise<void> {
    await this.waitForVisible(this.emailError);
    await this.verifyVisible(this.emailError);
    await this.verifyContainsText(this.emailError, expectedMessage);
  }

  async getFirstNameErrorText(): Promise<string | null> {
    return await this.getText(this.firstNameError);
  }

  async getLastNameErrorText(): Promise<string | null> {
    return await this.getText(this.lastNameError);
  }

  async getCompanyErrorText(): Promise<string | null> {
    return await this.getText(this.companyError);
  }

  async getEmailErrorText(): Promise<string | null> {
    return await this.getText(this.emailError);
  }

}
