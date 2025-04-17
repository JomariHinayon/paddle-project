module.exports = {

"[project]/.next-internal/server/app/api/webhook/paddle/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
}}),
"[externals]/next/dist/compiled/next-server/app-route.runtime.dev.js [external] (next/dist/compiled/next-server/app-route.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/@opentelemetry/api [external] (@opentelemetry/api, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("@opentelemetry/api", () => require("@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page.runtime.dev.js [external] (next/dist/compiled/next-server/app-page.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/crypto [external] (crypto, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}}),
"[externals]/firebase-admin [external] (firebase-admin, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("firebase-admin", () => require("firebase-admin"));

module.exports = mod;
}}),
"[project]/src/app/api/webhook/paddle/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "POST": (()=>POST),
    "config": (()=>config)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/firebase-admin [external] (firebase-admin, cjs)");
;
;
;
// Helper function to handle private key formatting
const getFirebaseCredential = ()=>{
    if (process.env.FIREBASE_PRIVATE_KEY) {
        let privateKey = process.env.FIREBASE_PRIVATE_KEY;
        // Option 1: If stored with \n
        if (privateKey.includes('\\n')) {
            privateKey = privateKey.replace(/\\n/g, '\n');
        }
        // Option 2: If stored as base64
        if (isBase64(privateKey)) {
            try {
                privateKey = Buffer.from(privateKey, 'base64').toString('utf-8');
            } catch (error) {
                console.error('Error decoding base64 private key:', error);
                throw new Error('Could not decode base64 Firebase private key.');
            }
        }
        // Final check and formatting to ensure PEM structure
        if (!privateKey.includes('-----BEGIN PRIVATE KEY-----') || !privateKey.includes('-----END PRIVATE KEY-----')) {
            console.error('Invalid private key format: Missing BEGIN or END markers.');
            throw new Error('Invalid Firebase private key format.');
        }
        // Ensure internal newlines for the base64 part
        const lines = privateKey.split('\n');
        const beginLineIndex = lines.findIndex((line)=>line.includes('-----BEGIN PRIVATE KEY-----'));
        const endLineIndex = lines.findIndex((line)=>line.includes('-----END PRIVATE KEY-----'));
        if (beginLineIndex !== -1 && endLineIndex !== -1 && endLineIndex > beginLineIndex + 1) {
            const keyLines = lines.slice(beginLineIndex + 1, endLineIndex);
            const formattedKeyLines = keyLines.map((line)=>line.trim()).join('');
            let formattedKey = lines.slice(0, beginLineIndex + 1).join('\n') + '\n';
            for(let i = 0; i < formattedKeyLines.length; i += 64){
                formattedKey += formattedKeyLines.substring(i, i + 64) + '\n';
            }
            formattedKey += lines.slice(endLineIndex).join('\n');
            privateKey = formattedKey.trim(); // Trim any trailing newline
        }
        console.log('Using private key (first 20 chars):', privateKey.substring(0, 20) + '...');
        return __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["default"].credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: privateKey
        });
    }
    throw new Error('Firebase private key not found in environment variables.');
};
// Helper function to check if a string is likely base64 encoded
function isBase64(str) {
    try {
        return Buffer.from(str, 'base64').toString('base64') === str;
    } catch (e) {
        return false;
    }
}
// Initialize Firebase Admin if not already initialized
if (!__TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["default"].apps.length) {
    __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["default"].initializeApp({
        credential: getFirebaseCredential()
    });
}
const db = __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["default"].firestore();
const config = {
    api: {
        bodyParser: false
    }
};
const verifyPaddleSignature = (rawBody, signature)=>{
    try {
        const publicKey = process.env.PADDLE_PUBLIC_KEY;
        if (!publicKey) {
            console.error('Paddle public key not configured in environment variables');
            return false;
        }
        // For debugging: log the signature received
        console.log(`Received signature: ${signature}`);
        // In development/testing mode, you can bypass signature verification
        if (("TURBOPACK compile-time value", "development") === 'development' && process.env.BYPASS_PADDLE_VERIFICATION === 'true') {
            console.log('Bypassing signature verification in development mode');
            return true;
        }
        // Use the key directly for HMAC calculation - Paddle's simple API uses HMAC-SHA256
        const hmacHash = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createHmac('sha256', publicKey).update(rawBody).digest('hex');
        const result = hmacHash === signature;
        console.log(`Signature verification: ${result ? 'Success' : 'Failed'}`);
        console.log(`Calculated hash (first 10 chars): ${hmacHash.substring(0, 10)}...`);
        console.log(`Expected signature (first 10 chars): ${signature.substring(0, 10)}...`);
        return result;
    } catch (error) {
        console.error('Error verifying Paddle signature:', error);
        return false;
    }
};
async function POST(req) {
    try {
        // Read the raw body
        const rawBody = await req.text();
        const url = new URL(req.url);
        // Check if this is a test endpoint
        if (url.pathname.includes('/test')) {
            console.log('TEST WEBHOOK - Headers:', JSON.stringify(Object.fromEntries([
                ...req.headers
            ])));
            console.log('TEST WEBHOOK - Raw Body:', rawBody);
            try {
                // Try to parse the body as JSON
                const jsonBody = JSON.parse(rawBody);
                console.log('TEST WEBHOOK - Parsed JSON:', JSON.stringify(jsonBody, null, 2));
            } catch (e) {
                console.log('TEST WEBHOOK - Not valid JSON');
            }
            // Always return success for testing
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                status: 'success',
                message: 'Test webhook received and logged'
            });
        }
        // Production webhook handling
        const signature = req.headers.get('paddle-signature');
        console.log('Incoming webhook payload:', rawBody);
        console.log('Webhook headers:', JSON.stringify(Object.fromEntries([
            ...req.headers
        ])));
        // During initial setup or troubleshooting, you can temporarily allow webhooks without verification
        const bypassVerification = ("TURBOPACK compile-time value", "development") === 'development' && process.env.BYPASS_PADDLE_VERIFICATION === 'true';
        if (!signature) {
            console.error('No paddle-signature header found');
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: 'Missing signature header'
            }, {
                status: 401
            });
        }
        if (!bypassVerification && !verifyPaddleSignature(rawBody, signature)) {
            console.error('Signature verification failed');
            // During testing/development, you can still process the webhook even if verification fails
            if (("TURBOPACK compile-time value", "development") === 'development' && process.env.PROCESS_INVALID_SIGNATURES === 'true') {
                console.log('Processing webhook despite failed verification (development mode)');
            } else {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    message: 'Invalid signature'
                }, {
                    status: 401
                });
            }
        }
        const { event_type, data } = JSON.parse(rawBody);
        const normalizedEvent = event_type.replace('.', '_');
        console.log(`Processing Paddle ${event_type} event`, {
            data: JSON.stringify(data)
        });
        // Log the specific event type and data for debugging
        console.log(`Received Paddle webhook event: ${event_type}`);
        console.log(`Event data:`, JSON.stringify(data, null, 2));
        // Process different types of webhook events
        switch(normalizedEvent){
            case 'subscription_created':
                await handleSubscriptionCreated(data);
                break;
            case 'subscription_updated':
                await handleSubscriptionUpdated(data);
                break;
            case 'subscription_canceled':
                await handleSubscriptionCanceled(data);
                break;
            case 'subscription_payment_succeeded':
                await handleSubscriptionPaymentSucceeded(data);
                break;
            case 'subscription_payment_failed':
                await handleSubscriptionPaymentFailed(data);
                break;
            case 'checkout_completed':
                await handleCheckoutCompleted(data);
                break;
            default:
                console.log(`Unhandled event type: ${event_type}`);
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: 'Webhook processed successfully'
        }, {
            status: 200
        });
    } catch (error) {
        console.error('Webhook Error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: 'Webhook processing failed'
        }, {
            status: 400
        });
    }
}
// Handler for subscription.created events
async function handleSubscriptionCreated(data) {
    try {
        const userId = await getUserIdFromSubscriptionData(data);
        const subscriptionId = data.id;
        if (!userId) {
            console.error('Could not determine userId for subscription:', subscriptionId);
            return;
        }
        // Extract and format subscription data
        const subscriptionData = formatSubscriptionData(data);
        // Create/update subscription document in Firestore
        // Use subscriptionId as the document ID for easy lookups
        const subscriptionRef = db.collection('subscriptions').doc(subscriptionId);
        await subscriptionRef.set({
            ...subscriptionData,
            userId,
            createdAt: __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["default"].firestore.FieldValue.serverTimestamp(),
            updatedAt: __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["default"].firestore.FieldValue.serverTimestamp()
        });
        // Also store a reference in the user's subscriptions collection
        const userSubscriptionRef = db.collection('users').doc(userId).collection('subscriptions').doc(subscriptionId);
        await userSubscriptionRef.set({
            ...subscriptionData,
            createdAt: __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["default"].firestore.FieldValue.serverTimestamp(),
            updatedAt: __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["default"].firestore.FieldValue.serverTimestamp()
        });
        // Update user document with active subscription status
        const userRef = db.collection('users').doc(userId);
        await userRef.set({
            hasActiveSubscription: true,
            currentSubscriptionId: subscriptionId,
            subscriptionStatus: subscriptionData.status,
            currentPlan: subscriptionData.planId,
            nextBillDate: subscriptionData.nextBillDate,
            paddleCustomerId: subscriptionData.customerId,
            lastUpdated: __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["default"].firestore.FieldValue.serverTimestamp()
        }, {
            merge: true
        });
        console.log(`Subscription created and saved to Firestore. SubscriptionId: ${subscriptionId}, UserId: ${userId}`);
    } catch (error) {
        console.error('Error handling subscription.created event:', error);
        throw error;
    }
}
// Handler for subscription.updated events
async function handleSubscriptionUpdated(data) {
    try {
        const subscriptionId = data.id;
        // Check if the subscription already exists
        const subscriptionRef = db.collection('subscriptions').doc(subscriptionId);
        const subscriptionDoc = await subscriptionRef.get();
        if (!subscriptionDoc.exists) {
            console.log(`Subscription ${subscriptionId} not found, treating as new subscription`);
            return await handleSubscriptionCreated(data);
        }
        const existingData = subscriptionDoc.data();
        const userId = existingData?.userId || await getUserIdFromSubscriptionData(data);
        if (!userId) {
            console.error('Could not determine userId for subscription update:', subscriptionId);
            return;
        }
        // Extract and format updated subscription data
        const subscriptionData = formatSubscriptionData(data);
        // Update subscription document
        await subscriptionRef.set({
            ...subscriptionData,
            userId,
            updatedAt: __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["default"].firestore.FieldValue.serverTimestamp()
        }, {
            merge: true
        });
        // Update the user's subscription reference
        const userSubscriptionRef = db.collection('users').doc(userId).collection('subscriptions').doc(subscriptionId);
        await userSubscriptionRef.set({
            ...subscriptionData,
            updatedAt: __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["default"].firestore.FieldValue.serverTimestamp()
        }, {
            merge: true
        });
        // Update user document with the latest subscription info
        const userRef = db.collection('users').doc(userId);
        await userRef.set({
            currentSubscriptionId: subscriptionId,
            subscriptionStatus: subscriptionData.status,
            currentPlan: subscriptionData.planId,
            nextBillDate: subscriptionData.nextBillDate,
            lastUpdated: __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["default"].firestore.FieldValue.serverTimestamp()
        }, {
            merge: true
        });
        console.log(`Subscription updated in Firestore. SubscriptionId: ${subscriptionId}, UserId: ${userId}`);
    } catch (error) {
        console.error('Error handling subscription.updated event:', error);
        throw error;
    }
}
// Handler for subscription.canceled events
async function handleSubscriptionCanceled(data) {
    try {
        const subscriptionId = data.id;
        // Find the subscription document
        const subscriptionRef = db.collection('subscriptions').doc(subscriptionId);
        const subscriptionDoc = await subscriptionRef.get();
        if (!subscriptionDoc.exists) {
            console.error(`Subscription ${subscriptionId} not found for cancellation`);
            return;
        }
        const existingData = subscriptionDoc.data();
        const userId = existingData?.userId;
        if (!userId) {
            console.error('No userId associated with subscription:', subscriptionId);
            return;
        }
        const cancellationEffectiveDate = data.effective_from ? new Date(data.effective_from) : __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["default"].firestore.FieldValue.serverTimestamp();
        // Update subscription document with canceled status
        await subscriptionRef.set({
            status: 'canceled',
            canceledAt: __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["default"].firestore.FieldValue.serverTimestamp(),
            cancellationEffectiveDate,
            updatedAt: __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["default"].firestore.FieldValue.serverTimestamp()
        }, {
            merge: true
        });
        // Update user's subscription reference
        const userSubscriptionRef = db.collection('users').doc(userId).collection('subscriptions').doc(subscriptionId);
        await userSubscriptionRef.set({
            status: 'canceled',
            canceledAt: __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["default"].firestore.FieldValue.serverTimestamp(),
            cancellationEffectiveDate,
            updatedAt: __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["default"].firestore.FieldValue.serverTimestamp()
        }, {
            merge: true
        });
        // Update user document 
        const userRef = db.collection('users').doc(userId);
        await userRef.set({
            subscriptionStatus: 'canceled',
            subscriptionCanceledAt: __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["default"].firestore.FieldValue.serverTimestamp(),
            lastUpdated: __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["default"].firestore.FieldValue.serverTimestamp()
        }, {
            merge: true
        });
        console.log(`Subscription canceled in Firestore. SubscriptionId: ${subscriptionId}, UserId: ${userId}`);
    } catch (error) {
        console.error('Error handling subscription.canceled event:', error);
        throw error;
    }
}
// Handler for subscription.payment_succeeded events
async function handleSubscriptionPaymentSucceeded(data) {
    try {
        const subscriptionId = data.subscription_id;
        // Find the subscription document
        const subscriptionRef = db.collection('subscriptions').doc(subscriptionId);
        const subscriptionDoc = await subscriptionRef.get();
        if (!subscriptionDoc.exists) {
            console.error(`Subscription ${subscriptionId} not found for payment update`);
            return;
        }
        const existingData = subscriptionDoc.data();
        const userId = existingData?.userId;
        if (!userId) {
            console.error('No userId associated with subscription:', subscriptionId);
            return;
        }
        // Create payment record
        const paymentData = {
            subscriptionId,
            paymentId: data.id,
            amount: data.amount,
            currency: data.currency,
            paymentDate: data.event_time ? new Date(data.event_time) : __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["default"].firestore.FieldValue.serverTimestamp(),
            status: 'succeeded',
            nextBillDate: data.next_billed_at ? new Date(data.next_billed_at) : null,
            receiptUrl: data.receipt_url || null,
            createdAt: __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["default"].firestore.FieldValue.serverTimestamp()
        };
        // Store payment in payments collection
        const paymentRef = db.collection('users').doc(userId).collection('payments').doc(data.id);
        await paymentRef.set(paymentData);
        // Update subscription with latest payment info
        await subscriptionRef.set({
            lastPaymentId: data.id,
            lastPaymentDate: paymentData.paymentDate,
            nextBillDate: paymentData.nextBillDate,
            status: 'active',
            updatedAt: __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["default"].firestore.FieldValue.serverTimestamp()
        }, {
            merge: true
        });
        // Update user document
        const userRef = db.collection('users').doc(userId);
        await userRef.set({
            lastPaymentDate: paymentData.paymentDate,
            hasActiveSubscription: true,
            subscriptionStatus: 'active',
            nextBillDate: paymentData.nextBillDate,
            lastUpdated: __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["default"].firestore.FieldValue.serverTimestamp()
        }, {
            merge: true
        });
        console.log(`Payment succeeded recorded. PaymentId: ${data.id}, SubscriptionId: ${subscriptionId}, UserId: ${userId}`);
    } catch (error) {
        console.error('Error handling subscription.payment_succeeded event:', error);
        throw error;
    }
}
// Handler for subscription.payment_failed events
async function handleSubscriptionPaymentFailed(data) {
    try {
        const subscriptionId = data.subscription_id;
        // Find the subscription document
        const subscriptionRef = db.collection('subscriptions').doc(subscriptionId);
        const subscriptionDoc = await subscriptionRef.get();
        if (!subscriptionDoc.exists) {
            console.error(`Subscription ${subscriptionId} not found for failed payment update`);
            return;
        }
        const existingData = subscriptionDoc.data();
        const userId = existingData?.userId;
        if (!userId) {
            console.error('No userId associated with subscription:', subscriptionId);
            return;
        }
        // Create failed payment record
        const paymentData = {
            subscriptionId,
            paymentId: data.id,
            amount: data.amount,
            currency: data.currency,
            paymentDate: data.event_time ? new Date(data.event_time) : __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["default"].firestore.FieldValue.serverTimestamp(),
            status: 'failed',
            failureReason: data.error?.message || 'Payment failed',
            nextRetryDate: data.next_retry_at ? new Date(data.next_retry_at) : null,
            createdAt: __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["default"].firestore.FieldValue.serverTimestamp()
        };
        // Store failed payment in payments collection
        const paymentRef = db.collection('users').doc(userId).collection('payments').doc(data.id);
        await paymentRef.set(paymentData);
        // Update subscription with payment failure info
        await subscriptionRef.set({
            lastFailedPaymentId: data.id,
            lastFailedPaymentDate: paymentData.paymentDate,
            paymentFailureReason: paymentData.failureReason,
            nextRetryDate: paymentData.nextRetryDate,
            status: 'past_due',
            updatedAt: __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["default"].firestore.FieldValue.serverTimestamp()
        }, {
            merge: true
        });
        // Update user document
        const userRef = db.collection('users').doc(userId);
        await userRef.set({
            lastFailedPaymentDate: paymentData.paymentDate,
            subscriptionStatus: 'past_due',
            lastUpdated: __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["default"].firestore.FieldValue.serverTimestamp()
        }, {
            merge: true
        });
        console.log(`Payment failure recorded. PaymentId: ${data.id}, SubscriptionId: ${subscriptionId}, UserId: ${userId}`);
    } catch (error) {
        console.error('Error handling subscription.payment_failed event:', error);
        throw error;
    }
}
// Helper function to determine userId from subscription data
async function getUserIdFromSubscriptionData(data) {
    // First try to get from custom_data
    if (data.custom_data?.userId) {
        return data.custom_data.userId;
    }
    // Then try to find by customer ID
    const customerId = data.customer_id;
    if (customerId) {
        const userQuery = await db.collection('users').where('paddleCustomerId', '==', customerId).limit(1).get();
        if (!userQuery.empty) {
            return userQuery.docs[0].id;
        }
    }
    // Finally, try to find by existing subscription
    const subscriptionId = data.id;
    if (subscriptionId) {
        const subscriptionDoc = await db.collection('subscriptions').doc(subscriptionId).get();
        if (subscriptionDoc.exists && subscriptionDoc.data()?.userId) {
            return subscriptionDoc.data()?.userId;
        }
    }
    return null;
}
// Helper function to format subscription data consistently
function formatSubscriptionData(data) {
    const item = data.items?.[0] || {};
    const price = item.price || {};
    const product = item.product || {};
    const billingCycle = data.billing_cycle || {};
    return {
        subscriptionId: data.id,
        customerId: data.customer_id,
        status: data.status || 'active',
        planId: product.id || '',
        planName: product.name || '',
        priceId: price.id || '',
        amount: parseFloat(price.unit_price?.amount || '0'),
        currency: price.unit_price?.currency_code || data.currency_code || 'USD',
        billingCycle: {
            interval: billingCycle.interval || 'month',
            frequency: billingCycle.frequency || 1
        },
        startDate: data.started_at ? new Date(data.started_at) : new Date(),
        nextBillDate: data.next_billed_at ? new Date(data.next_billed_at) : null,
        currentPeriod: {
            start: data.current_billing_period?.starts_at ? new Date(data.current_billing_period.starts_at) : null,
            end: data.current_billing_period?.ends_at ? new Date(data.current_billing_period.ends_at) : null
        },
        pausedAt: data.paused_at ? new Date(data.paused_at) : null,
        canceledAt: data.canceled_at ? new Date(data.canceled_at) : null,
        customData: data.custom_data || {},
        rawData: ("TURBOPACK compile-time truthy", 1) ? data : ("TURBOPACK unreachable", undefined)
    };
}
async function handleCheckoutCompleted(data) {
    // This event happens when checkout is completed, but before subscription is created
    const userId = data.custom_data?.userId;
    const customerId = data.customer?.id;
    const transactionId = data.id;
    if (!userId || !customerId) {
        console.error('Missing required data in checkout_completed event');
        return;
    }
    // We won't store the full checkout data in Firebase anymore
    // Instead, we'll just keep a minimal reference to match with subscription.created events
    console.log('Checkout completed event received. Waiting for subscription.created event.');
    // Store minimal reference data in a temporary collection
    const tempRef = db.collection('pending_subscriptions').doc(transactionId);
    await tempRef.set({
        checkoutId: transactionId,
        customerId,
        userId,
        created: __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["default"].firestore.FieldValue.serverTimestamp(),
        status: 'pending_subscription'
    });
    console.log(`Created temporary reference for checkout ${transactionId} for user ${userId}`);
}
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__52eb7fbb._.js.map