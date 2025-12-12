export const formTestData = {
  missingFirstName: {
    firstName: '',
    lastName: 'Doe',
    company: 'Test Company',
    email: 'test@example.com'
  },
  
  invalidEmail: {
    firstName: 'John',
    lastName: 'Doe',
    company: 'Test Company',
    email: 'invalid-email'
  },
  
  multipleMissingFields: {
    firstName: '',
    lastName: '',
    company: 'Test Company',
    email: 'test@example.com'
  }
};

export const validationMessages = {
  requiredField: 'Please complete this required field.',
  invalidEmail: 'Email must be formatted correctly.'
};
