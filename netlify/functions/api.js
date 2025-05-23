const axios = require('axios');
const crypto = require('crypto');
const admin = require('firebase-admin');

// Initialize Firebase Admin
let firebaseApp;
if (!admin.apps.length) {
  const privateKey = process.env.FIREBASE_PRIVATE_KEY ?
    process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') :
    undefined;

  firebaseApp = admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: privateKey
    }),
  });
}

// Verify Paddle webhook signature
function verifyPaddleWebhook(rawBody, signature) {
  try {
    const hmac = crypto.createHmac('sha256', process.env.PADDLE_PUBLIC_KEY);
    const digest = hmac.update(rawBody).digest('hex');
    return digest === signature;
  } catch (error) {
    console.error('Error verifying webhook signature:', error);
    return false;
  }
}

// Handle subscription events
async function handleSubscriptionEvent(event, userId) {
  const db = admin.firestore();
  const userRef = db.collection('users').doc(userId);
  const transactionsRef = userRef.collection('transactions');

  try {
    console.log('Processing subscription event for user:', userId);

    // Get subscription details from the event
    const subscriptionId = event.data.id;
    const item = event.data.items?.[0];
    const status = event.data.status;
    const nextBillDate = event.data.next_billed_at ? new Date(event.data.next_billed_at) : null;

    console.log('Subscription details:', {
      subscriptionId,
      status,
      nextBillDate,
      productId: item?.product?.id,
      productName: item?.product?.name
    });

    // Save transaction record
    const transactionData = {
      userId,
      subscriptionId,
      product: {
        id: item?.product?.id ?? '',
        name: item?.product?.name ?? ''
      },
      amountPaid: item?.totals?.total ?? 0,
      currency: item?.price?.unit_price?.currency_code ?? 'USD',
      paymentStatus: status,
      customerEmail: event.data.customer?.email ?? '',
      customerId: event.data.customer?.id ?? '',
      nextBillDate,
      startDate: event.data.started_at ? new Date(event.data.started_at) : null,
      quantity: item?.quantity ?? 1,
      timestamp: new Date()
    };

    console.log('Saving transaction data:', transactionData);
    await transactionsRef.doc(subscriptionId).set(transactionData);

    // Update user's subscription status
    const userData = {
      hasActiveSubscription: status === 'active',
      currentSubscriptionId: subscriptionId,
      subscriptionStatus: status,
      currentPlan: item?.product?.id ?? '',
      nextBillDate,
      paddleCustomerId: event.data.customer?.id,
      lastSubscriptionUpdate: new Date()
    };

    console.log('Updating user data:', userData);
    await userRef.set(userData, { merge: true });

    console.log('Successfully updated subscription data for user:', userId);
    return true;
  } catch (error) {
    console.error('Error in handleSubscriptionEvent:', error);
    console.error('Failed event data:', JSON.stringify(event, null, 2));
    return false;
  }
}

// This is a simplified API handler that doesn't use Next.js
exports.handler = async function(event, context) {
  try {
    // Remove the /.netlify/functions/api prefix from the path
    const path = event.path.replace('/.netlify/functions/api', '');
    const method = event.httpMethod;
    const body = event.body ? JSON.parse(event.body) : {};
    const params = event.queryStringParameters || {};

    console.log('Received request:', {
      path: event.path,
      cleanPath: path,
      method,
      headers: event.headers,
      body: body
    });

    // Add a test endpoint
    if (path === '/test' || path === '/api/test') {
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: 'API is working',
          environment: process.env.NODE_ENV,
          hasFirebaseConfig: !!process.env.FIREBASE_PROJECT_ID,
          hasPaddleConfig: !!process.env.PADDLE_PUBLIC_KEY
        })
      };
    }

    // Handle Paddle webhooks
    if ((path === '/webhooks/paddle' || path === '/api/webhooks/paddle') && method === 'POST') {
      console.log('Processing Paddle webhook');
      console.log('Headers:', JSON.stringify(event.headers, null, 2));
      console.log('Raw body:', event.body);
      console.log('Parsed body:', JSON.stringify(body, null, 2));

      // Check if Firebase is initialized
      if (!admin.apps.length) {
        console.error('Firebase not initialized');
        return {
          statusCode: 500,
          body: JSON.stringify({
            error: 'Firebase not initialized',
            projectId: process.env.FIREBASE_PROJECT_ID ? 'configured' : 'missing',
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL ? 'configured' : 'missing',
            privateKey: process.env.FIREBASE_PRIVATE_KEY ? 'configured' : 'missing'
          })
        };
      }

      try {
        // Verify webhook signature
        const signature = event.headers['paddle-signature'];
        if (!signature) {
          console.error('Missing Paddle signature header');
          return {
            statusCode: 401,
            body: JSON.stringify({
              error: 'Missing Paddle signature header',
              headers: Object.keys(event.headers)
            })
          };
        }

        // Log the verification attempt
        console.log('Verifying webhook signature:', signature);
        const isValid = verifyPaddleWebhook(event.body, signature);
        console.log('Signature verification result:', isValid);

        if (!isValid) {
          console.error('Invalid webhook signature');
          return {
            statusCode: 401,
            body: JSON.stringify({ error: 'Invalid webhook signature' })
          };
        }

        // Process subscription events
        if (body.event_type === 'subscription.created' ||
          body.event_type === 'subscription.updated' ||
          body.event_type === 'subscription.cancelled') {

          console.log('Processing subscription event:', body.event_type);

          // Get user ID from custom data
          const userId = body.data?.custom_data?.userId;
          if (!userId) {
            console.error('No user ID in webhook data. Full data:', JSON.stringify(body.data));
            return {
              statusCode: 400,
              body: JSON.stringify({ 
                error: 'Missing user ID in custom data',
                data: body.data,
                customData: body.data?.custom_data
              })
            };
          }

          console.log('Found user ID:', userId);

          try {
            const success = await handleSubscriptionEvent(body, userId);
            if (!success) {
              console.error('Failed to process subscription event for user:', userId);
              return {
                statusCode: 500,
                body: JSON.stringify({ 
                  error: 'Failed to process subscription event',
                  userId: userId
                })
              };
            }

            console.log('Successfully processed subscription event for user:', userId);
            return {
              statusCode: 200,
              body: JSON.stringify({ 
                message: 'Webhook processed successfully',
                eventType: body.event_type,
                userId: userId
              })
            };
          } catch (error) {
            console.error('Error in handleSubscriptionEvent:', error);
            return {
              statusCode: 500,
              body: JSON.stringify({ 
                error: 'Error processing subscription event',
                message: error.message,
                userId: userId
              })
            };
          }
        }

        // For other webhook events, log and acknowledge
        console.log('Received non-subscription webhook event:', body.event_type);
        return {
          statusCode: 200,
          body: JSON.stringify({ 
            message: 'Webhook received',
            eventType: body.event_type
          })
        };
      } catch (error) {
        console.error('Error processing webhook:', error);
        return {
          statusCode: 500,
          body: JSON.stringify({ 
            error: 'Error processing webhook',
            message: error.message,
            stack: error.stack
          })
        };
      }
    }

    // Handle portal session creation
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

    // Default response for unhandled routes
    return {
      statusCode: 404,
      body: JSON.stringify({ 
        error: 'Not found',
        path: path,
        method: method
      })
    };
  } catch (error) {
    console.error('Unhandled error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error.message,
        stack: error.stack
      })
    };
  }
}; 