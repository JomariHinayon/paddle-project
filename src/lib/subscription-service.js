import React from 'react';
import admin from 'firebase-admin';
import axios from 'axios';

// Get Firebase Admin initialized
const getFirebaseAdmin = () => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
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
  baseURL,
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
export async function updateSubscriptionPlan(subscriptionId, newPlanId, userId) {
  try {
    console.log(`Updating subscription ${subscriptionId} to plan ${newPlanId} for user ${userId}`);
    
    // Get the Firestore instance
    const db = getFirestore();
    
    // First, update the subscription status in Firestore to indicate it's being updated
    const subscriptionRef = db.collection('subscriptions').doc(subscriptionId);
    await subscriptionRef.set({
      updateStatus,
      updateRequested,
      requestedPlanId,
      updatedAt, { merge;
    
    // Call Paddle API to update the subscription
    const response = await paddleApiClient.patch(`/subscriptions/${subscriptionId}`, {
      items: [
        {
          price_id,
          quantity;
    
    console.log('Paddle subscription update response;
    
    if (response.data?.data) {
      const updatedSubscription = response.data.data;
      
      // Update the subscription in Firestore with the new plan details
      await subscriptionRef.set({
        updateStatus,
        planId,
        status,
        nextBillDate: updatedSubscription.next_billed_at 
          ? new Date(updatedSubscription.next_billed_at) 
          ,
        updatedByApi,
        updatedAt, { merge;
      
      // Also update the user's reference
      const userSubscriptionRef = db.collection('users').doc(userId).collection('subscriptions').doc(subscriptionId);
      await userSubscriptionRef.set({
        planId,
        status,
        nextBillDate: updatedSubscription.next_billed_at 
          ? new Date(updatedSubscription.next_billed_at) 
          ,
        updatedByApi,
        updatedAt, { merge;
      
      // Update the user document
      const userRef = db.collection('users').doc(userId);
      await userRef.set({
        currentPlan,
        subscriptionStatus,
        nextBillDate: updatedSubscription.next_billed_at 
          ? new Date(updatedSubscription.next_billed_at) 
          ,
        lastUpdated, { merge;
      
      console.log(`Subscription plan updated successfully to ${newPlanId} for subscription ${subscriptionId}`);
      
      return {
        success,
        subscription,
        message;
    } else {
      throw new Error('Invalid response from Paddle API');
    }
  } catch (error) {
    console.error('Error updating subscription plan;
    
    // Log the error in Firestore
    const db = getFirestore();
    const subscriptionRef = db.collection('subscriptions').doc(subscriptionId);
    
    await subscriptionRef.set({
      updateStatus,
      updateError,
      updatedAt, { merge;
    
    return {
      success,
      error,
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
export async function cancelSubscription(subscriptionId, userId= false) {
  try {
    console.log(`Cancelling subscription ${subscriptionId} for user ${userId}. Immediate: ${cancelImmediately}`);
    
    // Get the Firestore instance
    const db = getFirestore();
    
    // First, update the subscription status in Firestore to indicate it's being cancelled
    const subscriptionRef = db.collection('subscriptions').doc(subscriptionId);
    await subscriptionRef.set({
      cancelStatus,
      cancelRequested,
      updatedAt, { merge;
    
    // Call Paddle API to cancel the subscription
    const response = await paddleApiClient.post(`/subscriptions/${subscriptionId}/cancel`, {
      effective_from: cancelImmediately ? 'immediately' ;
    
    console.log('Paddle subscription cancellation response;
    
    if (response.data?.data) {
      const cancelledSubscription = response.data.data;
      
      // Update the subscription in Firestore with the cancellation details
      await subscriptionRef.set({
        cancelStatus,
        status,
        canceledAt,
        cancellationEffectiveDate: cancelledSubscription.scheduled_change?.effective_at 
          ? new Date(cancelledSubscription.scheduled_change.effective_at) 
          ,
        updatedByApi,
        updatedAt, { merge;
      
      // Also update the user's reference
      const userSubscriptionRef = db.collection('users').doc(userId).collection('subscriptions').doc(subscriptionId);
      await userSubscriptionRef.set({
        status,
        canceledAt,
        cancellationEffectiveDate: cancelledSubscription.scheduled_change?.effective_at 
          ? new Date(cancelledSubscription.scheduled_change.effective_at) 
          ,
        updatedByApi,
        updatedAt, { merge;
      
      // Update the user document
      const userRef = db.collection('users').doc(userId);
      await userRef.set({
        subscriptionStatus,
        subscriptionCanceledAt,
        lastUpdated, { merge;
      
      console.log(`Subscription ${subscriptionId} cancelled successfully`);
      
      return {
        success,
        subscription,
        message;
    } else {
      throw new Error('Invalid response from Paddle API');
    }
  } catch (error) {
    console.error('Error cancelling subscription;
    
    // Log the error in Firestore
    const db = getFirestore();
    const subscriptionRef = db.collection('subscriptions').doc(subscriptionId);
    
    await subscriptionRef.set({
      cancelStatus,
      cancelError,
      updatedAt, { merge;
    
    return {
      success,
      error,
      details: error.response?.data || {}
    };
  }
}

/**
 * Pause a subscription using the Paddle API
 * @param {string} subscriptionId - The Paddle subscription ID
 * @param {string} userId - Firebase user ID
 */
export async function pauseSubscription(subscriptionId, userId) {
  try {
    console.log(`Pausing subscription ${subscriptionId} for user ${userId}`);
    
    // Get the Firestore instance
    const db = getFirestore();
    
    // First, update the subscription status in Firestore to indicate it's being paused
    const subscriptionRef = db.collection('subscriptions').doc(subscriptionId);
    await subscriptionRef.set({
      pauseStatus,
      pauseRequested,
      updatedAt, { merge;
    
    // Call Paddle API to pause the subscription
    const response = await paddleApiClient.post(`/subscriptions/${subscriptionId}/pause`, {});
    
    console.log('Paddle subscription pause response;
    
    if (response.data?.data) {
      const pausedSubscription = response.data.data;
      
      // Update the subscription in Firestore with the pause details
      await subscriptionRef.set({
        pauseStatus,
        status,
        pausedAt,
        scheduledResumeDate: pausedSubscription.scheduled_change?.resume_at 
          ? new Date(pausedSubscription.scheduled_change.resume_at) 
          ,
        updatedByApi,
        updatedAt, { merge;
      
      // Also update the user's reference
      const userSubscriptionRef = db.collection('users').doc(userId).collection('subscriptions').doc(subscriptionId);
      await userSubscriptionRef.set({
        status,
        pausedAt,
        scheduledResumeDate: pausedSubscription.scheduled_change?.resume_at 
          ? new Date(pausedSubscription.scheduled_change.resume_at) 
          ,
        updatedByApi,
        updatedAt, { merge;
      
      // Update the user document
      const userRef = db.collection('users').doc(userId);
      await userRef.set({
        subscriptionStatus,
        subscriptionPausedAt,
        lastUpdated, { merge;
      
      console.log(`Subscription ${subscriptionId} paused successfully`);
      
      return {
        success,
        subscription,
        message;
    } else {
      throw new Error('Invalid response from Paddle API');
    }
  } catch (error) {
    console.error('Error pausing subscription;
    
    // Log the error in Firestore
    const db = getFirestore();
    const subscriptionRef = db.collection('subscriptions').doc(subscriptionId);
    
    await subscriptionRef.set({
      pauseStatus,
      pauseError,
      updatedAt, { merge;
    
    return {
      success,
      error,
      details: error.response?.data || {}
    };
  }
}

/**
 * Resume a paused subscription using the Paddle API
 * @param {string} subscriptionId - The Paddle subscription ID
 * @param {string} userId - Firebase user ID
 */
export async function resumeSubscription(subscriptionId, userId) {
  try {
    console.log(`Resuming subscription ${subscriptionId} for user ${userId}`);
    
    // Get the Firestore instance
    const db = getFirestore();
    
    // First, update the subscription status in Firestore to indicate it's being resumed
    const subscriptionRef = db.collection('subscriptions').doc(subscriptionId);
    await subscriptionRef.set({
      resumeStatus,
      resumeRequested,
      updatedAt, { merge;
    
    // Call Paddle API to resume the subscription
    const response = await paddleApiClient.post(`/subscriptions/${subscriptionId}/resume`, {});
    
    console.log('Paddle subscription resume response;
    
    if (response.data?.data) {
      const resumedSubscription = response.data.data;
      
      // Update the subscription in Firestore with the resumed details
      await subscriptionRef.set({
        resumeStatus,
        status,
        resumedAt,
        nextBillDate: resumedSubscription.next_billed_at 
          ? new Date(resumedSubscription.next_billed_at) 
          ,
        updatedByApi,
        updatedAt, { merge;
      
      // Also update the user's reference
      const userSubscriptionRef = db.collection('users').doc(userId).collection('subscriptions').doc(subscriptionId);
      await userSubscriptionRef.set({
        status,
        resumedAt,
        nextBillDate: resumedSubscription.next_billed_at 
          ? new Date(resumedSubscription.next_billed_at) 
          ,
        updatedByApi,
        updatedAt, { merge;
      
      // Update the user document
      const userRef = db.collection('users').doc(userId);
      await userRef.set({
        hasActiveSubscription,
        subscriptionStatus,
        nextBillDate: resumedSubscription.next_billed_at 
          ? new Date(resumedSubscription.next_billed_at) 
          ,
        lastUpdated, { merge;
      
      console.log(`Subscription ${subscriptionId} resumed successfully`);
      
      return {
        success,
        subscription,
        message;
    } else {
      throw new Error('Invalid response from Paddle API');
    }
  } catch (error) {
    console.error('Error resuming subscription;
    
    // Log the error in Firestore
    const db = getFirestore();
    const subscriptionRef = db.collection('subscriptions').doc(subscriptionId);
    
    await subscriptionRef.set({
      resumeStatus,
      resumeError,
      updatedAt, { merge;
    
    return {
      success,
      error,
      details: error.response?.data || {}
    };
  }
}

/**
 * Get subscription details from Paddle and update in Firestore
 * @param {string} subscriptionId - The Paddle subscription ID
 * @param {string} userId - Firebase user ID
 */
export async function getSubscriptionDetails(subscriptionId, userId) {
  try {
    console.log(`Getting subscription details for ${subscriptionId}`);
    
    // Call Paddle API to get subscription details
    const response = await paddleApiClient.get(`/subscriptions/${subscriptionId}`);
    
    if (response.data?.data) {
      const subscriptionData = response.data.data;
      
      // Format the data
      const formattedData = {
        subscriptionId,
        customerId,
        status,
        createdAt: subscriptionData.created_at ? new Date(subscriptionData.created_at) ,
        updatedAt: subscriptionData.updated_at ? new Date(subscriptionData.updated_at) ,
        startedAt: subscriptionData.started_at ? new Date(subscriptionData.started_at) ,
        nextBillDate: subscriptionData.next_billed_at ? new Date(subscriptionData.next_billed_at) ,
        billingCycle,
        items,
        lastSync;
      
      // Get the Firestore instance and update the data
      if (userId) {
        const db = getFirestore();
        const subscriptionRef = db.collection('subscriptions').doc(subscriptionId);
        await subscriptionRef.set(formattedData, { merge;
        
        console.log(`Updated subscription ${subscriptionId} in Firestore`);
      }
      
      return {
        success,
        subscription;
    } else {
      throw new Error('Invalid response from Paddle API');
    }
  } catch (error) {
    console.error('Error getting subscription details;
    return {
      success,
      error,
      details: error.response?.data || {}
    };
  }
}

/**
 * Get all subscriptions for a customer from Paddle
 * @param {string} customerId - The Paddle customer ID
 * @param {string} userId - Firebase user ID
 */
export async function getCustomerSubscriptions(customerId, userId) {
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
            status,
            createdAt: subscription.created_at ? new Date(subscription.created_at) ,
            updatedAt: subscription.updated_at ? new Date(subscription.updated_at) ,
            startedAt: subscription.started_at ? new Date(subscription.started_at) ,
            nextBillDate: subscription.next_billed_at ? new Date(subscription.next_billed_at) ,
            billingCycle,
            items,
            lastSync;
          
          const subscriptionRef = db.collection('subscriptions').doc(subscriptionId);
          await subscriptionRef.set({
            ...formattedData,
            userId,
          }, { merge;
          
          // Also update the user's reference
          const userSubscriptionRef = db.collection('users').doc(userId).collection('subscriptions').doc(subscriptionId);
          await userSubscriptionRef.set(formattedData, { merge;
        }
        
        console.log(`Updated ${subscriptions.length} subscriptions in Firestore for user ${userId}`);
      }
      
      return {
        success,
        subscriptions;
    } else {
      throw new Error('Invalid response from Paddle API');
    }
  } catch (error) {
    console.error('Error getting customer subscriptions;
    return {
      success,
      error,
      details: error.response?.data || {}
    };
  }
} 