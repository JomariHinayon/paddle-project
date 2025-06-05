import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from '@/lib/firebase-admin';
import axios from 'axios';

const PADDLE_API_KEY = process.env.PADDLE_API_KEY;
const PADDLE_API_BASE_URL = 'https://sandbox-api.paddle.com';

const paddleApiClient = axios.create({
    baseURL: PADDLE_API_BASE_URL,
    headers: {
        'Authorization': `Bearer ${PADDLE_API_KEY}`,
        'Content-Type': 'application/json',
    },
});

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    try {
        const { subscriptionId, reason } = req.body;
        const idToken = req.headers.authorization?.split('Bearer ')[1];
        if (!subscriptionId || !idToken) {
            return res.status(400).json({ error: 'Missing subscriptionId or auth token' });
        }
        // Verify user
        const decoded = await getAuth().verifyIdToken(idToken);
        const userId = decoded.uid;
        const db = getFirestore();

        // Get subscription doc for more info
        const userSubRef = db.collection('users').doc(userId).collection('subscriptions').doc(subscriptionId);
        const userSubSnap = await userSubRef.get();
        if (!userSubSnap.exists) {
            return res.status(404).json({ error: 'Subscription not found' });
        }
        const subData = userSubSnap.data();

        // Call Paddle API to cancel
        const paddleRes = await paddleApiClient.post(`/subscriptions/${subscriptionId}/cancel`, {
            effective_from: 'immediately',
        });
        const paddleData = paddleRes.data?.data || {};

        // Update subscription doc
        await userSubRef.set({
            status: 'canceled',
            canceledAt: new Date(),
            cancelReason: reason || '',
            cancellationEffectiveDate: paddleData.scheduled_change?.effective_at ? new Date(paddleData.scheduled_change.effective_at) : null,
            updatedAt: new Date(),
        }, { merge: true });

        // Record in transactions
        const transactionsRef = db.collection('users').doc(userId).collection('transactions');
        await transactionsRef.add({
            subscriptionId,
            action: 'cancel',
            status: 'canceled',
            reason: reason || '',
            canceledAt: new Date(),
            paddleData,
            plan: subData.planId || subData.planName || '',
            amount: subData.priceAmount || null,
            currency: subData.priceCurrency || 'USD',
            timestamp: new Date(),
        });

        // Update user doc
        await db.collection('users').doc(userId).set({
            subscriptionStatus: 'canceled',
            subscriptionCanceledAt: new Date(),
            lastUpdated: new Date(),
        }, { merge: true });

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Cancel subscription error:', error);
        return res.status(500).json({ error: error.message || 'Failed to cancel subscription' });
    }
} 