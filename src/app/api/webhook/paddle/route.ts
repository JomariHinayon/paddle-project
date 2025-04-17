import { NextResponse } from 'next/server';
import crypto from 'crypto';
import admin from 'firebase-admin';

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

const db = admin.firestore();

export const config = {
  api: {
    bodyParser: false,
  },
};

const verifyPaddleSignature = (rawBody: string, signature: string) => {
  try {
    const publicKey = process.env.PADDLE_PUBLIC_KEY;
    if (!publicKey) {
      console.error('Paddle public key not configured in environment variables');
      return false;
    }

    // For debugging: log the signature received
    console.log(`Received signature: ${signature}`);
    
    // In development/testing mode, you can bypass signature verification
    if (process.env.NODE_ENV === 'development' && process.env.BYPASS_PADDLE_VERIFICATION === 'true') {
      console.log('Bypassing signature verification in development mode');
      return true;
    }

    // Use the key directly for HMAC calculation - Paddle's simple API uses HMAC-SHA256
    const hmacHash = crypto.createHmac('sha256', publicKey).update(rawBody).digest('hex');
    const result = hmacHash === signature;
    
    console.log(`Signature verification: ${result ? 'Success' : 'Failed'}`);
    console.log(`Calculated hash (first 10 chars): ${hmacHash.substring(0, 10)}...`);
    console.log(`Expected signature (first 10 chars): ${signature.substring(0, 10)}...`);

    return result;
  } catch (error) {
    console.error('Error verifying Paddle signature:', error);
    return false;
  }
};

export async function POST(req: Request) {
  try {
    // Read the raw body
    const rawBody = await req.text();
    const url = new URL(req.url);
    
    // Check if this is a test endpoint
    if (url.pathname.includes('/test')) {
      console.log('TEST WEBHOOK - Headers:', JSON.stringify(Object.fromEntries([...req.headers])));
      console.log('TEST WEBHOOK - Raw Body:', rawBody);
      
      try {
        // Try to parse the body as JSON
        const jsonBody = JSON.parse(rawBody);
        console.log('TEST WEBHOOK - Parsed JSON:', JSON.stringify(jsonBody, null, 2));
      } catch (e) {
        console.log('TEST WEBHOOK - Not valid JSON');
      }
      
      // Always return success for testing
      return NextResponse.json({ 
        status: 'success',
        message: 'Test webhook received and logged'
      });
    }
    
    // Production webhook handling
    const signature = req.headers.get('paddle-signature');

    console.log('Incoming webhook payload:', rawBody);
    console.log('Webhook headers:', JSON.stringify(Object.fromEntries([...req.headers])));

    // During initial setup or troubleshooting, you can temporarily allow webhooks without verification
    const bypassVerification = process.env.NODE_ENV === 'development' && process.env.BYPASS_PADDLE_VERIFICATION === 'true';
    
    if (!signature) {
      console.error('No paddle-signature header found');
      return NextResponse.json({ message: 'Missing signature header' }, { status: 401 });
    }
    
    if (!bypassVerification && !verifyPaddleSignature(rawBody, signature)) {
      console.error('Signature verification failed');
      
      // During testing/development, you can still process the webhook even if verification fails
      if (process.env.NODE_ENV === 'development' && process.env.PROCESS_INVALID_SIGNATURES === 'true') {
        console.log('Processing webhook despite failed verification (development mode)');
      } else {
        return NextResponse.json({ message: 'Invalid signature' }, { status: 401 });
      }
    }
    
    const { event_type, data } = JSON.parse(rawBody);
    const normalizedEvent = event_type.replace('.', '_');

    console.log(`Processing Paddle ${event_type} event`, { data: JSON.stringify(data) });

    switch (normalizedEvent) {
      case 'subscription_created':
        await handleSubscriptionTransaction(data);
        break;
      case 'subscription_updated':
        await handleSubscriptionTransaction(data);
        break;
      case 'subscription_canceled':
        await handleSubscriptionCancellation(data);
        break;
      case 'checkout_completed':
        await handleCheckoutCompleted(data);
        break;
      default:
        console.log(`Unhandled event type: ${event_type}`);
    }

    return NextResponse.json({ message: 'Webhook processed' }, { status: 200 });
  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ message: 'Webhook processing failed' }, { status: 400 });
  }
}

async function handleCheckoutCompleted(data: any) {
  // This event happens when checkout is completed, but before subscription is created
  const userId = data.custom_data?.userId;
  const customerId = data.customer?.id;
  const transactionId = data.id;
  
  if (!userId || !customerId) {
    console.error('Missing required data in checkout_completed event');
    return;
  }

  const checkoutData = {
    checkoutId: transactionId,
    customerId,
    userId,
    status: data.status,
    completed: true,
    items: data.items || [],
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    rawData: data
  };

  // Store the checkout data indexed by checkoutId
  const checkoutRef = db.collection('checkouts').doc(transactionId);
  await checkoutRef.set(checkoutData);

  // Also store a reference in the user's collection for easier access
  const userCheckoutRef = db.collection('users').doc(userId).collection('checkouts').doc(transactionId);
  await userCheckoutRef.set(checkoutData);
}

