import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import admin from 'firebase-admin';

// Get Firebase private key in the correct format
const getFirebasePrivateKey = () => {
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;
  return privateKey ? privateKey.replace(/\\n/g, '\n') : '';
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: getFirebasePrivateKey(),
    }),
  });
}

const db = admin.firestore();

export const config = {
  api: {
    bodyParser: false,
  },
};

const verifyPaddleSignature = (rawBody: string, signature: string) => {
  const publicKey = process.env.PADDLE_PUBLIC_KEY;
  if (!publicKey) throw new Error('Paddle public key not configured');

  const hash = crypto.createHmac('sha256', publicKey).update(rawBody).digest('hex');
  return hash === signature;
};

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('paddle-signature');

    console.log('Incoming webhook payload:', rawBody);

    if (!signature || !verifyPaddleSignature(rawBody, signature)) {
      return NextResponse.json({ message: 'Invalid signature' }, { status: 401 });
    }

    const { event_type, data } = JSON.parse(rawBody);
    const normalizedEvent = event_type.replace('.', '_');

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

    return NextResponse.json({ message: 'Webhook processed' });
  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ message: 'Webhook processing failed' }, { status: 400 });
  }
}

async function handleSubscriptionTransaction(data: any) {
  const userId = data.custom_data?.userId;
  const customerId = data.customer_id;
  const subscriptionId = data.id;
  const transactionId = data.transaction_id || subscriptionId;

  if (!userId || !customerId || !subscriptionId) {
    console.error('Missing required data');
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
    startDate: data.started_at ? new Date(data.started_at) : null,
    createdAt: data.created_at ? new Date(data.created_at) : null,
    updatedAt: data.updated_at ? new Date(data.updated_at) : null,
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

  const transRef = db.collection('users').doc(userId).collection('transactions').doc(transactionId);
  await transRef.set(transactionData, { merge: true });
}

async function handleSubscriptionCancellation(data: any) {
  const userId = data.custom_data?.userId;
  const customerId = data.customer_id;
  const subscriptionId = data.id;
  const transactionId = data.transaction_id || subscriptionId;

  if (!userId || !customerId || !subscriptionId) {
    console.error('Missing required data');
    return;
  }

  const transRef = db.collection('users').doc(userId).collection('transactions').doc(transactionId);
  await transRef.set({
    status: 'canceled',
    canceledAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  }, { merge: true });
}

async function handleCheckoutCompleted(data: any) {
  // This event happens when checkout is completed, but before subscription is created
  const customerId = data.customer_id;
  const transactionId = data.id || data.transaction_id;
  const userId = data.custom_data?.userId;
  const email = data.customer_email || data.custom_data?.email;
  
  if (!customerId || !transactionId) {
    console.error('Missing required data in checkout_completed event');
    return;
  }
  
  // Store the checkout data
  const checkoutData = {
    checkoutId: transactionId,
    customerId,
    userId,
    transactionId,
    email,
    status: 'completed',
    completedAt: data.completed_at ? new Date(data.completed_at) : admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    items: data.items || [],
    customData: data.custom_data || {},
    totalAmount: data.total_price?.amount || 0,
    currency: data.total_price?.currency_code || 'USD',
    billingDetails: data.billing_details || {},
    rawEvent: data
  };
  
  // Store the checkout data indexed by checkoutId
  const checkoutRef = db.collection('checkouts').doc(transactionId);
  await checkoutRef.set(checkoutData, { merge: true });
  
  // If we have a userId from custom data, associate with user
  if (userId) {
    const userCheckoutRef = db.collection('users').doc(userId).collection('checkouts').doc(transactionId);
    await userCheckoutRef.set(checkoutData, { merge: true });
    
    // Check if we have a pending transaction for this checkout
    const pendingTransactionId = `pending_${transactionId}`;
    const pendingTransactionRef = db.collection('users').doc(userId).collection('transactions').doc(pendingTransactionId);
    const pendingTransaction = await pendingTransactionRef.get();
    
    if (pendingTransaction.exists) {
      // Update the pending transaction with checkout data
      await pendingTransactionRef.update({
        ...checkoutData,
        status: 'checkout_completed',
        subscriptionPending: true
      });
    }
    
    // Also update user record with customerId
    const userRef = db.collection('users').doc(userId);
    await userRef.set({
      paddleCustomerId: customerId,
      lastCheckoutId: transactionId,
      lastCheckoutDate: checkoutData.completedAt
    }, { merge: true });
  } else {
    // If no userId, we'll store it in a general collection for potential matching later
    console.log('No userId in checkout_completed event custom data');
  }
  
  // Try to determine if this checkout was for a subscription
  const subscriptionProductIds = Object.keys(data.items || {})
    .filter(key => data.items[key]?.recurring === true)
    .map(key => data.items[key]?.product_id);
  
  if (subscriptionProductIds.length > 0) {
    console.log('Subscription product detected in checkout:', subscriptionProductIds);
    // We know a subscription will be created, but we don't have the ID yet
    // It will be handled by the subscription_created webhook later
  }
}