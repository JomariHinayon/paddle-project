import { NextResponse } from 'next/server';
import { firestore } from '@/lib/firebase-admin';
import { collection, doc, addDoc, setDoc, serverTimestamp } from 'firebase/firestore';

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const payload = JSON.parse(rawBody);
    
    try {
      switch (payload.event_type) {
        case 'checkout.completed':
          // Store transaction data in a single centralized location
          const transactionData = {
            userId: payload.data.custom_data?.userId || '',
            paddleTransactionId: payload.data.order_id || '',
            subscriptionId: payload.data.subscription_id || null,
            product: {
              id: payload.data.items?.[0]?.price?.product_id || '',
              name: payload.data.items?.[0]?.price?.description || ''
            },
            amountPaid: payload.data.details?.totals?.total || 0,
            currency: payload.data.currency_code || '',
            paymentStatus: payload.data.status || '',
            customerEmail: payload.data.customer?.email || '',
            timestamp: serverTimestamp()
          };
          await addDoc(collection(firestore, 'transactions'), transactionData);
          
          // Update user's subscription reference
          if (payload.data.subscription_id && payload.data.custom_data?.userId) {
            await setDoc(doc(firestore, 'users', payload.data.custom_data.userId), {
              currentSubscription: payload.data.subscription_id,
              updatedAt: serverTimestamp()
            }, { merge: true });
          }
          break;

        case 'subscription.created':
        case 'subscription.updated':
          // Maintain subscription data in a centralized subscriptions collection
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
            updatedAt: serverTimestamp()
          });
          break;

        case 'subscription.canceled':
          await setDoc(doc(firestore, 'subscriptions', payload.data.id), {
            status: 'canceled',
            canceledAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          }, { merge: true });
          
          // Find and update the user who owns this subscription
          if (payload.data.custom_data?.userId) {
            await setDoc(doc(firestore, 'users', payload.data.custom_data.userId), {
              currentSubscription: null,
              updatedAt: serverTimestamp()
            }, { merge: true });
          }
          break;
      }

      return NextResponse.json({ success: true });
    } catch (error) {
      console.error('Error processing webhook:', error);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error parsing webhook payload:', error);
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
}