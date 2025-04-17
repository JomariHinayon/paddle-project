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
        switch(normalizedEvent){
            case 'subscription_created':
                await handleSubscriptionTransaction(data);
                break;
            case 'subscription_updated':
                await handleSubscriptionTransaction(data);
                break;
            case 'subscription_canceled':
                await handleSubscriptionCancellation(data);
                break;
            case 'checkout_completed':
                await handleCheckoutCompleted(data);
                break;
            default:
                console.log(`Unhandled event type: ${event_type}`);
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: 'Webhook processed'
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
async function handleSubscriptionTransaction(data) {
    let userId = data.custom_data?.userId;
    const customerId = data.customer_id;
    const subscriptionId = data.id;
    const transactionId = data.transaction_id || subscriptionId;
    if (!userId && customerId) {
        // Try to find userId from customer ID if not directly provided
        const userQuery = await db.collection('users').where('paddleCustomerId', '==', customerId).limit(1).get();
        if (!userQuery.empty) {
            userId = userQuery.docs[0].id;
            console.log(`Found userId ${userId} from customerId ${customerId}`);
        }
    }
    if (!userId || !customerId) {
        console.error('Missing required user identification data');
        return;
    }
    const item = data.items?.[0];
    const billingCycle = data.billing_cycle || item?.price?.billing_cycle || {};
    const transactionData = {
        subscriptionId,
        customerId,
        transactionId,
        status: data.status || 'active',
        planId: item?.product?.id || '',
        priceId: item?.price?.id || '',
        productId: item?.product?.id || '',
        productName: item?.product?.name || '',
        quantity: item?.quantity || 1,
        amountPaid: parseFloat(item?.price?.unit_price?.amount || '0'),
        currency: item?.price?.unit_price?.currency_code || data.currency_code || 'USD',
        nextBillDate: data.next_billed_at ? new Date(data.next_billed_at) : null,
        startDate: data.started_at ? new Date(data.started_at) : new Date(),
        createdAt: data.created_at ? new Date(data.created_at) : new Date(),
        updatedAt: data.updated_at ? new Date(data.updated_at) : new Date(),
        billingCycle: {
            interval: billingCycle.interval || 'month',
            frequency: billingCycle.frequency || 1
        },
        customData: data.custom_data || {},
        customerEmail: data.billing_details?.email || '',
        addressId: data.address_id || '',
        discount: data.discount || null,
        pausedAt: data.paused_at ? new Date(data.paused_at) : null,
        canceledAt: data.canceled_at ? new Date(data.canceled_at) : null,
        firstBilledAt: data.first_billed_at ? new Date(data.first_billed_at) : null,
        currentBillingPeriod: {
            startsAt: data.current_billing_period?.starts_at ? new Date(data.current_billing_period.starts_at) : null,
            endsAt: data.current_billing_period?.ends_at ? new Date(data.current_billing_period.ends_at) : null
        },
        collectionMode: data.collection_mode || 'automatic',
        importMeta: data.import_meta || null,
        scheduledChange: data.scheduled_change || null
    };
    // Store the transaction data in the transactions collection
    const transRef = db.collection('users').doc(userId).collection('transactions').doc(transactionId);
    await transRef.set(transactionData, {
        merge: true
    });
    // Also update the user document with subscription info
    const userRef = db.collection('users').doc(userId);
    await userRef.set({
        hasActiveSubscription: true,
        currentSubscriptionId: subscriptionId,
        subscriptionStatus: data.status || 'active',
        currentPlan: item?.product?.id || '',
        nextBillDate: data.next_billed_at ? new Date(data.next_billed_at) : null,
        paddleCustomerId: customerId,
        lastTransactionDate: new Date()
    }, {
        merge: true
    });
}
async function handleSubscriptionCancellation(data) {
    let userId = data.custom_data?.userId;
    const customerId = data.customer_id;
    const subscriptionId = data.id;
    const transactionId = data.transaction_id || subscriptionId;
    if (!userId && !customerId) {
        console.error('Missing required user identification data');
        // Try to find userId from existing transactions
        if (customerId) {
            // Lookup all transactions to find one with this customerId
            const subsQuery = await db.collectionGroup('transactions').where('customerId', '==', customerId).limit(1).get();
            if (!subsQuery.empty) {
                // Get the parent path to extract userId
                const docPath = subsQuery.docs[0].ref.path;
                const pathParts = docPath.split('/');
                // Path format: users/{userId}/transactions/{transactionId}
                if (pathParts.length >= 4 && pathParts[0] === 'users') {
                    userId = pathParts[1];
                    console.log(`Found userId ${userId} from existing transaction for customerId ${customerId}`);
                }
            }
        }
        if (!userId) {
            console.error('Cannot process cancellation: No userId found');
            return;
        }
    }
    const cancellationData = {
        status: 'canceled',
        canceledAt: data.canceled_at ? new Date(data.canceled_at) : new Date(),
        updatedAt: new Date()
    };
    // Update the transaction record
    const transRef = db.collection('users').doc(userId).collection('transactions').doc(transactionId);
    await transRef.set(cancellationData, {
        merge: true
    });
    // Update the user's subscription status
    const userRef = db.collection('users').doc(userId);
    await userRef.set({
        hasActiveSubscription: false,
        subscriptionStatus: 'canceled',
        subscriptionCanceledAt: __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["default"].firestore.FieldValue.serverTimestamp()
    }, {
        merge: true
    });
}
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__52eb7fbb._.js.map