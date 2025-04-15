import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';
import admin from 'firebase-admin';
import { buffer } from 'micro';

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
  const publicKey = process.env.PADDLE_PUBLIC_KEY;
  if (!publicKey) throw new Error('Paddle public key not configured');

  const hash = crypto
    .createHmac('sha256', publicKey)
    .update(rawBody)
    .digest('hex');

  return hash === signature;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  try {
    const rawBody = (await buffer(req)).toString();
    const signature = req.headers['paddle-signature'] as string;

    // Log the full payload for debugging
    console.log('Full webhook payload:', rawBody);

    if (!signature || !verifyPaddleSignature(rawBody, signature)) {
      return res.status(401).json({ message: 'Invalid signature' });
    }

    const payload = JSON.parse(rawBody);
    const { event_type, data } = payload;

    console.log('Paddle Webhook:', event_type, JSON.stringify(data, null, 2));

    // Normalize event type (Paddle uses both formats in different contexts)
    const normalizedEvent = event_type.replace('.', '_');

    switch (normalizedEvent) {
      case 'checkout_completed':
        await handleCheckoutCompleted(data);
        break;
      case 'subscription_created':
        await handleSubscriptionCreated(data);
        break;
      case 'subscription_updated':
        await handleSubscriptionUpdated(data);
        break;
      case 'subscription_canceled':
        await handleSubscriptionCanceled(data);
        break;
      default:
        console.log(`Unhandled event type: ${event_type}`);
    }

    res.status(200).json({ message: 'Webhook processed' });
  } catch (error) {
    console.error('Webhook Error:', error);
    res.status(400).json({ message: 'Webhook processing failed' });
  }
}

async function handleCheckoutCompleted(data: any) {
  const userId = data.custom_data?.userId;

  if (!userId) {
    console.error('Missing userId in checkout data', data);
    return;
  }

  const userRef = db.collection('users').doc(userId);
  const batch = db.batch();

  const paddleCustomerId = data.customer?.id || '';

  // Set initial subscription data
  batch.update(userRef, {
    hasActiveSubscription: true,
    subscriptionStatus: 'active',
    lastCheckout: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    paddleCustomerId, // Save customer ID for future reference
  });

  const transactionRef = userRef.collection('transactions').doc();
  batch.set(transactionRef, {
    userId,
    paddleTransactionId: data.order_id || data.id || '',
    subscriptionId: '', // Explicitly set to blank, will be updated in subscription.created
    product: {
      id: data.items?.[0]?.price_id || data.items?.[0]?.price?.product_id || '',
      name: data.items?.[0]?.product?.name || data.items?.[0]?.price?.description || '',
    },
    amountPaid: data.totals?.total || data.total || 0,
    currency: data.currency_code || data.currency || '',
    paymentStatus: data.status || 'completed',
    customerEmail: data.customer?.email || '',
    customerId: paddleCustomerId, // Save customer ID in transaction
    status: 'pending_subscription', // New status to indicate waiting for subscription
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
    checkoutEventProcessed: true,
  });

  try {
    await batch.commit();
    console.log('Checkout saved for user:', userId, 'with customer ID:', paddleCustomerId);
  } catch (error) {
    console.error('Error saving checkout data:', error);
  }
}

async function handleSubscriptionCreated(data: any) {
  const subscriptionId = data.id || data.subscription_id;
  const customerId = data.customer?.id || data.customer_id;

  console.log('🔔 New subscription created:', {
    subscriptionId,
    customerId,
    fullData: data
  });

  if (!customerId || !subscriptionId) {
    console.error('Missing customer ID or subscription ID in subscription_created event', data);
    return;
  }

  // Find user by customer ID
  const usersSnapshot = await db
    .collection('users')
    .where('paddleCustomerId', '==', customerId)
    .limit(1)
    .get();

  if (usersSnapshot.empty) {
    console.error('No user found with Paddle customer ID:', customerId);
    return;
  }

  const userId = usersSnapshot.docs[0].id;
  const userRef = db.collection('users').doc(userId);

  // Find the most recent transaction for this customer that's pending subscription
  const transactionsSnapshot = await userRef
    .collection('transactions')
    .where('customerId', '==', customerId)
    .where('status', '==', 'pending_subscription')
    .orderBy('timestamp', 'desc')
    .limit(1)
    .get();

  const batch = db.batch();

  if (!transactionsSnapshot.empty) {
    const transactionDoc = transactionsSnapshot.docs[0];
    batch.update(transactionDoc.ref, {
      subscriptionId: subscriptionId,
      status: 'active',
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      subscriptionEventProcessed: true
    });
  } else {
    console.warn('No pending transaction found for customer ID:', customerId);
  }

  // Update user subscription status
  batch.update(userRef, {
    hasActiveSubscription: true,
    subscriptionStatus: 'active',
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    lastSubscriptionId: subscriptionId
  });

  try {
    await batch.commit();
    console.log('Successfully linked subscription', subscriptionId, 'to user:', userId);
  } catch (error) {
    console.error('Error updating subscription data:', error);
  }
}

