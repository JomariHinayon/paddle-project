import { NextRequest, NextResponse } from 'next/server';
import { cancelSubscription } from '@/lib/subscription-service';
import { getAuth } from 'firebase-admin/auth';
import admin from 'firebase-admin';

// Initialize Firebase Admin if not already initialized
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

export async function POST(req: NextRequest) {
  try {
    // Verify authentication
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    if (!token) {
      return NextResponse.json({ error: 'Invalid token format' }, { status: 401 });
    }

    // Verify the Firebase ID token
    const adminInstance = getFirebaseAdmin();
    const decodedToken = await getAuth().verifyIdToken(token);
    const userId = decodedToken.uid;

    // Get request body
    const { subscriptionId, cancelImmediately } = await req.json();

    // Validate required parameters
    if (!subscriptionId) {
      return NextResponse.json(
        { error: 'subscriptionId is required' },
        { status: 400 }
      );
    }

    // Cancel the subscription
    const result = await cancelSubscription(
      subscriptionId, 
      userId, 
      cancelImmediately === true
    );

    if (result.success) {
      return NextResponse.json({
        message: 'Subscription cancelled successfully',
        subscription: result.subscription
      });
    } else {
      return NextResponse.json(
        { error: result.error, details: result.details },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error('Error cancelling subscription:', error);
    
    return NextResponse.json(
      { error: error.message || 'Failed to cancel subscription' },
      { status: 500 }
    );
  }
} 