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
    billingCycle: {
      interval: billingCycle.interval || 'month',
      frequency: billingCycle.frequency || 1,
    },
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
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