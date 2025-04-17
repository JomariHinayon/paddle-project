import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@/lib/firebase-admin';

// Configure this route to use Node.js runtime
export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    // Get the session cookie
    const sessionCookie = req.cookies.get('session')?.value;

    if (sessionCookie) {
      // Verify the session cookie
      const auth = getAuth();
      const decodedClaims = await auth.verifySessionCookie(sessionCookie);
      
      // Revoke all sessions for the user
      await auth.revokeRefreshTokens(decodedClaims.sub);
    }

    // Clear the session cookie
    const response = NextResponse.json({ success: true });
    response.cookies.delete('session');
    
    return response;
  } catch (error: any) {
    console.error('Error logging out:', error);
    
    // Even if verification fails, still clear the cookie
    const response = NextResponse.json({ success: true });
    response.cookies.delete('session');
    
    return response;
  }
} 