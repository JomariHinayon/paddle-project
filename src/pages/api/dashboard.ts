import { NextApiRequest, NextApiResponse } from 'next';
import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

const db = admin.firestore();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: 'userId is required' });
    }

    const dashboardRef = db.collection('dashboard').doc(userId as string);
    const dashboardDoc = await dashboardRef.get();

    if (!dashboardDoc.exists) {
      return res.status(404).json({ message: 'Dashboard data not found' });
    }

    const userRef = db.collection('users').doc(userId as string);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ message: 'User data not found' });
    }

    const userData = userDoc.data();

    // Fetch the latest transaction
    const transactionsRef = userRef.collection('transactions');
    const latestTransactionSnap = await transactionsRef.orderBy('timestamp', 'desc').limit(1).get();

    const latestTransaction = latestTransactionSnap.empty
      ? null
      : { id: latestTransactionSnap.docs[0].id, ...latestTransactionSnap.docs[0].data() };

    res.status(200).json({
      subscriptionId: userData?.currentSubscriptionId || null,
      subscriptionStatus: userData?.subscriptionStatus || 'inactive',
      lastTransactionDate: userData?.lastTransactionDate || null,
      currentPlan: userData?.currentPlan || null,
      latestTransaction,
    });
  } catch (error) {
    console.error('Dashboard Error:', error);
    res.status(500).json({ message: 'Failed to fetch dashboard data' });
  }
}