async function handleSubscriptionTransaction(data: any) {
  let userId = data.custom_data?.userId;
  const customerId = data.customer_id;
  const subscriptionId = data.id;
  const transactionId = data.transaction_id || subscriptionId;

  if (!userId && customerId) {
    // Try to find userId from customer ID if not directly provided
    const userQuery = await db.collection('users')
      .where('paddleCustomerId', '==', customerId)
      .limit(1)
      .get();
      
    if (!userQuery.empty) {
      userId = userQuery.docs[0].id;
      console.log(`Found userId ${userId} from customerId ${customerId}`);
    }
  }

  if (!userId || !customerId) {
    console.error('Missing required user identification data');
    return;
  }

  const item = data.items?.[0];
  const billingCycle = data.billing_cycle || item?.price?.billing_cycle || {};

  const transactionData = {
    subscriptionId,
    customerId,
    transactionId,
    status: data.status || 'active',
    planId: item?.product?.id || '',
    priceId: item?.price?.id || '',
    productId: item?.product?.id || '',
    productName: item?.product?.name || '',
    quantity: item?.quantity || 1,
    amountPaid: parseFloat(item?.price?.unit_price?.amount || '0'),
    currency: item?.price?.unit_price?.currency_code || data.currency_code || 'USD',
    nextBillDate: data.next_billed_at ? new Date(data.next_billed_at) : null,
    startDate: data.started_at ? new Date(data.started_at) : new Date(),
    createdAt: data.created_at ? new Date(data.created_at) : new Date(),
    updatedAt: data.updated_at ? new Date(data.updated_at) : new Date(),
    billingCycle: {
      interval: billingCycle.interval || 'month',
      frequency: billingCycle.frequency || 1,
    },
    customData: data.custom_data || {},
    customerEmail: data.billing_details?.email || '',
    addressId: data.address_id || '',
    discount: data.discount || null,
    pausedAt: data.paused_at ? new Date(data.paused_at) : null,
    canceledAt: data.canceled_at ? new Date(data.canceled_at) : null,
    firstBilledAt: data.first_billed_at ? new Date(data.first_billed_at) : null,
    currentBillingPeriod: {
      startsAt: data.current_billing_period?.starts_at ? new Date(data.current_billing_period.starts_at) : null,
      endsAt: data.current_billing_period?.ends_at ? new Date(data.current_billing_period.ends_at) : null,
    },
    collectionMode: data.collection_mode || 'automatic',
    importMeta: data.import_meta || null,
    scheduledChange: data.scheduled_change || null,
  };

  // Store the transaction data in the transactions collection
  const transRef = db.collection('users').doc(userId).collection('transactions').doc(transactionId);
  await transRef.set(transactionData, { merge: true });

  // Also update the user document with subscription info
  const userRef = db.collection('users').doc(userId);
  await userRef.set({
    hasActiveSubscription: true,
    currentSubscriptionId: subscriptionId,
    subscriptionStatus: data.status || 'active',
    currentPlan: item?.product?.id || '',
    nextBillDate: data.next_billed_at ? new Date(data.next_billed_at) : null,
    paddleCustomerId: customerId,
    lastTransactionDate: new Date()
  }, { merge: true });
}

async function handleSubscriptionCancellation(data: any) {
  let userId = data.custom_data?.userId;
  const customerId = data.customer_id;
  const subscriptionId = data.id;
  const transactionId = data.transaction_id || subscriptionId;

  if (!userId && !customerId) {
    console.error('Missing required user identification data');
    
    // Try to find userId from existing transactions
    if (customerId) {
      // Lookup all transactions to find one with this customerId
      const subsQuery = await db.collectionGroup('transactions')
        .where('customerId', '==', customerId)
        .limit(1)
        .get();
        
      if (!subsQuery.empty) {
        // Get the parent path to extract userId
        const docPath = subsQuery.docs[0].ref.path;
        const pathParts = docPath.split('/');
        // Path format: users/{userId}/transactions/{transactionId}
        if (pathParts.length >= 4 && pathParts[0] === 'users') {
          userId = pathParts[1];
          console.log(`Found userId ${userId} from existing transaction for customerId ${customerId}`);
        }
      }
    }
    
    if (!userId) {
      console.error('Cannot process cancellation: No userId found');
      return;
    }
  }

  const cancellationData = {
    status: 'canceled',
    canceledAt: data.canceled_at ? new Date(data.canceled_at) : new Date(),
    updatedAt: new Date(),
  };

  // Update the transaction record
  const transRef = db.collection('users').doc(userId).collection('transactions').doc(transactionId);
  await transRef.set(cancellationData, { merge: true });

  // Update the user's subscription status
  const userRef = db.collection('users').doc(userId);
  await userRef.set({
    hasActiveSubscription: false,
    subscriptionStatus: 'canceled',
    subscriptionCanceledAt: admin.firestore.FieldValue.serverTimestamp(),
  }, { merge: true });
} 