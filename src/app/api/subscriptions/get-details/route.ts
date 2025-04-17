import { NextRequest, NextResponse } from 'next/server';
import admin from 'firebase-admin';

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

const db = admin.firestore();

export async function POST(req: NextRequest) {
  try {
    const { customerId, userId } = await req.json();

    if (!customerId || !userId) {
      return NextResponse.json(
        { error: 'Customer ID and User ID are required' },
        { status: 400 }
      );
    }

    // Verify that the user making the request matches the userId
    // This would typically be done with authentication middleware
    // Here we're assuming the request is authenticated

    // Query Firestore for transaction records with this customerId
    const transactionsRef = db.collection('users').doc(userId).collection('transactions');
    const snapshot = await transactionsRef
      .where('customerId', '==', customerId)
      .orderBy('createdAt', 'desc')
      .limit(1)
      .get();

    if (snapshot.empty) {
      return NextResponse.json(
        { error: 'No subscription found for this customer' },
        { status: 404 }
      );
    }

    const subscriptionData = snapshot.docs[0].data();

    return NextResponse.json({
      subscriptionId: subscriptionData.subscriptionId,
      status: subscriptionData.status,
      planId: subscriptionData.planId,
      nextBillDate: subscriptionData.nextBillDate,
      customerId: subscriptionData.customerId,
    });
  } catch (error) {
    console.error('Error fetching subscription details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscription details' },
      { status: 500 }
    );
  }
} 