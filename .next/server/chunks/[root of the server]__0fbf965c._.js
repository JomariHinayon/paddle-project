module.exports = {

"[externals]/next/dist/compiled/next-server/pages-api.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api.runtime.dev.js"));

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
"[externals]/micro [external] (micro, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("micro", () => require("micro"));

module.exports = mod;
}}),
"[project]/src/pages/api/webhook/paddle.ts [api] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "config": (()=>config),
    "default": (()=>handler)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/firebase-admin [external] (firebase-admin, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$micro__$5b$external$5d$__$28$micro$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/micro [external] (micro, cjs)");
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
        const rawBody = (await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$micro__$5b$external$5d$__$28$micro$2c$__cjs$29$__["buffer"])(req)).toString();
        const signature = req.headers['paddle-signature'];
        // Log the full payload for debugging
        console.log('Full webhook payload:', rawBody);
        if (!signature || !verifyPaddleSignature(rawBody, signature)) {
            return res.status(401).json({
                message: 'Invalid signature'
            });
        }
        const payload = JSON.parse(rawBody);
        const { event_type, data } = payload;
        console.log('Paddle Webhook:', event_type, JSON.stringify(data, null, 2));
        // Normalize event type (Paddle uses both formats in different contexts)
        const normalizedEvent = event_type.replace('.', '_');
        switch(normalizedEvent){
            case 'checkout_completed':
                await handleCheckoutCompleted(data);
                break;
            case 'subscription_created':
                await handleSubscriptionCreated(data);
                break;
            case 'subscription_updated':
                await handleSubscriptionUpdated(data);
                break;
            case 'subscription_canceled':
                await handleSubscriptionCanceled(data);
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
async function handleCheckoutCompleted(data) {
    const userId = data.custom_data?.userId;
    if (!userId) {
        console.error('Missing userId in checkout data', data);
        return;
    }
    const userRef = db.collection('users').doc(userId);
    const batch = db.batch();
    const paddleCustomerId = data.customer?.id || '';
    // Set initial subscription data
    batch.update(userRef, {
        hasActiveSubscription: true,
        subscriptionStatus: 'active',
        lastCheckout: __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["default"].firestore.FieldValue.serverTimestamp(),
        updatedAt: __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["default"].firestore.FieldValue.serverTimestamp(),
        paddleCustomerId
    });
    const transactionRef = userRef.collection('transactions').doc();
    batch.set(transactionRef, {
        userId,
        paddleTransactionId: data.order_id || data.id || '',
        subscriptionId: '',
        product: {
            id: data.items?.[0]?.price_id || data.items?.[0]?.price?.product_id || '',
            name: data.items?.[0]?.product?.name || data.items?.[0]?.price?.description || ''
        },
        amountPaid: data.totals?.total || data.total || 0,
        currency: data.currency_code || data.currency || '',
        paymentStatus: data.status || 'completed',
        customerEmail: data.customer?.email || '',
        customerId: paddleCustomerId,
        status: 'pending_subscription',
        timestamp: __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["default"].firestore.FieldValue.serverTimestamp(),
        checkoutEventProcessed: true
    });
    try {
        await batch.commit();
        console.log('Checkout saved for user:', userId, 'with customer ID:', paddleCustomerId);
    } catch (error) {
        console.error('Error saving checkout data:', error);
    }
}
async function handleSubscriptionCreated(data) {
    const subscriptionId = data.id || data.subscription_id;
    const customerId = data.customer?.id || data.customer_id;
    console.log('🔔 New subscription created:', {
        subscriptionId,
        customerId,
        fullData: data
    });
    if (!customerId || !subscriptionId) {
        console.error('Missing customer ID or subscription ID in subscription_created event', data);
        return;
    }
    // Find user by customer ID
    const usersSnapshot = await db.collection('users').where('paddleCustomerId', '==', customerId).limit(1).get();
    if (usersSnapshot.empty) {
        console.error('No user found with Paddle customer ID:', customerId);
        return;
    }
    const userId = usersSnapshot.docs[0].id;
    const userRef = db.collection('users').doc(userId);
    // Find the most recent transaction for this customer that's pending subscription
    const transactionsSnapshot = await userRef.collection('transactions').where('customerId', '==', customerId).where('status', '==', 'pending_subscription').orderBy('timestamp', 'desc').limit(1).get();
    const batch = db.batch();
    if (!transactionsSnapshot.empty) {
        const transactionDoc = transactionsSnapshot.docs[0];
        batch.update(transactionDoc.ref, {
            subscriptionId: subscriptionId,
            status: 'active',
            updatedAt: __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["default"].firestore.FieldValue.serverTimestamp(),
            subscriptionEventProcessed: true
        });
    } else {
        console.warn('No pending transaction found for customer ID:', customerId);
    }
    // Update user subscription status
    batch.update(userRef, {
        hasActiveSubscription: true,
        subscriptionStatus: 'active',
        updatedAt: __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["default"].firestore.FieldValue.serverTimestamp(),
        lastSubscriptionId: subscriptionId
    });
    try {
        await batch.commit();
        console.log('Successfully linked subscription', subscriptionId, 'to user:', userId);
    } catch (error) {
        console.error('Error updating subscription data:', error);
    }
}
// Separate function for subscription updates
async function handleSubscriptionUpdated(data) {
    const paddleCustomerId = data.customer?.id || data.customer_id;
    const subscriptionId = data.subscription_id || data.id;
    if (!paddleCustomerId || !subscriptionId) {
        console.error('Missing customer ID or subscription ID in data', data);
        return;
    }
    const firebaseUid = await getFirebaseUid(paddleCustomerId);
    if (!firebaseUid) {
        console.error('No Firebase user found for Paddle customer ID:', paddleCustomerId);
        return;
    }
    // Find transaction with this subscription ID
    const transactionsSnapshot = await db.collection('users').doc(firebaseUid).collection('transactions').where('subscriptionId', '==', subscriptionId).limit(1).get();
    if (!transactionsSnapshot.empty) {
        const transactionDoc = transactionsSnapshot.docs[0];
        await transactionDoc.ref.update({
            status: data.status || 'active',
            portalUrl: data.portal_url || data.management_url || '',
            nextBillDate: data.next_billing_date ? new Date(data.next_billing_date) : null,
            updatedAt: __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["default"].firestore.FieldValue.serverTimestamp()
        });
        console.log('Updated transaction for subscription:', subscriptionId);
    } else {
        console.log('No transaction found for subscription ID:', subscriptionId);
    }
    // Update main user document
    await db.collection('users').doc(firebaseUid).update({
        hasActiveSubscription: true,
        subscriptionStatus: 'active',
        updatedAt: __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["default"].firestore.FieldValue.serverTimestamp()
    });
    console.log('Subscription updated for user:', firebaseUid);
}
async function handleSubscriptionCanceled(data) {
    const subscriptionId = data.subscription_id || data.id;
    const paddleCustomerId = data.customer?.id || data.customer_id;
    if (!paddleCustomerId || !subscriptionId) {
        console.error('Missing data in subscription cancellation', data);
        return;
    }
    const firebaseUid = await getFirebaseUid(paddleCustomerId);
    if (!firebaseUid) {
        console.error('No Firebase user found for Paddle customer ID:', paddleCustomerId);
        return;
    }
    // Find the transaction with this subscription ID
    const transactionsSnapshot = await db.collection('users').doc(firebaseUid).collection('transactions').where('subscriptionId', '==', subscriptionId).limit(1).get();
    if (!transactionsSnapshot.empty) {
        const transactionDoc = transactionsSnapshot.docs[0];
        await transactionDoc.ref.update({
            status: 'canceled',
            canceledAt: __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["default"].firestore.FieldValue.serverTimestamp(),
            updatedAt: __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["default"].firestore.FieldValue.serverTimestamp()
        });
    }
    // Check if user has any other active subscriptions
    const activeTransactionsSnapshot = await db.collection('users').doc(firebaseUid).collection('transactions').where('status', '==', 'active').limit(1).get();
    // Update user status if no active subscriptions remain
    if (activeTransactionsSnapshot.empty) {
        await db.collection('users').doc(firebaseUid).update({
            hasActiveSubscription: false,
            subscriptionStatus: 'canceled',
            updatedAt: __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["default"].firestore.FieldValue.serverTimestamp()
        });
    }
    console.log('Subscription canceled for user:', firebaseUid);
}
async function getFirebaseUid(paddleCustomerId) {
    const snapshot = await db.collection('users').where('paddleCustomerId', '==', paddleCustomerId).limit(1).get();
    if (snapshot.empty) return null;
    return snapshot.docs[0].id;
}
}}),
"[project]/node_modules/next/dist/esm/server/route-modules/pages-api/module.compiled.js [api] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
if ("TURBOPACK compile-time falsy", 0) {
    "TURBOPACK unreachable";
} else {
    if ("TURBOPACK compile-time truthy", 1) {
        module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/pages-api.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api.runtime.dev.js, cjs)");
    } else {
        "TURBOPACK unreachable";
    }
} //# sourceMappingURL=module.compiled.js.map
}}),
"[project]/node_modules/next/dist/esm/server/route-kind.js [api] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "RouteKind": (()=>RouteKind)
});
var RouteKind = /*#__PURE__*/ function(RouteKind) {
    /**
   * `PAGES` represents all the React pages that are under `pages/`.
   */ RouteKind["PAGES"] = "PAGES";
    /**
   * `PAGES_API` represents all the API routes under `pages/api/`.
   */ RouteKind["PAGES_API"] = "PAGES_API";
    /**
   * `APP_PAGE` represents all the React pages that are under `app/` with the
   * filename of `page.{j,t}s{,x}`.
   */ RouteKind["APP_PAGE"] = "APP_PAGE";
    /**
   * `APP_ROUTE` represents all the API routes and metadata routes that are under `app/` with the
   * filename of `route.{j,t}s{,x}`.
   */ RouteKind["APP_ROUTE"] = "APP_ROUTE";
    /**
   * `IMAGE` represents all the images that are generated by `next/image`.
   */ RouteKind["IMAGE"] = "IMAGE";
    return RouteKind;
}({}); //# sourceMappingURL=route-kind.js.map
}}),
"[project]/node_modules/next/dist/esm/build/templates/helpers.js [api] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * Hoists a name from a module or promised module.
 *
 * @param module the module to hoist the name from
 * @param name the name to hoist
 * @returns the value on the module (or promised module)
 */ __turbopack_context__.s({
    "hoist": (()=>hoist)
});
function hoist(module, name) {
    // If the name is available in the module, return it.
    if (name in module) {
        return module[name];
    }
    // If a property called `then` exists, assume it's a promise and
    // return a promise that resolves to the name.
    if ('then' in module && typeof module.then === 'function') {
        return module.then((mod)=>hoist(mod, name));
    }
    // If we're trying to hoise the default export, and the module is a function,
    // return the module itself.
    if (typeof module === 'function' && name === 'default') {
        return module;
    }
    // Otherwise, return undefined.
    return undefined;
} //# sourceMappingURL=helpers.js.map
}}),
"[project]/node_modules/next/dist/esm/build/templates/pages-api.js { INNER_PAGE => \"[project]/src/pages/api/webhook/paddle.ts [api] (ecmascript)\" } [api] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "config": (()=>config),
    "default": (()=>__TURBOPACK__default__export__),
    "routeModule": (()=>routeModule)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$modules$2f$pages$2d$api$2f$module$2e$compiled$2e$js__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/route-modules/pages-api/module.compiled.js [api] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$kind$2e$js__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/route-kind.js [api] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/build/templates/helpers.js [api] (ecmascript)");
// Import the userland code.
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$api$2f$webhook$2f$paddle$2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/pages/api/webhook/paddle.ts [api] (ecmascript)");
;
;
;
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$api$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$api$2f$webhook$2f$paddle$2e$ts__$5b$api$5d$__$28$ecmascript$29$__, 'default');
const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$api$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$api$2f$webhook$2f$paddle$2e$ts__$5b$api$5d$__$28$ecmascript$29$__, 'config');
const routeModule = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$modules$2f$pages$2d$api$2f$module$2e$compiled$2e$js__$5b$api$5d$__$28$ecmascript$29$__["PagesAPIRouteModule"]({
    definition: {
        kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$kind$2e$js__$5b$api$5d$__$28$ecmascript$29$__["RouteKind"].PAGES_API,
        page: "/api/webhook/paddle",
        pathname: "/api/webhook/paddle",
        // The following aren't used in production.
        bundlePath: '',
        filename: ''
    },
    userland: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$api$2f$webhook$2f$paddle$2e$ts__$5b$api$5d$__$28$ecmascript$29$__
}); //# sourceMappingURL=pages-api.js.map
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__0fbf965c._.js.map