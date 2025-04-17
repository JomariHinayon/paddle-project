// Test script for Paddle webhooks
const crypto = require('crypto');
const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

const PUBLIC_KEY = process.env.PADDLE_PUBLIC_KEY;
const WEBHOOK_URL = 'http://localhost:3000/api/webhook/paddle'; // Update with your local or ngrok URL

// Sample event payload
const payload = {
  event_type: 'subscription.created',
  data: {
    id: 'test-subscription-123',
    customer_id: 'test-customer-456',
    status: 'active',
    custom_data: {
      userId: 'test-user-789'
    },
    items: [
      {
        price: {
          id: 'pri_01jqpptmznh4vswj791kdk56q3',
          unit_price: {
            amount: '19.99',
            currency_code: 'USD'
          }
        },
        product: {
          id: 'pro_01jrcyajvbkf83y5ycbnr055hf',
          name: 'Premium Monthly'
        },
        quantity: 1
      }
    ],
    current_billing_period: {
      starts_at: new Date().toISOString(),
      ends_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    },
    next_billed_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    started_at: new Date().toISOString()
  }
};

// Convert payload to JSON string
const rawBody = JSON.stringify(payload);

// Calculate signature
const signature = crypto.createHmac('sha256', PUBLIC_KEY).update(rawBody).digest('hex');

console.log('Sending test webhook with payload:', JSON.stringify(payload, null, 2));
console.log('Calculated signature:', signature);

// Send the webhook request
axios.post(WEBHOOK_URL, rawBody, {
  headers: {
    'Content-Type': 'application/json',
    'paddle-signature': signature
  }
})
.then(response => {
  console.log('Webhook response:', response.status, response.data);
})
.catch(error => {
  console.error('Webhook error:', error.response ? error.response.status : error.message);
  if (error.response && error.response.data) {
    console.error('Error details:', error.response.data);
  }
}); 