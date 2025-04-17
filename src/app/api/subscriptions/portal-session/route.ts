import { NextRequest, NextResponse } from 'next/server';
import { getAuth, getFirestore } from '@/lib/firebase-admin';
import axios from 'axios';

// Configure this route to use Node.js runtime
export const runtime = 'nodejs';

// Create a client for Paddle API
const paddleApiClient = axios.create({
  baseURL: 'https://api.paddle.com',
  headers: {
    'Authorization': `Bearer ${process.env.PADDLE_API_SECRET_KEY || process.env.PADDLE_PUBLIC_KEY}`,
    'Content-Type': 'application/json',
  },
});

export async function GET(req: NextRequest) {
  try {
    // Verify authentication from the session cookie
    const sessionCookie = req.cookies.get('session')?.value;

    if (!sessionCookie) {
      return NextResponse.json(
        { error: 'Authentication required' }, 
        { status: 401 }
      );
    }

    // Verify the session cookie properly with Firebase Admin
    const auth = getAuth();
    let decodedToken;
    try {
      decodedToken = await auth.verifySessionCookie(sessionCookie, true);
    } catch (error) {
      console.error('Failed to verify session cookie:', error);
      return NextResponse.json(
        { error: 'Invalid session' },
        { status: 401 }
      );
    }

    const userId = decodedToken.uid;

    // Get the user document from Firestore to retrieve Paddle customer ID
    const db = getFirestore();
    const userDoc = await db.collection('users').doc(userId).get();
    
    if (!userDoc.exists) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const userData = userDoc.data();
    const paddleCustomerId = userData?.paddleCustomerId;

    if (!paddleCustomerId) {
      return NextResponse.json(
        { error: 'No Paddle customer ID found for this user' },
        { status: 404 }
      );
    }

    // Get the return URL from the request, or use a default
    const returnUrl = req.nextUrl.searchParams.get('returnUrl') || 
      `${process.env.NEXT_PUBLIC_APP_URL || ''}/account`;

    // Create a portal session using Paddle API
    const response = await paddleApiClient.post(
      `/customers/${paddleCustomerId}/portal-sessions`,
      { return_url: returnUrl }
    );

    const portalUrl = response.data?.data?.url;

    if (!portalUrl) {
      return NextResponse.json(
        { error: 'Failed to generate portal URL' },
        { status: 500 }
      );
    }

    // Return the portal URL to the client
    return NextResponse.json({ url: portalUrl });
  } catch (error: any) {
    console.error('Error creating portal session:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to create portal session',
        details: error.message || 'Unknown error'
      },
      { status: 500 }
    );
  }
} 