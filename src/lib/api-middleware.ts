import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from './firebase-admin';
import { rateLimiter } from './rate-limiter';

/**
 * Middleware to validate CSRF token
 */
export async function validateCSRF(req: NextRequest) {
  // Get CSRF token from request header
  const csrfToken = req.headers.get('x-csrf-token');
  
  // Get CSRF token from cookie
  const csrfCookie = req.cookies.get('csrf')?.value;
  
  // If either token is missing, reject the request
  if (!csrfToken || !csrfCookie) {
    console.warn('Missing CSRF token or cookie');
    return {
      success: false,
      status: 403,
      message: 'Invalid request'
    };
  }
  
  // Compare the tokens
  if (csrfToken !== csrfCookie) {
    console.warn('CSRF token mismatch');
    return {
      success: false,
      status: 403,
      message: 'Invalid request'
    };
  }
  
  return { success: true };
}

/**
 * Middleware to validate user authentication
 */
export async function validateAuth(req: NextRequest) {
  try {
    // Get session cookie
    const sessionCookie = req.cookies.get('session')?.value;
    
    if (!sessionCookie) {
      return {
        success: false,
        status: 401,
        message: 'Unauthorized'
      };
    }
    
    // Verify the session cookie
    const auth = getAuth();
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
    
    // Check if email is verified
    if (!decodedClaims.email_verified) {
      return {
        success: false,
        status: 403,
        message: 'Email verification required'
      };
    }
    
    // Return the user ID for future use
    return {
      success: true,
      userId: decodedClaims.uid,
      email: decodedClaims.email
    };
  } catch (error) {
    console.error('Session validation error:', error);
    return {
      success: false,
      status: 401,
      message: 'Invalid session'
    };
  }
}

/**
 * Middleware to check rate limiting
 */
export async function checkRateLimit(req: NextRequest, endpoint: string, maxRequests: number = 60, windowSeconds: number = 60) {
  try {
    // Get IP address
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const identifier = `rate:${endpoint}:${ip}`;
    
    // Check rate limit
    const limited = await rateLimiter(identifier, maxRequests, windowSeconds);
    
    if (limited) {
      return {
        success: false,
        status: 429,
        message: 'Too many requests'
      };
    }
    
    return { success: true };
  } catch (error) {
    console.error('Rate limit check error:', error);
    // Fail open
    return { success: true };
  }
}

/**
 * Combined middleware for protected API routes
 */
export async function protectedApiRoute(req: NextRequest, endpoint: string) {
  // Check rate limiting first
  const rateCheck = await checkRateLimit(req, endpoint);
  if (!rateCheck.success) {
    return NextResponse.json(
      { error: rateCheck.message },
      { status: rateCheck.status }
    );
  }
  
  // Check CSRF token
  const csrfCheck = await validateCSRF(req);
  if (!csrfCheck.success) {
    return NextResponse.json(
      { error: csrfCheck.message },
      { status: csrfCheck.status }
    );
  }
  
  // Check authentication
  const authCheck = await validateAuth(req);
  if (!authCheck.success) {
    return NextResponse.json(
      { error: authCheck.message },
      { status: authCheck.status }
    );
  }
  
  // All checks passed
  return { 
    success: true, 
    userId: authCheck.userId, 
    email: authCheck.email 
  };
} 