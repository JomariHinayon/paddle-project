import { NextRequest, NextResponse } from 'next/server';
import { updateSubscriptionPlan } from '@/lib/subscription-service';
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
    const decodedToken = await getAuth(adminInstance).verifyIdToken(token);
    const userId = decodedToken.uid;

    // Get request body
    const { subscriptionId, newPlanId } = await req.json();

    // Validate required parameters
    if (!subscriptionId || !newPlanId) {
      return NextResponse.json(
        { error: 'subscriptionId and newPlanId are required' },
        { status: 400 }
      );
    }

    // Update the subscription plan
    const result = await updateSubscriptionPlan(subscriptionId, newPlanId, userId);

    if (result.success) {
      return NextResponse.json({
        message: 'Subscription plan updated successfully',
        subscription: result.subscription
      });
    } else {
      return NextResponse.json(
        { error: result.error, details: result.details },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error('Error updating subscription plan:', error);
    
    return NextResponse.json(
      { error: error.message || 'Failed to update subscription plan' },
      { status: 500 }
    );
  }
} 