// Separate function for subscription updates
async function handleSubscriptionUpdated(data: any) {
  const paddleCustomerId = data.customer?.id || data.customer_id;
  const subscriptionId = data.subscription_id || data.id;
  
  if (!paddleCustomerId || !subscriptionId) {
    console.error('Missing customer ID or subscription ID in data', data);
    return;
  }

  const firebaseUid = await getFirebaseUid(paddleCustomerId);
  if (!firebaseUid) {
    console.error('No Firebase user found for Paddle customer ID:', paddleCustomerId);
    return;
  }

  // Find transaction with this subscription ID
  const transactionsSnapshot = await db
    .collection('users')
    .doc(firebaseUid)
    .collection('transactions')
    .where('subscriptionId', '==', subscriptionId)
    .limit(1)
    .get();

  if (!transactionsSnapshot.empty) {
    const transactionDoc = transactionsSnapshot.docs[0];
    await transactionDoc.ref.update({
      status: data.status || 'active',
      portalUrl: data.portal_url || data.management_url || '',
      nextBillDate: data.next_billing_date ? new Date(data.next_billing_date) : null,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    console.log('Updated transaction for subscription:', subscriptionId);
  } else {
    console.log('No transaction found for subscription ID:', subscriptionId);
  }

  // Update main user document
  await db.collection('users').doc(firebaseUid).update({
    hasActiveSubscription: true,
    subscriptionStatus: 'active',
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  console.log('Subscription updated for user:', firebaseUid);
}

async function handleSubscriptionCanceled(data: any) {
  const subscriptionId = data.subscription_id || data.id;
  const paddleCustomerId = data.customer?.id || data.customer_id;
  
  if (!paddleCustomerId || !subscriptionId) {
    console.error('Missing data in subscription cancellation', data);
    return;
  }
  
  const firebaseUid = await getFirebaseUid(paddleCustomerId);
  if (!firebaseUid) {
    console.error('No Firebase user found for Paddle customer ID:', paddleCustomerId);
    return;
  }

  // Find the transaction with this subscription ID
  const transactionsSnapshot = await db
    .collection('users')
    .doc(firebaseUid)
    .collection('transactions')
    .where('subscriptionId', '==', subscriptionId)
    .limit(1)
    .get();
  
  if (!transactionsSnapshot.empty) {
    const transactionDoc = transactionsSnapshot.docs[0];
    await transactionDoc.ref.update({
      status: 'canceled',
      canceledAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  }

  // Check if user has any other active subscriptions
  const activeTransactionsSnapshot = await db
    .collection('users')
    .doc(firebaseUid)
    .collection('transactions')
    .where('status', '==', 'active')
    .limit(1)
    .get();

  // Update user status if no active subscriptions remain
  if (activeTransactionsSnapshot.empty) {
    await db.collection('users').doc(firebaseUid).update({
      hasActiveSubscription: false,
      subscriptionStatus: 'canceled',
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  }

  console.log('Subscription canceled for user:', firebaseUid);
}

async function getFirebaseUid(paddleCustomerId: string): Promise<string | null> {
  const snapshot = await db
    .collection('users')
    .where('paddleCustomerId', '==', paddleCustomerId)
    .limit(1)
    .get();

  if (snapshot.empty) return null;
  return snapshot.docs[0].id;
}