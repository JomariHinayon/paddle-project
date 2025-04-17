(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["chunks/[root of the server]__35262c4c._.js", {

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
"[externals]/node:assert [external] (node:assert, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:assert", () => require("node:assert"));

module.exports = mod;
}}),
"[externals]/node:events [external] (node:events, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:events", () => require("node:events"));

module.exports = mod;
}}),
"[externals]/node:util [external] (node:util, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:util", () => require("node:util"));

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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$2f$lib$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/firebase-admin/lib/index.js [middleware-edge] (ecmascript)");
;
;
// Initialize Firebase Admin
const getFirebaseAdmin = ()=>{
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$2f$lib$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"].apps.length) {
        const privateKey = process.env.FIREBASE_PRIVATE_KEY;
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$2f$lib$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"].initializeApp({
            credential: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$2f$lib$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"].credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: privateKey ? privateKey.replace(/\\n/g, '\n') : ''
            })
        });
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$2f$lib$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"];
};
const publicRoutes = [
    '/',
    '/login',
    '/signup',
    '/confirm-signup',
    '/auth/action',
    '/checkout',
    '/api/webhook/paddle'
];
const apiRoutes = [
    '/api/subscriptions',
    '/api/webhook'
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
    // Allow public routes and API routes
    if (publicRoutes.includes(pathname) || apiRoutes.some((route)=>pathname.startsWith(route))) {
        return response;
    }
    // Check for session token
    const session = request.cookies.get('session')?.value;
    if (!session) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL('/login', request.url));
    }
    // For API routes, we'll skip verification here as each API route will handle its own auth
    // This is more efficient than verifying the token twice
    if (pathname.startsWith('/api/')) {
        return response;
    }
    try {
        // We cannot use Firebase Admin directly in middleware due to Edge runtime limitations
        // Instead, we'll use a lightweight verification approach
        // The full verification will happen in API routes
        // Basic check - at least ensure the cookie exists and has proper format
        // Real verification will happen in API routes
        if (!session || session.split('.').length !== 3) {
            throw new Error('Invalid session format');
        }
        // For protected routes, proceed with the user's session
        // The actual verification will happen in the API routes
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
        // Protect all routes except static assets and public files
        '/((?!_next/static|favicon.ico|.*\\.[^/]*$).*)'
    ]
};
}}),
}]);

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__35262c4c._.js.map