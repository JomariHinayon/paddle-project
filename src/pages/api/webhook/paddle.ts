import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';
import db from '@/lib/firebase-admin';

const verifyPaddleSignature = (rawBody: string, signature: string) => {
  const publicKey = process.env.PADDLE_PUBLIC_KEY;
  if (!publicKey) throw new Error('Paddle public key not configured');
  
  const hash = crypto
    .createHmac('sha256', publicKey)
    .update(rawBody)
    .digest('hex');
    
  return hash === signature;
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const rawBody = await getRawBody(req);
    const signature = req.headers['paddle-signature'] as string;

    if (!verifyPaddleSignature(rawBody, signature)) {
      return res.status(401).json({ message: 'Invalid signature' });
    }

    const payload = JSON.parse(rawBody);
    console.log('Webhook payload:', {
      event_type: payload.event_type,
      userId: payload.data.custom_data?.userId,
      data: payload.data
    });
    
    switch (payload.event_type) {
      case 'checkout.completed':
        const userId = payload.data.custom_data?.userId;
        console.log('Processing checkout for user:', userId);
        await handleCheckoutCompleted(payload.data);
        break;
      case 'subscription.created':
      case 'subscription.updated':
        await handleSubscriptionUpdate(payload.data);
        break;
    }

    res.status(200).json({ message: 'Webhook processed' });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(400).json({ message: 'Webhook processing failed' });
  }
}

async function handleCheckoutCompleted(data: any) {
  const userId = data.custom_data?.userId;
  console.log('Handling checkout completion for user:', userId);
  
  if (!userId) {
    console.error('No userId found in custom_data');
    throw new Error('Missing userId in checkout data');
  }

  const userRef = db.collection('users').doc(userId);
  const batch = db.batch();

  console.log('Updating user document:', userId);
  
  // Update user subscription status
  batch.update(userRef, {
    hasActiveSubscription: true,
    lastCheckout: new Date(),
    subscriptionStatus: 'active',
    updatedAt: new Date()
  });

  // Add transaction record with the required fields
  const transactionRef = userRef.collection('transactions').doc();
  batch.set(transactionRef, {
    userId: userId,
    paddleTransactionId: data.order_id || '',
    product: {
      id: data.items?.[0]?.price?.product_id || '',
      name: data.items?.[0]?.price?.description || ''
    },
    amountPaid: data.total || 0,
    currency: data.currency_code || '',
    paymentStatus: data.status || 'completed',
    customerEmail: data.customer?.email || '',
    timestamp: db.serverTimestamp() || ''
  });

  await batch.commit();
  console.log('Transaction saved successfully');
}

async function getRawBody(req: NextApiRequest): Promise<string> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}
