import admin from 'firebase-admin';
import axios from 'axios';

// Get Firebase Admin initialized
const getFirebaseAdmin = () => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
  }
  return admin;
};

// Get Firestore instance
const getFirestore = () => {
  const adminInstance = getFirebaseAdmin();
  return adminInstance.firestore();
};

// Constants
const PADDLE_API_BASE_URL = 'https://api.paddle.com';
const PADDLE_API_KEY = process.env.PADDLE_API_KEY;

// Paddle API client with authentication
const paddleApiClient = axios.create({
  baseURL: PADDLE_API_BASE_URL,
  headers: {
    'Authorization': `Bearer ${PADDLE_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

/**
 * Update a subscription plan using the Paddle API
 * @param {string} subscriptionId - The Paddle subscription ID
 * @param {string} newPlanId - The new Paddle plan/product ID
 * @param {string} userId - Firebase user ID
 */
export async function updateSubscriptionPlan(subscriptionId: string, newPlanId: string, userId: string) {
  try {
    console.log(`Updating subscription ${subscriptionId} to plan ${newPlanId} for user ${userId}`);
    
    // Get the Firestore instance
    const db = getFirestore();
    
    // First, update the subscription status in Firestore to indicate it's being updated
    const subscriptionRef = db.collection('subscriptions').doc(subscriptionId);
    await subscriptionRef.set({
      updateStatus: 'pending',
      updateRequested: admin.firestore.FieldValue.serverTimestamp(),
      requestedPlanId: newPlanId,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    }, { merge: true });
    
    // Call Paddle API to update the subscription
    const response = await paddleApiClient.patch(`/subscriptions/${subscriptionId}`, {
      items: [
        {
          price_id: newPlanId,
          quantity: 1
        }
      ]
    });
    
    console.log('Paddle subscription update response:', response.data);
    
    if (response.data?.data) {
      const updatedSubscription = response.data.data;
      
      // Update the subscription in Firestore with the new plan details
      await subscriptionRef.set({
        updateStatus: 'completed',
        planId: newPlanId,
        status: updatedSubscription.status,
        nextBillDate: updatedSubscription.next_billed_at 
          ? new Date(updatedSubscription.next_billed_at) 
          : null,
        updatedByApi: true,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      }, { merge: true });
      
      // Also update the user's reference
      const userSubscriptionRef = db.collection('users').doc(userId).collection('subscriptions').doc(subscriptionId);
      await userSubscriptionRef.set({
        planId: newPlanId,
        status: updatedSubscription.status,
        nextBillDate: updatedSubscription.next_billed_at 
          ? new Date(updatedSubscription.next_billed_at) 
          : null,
        updatedByApi: true,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      }, { merge: true });
      
      // Update the user document
      const userRef = db.collection('users').doc(userId);
      await userRef.set({
        currentPlan: newPlanId,
        subscriptionStatus: updatedSubscription.status,
        nextBillDate: updatedSubscription.next_billed_at 
          ? new Date(updatedSubscription.next_billed_at) 
          : null,
        lastUpdated: admin.firestore.FieldValue.serverTimestamp(),
      }, { merge: true });
      
      console.log(`Subscription plan updated successfully to ${newPlanId} for subscription ${subscriptionId}`);
      
      return {
        success: true,
        subscription: updatedSubscription,
        message: 'Subscription updated successfully'
      };
    } else {
      throw new Error('Invalid response from Paddle API');
    }
  } catch (error) {
    console.error('Error updating subscription plan:', error);
    
    // Log the error in Firestore
    const db = getFirestore();
    const subscriptionRef = db.collection('subscriptions').doc(subscriptionId);
    
    await subscriptionRef.set({
      updateStatus: 'failed',
      updateError: error.message || 'Unknown error',
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    }, { merge: true });
    
    return {
      success: false,
      error: error.message || 'Failed to update subscription',
      details: error.response?.data || {}
    };
  }
}

/**
 * Cancel a subscription using the Paddle API
 * @param {string} subscriptionId - The Paddle subscription ID
 * @param {string} userId - Firebase user ID
 * @param {boolean} cancelImmediately - Whether to cancel immediately or at the end of the billing period
 */
export async function cancelSubscription(subscriptionId: string, userId: string, cancelImmediately = false) {
  try {
    console.log(`Cancelling subscription ${subscriptionId} for user ${userId}. Immediate: ${cancelImmediately}`);
    
    // Get the Firestore instance
    const db = getFirestore();
    
    // First, update the subscription status in Firestore to indicate it's being cancelled
    const subscriptionRef = db.collection('subscriptions').doc(subscriptionId);
    await subscriptionRef.set({
      cancelStatus: 'pending',
      cancelRequested: admin.firestore.FieldValue.serverTimestamp(),
      cancelImmediately,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    }, { merge: true });
    
    // Call Paddle API to cancel the subscription
    const response = await paddleApiClient.post(`/subscriptions/${subscriptionId}/cancel`, {
      effective_from: cancelImmediately ? 'immediately' : 'next_billing_period'
    });
    
    console.log('Paddle subscription cancellation response:', response.data);
    
    if (response.data?.data) {
      const cancelledSubscription = response.data.data;
      
      // Update the subscription in Firestore with the cancellation details
      await subscriptionRef.set({
        cancelStatus: 'completed',
        status: 'canceled',
        canceledAt: admin.firestore.FieldValue.serverTimestamp(),
        cancellationEffectiveDate: cancelledSubscription.scheduled_change?.effective_at 
          ? new Date(cancelledSubscription.scheduled_change.effective_at) 
          : null,
        updatedByApi: true,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      }, { merge: true });
      
      // Also update the user's reference
      const userSubscriptionRef = db.collection('users').doc(userId).collection('subscriptions').doc(subscriptionId);
      await userSubscriptionRef.set({
        status: 'canceled',
        canceledAt: admin.firestore.FieldValue.serverTimestamp(),
        cancellationEffectiveDate: cancelledSubscription.scheduled_change?.effective_at 
          ? new Date(cancelledSubscription.scheduled_change.effective_at) 
          : null,
        updatedByApi: true,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      }, { merge: true });
      
      // Update the user document
      const userRef = db.collection('users').doc(userId);
      await userRef.set({
        subscriptionStatus: 'canceled',
        subscriptionCanceledAt: admin.firestore.FieldValue.serverTimestamp(),
        lastUpdated: admin.firestore.FieldValue.serverTimestamp(),
      }, { merge: true });
      
      console.log(`Subscription ${subscriptionId} cancelled successfully`);
      
      return {
        success: true,
        subscription: cancelledSubscription,
        message: 'Subscription cancelled successfully'
      };
    } else {
      throw new Error('Invalid response from Paddle API');
    }
  } catch (error) {
    console.error('Error cancelling subscription:', error);
    
    // Log the error in Firestore
    const db = getFirestore();
    const subscriptionRef = db.collection('subscriptions').doc(subscriptionId);
    
    await subscriptionRef.set({
      cancelStatus: 'failed',
      cancelError: error.message || 'Unknown error',
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    }, { merge: true });
    
    return {
      success: false,
      error: error.message || 'Failed to cancel subscription',
      details: error.response?.data || {}
    };
  }
}

/**
 * Pause a subscription using the Paddle API
 * @param {string} subscriptionId - The Paddle subscription ID
 * @param {string} userId - Firebase user ID
 */
export async function pauseSubscription(subscriptionId: string, userId: string) {
  try {
    console.log(`Pausing subscription ${subscriptionId} for user ${userId}`);
    
    // Get the Firestore instance
    const db = getFirestore();
    
    // First, update the subscription status in Firestore to indicate it's being paused
    const subscriptionRef = db.collection('subscriptions').doc(subscriptionId);
    await subscriptionRef.set({
      pauseStatus: 'pending',
      pauseRequested: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    }, { merge: true });
    
    // Call Paddle API to pause the subscription
    const response = await paddleApiClient.post(`/subscriptions/${subscriptionId}/pause`, {});
    
    console.log('Paddle subscription pause response:', response.data);
    
    if (response.data?.data) {
      const pausedSubscription = response.data.data;
      
      // Update the subscription in Firestore with the pause details
      await subscriptionRef.set({
        pauseStatus: 'completed',
        status: 'paused',
        pausedAt: admin.firestore.FieldValue.serverTimestamp(),
        scheduledResumeDate: pausedSubscription.scheduled_change?.resume_at 
          ? new Date(pausedSubscription.scheduled_change.resume_at) 
          : null,
        updatedByApi: true,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      }, { merge: true });
      
      // Also update the user's reference
      const userSubscriptionRef = db.collection('users').doc(userId).collection('subscriptions').doc(subscriptionId);
      await userSubscriptionRef.set({
        status: 'paused',
        pausedAt: admin.firestore.FieldValue.serverTimestamp(),
        scheduledResumeDate: pausedSubscription.scheduled_change?.resume_at 
          ? new Date(pausedSubscription.scheduled_change.resume_at) 
          : null,
        updatedByApi: true,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      }, { merge: true });
      
      // Update the user document
      const userRef = db.collection('users').doc(userId);
      await userRef.set({
        subscriptionStatus: 'paused',
        subscriptionPausedAt: admin.firestore.FieldValue.serverTimestamp(),
        lastUpdated: admin.firestore.FieldValue.serverTimestamp(),
      }, { merge: true });
      
      console.log(`Subscription ${subscriptionId} paused successfully`);
      
      return {
        success: true,
        subscription: pausedSubscription,
        message: 'Subscription paused successfully'
      };
    } else {
      throw new Error('Invalid response from Paddle API');
    }
  } catch (error) {
    console.error('Error pausing subscription:', error);
    
    // Log the error in Firestore
    const db = getFirestore();
    const subscriptionRef = db.collection('subscriptions').doc(subscriptionId);
    
    await subscriptionRef.set({
      pauseStatus: 'failed',
      pauseError: error.message || 'Unknown error',
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    }, { merge: true });
    
    return {
      success: false,
      error: error.message || 'Failed to pause subscription',
      details: error.response?.data || {}
    };
  }
}

/**
 * Resume a paused subscription using the Paddle API
 * @param {string} subscriptionId - The Paddle subscription ID
 * @param {string} userId - Firebase user ID
 */
export async function resumeSubscription(subscriptionId: string, userId: string) {
  try {
    console.log(`Resuming subscription ${subscriptionId} for user ${userId}`);
    
    // Get the Firestore instance
    const db = getFirestore();
    
    // First, update the subscription status in Firestore to indicate it's being resumed
    const subscriptionRef = db.collection('subscriptions').doc(subscriptionId);
    await subscriptionRef.set({
      resumeStatus: 'pending',
      resumeRequested: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    }, { merge: true });
    
    // Call Paddle API to resume the subscription
    const response = await paddleApiClient.post(`/subscriptions/${subscriptionId}/resume`, {});
    
    console.log('Paddle subscription resume response:', response.data);
    
    if (response.data?.data) {
      const resumedSubscription = response.data.data;
      
      // Update the subscription in Firestore with the resumed details
      await subscriptionRef.set({
        resumeStatus: 'completed',
        status: resumedSubscription.status,
        resumedAt: admin.firestore.FieldValue.serverTimestamp(),
        nextBillDate: resumedSubscription.next_billed_at 
          ? new Date(resumedSubscription.next_billed_at) 
          : null,
        updatedByApi: true,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      }, { merge: true });
      
      // Also update the user's reference
      const userSubscriptionRef = db.collection('users').doc(userId).collection('subscriptions').doc(subscriptionId);
      await userSubscriptionRef.set({
        status: resumedSubscription.status,
        resumedAt: admin.firestore.FieldValue.serverTimestamp(),
        nextBillDate: resumedSubscription.next_billed_at 
          ? new Date(resumedSubscription.next_billed_at) 
          : null,
        updatedByApi: true,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      }, { merge: true });
      
      // Update the user document
      const userRef = db.collection('users').doc(userId);
      await userRef.set({
        hasActiveSubscription: true,
        subscriptionStatus: resumedSubscription.status,
        nextBillDate: resumedSubscription.next_billed_at 
          ? new Date(resumedSubscription.next_billed_at) 
          : null,
        lastUpdated: admin.firestore.FieldValue.serverTimestamp(),
      }, { merge: true });
      
      console.log(`Subscription ${subscriptionId} resumed successfully`);
      
      return {
        success: true,
        subscription: resumedSubscription,
        message: 'Subscription resumed successfully'
      };
    } else {
      throw new Error('Invalid response from Paddle API');
    }
  } catch (error) {
    console.error('Error resuming subscription:', error);
    
    // Log the error in Firestore
    const db = getFirestore();
    const subscriptionRef = db.collection('subscriptions').doc(subscriptionId);
    
    await subscriptionRef.set({
      resumeStatus: 'failed',
      resumeError: error.message || 'Unknown error',
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    }, { merge: true });
    
    return {
      success: false,
      error: error.message || 'Failed to resume subscription',
      details: error.response?.data || {}
    };
  }
}

/**
 * Get subscription details from Paddle and update in Firestore
 * @param {string} subscriptionId - The Paddle subscription ID
 * @param {string} userId - Firebase user ID
 */
export async function getSubscriptionDetails(subscriptionId: string, userId: string) {
  try {
    console.log(`Getting subscription details for ${subscriptionId}`);
    
    // Call Paddle API to get subscription details
    const response = await paddleApiClient.get(`/subscriptions/${subscriptionId}`);
    
    if (response.data?.data) {
      const subscriptionData = response.data.data;
      
      // Format the data
      const formattedData = {
        subscriptionId: subscriptionData.id,
        customerId: subscriptionData.customer_id,
        status: subscriptionData.status,
        createdAt: subscriptionData.created_at ? new Date(subscriptionData.created_at) : null,
        updatedAt: subscriptionData.updated_at ? new Date(subscriptionData.updated_at) : null,
        startedAt: subscriptionData.started_at ? new Date(subscriptionData.started_at) : null,
        nextBillDate: subscriptionData.next_billed_at ? new Date(subscriptionData.next_billed_at) : null,
        billingCycle: subscriptionData.billing_cycle || {},
        items: subscriptionData.items || [],
        lastSync: admin.firestore.FieldValue.serverTimestamp(),
      };
      
      // Get the Firestore instance and update the data
      if (userId) {
        const db = getFirestore();
        const subscriptionRef = db.collection('subscriptions').doc(subscriptionId);
        await subscriptionRef.set(formattedData, { merge: true });
        
        console.log(`Updated subscription ${subscriptionId} in Firestore`);
      }
      
      return {
        success: true,
        subscription: formattedData
      };
    } else {
      throw new Error('Invalid response from Paddle API');
    }
  } catch (error) {
    console.error('Error getting subscription details:', error);
    return {
      success: false,
      error: error.message || 'Failed to get subscription details',
      details: error.response?.data || {}
    };
  }
}

/**
 * Get all subscriptions for a customer from Paddle
 * @param {string} customerId - The Paddle customer ID
 * @param {string} userId - Firebase user ID
 */
export async function getCustomerSubscriptions(customerId: string, userId: string) {
  try {
    console.log(`Getting all subscriptions for customer ${customerId}`);
    
    // Call Paddle API to get customer subscriptions
    const response = await paddleApiClient.get(`/customers/${customerId}/subscriptions`);
    
    if (response.data?.data) {
      const subscriptions = response.data.data;
      
      // Get the Firestore instance
      const db = getFirestore();
      
      // Update all subscriptions in Firestore
      if (userId && subscriptions.length > 0) {
        for (const subscription of subscriptions) {
          const subscriptionId = subscription.id;
          const formattedData = {
            subscriptionId,
            customerId,
            status: subscription.status,
            createdAt: subscription.created_at ? new Date(subscription.created_at) : null,
            updatedAt: subscription.updated_at ? new Date(subscription.updated_at) : null,
            startedAt: subscription.started_at ? new Date(subscription.started_at) : null,
            nextBillDate: subscription.next_billed_at ? new Date(subscription.next_billed_at) : null,
            billingCycle: subscription.billing_cycle || {},
            items: subscription.items || [],
            lastSync: admin.firestore.FieldValue.serverTimestamp(),
          };
          
          const subscriptionRef = db.collection('subscriptions').doc(subscriptionId);
          await subscriptionRef.set({
            ...formattedData,
            userId,
          }, { merge: true });
          
          // Also update the user's reference
          const userSubscriptionRef = db.collection('users').doc(userId).collection('subscriptions').doc(subscriptionId);
          await userSubscriptionRef.set(formattedData, { merge: true });
        }
        
        console.log(`Updated ${subscriptions.length} subscriptions in Firestore for user ${userId}`);
      }
      
      return {
        success: true,
        subscriptions: subscriptions
      };
    } else {
      throw new Error('Invalid response from Paddle API');
    }
  } catch (error) {
    console.error('Error getting customer subscriptions:', error);
    return {
      success: false,
      error: error.message || 'Failed to get customer subscriptions',
      details: error.response?.data || {}
    };
  }
} 