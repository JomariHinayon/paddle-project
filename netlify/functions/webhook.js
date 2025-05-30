const admin = require('firebase-admin');
const { initializeApp, applicationDefault } = require('firebase-admin/app');
const crypto = require('crypto');

// Initialize Firebase Admin if not already initialized
if (!global._firebaseAdminInitialized) {
    // For admin SDK, use initializeApp from firebase-admin
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: applicationDefault(),
        });
    }
    global._firebaseAdminInitialized = true;
}

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
        // Detect content type and parse body accordingly
        let body = {};
        const contentType = event.headers['content-type'] || event.headers['Content-Type'] || '';
        if (contentType.includes('application/json')) {
            try {
                body = JSON.parse(event.body);
            } catch (e) {
                console.error('Failed to parse JSON body:', e, event.body);
                return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON body' }) };
            }
        } else {
            // Default: x-www-form-urlencoded
            const params = new URLSearchParams(event.body);
            for (const [key, value] of params.entries()) {
                body[key] = value;
            }
        }

        // Signature verification (skip if BYPASS_PADDLE_VERIFICATION is true)
        if (!BYPASS_PADDLE_VERIFICATION && !verifyPaddleSignature(body, body.p_signature)) {
            console.error('Invalid Paddle signature');
            return { statusCode: 400, body: JSON.stringify({ error: 'Invalid signature' }) };
        }

        // Robust userId extraction (now includes nested data.custom_data.userId)
        let userId = '';
        if (body.custom_data_userId) {
            userId = String(body.custom_data_userId);
        } else if (body.user_id) {
            userId = String(body.user_id);
        } else if (body.custom_data && body.custom_data.userId) {
            userId = String(body.custom_data.userId);
        } else if (body.data && body.data.custom_data && body.data.custom_data.userId) {
            userId = String(body.data.custom_data.userId);
        }

        const subscriptionId = String(body.subscription_id || body.data?.id || '');
        const paymentId = String(body.order_id || body.checkout_id || body.data?.id || '');
        const alertName = body.alert_name || body.event_type;
        const email = body.email || body.user_email || body.data?.email || null;
        const planId = body.subscription_plan_id || body.product_id || body.data?.plan_id || null;
        const timestamp = new Date();

        // Improved error logging
        if (!userId) {
            console.error('Missing userId in webhook payload:', JSON.stringify(body, null, 2));
            return { statusCode: 400, body: JSON.stringify({ error: 'Missing userId in webhook payload' }) };
        }
        if ((alertName === 'subscription_created' || alertName === 'subscription_updated' || alertName === 'subscription.created' || alertName === 'subscription.updated') && !subscriptionId) {
            console.error('Missing subscriptionId in webhook payload:', JSON.stringify(body, null, 2));
            return { statusCode: 400, body: JSON.stringify({ error: 'Missing subscriptionId in webhook payload' }) };
        }
        if ((alertName === 'payment_succeeded' || alertName === 'checkout_completed' || alertName === 'payment.succeeded' || alertName === 'checkout.completed') && !paymentId) {
            console.error('Missing paymentId in webhook payload:', JSON.stringify(body, null, 2));
            return { statusCode: 400, body: JSON.stringify({ error: 'Missing paymentId in webhook payload' }) };
        }

        // Logging for debugging
        console.log('Received Paddle webhook:', { alertName, userId, subscriptionId, paymentId, email, planId, contentType });

        // Write to Firestore based on event type
        if ((alertName === 'subscription_created' || alertName === 'subscription_updated' || alertName === 'subscription.created' || alertName === 'subscription.updated') && userId && subscriptionId) {
            await admin.firestore().doc(`users/${userId}/subscriptions/${subscriptionId}`).set({
                userId,
                subscriptionId,
                planId,
                email,
                status: body.status || body.data?.status || 'active',
                nextBillDate: body.next_bill_date ? new Date(body.next_bill_date) : (body.data?.next_billed_at ? new Date(body.data.next_billed_at) : null),
                canceledAt: body.cancellation_effective_date ? new Date(body.cancellation_effective_date) : (body.data?.canceled_at ? new Date(body.data.canceled_at) : null),
                createdAt: timestamp,
                rawData: body,
            }, { merge: true });
            console.log('Subscription written to Firestore');
        }
        if ((alertName === 'payment_succeeded' || alertName === 'checkout_completed' || alertName === 'payment.succeeded' || alertName === 'checkout.completed') && userId && paymentId) {
            await admin.firestore().doc(`users/${userId}/payments/${paymentId}`).set({
                userId,
                paymentId,
                subscriptionId,
                planId,
                email,
                amount: body.sale_gross || body.amount || body.data?.amount || null,
                currency: body.currency || body.data?.currency_code || 'USD',
                status: 'completed',
                timestamp,
                rawData: body,
            }, { merge: true });
            console.log('Payment written to Firestore');
        }
        // Optionally, write to a global payments collection for admin
        if (userId && paymentId) {
            await admin.firestore().doc(`payments/${paymentId}`).set({
                userId,
                paymentId,
                subscriptionId,
                planId,
                email,
                amount: body.sale_gross || body.amount || body.data?.amount || null,
                currency: body.currency || body.data?.currency_code || 'USD',
                status: alertName,
                timestamp,
                rawData: body,
            }, { merge: true });
            console.log('Global payment written to Firestore');
        }

        return { statusCode: 200, body: JSON.stringify({ received: true }) };
    } catch (error) {
        console.error('Webhook handler error:', error);
        return { statusCode: 500, body: JSON.stringify({ error: 'Internal server error', details: error.message }) };
    }
}; 