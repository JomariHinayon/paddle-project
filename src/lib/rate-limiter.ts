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
  identifier: string,
  maxRequests: number = 5,
  windowSeconds: number = 60
): Promise<boolean> {
  const db = getFirestore();
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
          count: 1,
          resetAt: now + windowMs,
          firstRequest: now,
        });
        return { limited: false, count: 1 };
      }
      
      const data = doc.data() || {};
      
      // Check if the window has expired, reset if needed
      if (data.resetAt < now) {
        transaction.set(rateLimitRef, {
          count: 1,
          resetAt: now + windowMs,
          firstRequest: now,
        });
        return { limited: false, count: 1 };
      }
      
      // Increment the counter and check if limit exceeded
      const newCount = (data.count || 0) + 1;
      transaction.update(rateLimitRef, { count: newCount });
      
      return {
        limited: newCount > maxRequests,
        count: newCount
      };
    });
    
    return result.limited;
  } catch (error) {
    console.error('Rate limiter error:', error);
    // Fail open - allow the request if the rate limiter fails
    return false;
  }
}

/**
 * Rate limiter with exponential backoff for login attempts
 * After consecutive failures, wait time increases exponentially
 */
export async function loginRateLimiter(
  identifier: string,
  maxAttempts: number = 5
): Promise<{ limited: boolean; lockoutSeconds?: number }> {
  const db = getFirestore();
  const loginAttemptsRef = db.collection('loginAttempts').doc(identifier);
  
  try {
    // Update the login attempts document in a transaction
    const result = await db.runTransaction(async (transaction) => {
      const doc = await transaction.get(loginAttemptsRef);
      const now = Date.now();
      
      if (!doc.exists) {
        // First attempt for this identifier
        transaction.set(loginAttemptsRef, {
          failures: 0,
          lastAttempt: now,
          lockedUntil: null
        });
        return { limited: false };
      }
      
      const data = doc.data() || {};
      
      // Check if account is locked
      if (data.lockedUntil && data.lockedUntil > now) {
        const remainingSeconds = Math.ceil((data.lockedUntil - now) / 1000);
        return { limited: true, lockoutSeconds: remainingSeconds };
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
          lastAttempt: now
        });
        
        return { limited: true, lockoutSeconds: backoffSeconds };
      }
      
      // No lockout needed
      transaction.update(loginAttemptsRef, {
        lastAttempt: now
      });
      
      return { limited: false };
    });
    
    return result;
  } catch (error) {
    console.error('Login rate limiter error:', error);
    // Fail open in case of error
    return { limited: false };
  }
}

/**
 * Record a failed login attempt and increment the counter
 */
export async function recordFailedLogin(identifier: string): Promise<void> {
  const db = getFirestore();
  const loginAttemptsRef = db.collection('loginAttempts').doc(identifier);
  
  try {
    await db.runTransaction(async (transaction) => {
      const doc = await transaction.get(loginAttemptsRef);
      const now = Date.now();
      
      if (!doc.exists) {
        transaction.set(loginAttemptsRef, {
          failures: 1,
          lastAttempt: now,
          lockedUntil: null
        });
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
        lastAttempt: now,
        lockedUntil
      });
    });
  } catch (error) {
    console.error('Error recording failed login:', error);
  }
}

/**
 * Reset the failed login counter after a successful login
 */
export async function resetLoginAttempts(identifier: string): Promise<void> {
  const db = getFirestore();
  const loginAttemptsRef = db.collection('loginAttempts').doc(identifier);
  
  try {
    await loginAttemptsRef.update({
      failures: 0,
      lockedUntil: null,
      lastAttempt: Date.now()
    });
  } catch (error) {
    console.error('Error resetting login attempts:', error);
  }
} 