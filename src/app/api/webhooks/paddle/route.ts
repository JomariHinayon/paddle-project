import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import admin from 'firebase-admin';
import { headers } from 'next/headers';

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

export async function POST(request: Request) {
  try {
    const headersList = await headers();
    const paddleSignature = headersList.get('paddle-signature');

    if (!paddleSignature) {
      return NextResponse.json(
        { error: 'No Paddle signature found' },
        { status: 400 }
      );
    }

    const body = await request.json();
    
    // TODO: Verify the webhook signature using Paddle public key
    // TODO: Process the webhook event based on event_type
    
    console.log('Received Paddle webhook:', body);

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Error processing webhook' },
      { status: 500 }
    );
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
  
  // We won't store the full checkout data in Firebase anymore
  // Instead, we'll just log the event and keep minimum reference data
  // for potential matching when subscription.created webhook arrives
  console.log('Checkout completed event received. Waiting for subscription.created event.');
  
  // Store minimal reference data in a temporary collection
  // This will be used to match with subscription.created events
  if (userId) {
    // Create a temporary reference without saving the full transaction data
    const tempRef = db.collection('pending_subscriptions').doc(transactionId);
    await tempRef.set({
      checkoutId: transactionId,
      customerId,
      userId,
      created: admin.firestore.FieldValue.serverTimestamp(),
      status: 'pending_subscription',
      // Don't store complete checkout data, just the minimal info needed
    });
    
    console.log(`Created temporary reference for checkout ${transactionId} for user ${userId}`);
  } else {
    console.log('No userId in checkout_completed event, cannot create temporary reference');
  }
}