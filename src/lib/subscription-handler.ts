import { db } from './firebase-admin';
import admin from 'firebase-admin';

interface SubscriptionEvent {
  id: string;
  items: Array<{
    price: {
      id: string;
      name: string | null;
      product_id: string;
      unit_price: {
        amount: string;
        currency_code: string;
      };
    };
    product: {
      id: string;
      name: string;
    };
    quantity: number;
    recurring: boolean;
    next_billed_at: string;
  }>;
  status: string;
  discount: any;
  paused_at: string | null;
  address_id: string;
  created_at: string;
  started_at: string;
  updated_at: string;
  business_id: string | null;
  canceled_at: string | null;
  custom_data: {
    userId: string;
  };
  customer_id: string;
  import_meta: any;
  billing_cycle: {
    interval: string;
    frequency: number;
  };
  currency_code: string;
  next_billed_at: string;
  transaction_id: string;
  billing_details: any;
  collection_mode: string;
  first_billed_at: string;
  scheduled_change: any;
  current_billing_period: {
    ends_at: string;
    starts_at: string;
  };
}

export async function handleSubscriptionData(event: SubscriptionEvent) {
  try {
    const {
      id: subscriptionId,
      custom_data: { userId },
      customer_id: customerId,
      transaction_id,
      items,
      status,
      billing_cycle,
      currency_code,
      started_at,
      next_billed_at,
      current_billing_period,
    } = event;

    if (!userId || !customerId || !subscriptionId) {
      console.error('Missing required subscription data');
      return;
    }

    const item = items[0];
    const transactionData = {
      subscriptionId,
      customerId,
      transactionId: transaction_id || subscriptionId,
      product: {
        id: item?.product?.id || '',
        name: item?.product?.name || ''
      },
      status: status || 'active',
      amountPaid: parseFloat(item?.price?.unit_price?.amount || '0'),
      currency: item?.price?.unit_price?.currency_code || currency_code || 'USD',
      billingCycle: {
        interval: billing_cycle?.interval || 'month',
        frequency: billing_cycle?.frequency || 1
      },
      startDate: started_at ? new Date(started_at) : new Date(),
      nextBillDate: next_billed_at ? new Date(next_billed_at) : null,
      currentBillingPeriod: {
        startsAt: current_billing_period?.starts_at ? new Date(current_billing_period.starts_at) : null,
        endsAt: current_billing_period?.ends_at ? new Date(current_billing_period.ends_at) : null,
      },
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    };

    // Save transaction data
    const userRef = db.collection('users').doc(userId);
    const transactionRef = userRef.collection('transactions').doc(subscriptionId);

    await transactionRef.set(transactionData, { merge: true });
    
    // Update user subscription status
    await userRef.set({
      hasActiveSubscription: true,
      lastTransactionDate: admin.firestore.FieldValue.serverTimestamp(),
      currentPlan: item?.product?.id || null,
      subscriptionStatus: 'active',
      currentSubscriptionId: subscriptionId
    }, { merge: true });

    console.log('Subscription data saved successfully:', {
      userId,
      subscriptionId,
      transactionId: transaction_id
    });

  } catch (error) {
    console.error('Error saving subscription data:', error);
    throw error;
  }
}