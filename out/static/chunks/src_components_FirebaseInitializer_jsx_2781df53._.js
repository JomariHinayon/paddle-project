(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_components_FirebaseInitializer_jsx_2781df53._.js", {

"[project]/src/components/FirebaseInitializer.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>FirebaseInitializer)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$analytics$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/analytics/dist/esm/index.esm.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$analytics$2f$dist$2f$esm$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/analytics/dist/esm/index.esm2017.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$performance$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/performance/dist/esm/index.esm.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/app/dist/esm/index.esm.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/app/dist/esm/index.esm2017.js [app-client] (ecmascript) <locals>");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function FirebaseInitializer() {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FirebaseInitializer.useEffect": ()=>{
            // Only run in browser
            if ("TURBOPACK compile-time falsy", 0) {
                "TURBOPACK unreachable";
            }
            // Only initialize if Firebase is already initialized
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getApps"])().length === 0) return;
            const initializeFirebaseServices = {
                "FirebaseInitializer.useEffect.initializeFirebaseServices": async ()=>{
                    try {
                        // Initialize Analytics
                        try {
                            const { isSupported } = await __turbopack_context__.r("[project]/node_modules/firebase/analytics/dist/esm/index.esm.js [app-client] (ecmascript, async loader)")(__turbopack_context__.i);
                            const analyticsSupported = await isSupported();
                            if (analyticsSupported) {
                                const analytics = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$analytics$2f$dist$2f$esm$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAnalytics"])();
                                console.log('Firebase Analytics initialized successfully');
                            }
                        } catch (error) {
                            console.warn('Firebase Analytics initialization failed:', error);
                        }
                    // DISABLE Performance Monitoring completely to avoid attribute errors
                    // If you need to enable it in the future, you can uncomment the code below
                    /*
        setTimeout(() => {
          try {
            const perf = getPerformance();
            console.log('Firebase Performance initialized successfully');
          } catch (error) {
            console.warn('Firebase Performance initialization failed:', error);
          }
        }, 3000);
        */ } catch (error) {
                        console.warn('Error initializing Firebase services:', error);
                    }
                }
            }["FirebaseInitializer.useEffect.initializeFirebaseServices"];
            initializeFirebaseServices();
        }
    }["FirebaseInitializer.useEffect"], []);
    // This component doesn't render anything
    return null;
}
_s(FirebaseInitializer, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = FirebaseInitializer;
var _c;
__turbopack_context__.k.register(_c, "FirebaseInitializer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/FirebaseInitializer.jsx [app-client] (ecmascript, next/dynamic entry)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/FirebaseInitializer.jsx [app-client] (ecmascript)"));
}}),
}]);

//# sourceMappingURL=src_components_FirebaseInitializer_jsx_2781df53._.js.map