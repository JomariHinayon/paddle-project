import { NextRequest, NextResponse } from 'next/server';
import admin from 'firebase-admin';
import axios from 'axios';

// Get Firebase credential
const getFirebaseCredential = () => {
  if (process.env.FIREBASE_PRIVATE_KEY) {
    return admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    });
  }
  return admin.credential.applicationDefault();
};

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: getFirebaseCredential(),
  });
}

const db = admin.firestore();

export async function POST(req: NextRequest) {
  try {
    const { checkoutId, customerId, userId, email } = await req.json();

    if (!checkoutId || !customerId || !userId) {
      return NextResponse.json(
        { error: 'Checkout ID, Customer ID, and User ID are required' },
        { status: 400 }
      );
    }

    // Log the request
    console.log(`Verifying checkout for: ${checkoutId}, Customer: ${customerId}, User: ${userId}`);
    
    // First, check if we already have subscription data for this checkout
    const transactionsRef = db.collection('users').doc(userId).collection('transactions');
    const existingTransactions = await transactionsRef
      .where('customerId', '==', customerId)
      .orderBy('createdAt', 'desc')
      .limit(1)
      .get();
    
    if (!existingTransactions.empty) {
      console.log('Found existing transaction for this customer');
      const subscriptionData = existingTransactions.docs[0].data();
      
      return NextResponse.json({
        subscriptionId: subscriptionData.subscriptionId,
        status: subscriptionData.status,
        planId: subscriptionData.planId,
        nextBillDate: subscriptionData.nextBillDate,
        customerId: subscriptionData.customerId,
      });
    }
    
    // If no existing transaction is found, we need to query Paddle API
    const paddleApiKey = process.env.PADDLE_API_KEY;
    const paddleVendorId = process.env.PADDLE_VENDOR_ID;
    
    if (!paddleApiKey || !paddleVendorId) {
      throw new Error('Paddle API credentials not configured');
    }

    // 1. Try to get transaction data from Paddle
    let subscriptionId = null;
    let subscriptionData = null;
    
    try {
      // First try to get the transaction from the completed checkout
      const checkoutResponse = await axios.post(
        'https://api.paddle.com/checkout/completed',
        {
          checkout_id: checkoutId
        },
        {
          headers: {
            'Authorization': `Bearer ${paddleApiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log('Paddle checkout response:', checkoutResponse.data);
      
      if (checkoutResponse.data?.data) {
        // Get the subscription ID from the completed checkout data
        const transactionData = checkoutResponse.data.data;
        
        // If we have a subscription, get the subscription details
        if (transactionData.subscription_id) {
          subscriptionId = transactionData.subscription_id;
          
          // Get detailed subscription data
          const subscriptionResponse = await axios.get(
            `https://api.paddle.com/subscriptions/${subscriptionId}`,
            {
              headers: {
                'Authorization': `Bearer ${paddleApiKey}`,
                'Content-Type': 'application/json'
              }
            }
          );
          
          console.log('Paddle subscription response:', subscriptionResponse.data);
          subscriptionData = subscriptionResponse.data?.data;
        }
      }
    } catch (paddleError) {
      console.error('Error fetching data from Paddle API:', paddleError);
    }
    
    // If we couldn't get subscription data from Paddle, check if we have data in Firebase
    if (!subscriptionData) {
      // Check if we have the subscription in our checkouts collection
      const checkoutDoc = await db.collection('checkouts').doc(checkoutId).get();
      
      if (checkoutDoc.exists) {
        const checkoutData = checkoutDoc.data();
        
        if (checkoutData && checkoutData.subscriptionId) {
          subscriptionId = checkoutData.subscriptionId;
          subscriptionData = checkoutData;
        }
      }
    }
    
    // If we still don't have subscription data, return an error
    if (!subscriptionId) {
      // Create a pending transaction record
      const pendingTransactionId = `pending_${checkoutId}`;
      const pendingTransaction = {
        checkoutId,
        customerId,
        userId,
        email,
        status: 'pending',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        // Add custom data for webhook processing
        customData: {
          userId,
          email,
          checkoutId
        }
      };
      
      // Store the pending transaction
      await db.collection('users').doc(userId).collection('transactions').doc(pendingTransactionId).set(pendingTransaction);
      
      // Also store in global checkouts collection for webhook reference
      await db.collection('checkouts').doc(checkoutId).set({
        ...pendingTransaction,
        processed: false
      });
      
      return NextResponse.json(
        { 
          error: 'Subscription not yet available',
          subscriptionId: 'pending',
          status: 'processing',
          customerId,
          planId: 'pending',
          nextBillDate: null
        },
        { status: 202 } // Accepted but processing
      );
    }
    
    // Process and store the subscription data
    const processedData = {
      subscriptionId: subscriptionId,
      customerId: customerId,
      userId: userId,
      status: subscriptionData.status || 'active',
      planId: subscriptionData.items?.[0]?.price?.product_id || '',
      productId: subscriptionData.items?.[0]?.product?.id || '',
      priceId: subscriptionData.items?.[0]?.price?.id || '',
      nextBillDate: subscriptionData.next_billed_at ? new Date(subscriptionData.next_billed_at) : null,
      createdAt: subscriptionData.created_at ? new Date(subscriptionData.created_at) : admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      customData: {
        userId,
        email,
        checkoutId
      }
    };
    
    // Store subscription data in Firestore
    await db.collection('users').doc(userId).collection('transactions').doc(subscriptionId).set(processedData);
    
    // Update the checkouts reference
    await db.collection('checkouts').doc(checkoutId).set({
      ...processedData,
      processed: true
    });
    
    // Update user record
    await db.collection('users').doc(userId).set({
      hasActiveSubscription: true,
      currentSubscriptionId: subscriptionId,
      subscriptionStatus: processedData.status,
      paddleCustomerId: customerId,
      currentPlan: processedData.planId
    }, { merge: true });
    
    return NextResponse.json({
      subscriptionId: subscriptionId,
      status: processedData.status,
      planId: processedData.planId,
      nextBillDate: processedData.nextBillDate,
      customerId: customerId,
    });
  } catch (error) {
    console.error('Error verifying checkout:', error);
    return NextResponse.json(
      { error: 'Failed to verify checkout' },
      { status: 500 }
    );
  }
} 