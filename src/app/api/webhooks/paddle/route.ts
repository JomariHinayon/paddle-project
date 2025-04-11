import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';
import { getFirestore, collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { firestore } from '@/lib/firebase';

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const payload = JSON.parse(rawBody);
    
    try {
      // Handle different webhook event types
      switch (payload.event_type) {
        case 'checkout.completed':
          // Store checkout data
          await db.collection('checkouts').doc(payload.data.id).set({
            orderId: payload.data.order_id,
            status: 'completed',
            customerId: payload.data.customer_id,
            userId: payload.data.custom_data?.userId,
            total: payload.data.total,
            currency: payload.data.currency_code,
            createdAt: new Date().toISOString(),
            webhookTime: new Date().toISOString()
          });

          // Update user status
          if (payload.data.custom_data?.userId) {
            await db.collection('users').doc(payload.data.custom_data.userId).set({
              hasActiveSubscription: true,
              lastCheckout: new Date().toISOString(),
              lastOrderId: payload.data.order_id
            }, { merge: true });
          }
          break;

        case 'subscription.created':
        case 'subscription.updated':
          await db.collection('subscriptions').doc(payload.data.id).set({
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