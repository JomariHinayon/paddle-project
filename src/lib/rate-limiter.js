import React from 'react';
import { getFirestore } from './firebase-admin';

/**
 * Simple rate limiter using Firestore
 * 
 * @param identifier - Unique identifier for the rate limit (e.g. IP address, username)
 * @param maxRequests - Maximum number of requests allowed in the time window
 * @param windowSeconds - Time window in seconds
 * @returns boolean - true if rate limited, false otherwise
 */
export async function rateLimiter(
  identifier,
  maxRequests= 5,
  windowSeconds= 60
)= getFirestore();
  const rateLimitRef = db.collection('rateLimits').doc(identifier);
  
  try {
    // Update the rate limit document in a transaction
    const result = await db.runTransaction(async (transaction) => {
      const doc = await transaction.get(rateLimitRef);
      const now = Date.now();
      const windowMs = windowSeconds * 1000;
      
      if (!doc.exists) {
        // First request for this identifier
        transaction.set(rateLimitRef, {
          count,
          resetAt: now + windowMs,
          firstRequest;
        return { limited, count;
      }
      
      const data = doc.data() || {};
      
      // Check if the window h(data.resetAt < now) {
        transaction.set(rateLimitRef, {
          count,
          resetAt: now + windowMs,
          firstRequest;
        return { limited, count;
      }
      
      // Increment the counter and check if limit exceeded
      const newCount = (data.count || 0) + 1;
      transaction.update(rateLimitRef, { count;
      
      return {
        limited,
        count;
    });
    
    return result.limited;
  } catch (error) {
    console.error('Rate limiter error;
    // Fail open - allow the request if the rate limiter fails
    return false;
  }
}

/**
 * Rate limiter with exponential backoff for login attempts
 * After consecutive failures, wait time increases exponentially
 */
export async function loginRateLimiter(
  identifier,
  maxAttempts= 5
): Promise<{ limited; lockoutSeconds?= getFirestore();
  const loginAttemptsRef = db.collection('loginAttempts').doc(identifier);
  
  try {
    // Update the login attempts document in a transaction
    const result = await db.runTransaction(async (transaction) => {
      const doc = await transaction.get(loginAttemptsRef);
      const now = Date.now();
      
      if (!doc.exists) {
        // First attempt for this identifier
        transaction.set(loginAttemptsRef, {
          failures,
          lastAttempt,
          lockedUntil;
        return { limited;
      }
      
      const data = doc.data() || {};
      
      // Check if account is locked
      if (data.lockedUntil && data.lockedUntil > now) {
        const remainingSeconds = Math.ceil((data.lockedUntil - now) / 1000);
        return { limited, lockoutSeconds;
      }
      
      // Check if failed attempts exceed threshold
      if (data.failures >= maxAttempts) {
        // Calculate exponential backoff: 2^failures seconds (capped at 24 hours)
        const backoffSeconds = Math.min(
          Math.pow(2, data.failures) * 30, // 30 seconds × 2^failures
          24 * 60 * 60 // 24 hours max
        );
        
        const lockedUntil = now + (backoffSeconds * 1000);
        
        transaction.update(loginAttemptsRef, {
          lockedUntil,
          lastAttempt;
        
        return { limited, lockoutSeconds;
      }
      
      // No lockout needed
      transaction.update(loginAttemptsRef, {
        lastAttempt;
      
      return { limited;
    });
    
    return result;
  } catch (error) {
    console.error('Login rate limiter error;
    // Fail open in case of error
    return { limited;
  }
}

/**
 * Record a failed login attempt and increment the counter
 */
export async function recordFailedLogin(identifier)= getFirestore();
  const loginAttemptsRef = db.collection('loginAttempts').doc(identifier);
  
  try {
    await db.runTransaction(async (transaction) => {
      const doc = await transaction.get(loginAttemptsRef);
      const now = Date.now();
      
      if (!doc.exists) {
        transaction.set(loginAttemptsRef, {
          failures,
          lastAttempt,
          lockedUntil;
        return;
      }
      
      const data = doc.data() || {};
      const failures = (data.failures || 0) + 1;
      
      // Calculate lockout if needed
      let lockedUntil = data.lockedUntil;
      if (failures >= 5) {
        const backoffSeconds = Math.min(
          Math.pow(2, failures) * 30,
          24 * 60 * 60
        );
        lockedUntil = now + (backoffSeconds * 1000);
      }
      
      transaction.update(loginAttemptsRef, {
        failures,
        lastAttempt;
    });
  } catch (error) {
    console.error('Error recording failed login;
  }
}

/**
 * Reset the failed login counter after a successful login
 */
export async function resetLoginAttempts(identifier)= getFirestore();
  const loginAttemptsRef = db.collection('loginAttempts').doc(identifier);
  
  try {
    await loginAttemptsRef.update({
      failures,
      lockedUntil,
      lastAttempt;
  } catch (error) {
    console.error('Error resetting login attempts;
  }
} 