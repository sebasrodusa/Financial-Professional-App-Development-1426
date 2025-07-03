// Quest SDK Configuration
export const questConfig = {
  // Authentication Quest IDs
  ONBOARDING_QUESTID: 'c-greta-onboarding',
  GET_STARTED_QUESTID: 'c-greta-get-started',
  
  // API Configuration
  USER_ID: 'u-ff23eada-0109-47c6-b532-8c003e043f9d',
  APIKEY: 'k-c4284338-409f-4a6f-8cc8-5dfcc6531c37',
  TOKEN: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LWZmMjNlYWRhLTAxMDktNDdjNi1iNTMyLThjMDAzZTA0M2Y5ZCIsImlhdCI6MTc1MTUxMzQ4MywiZXhwIjoxNzU0MTA1NDgzfQ.Ld1N9ddYYuRS7tMFivmvdAuAyKT320c0FgNC9tacOdg',
  ENTITYID: 'e-d016baaf-f8c1-44f3-b77f-ccc6eec6b98e',
  
  // Theme Configuration
  PRIMARY_COLOR: '#0284c7',
  
  // API Configuration
  API_TYPE: 'PRODUCTION'
};

// Helper function to get user ID (with fallback)
export const getUserId = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('userId') || questConfig.USER_ID;
  }
  return questConfig.USER_ID;
};

// Helper function to get user token
export const getUserToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('userToken') || questConfig.TOKEN;
  }
  return questConfig.TOKEN;
};