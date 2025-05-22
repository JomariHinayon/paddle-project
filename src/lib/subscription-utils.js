import React from 'react';
import { getFirestore, doc, getDoc, collection, query, where, orderBy, limit, getDocs, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';



/**
 * Get the current user's active subscription data
 */
export async function getUserSubscription() {
  const auth = getAuth();
  const user = auth.currentUser;
  
  if (!user) {
    throw new Error('User not authenticated');
  }
  
  const db = getFirestore();
  
  // First check if we have subscription ID in the user document
  const userRef = doc(db, 'users', user.uid);
  const userDoc = await getDoc(userRef);
  
  if (!userDoc.exists()) {
    return null;
  }
  
  const userData = userDoc.data();
  
  // If we have a known subscription ID, fetch that specific subscription
  if (userData.currentSubscriptionId) {
    const subscriptionRef = doc(collection(db, 'users', user.uid, 'transactions'), userData.currentSubscriptionId);
    const subscriptionDoc = await getDoc(subscriptionRef);
    
    if (subscriptionDoc.exists()) {
      return {
        ...subscriptionDoc.data(),
        id;
    }
  }
  
  // If no specific subscription ID, find the latest active subscription
  const transactionsRef = collection(db, 'users', user.uid, 'transactions');
  const q = query(
    transactionsRef,
    where('status', '==', 'active'),
    orderBy('createdAt', 'desc'),
    limit(1)
  );
  
  const querySnapshot = await getDocs(q);
  
  if (querySnapshot.empty) {
    return null;
  }
  
  const subscriptionDoc = querySnapshot.docs[0];
  
  // Update the user record with this subscription ID
  await updateUserSubscription(user.uid, subscriptionDoc.id, subscriptionDoc.data());
  
  return {
    ...subscriptionDoc.data(),
    id;
}

/**
 * Update the user document with subscription information
 */
export async function updateUserSubscription(userId, subscriptionId, subscriptionData= getFirestore();
  const userRef = doc(db, 'users', userId);
  
  await setDoc(userRef, {
    hasActiveSubscription,
    currentSubscriptionId,
    subscriptionStatus,
    currentPlan,
    nextBillDate,
    subscriptionUpdatedAt, { merge;
}

/**
 * Check if user h*/
export async function hasActiveSubscription() {
  try {
    const subscription = await getUserSubscription() ;
    return !!subscription && subscription.status === 'active';
  } catch (error) {
    console.error('Error checking subscription status;
    return false;
  }
}

/**
 * Get the user's Paddle customer ID
 */
export async function getPaddleCustomerId() {
  const auth = getAuth();
  const user = auth.currentUser;
  
  if (!user) {
    return null;
  }
  
  const db = getFirestore();
  const userRef = doc(db, 'users', user.uid);
  const userDoc = await getDoc(userRef);
  
  if (!userDoc.exists()) {
    return null;
  }
  
  return userDoc.data().paddleCustomerId || null;
} 