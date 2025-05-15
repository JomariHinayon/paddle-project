const axios = require('axios');

// This is a simplified API handler that doesn't use Next.js
exports.handler = async function(event, context) {
  try {
    const path = event.path.replace('/.netlify/functions/api', '');
    const method = event.httpMethod;
    const body = event.body ? JSON.parse(event.body) : {};
    const params = event.queryStringParameters || {};

    console.log(`API request: ${method} ${path}`, { params, body });

    // Handle specific API endpoints
    if (path === '/api/subscriptions/portal-session') {
      // Example implementation for the portal session
      // In a real app, you would implement actual Paddle integration here
      if (!process.env.PADDLE_API_SECRET_KEY) {
        return {
          statusCode: 500,
          body: JSON.stringify({ 
            error: 'Missing Paddle API key in environment variables' 
          })
        };
      }

      // Mock of creating a Paddle portal session
      try {
        // If you have Paddle API credentials, you could make a real API call here
        const customerId = params.customerId || 'demo-customer';
        const returnUrl = params.returnUrl || 'https://your-app-url.netlify.app/account';

        // For demo purposes, return a mock URL
        // In production, you would use the Paddle API to create a real portal URL
        return {
          statusCode: 200,
          body: JSON.stringify({
            url: `https://sandbox-vendors.paddle.com/customer-portal/demo?customer_id=${customerId}&return_url=${encodeURIComponent(returnUrl)}`
          })
        };
      } catch (error) {
        console.error('Paddle API error:', error);
        return {
          statusCode: 500,
          body: JSON.stringify({ 
            error: 'Failed to create portal session',
            details: error.message
          })
        };
      }
    }

    // Default response for unhandled API routes
    return {
      statusCode: 404,
      body: JSON.stringify({ 
        error: 'API endpoint not found', 
        path: path 
      })
    };
    
  } catch (error) {
    console.error('Unhandled error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Internal Server Error',
        message: error.message
      })
    };
  }
}; 