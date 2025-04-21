module.exports = {

"[project]/.next-internal/server/app/api/webhooks/paddle/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

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
"[project]/src/app/api/webhooks/paddle/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
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
// Get Firebase private key in the correct format
const getFirebasePrivateKey = ()=>{
    const privateKey = process.env.FIREBASE_PRIVATE_KEY;
    return privateKey ? privateKey.replace(/\\n/g, '\n') : '';
};
if (!__TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["default"].apps.length) {
    __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["default"].initializeApp({
        credential: __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["default"].credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: getFirebasePrivateKey()
        })
    });
}
const db = __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["default"].firestore();
const config = {
    api: {
        bodyParser: false
    }
};
const verifyPaddleSignature = (rawBody, signature)=>{
    const publicKey = process.env.PADDLE_PUBLIC_KEY;
    if (!publicKey) throw new Error('Paddle public key not configured');
    const hash = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createHmac('sha256', publicKey).update(rawBody).digest('hex');
    return hash === signature;
};
async function POST(req) {
    try {
        const rawBody = await req.text();
        const signature = req.headers.get('paddle-signature');
        console.log('Incoming webhook payload:', rawBody);
        if (!signature || !verifyPaddleSignature(rawBody, signature)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: 'Invalid signature'
            }, {
                status: 401
            });
        }
        const { event_type, data } = JSON.parse(rawBody);
        const normalizedEvent = event_type.replace('.', '_');
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
async function handleSubscriptionTransaction(data) {
    const userId = data.custom_data?.userId;
    const customerId = data.customer_id;
    const subscriptionId = data.id;
    const transactionId = data.transaction_id || subscriptionId;
    if (!userId || !customerId || !subscriptionId) {
        console.error('Missing required data');
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
        startDate: data.started_at ? new Date(data.started_at) : null,
        createdAt: data.created_at ? new Date(data.created_at) : null,
        updatedAt: data.updated_at ? new Date(data.updated_at) : null,
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
    const transRef = db.collection('users').doc(userId).collection('transactions').doc(transactionId);
    await transRef.set(transactionData, {
        merge: true
    });
}
async function handleSubscriptionCancellation(data) {
    const userId = data.custom_data?.userId;
    const customerId = data.customer_id;
    const subscriptionId = data.id;
    const transactionId = data.transaction_id || subscriptionId;
    if (!userId || !customerId || !subscriptionId) {
        console.error('Missing required data');
        return;
    }
    const transRef = db.collection('users').doc(userId).collection('transactions').doc(transactionId);
    await transRef.set({
        status: 'canceled',
        canceledAt: __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["default"].firestore.FieldValue.serverTimestamp(),
        updatedAt: __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["default"].firestore.FieldValue.serverTimestamp()
    }, {
        merge: true
    });
}
async function handleCheckoutCompleted(data) {
    // This event happens when checkout is completed, but before subscription is created
    const customerId = data.customer_id;
    const transactionId = data.id || data.transaction_id;
    const userId = data.custom_data?.userId;
    const email = data.customer_email || data.custom_data?.email;
    if (!customerId || !transactionId) {
        console.error('Missing required data in checkout_completed event');
        return;
    }
    // We won't store the full checkout data in Firebase anymore
    // Instead, we'll just log the event and keep minimum reference data
    // for potential matching when subscription.created webhook arrives
    console.log('Checkout completed event received. Waiting for subscription.created event.');
    // Store minimal reference data in a temporary collection
    // This will be used to match with subscription.created events
    if (userId) {
        // Create a temporary reference without saving the full transaction data
        const tempRef = db.collection('pending_subscriptions').doc(transactionId);
        await tempRef.set({
            checkoutId: transactionId,
            customerId,
            userId,
            created: __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["default"].firestore.FieldValue.serverTimestamp(),
            status: 'pending_subscription'
        });
        console.log(`Created temporary reference for checkout ${transactionId} for user ${userId}`);
    } else {
        console.log('No userId in checkout_completed event, cannot create temporary reference');
    }
}
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__ef9b718a._.js.map