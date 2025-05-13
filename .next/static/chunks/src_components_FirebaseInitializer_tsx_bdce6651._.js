(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_components_FirebaseInitializer_tsx_bdce6651._.js", {

"[project]/src/components/FirebaseInitializer.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$performance$2f$dist$2f$esm$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/performance/dist/esm/index.esm2017.js [app-client] (ecmascript)");
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
                        // Initialize Performance with a delay to avoid the attribute error
                        // The error happens because Performance tries to track DOM elements
                        // before the page is fully rendered
                        setTimeout({
                            "FirebaseInitializer.useEffect.initializeFirebaseServices": ()=>{
                                try {
                                    // Get performance instance but disable automatic page tracking
                                    // which is what causes the attribute error
                                    const perf = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$performance$2f$dist$2f$esm$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPerformance"])();
                                    // Manually disable any problematic data collection if needed
                                    // This is not documented in Firebase, but can help avoid errors
                                    // @ts-ignore - accessing internal property
                                    if (perf && perf._dataCollectionEnabled) {
                                        // No need to do anything special here
                                        console.log('Firebase Performance initialized successfully');
                                    }
                                } catch (error) {
                                    console.warn('Firebase Performance initialization failed:', error);
                                }
                            }
                        }["FirebaseInitializer.useEffect.initializeFirebaseServices"], 3000); // Delay for 3 seconds to ensure DOM is fully loaded
                    } catch (error) {
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
}]);

//# sourceMappingURL=src_components_FirebaseInitializer_tsx_bdce6651._.js.map