import { NextResponse } from 'next/server';
import { getFirestore, collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { firestore } from '@/lib/firebase';
import crypto from 'crypto';

// This should be moved to environment variables
const PADDLE_PUBLIC_KEY = process.env.PADDLE_PUBLIC_KEY || '';

const verifyWebhookSignature = (request: Request, rawBody: string, signature: string) => {
  try {
    const verifier = crypto.createVerify('sha256WithRSAEncryption');
    verifier.update(rawBody);
    return verifier.verify(PADDLE_PUBLIC_KEY, signature, 'base64');
  } catch (error) {
    console.error('Signature verification error:', error);
    return false;
  }
};

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('Paddle-Signature') || '';
    
    // Verify webhook signature in production
    if (process.env.NODE_ENV === 'production') {
      const isValid = verifyWebhookSignature(req, rawBody, signature);
      if (!isValid) {
        console.error('Invalid webhook signature');
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      }
    }

    const payload = JSON.parse(rawBody);
    
    try {
      // Handle different webhook event types
      switch (payload.event_type) {
        case 'subscription.created':
        case 'subscription.updated':
          // Store subscription data
          await setDoc(doc(firestore, 'subscriptions', payload.data.id), {
            userId: payload.data.custom_data?.userId,
            status: payload.data.status,
            planId: payload.data.items[0].price.product_id,
            startDate: payload.data.start_date,
            nextBillDate: payload.data.next_billed_at,
            billAmount: payload.data.items[0].price.unit_price.amount,
            currency: payload.data.items[0].price.unit_price.currency_code,
            updatedAt: new Date().toISOString(),
            lastWebhookTime: new Date().toISOString()
          });
          break;

        case 'subscription.canceled':
          // Update subscription status
          await setDoc(doc(firestore, 'subscriptions', payload.data.id), {
            status: 'canceled',
            canceledAt: new Date().toISOString(),
            lastWebhookTime: new Date().toISOString()
          }, { merge: true });
          break;

        case 'transaction.completed':
          // Store transaction data
          await addDoc(collection(firestore, 'transactions'), {
            transactionId: payload.data.id,
            subscriptionId: payload.data.subscription_id,
            userId: payload.data.custom_data?.userId,
            status: payload.data.status,
            amount: payload.data.items[0].price.unit_price.amount,
            currency: payload.data.items[0].price.unit_price.currency_code,
            paymentMethod: payload.data.payment_method,
            createdAt: new Date().toISOString(),
            webhookTime: new Date().toISOString()
          });
          
          // Update user's subscription status in users collection if needed
          if (payload.data.custom_data?.userId) {
            await setDoc(doc(firestore, 'users', payload.data.custom_data.userId), {
              hasActiveSubscription: true,
              lastPayment: new Date().toISOString(),
              lastTransactionId: payload.data.id
            }, { merge: true });
          }
          break;

        default:
          console.log('Unhandled webhook event:', payload.event_type);
      }

      return NextResponse.json({ success: true });
    } catch (error) {
      console.error('Error processing webhook:', error);
      // Return 500 to tell Paddle to retry the webhook
      return NextResponse.json({ error: 'Error processing webhook' }, { status: 500 });
    }
  } catch (error) {
    console.error('Webhook parsing error:', error);
    return NextResponse.json({ error: 'Invalid webhook payload' }, { status: 400 });
  }
}