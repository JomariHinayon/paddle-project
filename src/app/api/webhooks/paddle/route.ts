import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';
import { getFirestore, collection, addDoc, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { firestore } from '@/lib/firebase';

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const payload = JSON.parse(rawBody);
    
    try {
      switch (payload.event_type) {
        case 'checkout.completed':
          // Store transaction data
          await addDoc(collection(firestore, 'transactions'), {
            userId: payload.data.custom_data?.userId || '',
            paddleTransactionId: payload.data.order_id || '',
            product: {
              id: payload.data.items?.[0]?.price?.product_id || '',
              name: payload.data.items?.[0]?.price?.description || ''
            },
            amountPaid: payload.data.details?.totals?.total || 0,
            currency: payload.data.currency_code || '',
            paymentStatus: payload.data.status || '',
            customerEmail: payload.data.customer?.email || '',
            timestamp: serverTimestamp()
          });
          
          // Update user's subscription status
          if (payload.data.custom_data?.userId) {
            await setDoc(doc(firestore, 'users', payload.data.custom_data.userId), {
              hasActiveSubscription: true,
              lastTransactionDate: serverTimestamp(),
              currentPlan: payload.data.items?.[0]?.price?.product_id || '',
              subscriptionStatus: 'active'
            }, { merge: true });
          }
          break;

        case 'subscription.created':
        case 'subscription.updated':
          await setDoc(doc(firestore, 'subscriptions', payload.data.id), {
            userId: payload.data.custom_data?.userId || '',
            status: payload.data.status || '',
            product: {
              id: payload.data.items?.[0]?.price?.product_id || '',
              name: payload.data.items?.[0]?.price?.description || ''
            },
            currentBillAmount: payload.data.items?.[0]?.price?.unit_price?.amount || 0,
            currency: payload.data.items?.[0]?.price?.unit_price?.currency_code || '',
            startDate: payload.data.start_date || null,
            nextBillDate: payload.data.next_billed_at || null,
            timestamp: serverTimestamp()
          });
          break;

        case 'subscription.canceled':
          await setDoc(doc(firestore, 'subscriptions', payload.data.id), {
            status: 'canceled',
            canceledAt: serverTimestamp(),
            timestamp: serverTimestamp()
          }, { merge: true });
          break;

        case 'transaction.completed':
          await addDoc(collection(firestore, 'transactions'), {
            userId: payload.data.custom_data?.userId || '',
            paddleTransactionId: payload.data.id || '',
            product: {
              id: payload.data.items?.[0]?.price?.product_id || '',
              name: payload.data.items?.[0]?.price?.description || ''
            },
            amountPaid: payload.data.details?.totals?.total || 0,
            currency: payload.data.currency_code || '',
            paymentStatus: payload.data.status || '',
            customerEmail: payload.data.customer?.email || '',
            timestamp: serverTimestamp()
          });
          
          // Update user's subscription status
          if (payload.data.custom_data?.userId) {
            await setDoc(doc(firestore, 'users', payload.data.custom_data.userId), {
              hasActiveSubscription: true,
              lastTransactionDate: serverTimestamp(),
              currentPlan: payload.data.items?.[0]?.price?.product_id || '',
              subscriptionStatus: 'active'
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