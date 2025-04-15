(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["chunks/[root of the server]__860be4f0._.js", {

"[externals]/node:async_hooks [external] (node:async_hooks, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}}),
"[externals]/node:buffer [external] (node:buffer, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}}),
"[project]/src/middleware.ts [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "config": (()=>config),
    "middleware": (()=>middleware)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/response.js [middleware-edge] (ecmascript)");
;
const publicRoutes = [
    '/',
    '/login',
    '/signup',
    '/confirm-signup',
    '/auth/action',
    '/checkout',
    '/api/webhook/paddle'
];
async function middleware(request) {
    const response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    // Add CSP headers with all required domains
    const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.paddle.com https://*.datadoghq-browser-agent.com https://*.googletagmanager.com https://core.spreedly.com https://global.localizecdn.com https://js.stripe.com https://*.google.com https://apis.google.com https://*.firebaseio.com https://*.googleapis.com;
    style-src 'self' 'unsafe-inline' https://*.paddle.com;
    frame-src 'self' https://*.paddle.com http://localhost:* https://sandbox-buy.paddle.com https://buy.paddle.com https://accounts.google.com https://*.firebaseapp.com https://*.firebase.com;
    frame-ancestors 'self' http://localhost:* https://*.paddle.com;
    img-src 'self' data: https: blob:;
    font-src 'self' https://*.paddle.com;
    connect-src 'self' https://*.paddle.com https://*.firebaseio.com https://*.googleapis.com https://*.google-analytics.com https://firebaselogging-pa.googleapis.com https://*.cloudfunctions.net https://*.firebase.com https://*.firebaseapp.com wss://*.firebaseio.com https://identitytoolkit.googleapis.com;
  `.replace(/\s{2,}/g, ' ').trim();
    response.headers.set('Content-Security-Policy', cspHeader);
    // Remove COOP and COEP headers completely to allow popups to work properly
    response.headers.delete('Cross-Origin-Opener-Policy');
    response.headers.delete('Cross-Origin-Embedder-Policy');
    const { pathname } = request.nextUrl;
    // Allow public routes
    if (publicRoutes.includes(pathname)) {
        return response;
    }
    // Check for session token
    const session = request.cookies.get('session')?.value;
    if (!session) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL('/login', request.url));
    }
    try {
        // Verify token with Firebase Auth
        const verifyEndpoint = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${("TURBOPACK compile-time value", "AIzaSyAZgykutTrEf_s4X53uL0e5g5IeU9LN7Ao")}`;
        const response = await fetch(verifyEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idToken: session
            })
        });
        const data = await response.json();
        console.log('Firebase Auth Response:', {
            userId: data.users?.[0]?.localId
        });
        // No user found or invalid token
        if (!data.users?.[0]) {
            throw new Error('Invalid session');
        }
        const user = data.users[0];
        const paddlePayload = request.body; // Assuming the Paddle payload is in the request body
        const customerId = paddlePayload?.checkout?.completed?.customer?.id; // Extract customerId from Paddle payload
        console.log('Authenticated User:', {
            uid: user.localId,
            email: user.email,
            emailVerified: user.emailVerified,
            customerId,
            path: pathname
        });
        // Redirect unverified users to email verification page
        if (!user.emailVerified && pathname !== '/confirm-signup') {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL('/confirm-signup', request.url));
        }
        // Allow access to dashboard routes for verified users
        if (user.emailVerified && pathname.startsWith('/dashboard')) {
            const requestHeaders = new Headers(request.headers);
            requestHeaders.set('user', JSON.stringify(user));
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next({
                headers: requestHeaders
            });
        }
        return response;
    } catch (error) {
        // Clear invalid session and redirect to login
        const redirectResponse = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL('/login', request.url));
        redirectResponse.cookies.delete('session');
        return redirectResponse;
    }
}
const config = {
    matcher: [
        // Protect all routes except static assets, API routes, and webhooks
        '/((?!api|_next|static|webhook|.*\\.[^/]*$).*)'
    ]
};
}}),
}]);

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__860be4f0._.js.map