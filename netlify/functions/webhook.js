const admin = require('firebase-admin');
const crypto = require('crypto');

// Initialize Firebase Admin if not already initialized
if (!global._firebaseAdminInitialized) {
    // For admin SDK, use initializeApp from firebase-admin with explicit credentials
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            }),
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

        // Log the full webhook payload for debugging
        console.log('Full Paddle webhook body:', JSON.stringify(body, null, 2));

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
        // Extract plan info from various possible locations
        let planId = body.plan_id || body.product_id || body.subscription_plan_id || (body.data && (body.data.plan_id || body.data.product_id));
        let planName = body.plan_name || (body.data && body.data.plan_name);
        // NEW: Check in data.items[0].price
        if ((!planId || !planName) && body.data && Array.isArray(body.data.items) && body.data.items[0] && body.data.items[0].price) {
            planId = planId || body.data.items[0].price.id;
            planName = planName || body.data.items[0].price.name;
        }
        const timestamp = new Date();

        // Log the Firestore project ID for debugging (robust)
        let projectId = admin.app().options.projectId || (admin.app().options.credential && admin.app().options.credential.projectId) || process.env.FIREBASE_PROJECT_ID || 'undefined';
        console.log('Firestore project:', projectId);
        // Optionally, log the full options for debugging
        console.log('Firebase Admin app options:', admin.app().options);

        // Only require userId for relevant events
        const eventsRequiringUserId = [
            'transaction.created', 'transaction.updated', 'transaction.completed', 'transaction.paid', 'transaction.ready',
            'subscription.created', 'subscription.updated', 'subscription.trialing', 'subscription.cancelled',
            'payment.succeeded', 'payment.failed', 'checkout.completed', 'payment_succeeded', 'checkout_completed',
        ];
        const needsUserId = eventsRequiringUserId.includes(alertName);

        if (needsUserId && !userId) {
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
        console.log('Received Paddle webhook:', { alertName, userId, subscriptionId, paymentId, email, planId, planName, contentType });

        // Write to Firestore based on event type, with detailed logging and error catching
        if ((alertName === 'subscription_created' || alertName === 'subscription_updated' || alertName === 'subscription.created' || alertName === 'subscription.updated') && userId && subscriptionId) {
            try {
                console.log('Writing subscription to Firestore:', `users/${userId}/subscriptions/${subscriptionId}`);
                await admin.firestore().doc(`users/${userId}/subscriptions/${subscriptionId}`).set({
                    userId,
                    subscriptionId,
                    planId,
                    planName,
                    email,
                    status: body.status || body.data?.status || 'active',
                    nextBillDate: body.next_bill_date ? new Date(body.next_bill_date) : (body.data?.next_billed_at ? new Date(body.data.next_billed_at) : null),
                    canceledAt: body.cancellation_effective_date ? new Date(body.cancellation_effective_date) : (body.data?.canceled_at ? new Date(body.data.canceled_at) : null),
                    createdAt: timestamp,
                    rawData: body,
                }, { merge: true });
                console.log('Successfully wrote subscription to Firestore:', `users/${userId}/subscriptions/${subscriptionId}`);
            } catch (err) {
                console.error('Firestore write error (subscription):', err);
            }
        }
        if ((alertName === 'payment_succeeded' || alertName === 'checkout_completed' || alertName === 'payment.succeeded' || alertName === 'checkout.completed') && userId && paymentId) {
            try {
                console.log('Writing payment to Firestore:', `users/${userId}/payments/${paymentId}`);
                await admin.firestore().doc(`users/${userId}/payments/${paymentId}`).set({
                    userId,
                    paymentId,
                    subscriptionId,
                    planId,
                    planName,
                    email,
                    amount: body.sale_gross || body.amount || body.data?.amount || null,
                    currency: body.currency || body.data?.currency_code || 'USD',
                    status: 'completed',
                    timestamp,
                    rawData: body,
                }, { merge: true });
                console.log('Successfully wrote payment to Firestore:', `users/${userId}/payments/${paymentId}`);
            } catch (err) {
                console.error('Firestore write error (payment):', err);
            }
        }
        // Optionally, write to a global payments collection for admin
        if (userId && paymentId) {
            try {
                console.log('Writing global payment to Firestore:', `payments/${paymentId}`);
                await admin.firestore().doc(`payments/${paymentId}`).set({
                    userId,
                    paymentId,
                    subscriptionId,
                    planId,
                    planName,
                    email,
                    amount: body.sale_gross || body.amount || body.data?.amount || null,
                    currency: body.currency || body.data?.currency_code || 'USD',
                    status: alertName,
                    timestamp,
                    rawData: body,
                }, { merge: true });
                console.log('Successfully wrote global payment to Firestore:', `payments/${paymentId}`);
            } catch (err) {
                console.error('Firestore write error (global payment):', err);
            }
        }

        return { statusCode: 200, body: JSON.stringify({ received: true }) };
    } catch (error) {
        console.error('Webhook handler error:', error);
        return { statusCode: 500, body: JSON.stringify({ error: 'Internal server error', details: error.message }) };
    }
}; 