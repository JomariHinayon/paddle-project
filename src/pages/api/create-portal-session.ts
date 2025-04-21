// Import necessary dependencies
import { NextApiRequest, NextApiResponse } from 'next';
import admin from 'firebase-admin';
import axios from 'axios';

// Initialize Firebase Admin SDK if not already initialized
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

// Helper to get Firestore instance
const getFirestore = () => getFirebaseAdmin().firestore();

// Paddle API configuration
const PADDLE_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://api.paddle.com'
  : 'https://sandbox-api.paddle.com';

// Define the type for the request body
interface CreatePortalSessionRequest {
  firebaseUid: string;
  returnUrl?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get the Firebase UID from the request body
    const { firebaseUid, returnUrl = `${process.env.NEXT_PUBLIC_APP_URL || ''}/dashboard` } = req.body as CreatePortalSessionRequest;

    if (!firebaseUid) {
      return res.status(400).json({ error: 'Firebase UID is required' });
    }

    // Initialize Firestore
    const db = getFirestore();

    // Query Firestore to get the user's subscription document
    const userDoc = await db.collection('users').doc(firebaseUid).get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userData = userDoc.data();
    const paddleCustomerId = userData?.paddleCustomerId;

    // If no Paddle customer ID is found in the user document, try to find it in the subscriptions collection
    if (!paddleCustomerId) {
      // Query the subscriptions collection for documents with matching userId
      const subscriptionsQuery = await db.collection('subscriptions')
        .where('userId', '==', firebaseUid)
        .limit(1)
        .get();

      if (subscriptionsQuery.empty) {
        return res.status(404).json({ error: 'No subscription found for this user' });
      }

      // Get the first subscription document
      const subscriptionDoc = subscriptionsQuery.docs[0];
      const subscriptionData = subscriptionDoc.data();

      // Check if the customData contains a customerId
      if (!subscriptionData?.customData?.customerId) {
        return res.status(404).json({ error: 'No Paddle customer ID found for this user' });
      }

      // Extract the Paddle customer ID from the subscription data
      const customerIdFromSubscription = subscriptionData.customData.customerId;
      
      // Make the API request to Paddle to create a portal session
      const response = await axios({
        method: 'POST',
        url: `${PADDLE_BASE_URL}/v2/customer-portal-sessions`,
        headers: {
          'Authorization': `Bearer ${process.env.PADDLE_SECRET_API_KEY}`,
          'Content-Type': 'application/json'
        },
        data: {
          customer_id: customerIdFromSubscription,
          return_url: returnUrl
        }
      });
      
      // Return the URL from the Paddle API response
      if (response.data?.data?.url) {
        return res.status(200).json({ portalUrl: response.data.data.url });
      } else {
        throw new Error('No portal URL received from Paddle API');
      }
    } else {
      // If the Paddle customer ID is found in the user document, use it directly
      // Make the API request to Paddle to create a portal session
      const response = await axios({
        method: 'POST',
        url: `${PADDLE_BASE_URL}/v2/customer-portal-sessions`,
        headers: {
          'Authorization': `Bearer ${process.env.PADDLE_SECRET_API_KEY}`,
          'Content-Type': 'application/json'
        },
        data: {
          customer_id: paddleCustomerId,
          return_url: returnUrl
        }
      });
      
      // Return the URL from the Paddle API response
      if (response.data?.data?.url) {
        return res.status(200).json({ portalUrl: response.data.data.url });
      } else {
        throw new Error('No portal URL received from Paddle API');
      }
    }
  } catch (error) {
    console.error('Error creating portal session:', error);
    return res.status(500).json({
      error: 'Failed to create portal session',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 