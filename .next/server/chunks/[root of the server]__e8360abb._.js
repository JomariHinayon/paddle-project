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
"[project]/src/lib/firebase-admin.ts [api] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "db": (()=>db),
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/firebase-admin [external] (firebase-admin, cjs)");
;
if (!process.env.FIREBASE_PRIVATE_KEY || !process.env.FIREBASE_PRIVATE_KEY.includes('-----BEGIN PRIVATE KEY-----')) {
    throw new Error('Invalid or missing FIREBASE_PRIVATE_KEY environment variable. Ensure it is a valid PEM-formatted private key.');
}
if (!__TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["apps"].length) {
    try {
        (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["initializeApp"])({
            credential: __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["credential"].cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
            })
        });
    } catch (error) {
        console.error('Firebase admin initialization error:', error);
        throw new Error('Failed to initialize Firebase Admin SDK. Check your environment variables.');
    }
}
const db = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["firestore"])();
const __TURBOPACK__default__export__ = db;
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2d$admin$2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase-admin.ts [api] (ecmascript)");
;
;
;
;
if (!process.env.FIREBASE_PRIVATE_KEY || !process.env.FIREBASE_PRIVATE_KEY.includes('-----BEGIN PRIVATE KEY-----')) {
    throw new Error('Invalid or missing FIREBASE_PRIVATE_KEY environment variable. Ensure it is a valid PEM-formatted private key.');
}
if (!__TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["default"].apps.length) {
    __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["default"].initializeApp({
        credential: __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["default"].credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY ? JSON.parse(process.env.FIREBASE_PRIVATE_KEY) : undefined
        })
    });
}
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
        console.log('Incoming webhook payload:', rawBody);
        // Save raw body to Firebase under 'subscription' collection with a custom document ID
        const { data } = JSON.parse(rawBody);
        const subscriptionId = data.id || data.transaction_id;
        if (!subscriptionId) {
            return res.status(400).json({
                message: 'Missing subscription or transaction ID'
            });
        }
        // Create a new document with a custom ID (subscriptionId or transactionId)
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2d$admin$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["default"].collection('subscription').doc(subscriptionId).set({
            rawBody,
            timestamp: __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["default"].firestore.FieldValue.serverTimestamp()
        });
        if (!signature || !verifyPaddleSignature(rawBody, signature)) {
            return res.status(401).json({
                message: 'Invalid signature'
            });
        }
        const { event_type } = JSON.parse(rawBody);
        const normalizedEvent = event_type.replace('.', '_');
        switch(normalizedEvent){
            case 'subscription_created':
                await handleSubscriptionTransaction(data);
                await saveSubscriptionToFirestore(data);
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
    const transRef = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2d$admin$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["default"].collection('users').doc(userId).collection('transactions').doc(transactionId);
    await transRef.set(transactionData, {
        merge: true
    });
    // Update the user's main subscription document
    const userRef = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2d$admin$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["default"].collection('users').doc(userId);
    await userRef.set({
        currentSubscriptionId: subscriptionId,
        subscriptionStatus: data.status || 'active',
        lastTransactionDate: __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["default"].firestore.FieldValue.serverTimestamp(),
        currentPlan: item?.product?.id || null
    }, {
        merge: true
    });
    // Link subscriptionId to the initial transaction if it exists
    const initialTransactionRef = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2d$admin$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["default"].collection('users').doc(userId).collection('transactions').doc(transactionId);
    const initialTransactionDoc = await initialTransactionRef.get();
    if (initialTransactionDoc.exists) {
        await initialTransactionRef.update({
            subscriptionId
        });
    }
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
    const transRef = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2d$admin$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["default"].collection('users').doc(userId).collection('transactions').doc(transactionId);
    await transRef.set({
        status: 'canceled',
        canceledAt: __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["default"].firestore.FieldValue.serverTimestamp(),
        updatedAt: __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["default"].firestore.FieldValue.serverTimestamp()
    }, {
        merge: true
    });
}
async function saveSubscriptionToFirestore(data) {
    const subscriptionID = data.id;
    const customerID = data.custom_data?.userId;
    try {
        // Save subscriptionID to Firestore
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2d$admin$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["default"].collection('subscriptions').doc(subscriptionID).set({
            subscriptionID,
            customerID,
            createdAt: new Date()
        });
        console.log(`Subscription ${subscriptionID} saved successfully.`);
    } catch (error) {
        console.error('Error saving subscription:', error);
    }
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

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__e8360abb._.js.map