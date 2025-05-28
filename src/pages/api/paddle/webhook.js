import { getFirestore, doc, setDoc } from 'firebase-admin/firestore';
import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { buffer } from 'micro';
import crypto from 'crypto';

// Initialize Firebase Admin if not already initialized
if (!global._firebaseAdminInitialized) {
    initializeApp({
        credential: applicationDefault(),
    });
    global._firebaseAdminInitialized = true;
}

const db = getFirestore();

// Paddle public key for webhook signature verification (replace with your actual Paddle public key)
const PADDLE_PUBLIC_KEY = process.env.PADDLE_PUBLIC_KEY || `-----BEGIN PUBLIC KEY-----\nYOUR_PADDLE_PUBLIC_KEY_HERE\n-----END PUBLIC KEY-----`;
const BYPASS_PADDLE_VERIFICATION = process.env.BYPASS_PADDLE_VERIFICATION === 'true';

// Helper to verify Paddle webhook signature
function verifyPaddleSignature(body, signature) {
    try {
        const verifier = crypto.createVerify('sha1');
        // Paddle sends fields in sorted order except for p_signature
        const sorted = {};
        Object.keys(body)
            .filter((k) => k !== 'p_signature')
            .sort()
            .forEach((k) => {
                sorted[k] = body[k];
            });
        const serialized = Buffer.from(JSON.stringify(sorted));
        verifier.update(serialized);
        verifier.end();
        return verifier.verify(PADDLE_PUBLIC_KEY, Buffer.from(signature, 'base64'));
    } catch (e) {
        console.error('Signature verification error:', e);
        return false;
    }
}

export const config = {
    api: {
        bodyParser: false, // We'll handle raw body for signature verification
    },
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const rawBody = await buffer(req);
        const bodyStr = rawBody.toString('utf8');
        // Paddle sends as application/x-www-form-urlencoded
        const params = new URLSearchParams(bodyStr);
        const body = {};
        for (const [key, value] of params.entries()) {
            body[key] = value;
        }

        // Signature verification (skip if BYPASS_PADDLE_VERIFICATION is true)
        if (!BYPASS_PADDLE_VERIFICATION && !verifyPaddleSignature(body, body.p_signature)) {
            console.error('Invalid Paddle signature');
            return res.status(400).json({ error: 'Invalid signature' });
        }

        // Parse event type
        const alertName = body.alert_name;
        const userId = body.custom_data_userId || body.user_id || null;
        const subscriptionId = body.subscription_id || null;
        const paymentId = body.order_id || body.checkout_id || null;
        const email = body.email || body.user_email || null;
        const planId = body.subscription_plan_id || body.product_id || null;
        const timestamp = new Date();

        // Logging for debugging
        console.log('Received Paddle webhook:', { alertName, userId, subscriptionId, paymentId, email, planId });

        // Write to Firestore based on event type
        if ((alertName === 'subscription_created' || alertName === 'subscription_updated') && userId && subscriptionId) {
            await setDoc(doc(db, 'users', userId, 'subscriptions', subscriptionId), {
                userId,
                subscriptionId,
                planId,
                email,
                status: body.status || 'active',
                nextBillDate: body.next_bill_date ? new Date(body.next_bill_date) : null,
                canceledAt: body.cancellation_effective_date ? new Date(body.cancellation_effective_date) : null,
                createdAt: timestamp,
                rawData: body,
            }, { merge: true });
            console.log('Subscription written to Firestore');
        }
        if ((alertName === 'payment_succeeded' || alertName === 'checkout_completed') && userId && paymentId) {
            await setDoc(doc(db, 'users', userId, 'payments', paymentId), {
                userId,
                paymentId,
                subscriptionId,
                planId,
                email,
                amount: body.sale_gross || body.amount || null,
                currency: body.currency || 'USD',
                status: 'completed',
                timestamp,
                rawData: body,
            }, { merge: true });
            console.log('Payment written to Firestore');
        }
        // Optionally, write to a global payments collection for admin
        if (userId && paymentId) {
            await setDoc(doc(db, 'payments', paymentId), {
                userId,
                paymentId,
                subscriptionId,
                planId,
                email,
                amount: body.sale_gross || body.amount || null,
                currency: body.currency || 'USD',
                status: alertName,
                timestamp,
                rawData: body,
            }, { merge: true });
            console.log('Global payment written to Firestore');
        }

        res.status(200).json({ received: true });
    } catch (error) {
        console.error('Webhook handler error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
} 