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
"[externals]/stream [external] (stream, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}}),
"[externals]/events [external] (events, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}}),
"[externals]/path [external] (path, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}}),
"[externals]/util [external] (util, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}}),
"[externals]/buffer [external] (buffer, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}}),
"[externals]/string_decoder [external] (string_decoder, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("string_decoder", () => require("string_decoder"));

module.exports = mod;
}}),
"[project]/src/app/api/webhooks/paddle/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "config": (()=>config),
    "default": (()=>handler)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/firebase-admin [external] (firebase-admin, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$micro$2f$dist$2f$src$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/micro/dist/src/lib/index.js [app-route] (ecmascript)");
;
;
;
if (!__TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["default"].apps.length) {
    __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["default"].initializeApp({
        credential: __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["default"].credential.applicationDefault()
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
async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({
        message: 'Method not allowed'
    });
    try {
        const rawBody = (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$micro$2f$dist$2f$src$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buffer"])(req)).toString();
        const signature = req.headers['paddle-signature'];
        console.log('Incoming webhook payload:', rawBody);
        if (!signature || !verifyPaddleSignature(rawBody, signature)) {
            return res.status(401).json({
                message: 'Invalid signature'
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
            default:
                console.log(`Unhandled event type: ${event_type}`);
        }
        res.status(200).json({
            message: 'Webhook processed'
        });
    } catch (error) {
        console.error('Webhook Error:', error);
        res.status(400).json({
            message: 'Webhook processing failed'
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
        billingCycle: {
            interval: billingCycle.interval || 'month',
            frequency: billingCycle.frequency || 1
        },
        updatedAt: __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["default"].firestore.FieldValue.serverTimestamp(),
        createdAt: __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["default"].firestore.FieldValue.serverTimestamp()
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
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__f24b9a44._.js.map