import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { FinancialServicesPage } from '../pages/FinancialServicesPage';
import { ContactFormPage } from '../pages/ContactFormPage';
import { formTestData, validationMessages } from './testData';

test.describe('3Cloud Form Validation Tests', () => {

  test('should validate form with missing required fields', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
    
    await homePage.navigateToFinancialServices();
    
    const financialServicesPage = new FinancialServicesPage(page);
    await financialServicesPage.clickLetsTalkBottom();
    
    const contactFormPage = new ContactFormPage(page);
    await contactFormPage.fillForm(formTestData.missingFirstName);
    
    await contactFormPage.submitForm();
    
    await contactFormPage.verifyFirstNameError(validationMessages.requiredField);
    const errorText = await contactFormPage.getFirstNameErrorText();
    
    console.log('First Name validation error:', errorText);
  });
  
  test('should validate form with invalid email', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
    
    await homePage.navigateToFinancialServices();
    
    const financialServicesPage = new FinancialServicesPage(page);
    await financialServicesPage.clickLetsTalkBottom();
    
    const contactFormPage = new ContactFormPage(page);
    await contactFormPage.fillForm(formTestData.invalidEmail);
    
    await contactFormPage.submitForm();
    
    await contactFormPage.verifyEmailError(validationMessages.invalidEmail);
    const errorText = await contactFormPage.getEmailErrorText();
    
    console.log('Email validation error:', errorText);
  });
  
  test('should validate form with multiple missing fields', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
    
    await homePage.navigateToFinancialServices();
    
    const financialServicesPage = new FinancialServicesPage(page);
    await financialServicesPage.clickLetsTalkBottom();
    
    const contactFormPage = new ContactFormPage(page);
    await contactFormPage.fillForm(formTestData.multipleMissingFields);
    
    await contactFormPage.submitForm();
    
    await contactFormPage.verifyFirstNameError(validationMessages.requiredField);
    await contactFormPage.verifyLastNameError(validationMessages.requiredField);
    
    console.log('Multiple field validation errors verified');
  });
});
