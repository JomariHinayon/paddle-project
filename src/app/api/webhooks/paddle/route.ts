import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';
import admin from 'firebase-admin';
import { buffer } from 'micro';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  try {
    const rawBody = (await buffer(req)).toString();
    const signature = req.headers['paddle-signature'] as string;

    console.log('Incoming webhook payload:', rawBody);

    if (!signature || !verifyPaddleSignature(rawBody, signature)) {
      return res.status(401).json({ message: 'Invalid signature' });
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
      default:
        console.log(`Unhandled event type: ${event_type}`);
    }

    res.status(200).json({ message: 'Webhook processed' });
  } catch (error) {
    console.error('Webhook Error:', error);
    res.status(400).json({ message: 'Webhook processing failed' });
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