import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { FinancialServicesPage } from '../pages/FinancialServicesPage';
import { ContactFormPage } from '../pages/ContactFormPage';

test.describe('3Cloud Form Validation Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
  });

  test('should validate form with missing required fields', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
    
    await homePage.navigateToFinancialServices();
    
    const financialServicesPage = new FinancialServicesPage(page);
    const newPage = await financialServicesPage.clickLetsTalkBottom();
    
    const contactFormPage = new ContactFormPage(newPage);
    await contactFormPage.fillForm({
      firstName: '',
      lastName: 'Doe',
      company: 'Test Company',
      email: 'test@example.com'
    });
    
    await contactFormPage.submitForm();
    
    await contactFormPage.verifyErrorMessageVisible();
    const errorText = await contactFormPage.verifyErrorMessageContains('Please complete this required field.');
    
    await contactFormPage.takeScreenshot('form-validation-first-name-missing.png');
    
    console.log('First Name validation error:', errorText);
    
    await contactFormPage.close();
  });
  
  test('should validate form with invalid email', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
    
    await homePage.navigateToFinancialServices();
    
    const financialServicesPage = new FinancialServicesPage(page);
    const newPage = await financialServicesPage.clickLetsTalk();
    
    const contactFormPage = new ContactFormPage(newPage);
    await contactFormPage.fillForm({
      firstName: 'John',
      lastName: 'Doe',
      company: 'Test Company',
      email: 'invalid-email'
    });
    
    await contactFormPage.submitForm();
    
    await contactFormPage.verifyErrorMessageVisible();
    const errorText = await contactFormPage.verifyErrorMessageContains('Email must be formatted correctly.');
    
    console.log('Email validation error:', errorText);
    
    await contactFormPage.close();
  });
  
  test('should validate form with multiple missing fields', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
    
    await homePage.navigateToFinancialServices();
    
    const financialServicesPage = new FinancialServicesPage(page);
    const newPage = await financialServicesPage.clickLetsTalk();
    
    const contactFormPage = new ContactFormPage(newPage);
    await contactFormPage.fillForm({
      firstName: '',
      lastName: '',
      company: 'Test Company',
      email: 'test@example.com'
    });
    
    await contactFormPage.submitForm();
    
    const errorCount = await contactFormPage.verifyMultipleErrorsExist();
    
    await contactFormPage.takeScreenshot('form-validation-multiple-fields-missing.png');
    
    console.log(`Number of validation errors: ${errorCount}`);
    
    await contactFormPage.close();
  });
});
