// Test script for Paddle portal session generation API
require('dotenv').config();
const axios = require('axios');

// Customer ID to test with - replace with an actual customer ID from your Paddle account
const CUSTOMER_ID = 'ctm_01jrhz1tf0r5wx62mx6cby456r'; // Example customer ID

// Subscription IDs to include in portal session (optional)
const SUBSCRIPTION_IDS = []; // Add subscription IDs if you want deep links for specific subscriptions

// Function to test generating a portal URL using Paddle's API
async function testGeneratePortalURL() {
  try {
    console.log('Testing Paddle Customer Portal Session API...');
    
    // Check environment - default to sandbox for testing
    const isProd = process.env.NODE_ENV === 'production';
    
    // Paddle base URL - use sandbox for testing, production for live
    const PADDLE_BASE_URL = isProd 
      ? 'https://api.paddle.com'
      : 'https://sandbox-api.paddle.com';
    
    // Get API key from env file
    const apiKey = process.env.PADDLE_API_SECRET_KEY;
    if (!apiKey || apiKey === 'your_paddle_api_secret_key') {
      console.error('Error: Please set your PADDLE_API_SECRET_KEY in the .env file');
      return null;
    }
    
    console.log(`Using API endpoint: ${PADDLE_BASE_URL}/customers/${CUSTOMER_ID}/portal-sessions`);
    console.log(`Environment: ${isProd ? 'PRODUCTION' : 'SANDBOX'}`);
    
    // Prepare request data
    const requestData = {
      return_url: 'http://localhost:3000/account'
    };
    
    // Add subscription_ids if provided
    if (SUBSCRIPTION_IDS && SUBSCRIPTION_IDS.length > 0) {
      requestData.subscription_ids = SUBSCRIPTION_IDS;
      console.log(`Including subscriptions: ${SUBSCRIPTION_IDS.join(', ')}`);
    }
    
    // Make the API request to Paddle to create a portal session
    const response = await axios({
      method: 'POST',
      url: `${PADDLE_BASE_URL}/customers/${CUSTOMER_ID}/portal-sessions`,
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Paddle-Version': '1' // Important: specify the API version
      },
      data: requestData
    });
    
    // Check if we received a portal URL
    if (response.data?.data?.urls) {
      console.log('Success! Portal URLs generated:');
      
      // General portal URL
      if (response.data.data.urls.general?.overview) {
        console.log('\nGeneral portal URL:');
        console.log(response.data.data.urls.general.overview);
      }
      
      // Subscription-specific URLs if available
      if (response.data.data.urls.subscriptions && response.data.data.urls.subscriptions.length > 0) {
        console.log('\nSubscription-specific URLs:');
        response.data.data.urls.subscriptions.forEach(sub => {
          console.log(`\nSubscription ID: ${sub.id}`);
          
          if (sub.cancel_subscription) {
            console.log(`Cancel URL: ${sub.cancel_subscription}`);
          }
          
          if (sub.update_subscription_payment_method) {
            console.log(`Update Payment Method URL: ${sub.update_subscription_payment_method}`);
          }
        });
      }
      
      console.log('\nThese URLs can be used to access the customer portal without requiring login.');
      console.log('The URLs contain session tokens and will expire - do not store them long-term.');
      
      return response.data.data.urls;
    } else {
      console.error('Error: No portal URLs received in the response.');
      console.log('Response data:', JSON.stringify(response.data, null, 2));
      return null;
    }
    
  } catch (error) {
    console.error('Error generating portal URL:');
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error(`Status: ${error.response.status}`);
      console.error('Response data:', JSON.stringify(error.response.data, null, 2));
      
      if (error.response.status === 401) {
        console.error('\nAuthentication failed. Please check your API key.');
      } else if (error.response.status === 404) {
        console.error('\nCustomer not found. Please check the customer ID.');
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received from the server. Please check your internet connection.');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error message:', error.message);
    }
    return null;
  }
}

// Run the test
testGeneratePortalURL(); 