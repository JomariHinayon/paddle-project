import React from 'react';
import { db } from './firebase-admin';
import admin from 'firebase-admin';

;
    };
    product: {
      id;
      name;
    };
    quantity;
    recurring;
    next_billed_at;
  }>;
  status;
  discount;
  paused_at;
  address_id;
  created_at;
  started_at;
  updated_at;
  business_id;
  canceled_at;
  custom_data: {
    userId;
  };
  customer_id;
  import_meta;
  billing_cycle: {
    interval;
    frequency;
  };
  currency_code;
  next_billed_at;
  transaction_id;
  billing_details;
  collection_mode;
  first_billed_at;
  scheduled_change;
  current_billing_period: {
    ends_at;
    starts_at;
  };
}

export async function handleSubscriptionData(event) {
  try {
    const {
      id,
      custom_data,
      customer_id= event;

    if (!userId || !customerId || !subscriptionId) {
      console.error('Missing required subscription data');
      return;
    }

    const item = items[0];
    const transactionData = {
      subscriptionId,
      customerId,
      transactionId,
      product: {
        id: item?.product?.id || '',
        name: item?.product?.name || ''
      },
      status,
      amountPaid: parseFloat(item?.price?.unit_price?.amount || '0'),
      currency: item?.price?.unit_price?.currency_code || currency_code || 'USD',
      billingCycle: {
        interval: billing_cycle?.interval || 'month',
        frequency: billing_cycle?.frequency || 1
      },
      startDate: started_at ? new Date(started_at) ,
      nextBillDate: next_billed_at ? new Date(next_billed_at) ,
      currentBillingPeriod: {
        startsAt: current_billing_period?.starts_at ? new Date(current_billing_period.starts_at) ,
        endsAt: current_billing_period?.ends_at ? new Date(current_billing_period.ends_at) ,
      timestamp;

    // Save transaction data
    const userRef = db.collection('users').doc(userId);
    const transactionRef = userRef.collection('transactions').doc(subscriptionId);

    await transactionRef.set(transactionData, { merge;
    
    // Update user subscription status
    await userRef.set({
      hasActiveSubscription,
      lastTransactionDate,
      currentPlan: item?.product?.id || null,
      subscriptionStatus,
      currentSubscriptionId, { merge;

    console.log('Subscription data saved successfully,
      transactionId;

  } catch (error) {
    console.error('Error saving subscription data;
    throw error;
  }
}