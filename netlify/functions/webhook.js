const { getFirestore, doc, setDoc } = require('firebase-admin/firestore');
const { initializeApp, applicationDefault } = require('firebase-admin/app');
const crypto = require('crypto');

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

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
    }

    try {
        // Parse body (x-www-form-urlencoded)
        const params = new URLSearchParams(event.body);
        const body = {};
        for (const [key, value] of params.entries()) {
            body[key] = value;
        }

        // Signature verification (skip if BYPASS_PADDLE_VERIFICATION is true)
        if (!BYPASS_PADDLE_VERIFICATION && !verifyPaddleSignature(body, body.p_signature)) {
            console.error('Invalid Paddle signature');
            return { statusCode: 400, body: JSON.stringify({ error: 'Invalid signature' }) };
        }

        // Defensive checks for required fields
        const userId = String(body.custom_data_userId || body.user_id || '');
        const subscriptionId = String(body.subscription_id || '');
        const paymentId = String(body.order_id || body.checkout_id || '');
        const alertName = body.alert_name;
        const email = body.email || body.user_email || null;
        const planId = body.subscription_plan_id || body.product_id || null;
        const timestamp = new Date();

        if (!userId) {
            console.error('Missing userId in webhook payload:', body);
            return { statusCode: 400, body: JSON.stringify({ error: 'Missing userId in webhook payload' }) };
        }
        if ((alertName === 'subscription_created' || alertName === 'subscription_updated') && !subscriptionId) {
            console.error('Missing subscriptionId in webhook payload:', body);
            return { statusCode: 400, body: JSON.stringify({ error: 'Missing subscriptionId in webhook payload' }) };
        }
        if ((alertName === 'payment_succeeded' || alertName === 'checkout_completed') && !paymentId) {
            console.error('Missing paymentId in webhook payload:', body);
            return { statusCode: 400, body: JSON.stringify({ error: 'Missing paymentId in webhook payload' }) };
        }

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

        return { statusCode: 200, body: JSON.stringify({ received: true }) };
    } catch (error) {
        console.error('Webhook handler error:', error);
        return { statusCode: 500, body: JSON.stringify({ error: 'Internal server error' }) };
    }
}; 