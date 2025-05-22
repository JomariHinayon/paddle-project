(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_2e1b6ae1._.js", {

"[project]/src/lib/firebase.js [app-client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "auth": (()=>auth),
    "emailProvider": (()=>emailProvider),
    "firestore": (()=>firestore),
    "functions": (()=>functions),
    "getCurrentUserToken": (()=>getCurrentUserToken),
    "googleProvider": (()=>googleProvider),
    "initAnalytics": (()=>initAnalytics),
    "storage": (()=>storage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
// lib/firebase.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/app/dist/esm/index.esm2017.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm2017$2f$index$2d$8bd0c73f$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__p__as__getAuth$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/auth/dist/esm2017/index-8bd0c73f.js [app-client] (ecmascript) <export p as getAuth>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm2017$2f$index$2d$8bd0c73f$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Y__as__GoogleAuthProvider$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/auth/dist/esm2017/index-8bd0c73f.js [app-client] (ecmascript) <export Y as GoogleAuthProvider>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm2017$2f$index$2d$8bd0c73f$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__W__as__EmailAuthProvider$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/auth/dist/esm2017/index-8bd0c73f.js [app-client] (ecmascript) <export W as EmailAuthProvider>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.esm2017.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/storage/dist/index.esm2017.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$functions$2f$dist$2f$esm$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/functions/dist/esm/index.esm2017.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$analytics$2f$dist$2f$esm$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/analytics/dist/esm/index.esm2017.js [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
;
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: ("TURBOPACK compile-time value", "AIzaSyAx0PxN59MqrmedLsjEiTqVvt7eq5S2GeQ"),
    authDomain: ("TURBOPACK compile-time value", "paddle-bda5d.firebaseapp.com"),
    projectId: ("TURBOPACK compile-time value", "paddle-bda5d"),
    storageBucket: ("TURBOPACK compile-time value", "paddle-bda5d.firebasestorage.app"),
    messagingSenderId: ("TURBOPACK compile-time value", "911290966881"),
    appId: ("TURBOPACK compile-time value", "1:911290966881:web:084733c0aa07f473c8db20"),
    measurementId: "G-1R6HX54FVL"
};
// Initialize Firebase
const app = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getApps"])().length === 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["initializeApp"])(firebaseConfig) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getApps"])()[0];
const auth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm2017$2f$index$2d$8bd0c73f$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__p__as__getAuth$3e$__["getAuth"])(app);
auth.useDeviceLanguage(); // For better auth flows
const googleProvider = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm2017$2f$index$2d$8bd0c73f$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Y__as__GoogleAuthProvider$3e$__["GoogleAuthProvider"]();
googleProvider.addScope('profile');
googleProvider.addScope('email');
googleProvider.setCustomParameters({
    prompt: 'select_account'
}); // Better UX for Google Auth
const emailProvider = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm2017$2f$index$2d$8bd0c73f$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__W__as__EmailAuthProvider$3e$__["EmailAuthProvider"]();
const firestore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFirestore"])(app);
const storage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStorage"])(app);
const functions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$functions$2f$dist$2f$esm$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFunctions"])(app);
const initAnalytics = async ()=>{
    if ("TURBOPACK compile-time truthy", 1) {
        const analyticsSupported = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$analytics$2f$dist$2f$esm$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSupported"])();
        if (analyticsSupported) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$analytics$2f$dist$2f$esm$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAnalytics"])(app);
        }
    }
    return null;
};
// Performance monitoring is disabled to avoid attribute errors
// If you need to enable it in the future, you can uncomment and modify the code below
/*
export const initPerformance = () => {
  if (typeof window !== 'undefined') {
    try {
      const perf = getPerformance(app);
      return perf;
    } catch (error) {
      console.warn('Firebase Performance initialization error:', error);
      return null;
    }
  }
  return null;
};

// Initialize Performance with proper config when in browser
if (typeof window !== 'undefined') {
  // We'll initialize performance monitoring but with a delay to ensure the DOM is loaded
  setTimeout(() => {
    initPerformance();
  }, 2000);
}
*/ // Emulator setup (for development)
if ("TURBOPACK compile-time truthy", 1) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$functions$2f$dist$2f$esm$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["connectFunctionsEmulator"])(functions, 'localhost', 5001);
// Note: Auth emulator needs to be set up in your auth flows
}
const getCurrentUserToken = async ()=>{
    try {
        const user = auth.currentUser;
        if (!user) return null;
        return await user.getIdToken();
    } catch (error) {
        console.error('Error getting user token:', error);
        return null;
    }
};
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/firebase.js [app-client] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/app/dist/esm/index.esm.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/auth/dist/esm/index.esm.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$storage$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/storage/dist/esm/index.esm.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$functions$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/functions/dist/esm/index.esm.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$analytics$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/analytics/dist/esm/index.esm.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$performance$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/performance/dist/esm/index.esm.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/lib/firebase.js [app-client] (ecmascript) <locals>");
}}),
"[project]/src/lib/session.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "clearSession": (()=>clearSession),
    "setSession": (()=>setSession)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/lib/firebase.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/lib/firebase.js [app-client] (ecmascript) <locals>");
'use client';
;
const setSession = async ()=>{
    const user = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["auth"].currentUser;
    if (user) {
        const idToken = await user.getIdToken();
        // Call the session API to create a proper session cookie
        try {
            const response = await fetch('/api/auth/session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idToken
                })
            });
            if (!response.ok) {
                throw new Error('Failed to set session');
            }
            // The session cookie is now set by the API
            return true;
        } catch (error) {
            console.error('Error setting session:', error);
            return false;
        }
    }
    return false;
};
const clearSession = async ()=>{
    try {
        // Call the logout API to revoke the session
        await fetch('/api/auth/logout', {
            method: 'POST',
            credentials: 'include'
        });
        // Clear local storage and session storage
        localStorage.removeItem('user');
        sessionStorage.clear();
        return true;
    } catch (error) {
        console.error('Error clearing session:', error);
        // Fallback to client-side cookie clearing if the API fails
        document.cookie = 'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure';
        localStorage.removeItem('user');
        sessionStorage.clear();
        return false;
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/LogoutButton.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>LogoutButton)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/auth/dist/esm/index.esm.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm2017$2f$index$2d$8bd0c73f$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__signOut$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/auth/dist/esm2017/index-8bd0c73f.js [app-client] (ecmascript) <export D as signOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/lib/firebase.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/lib/firebase.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$session$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/session.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function LogoutButton({ className = '' }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleLogout = async ()=>{
        try {
            setLoading(true);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm2017$2f$index$2d$8bd0c73f$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__signOut$3e$__["signOut"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["auth"]);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$session$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clearSession"])();
            router.replace('/login');
        } catch (error) {
            console.error('Error signing out:', error);
        } finally{
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: handleLogout,
        disabled: loading,
        className: `flex items-center ${className}`,
        children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "animate-spin rounded-full h-4 w-4 border-b-2 border-current"
        }, void 0, false, {
            fileName: "[project]/src/components/LogoutButton.jsx",
            lineNumber: 33,
            columnNumber: 9
        }, this) : 'Logout'
    }, void 0, false, {
        fileName: "[project]/src/components/LogoutButton.jsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
_s(LogoutButton, "OeGW3YQfIEwiDdtbkZtE38+y0P4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = LogoutButton;
var _c;
__turbopack_context__.k.register(_c, "LogoutButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/UserProfileCard.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>UserProfileCard)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/auth/dist/esm/index.esm.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
'use client';
;
;
;
function UserProfileCard({ user }) {
    const getProfileImage = ()=>{
        if (user?.photoURL) {
            // Handle Google photo URL
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                src: user.photoURL,
                alt: user.displayName || 'Profile',
                width: 64,
                height: 64,
                className: "rounded-full",
                priority: true
            }, void 0, false, {
                fileName: "[project]/src/components/UserProfileCard.jsx",
                lineNumber: 11,
                columnNumber: 9
            }, this);
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-16 w-16 rounded-full bg-violet-100 flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-2xl text-violet-600",
                children: (user?.displayName?.[0] || user?.email?.[0] || '?').toUpperCase()
            }, void 0, false, {
                fileName: "[project]/src/components/UserProfileCard.jsx",
                lineNumber: 24,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/UserProfileCard.jsx",
            lineNumber: 23,
            columnNumber: 7
        }, this);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white rounded-lg shadow-md p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center space-x-4",
                children: [
                    getProfileImage(),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-xl font-semibold text-gray-800",
                                children: user?.displayName || user?.email?.split('@')[0] || 'User'
                            }, void 0, false, {
                                fileName: "[project]/src/components/UserProfileCard.jsx",
                                lineNumber: 36,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-500",
                                children: user?.email
                            }, void 0, false, {
                                fileName: "[project]/src/components/UserProfileCard.jsx",
                                lineNumber: 39,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/UserProfileCard.jsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/UserProfileCard.jsx",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 border-t pt-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm text-gray-500",
                                children: "Account Status"
                            }, void 0, false, {
                                fileName: "[project]/src/components/UserProfileCard.jsx",
                                lineNumber: 45,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "px-2 py-1 text-xs rounded-full bg-green-100 text-green-800",
                                children: "Active"
                            }, void 0, false, {
                                fileName: "[project]/src/components/UserProfileCard.jsx",
                                lineNumber: 46,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/UserProfileCard.jsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center mt-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm text-gray-500",
                                children: "Email Verified"
                            }, void 0, false, {
                                fileName: "[project]/src/components/UserProfileCard.jsx",
                                lineNumber: 57,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `px-2 py-1 text-xs rounded-full ${user?.emailVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`,
                                children: user?.emailVerified ? 'Verified' : 'Pending'
                            }, void 0, false, {
                                fileName: "[project]/src/components/UserProfileCard.jsx",
                                lineNumber: 58,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/UserProfileCard.jsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/UserProfileCard.jsx",
                lineNumber: 43,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/UserProfileCard.jsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
_c = UserProfileCard;
var _c;
__turbopack_context__.k.register(_c, "UserProfileCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/paddle-config.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "PADDLE_CONFIG": (()=>PADDLE_CONFIG),
    "getPlanDetails": (()=>getPlanDetails),
    "getPlanFromTransaction": (()=>getPlanFromTransaction),
    "identifyPriceId": (()=>identifyPriceId),
    "matchTransactionPlan": (()=>matchTransactionPlan)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const PADDLE_CONFIG = {
    clientToken: ("TURBOPACK compile-time value", "test_20b36b874ecf58915be7d6f8057") || '',
    sellerId: ("TURBOPACK compile-time value", "31089") || '',
    prices: {
        standard: {
            month: ("TURBOPACK compile-time value", "pri_01jv178w9jst683rgyjb6w18qx") || 'pri_01h8xz97pj0000000000000000',
            year: ("TURBOPACK compile-time value", "pri_01jv17anj5xnsta6hvv209sdyq") || 'pri_01h8xz97pj0000000000000000'
        },
        premium: {
            month: ("TURBOPACK compile-time value", "pri_01jv17e3xm8mdsd22866ce8417") || 'pri_01h8xz97pj0000000000000000',
            year: ("TURBOPACK compile-time value", "pri_01jv17f8370m2vyvspr2btg84s") || 'pri_01h8xz97pj0000000000000000'
        }
    },
    planDetails: {
        standard: {
            name: 'Standard Plan',
            features: [
                'Core application features',
                'Email support',
                'Basic analytics'
            ]
        },
        premium: {
            name: 'Premium Plan',
            features: [
                'All Standard features',
                'Priority support',
                'Advanced analytics',
                'Custom integrations',
                'Team collaboration tools'
            ]
        }
    },
    checkoutUrl: 'https://checkout.paddle.com/checkout',
    customerPortalUrl: 'https://checkout.paddle.com/customer',
    customerPortalLink: ("TURBOPACK compile-time value", "https://sandbox-customer-portal.paddle.com") || 'https://sandbox-customer-portal.paddle.com/cpl_01jtqjeq79c64enc8qy3cs3zrm'
};
const identifyPriceId = (priceId)=>{
    for (const [plan, cycles] of Object.entries(PADDLE_CONFIG.prices)){
        for (const [cycle, id] of Object.entries(cycles)){
            if (id === priceId) {
                return {
                    plan: plan,
                    cycle: cycle
                };
            }
        }
    }
    return null;
};
const getPlanDetails = (priceId)=>{
    const identified = identifyPriceId(priceId);
    if (!identified) return null;
    return {
        ...PADDLE_CONFIG.planDetails[identified.plan],
        billingCycle: identified.cycle,
        priceId
    };
};
const getPlanFromTransaction = (transaction)=>{
    const priceId = transaction.items?.[0]?.price?.id;
    if (!priceId) return null;
    const planInfo = identifyPriceId(priceId);
    if (!planInfo) return null;
    return {
        ...PADDLE_CONFIG.planDetails[planInfo.plan],
        billingCycle: planInfo.cycle,
        priceId,
        amount: transaction.total,
        currency: transaction.currency_code,
        status: transaction.status
    };
};
const matchTransactionPlan = (productId)=>{
    if (!productId) return null;
    // Flatten price IDs for lookup
    const priceMap = Object.entries(PADDLE_CONFIG.prices).reduce((acc, [plan, cycles])=>{
        Object.entries(cycles).forEach(([cycle, id])=>{
            acc[id] = {
                plan: plan,
                cycle: cycle
            };
        });
        return acc;
    }, {});
    return priceMap[productId] || null;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/paddle-utils.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "PADDLE_PLANS": (()=>PADDLE_PLANS),
    "PaddlePlan": (()=>PaddlePlan),
    "createCheckoutUrl": (()=>createCheckoutUrl),
    "formatPrice": (()=>formatPrice),
    "getTransactionDetails": (()=>getTransactionDetails),
    "identifyPlan": (()=>identifyPlan)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$paddle$2d$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/paddle-config.js [app-client] (ecmascript)");
;
function TransactionData(checkoutId, transactionId, status, total, currency, items, paddleEventData) {
    this.checkoutId = checkoutId;
    this.transactionId = transactionId;
    this.status = status;
    this.total = total;
    this.currency = currency;
    this.items = items;
    this.paddleEventData = paddleEventData;
}
_c = TransactionData;
function PlanInfo(name, tier, interval, description, features) {
    this.name = name;
    this.tier = tier;
    this.interval = interval;
    this.description = description;
    this.features = features;
}
_c1 = PlanInfo;
function PaddlePlan(name, features, description, tier, interval) {
    this.name = name;
    this.features = features;
    this.description = description;
    this.tier = tier;
    this.interval = interval;
}
_c2 = PaddlePlan;
const PADDLE_PLANS = {
    // Standard monthly plan
    [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$paddle$2d$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PADDLE_CONFIG"].prices.standard.month]: new PaddlePlan('Standard Monthly', __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$paddle$2d$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PADDLE_CONFIG"].planDetails.standard.features, 'Basic features with monthly billing', 'standard', 'month'),
    // Standard yearly plan
    [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$paddle$2d$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PADDLE_CONFIG"].prices.standard.year]: new PaddlePlan('Standard Yearly', __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$paddle$2d$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PADDLE_CONFIG"].planDetails.standard.features, 'Basic features with yearly billing (save 16%)', 'standard', 'year'),
    // Premium monthly plan
    [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$paddle$2d$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PADDLE_CONFIG"].prices.premium.month]: new PaddlePlan('Premium Monthly', __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$paddle$2d$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PADDLE_CONFIG"].planDetails.premium.features, 'Advanced features with monthly billing', 'premium', 'month'),
    // Premium yearly plan
    [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$paddle$2d$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PADDLE_CONFIG"].prices.premium.year]: new PaddlePlan('Premium Yearly', __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$paddle$2d$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PADDLE_CONFIG"].planDetails.premium.features, 'Advanced features with yearly billing (save 16%)', 'premium', 'year')
};
function identifyPlan(planId) {
    // Check standard plans
    if (planId === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$paddle$2d$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PADDLE_CONFIG"].prices.standard.month) {
        return new PlanInfo('Standard Monthly', 'standard', 'month', 'Basic features with monthly billing', __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$paddle$2d$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PADDLE_CONFIG"].planDetails.standard.features);
    }
    if (planId === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$paddle$2d$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PADDLE_CONFIG"].prices.standard.year) {
        return new PlanInfo('Standard Yearly', 'standard', 'year', 'Basic features with yearly billing (save 16%)', __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$paddle$2d$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PADDLE_CONFIG"].planDetails.standard.features);
    }
    // Check premium plans
    if (planId === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$paddle$2d$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PADDLE_CONFIG"].prices.premium.month) {
        return new PlanInfo('Premium Monthly', 'premium', 'month', 'Advanced features with monthly billing', __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$paddle$2d$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PADDLE_CONFIG"].planDetails.premium.features);
    }
    if (planId === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$paddle$2d$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PADDLE_CONFIG"].prices.premium.year) {
        return new PlanInfo('Premium Yearly', 'premium', 'year', 'Advanced features with yearly billing (save 16%)', __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$paddle$2d$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PADDLE_CONFIG"].planDetails.premium.features);
    }
    return null;
}
function formatPrice(amount, currencyCode = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 2
    }).format(amount / 100);
}
function createCheckoutUrl(priceId, customerId, customerEmail) {
    const baseUrl = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$paddle$2d$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PADDLE_CONFIG"].checkoutUrl;
    const queryParams = new URLSearchParams();
    // Add the price ID as an item
    queryParams.append('items[0][priceId]', priceId);
    queryParams.append('items[0][quantity]', '1');
    // Add customer ID if provided
    if (customerId) {
        queryParams.append('customer[id]', customerId);
    }
    // Add customer email if provided
    if (customerEmail) {
        queryParams.append('customer[email]', customerEmail);
    }
    // Add success and cancel URLs if needed
    // queryParams.append('successUrl', window.location.origin + '/checkout/success');
    // queryParams.append('cancelUrl', window.location.origin + '/checkout/cancel');
    return `${baseUrl}?${queryParams.toString()}`;
}
const getTransactionDetails = function(transaction) {
    const productId = transaction.items?.[0]?.price?.product_id;
    const plan = identifyPlan(productId);
    return {
        ...plan,
        amount: `${transaction.total} ${transaction.currency}`,
        status: transaction.status,
        checkoutId: transaction.checkoutId,
        transactionId: transaction.transactionId,
        rawProductId: productId,
        purchaseDate: transaction.paddleEventData?.created_at
    };
};
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "TransactionData");
__turbopack_context__.k.register(_c1, "PlanInfo");
__turbopack_context__.k.register(_c2, "PaddlePlan");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/PaddleCheckoutHandler.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>PaddleCheckoutHandler)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.esm2017.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/auth/dist/esm/index.esm.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm2017$2f$index$2d$8bd0c73f$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__p__as__getAuth$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/auth/dist/esm2017/index-8bd0c73f.js [app-client] (ecmascript) <export p as getAuth>");
var _s = __turbopack_context__.k.signature();
;
;
;
function PaddleCheckoutHandler({ onSuccess, onError }) {
    _s();
    const [isProcessing, setIsProcessing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [checkoutId, setCheckoutId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [customerId, setCustomerId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Get checkout and customer ID from URL if present
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PaddleCheckoutHandler.useEffect": ()=>{
            if ("TURBOPACK compile-time truthy", 1) {
                const params = new URLSearchParams(window.location.search);
                const id = params.get('checkout_id');
                const customer = params.get('customer_id');
                if (id) setCheckoutId(id);
                if (customer) setCustomerId(customer);
            }
        }
    }["PaddleCheckoutHandler.useEffect"], []);
    // Process the checkout completion if we have the necessary data
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PaddleCheckoutHandler.useEffect": ()=>{
            const processCheckout = {
                "PaddleCheckoutHandler.useEffect.processCheckout": async ()=>{
                    if (!checkoutId || !customerId || isProcessing) return;
                    setIsProcessing(true);
                    try {
                        const auth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm2017$2f$index$2d$8bd0c73f$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__p__as__getAuth$3e$__["getAuth"])();
                        const user = auth.currentUser;
                        if (!user) {
                            throw new Error('User not authenticated');
                        }
                        // Instead of storing checkout data, we'll just pass it to the verification endpoint
                        console.log('Processing checkout - calling verification endpoint');
                        // Call our server endpoint to verify and process the checkout
                        const response = await fetch('/api/subscriptions/verify-checkout', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                checkoutId,
                                customerId,
                                userId: user.uid,
                                email: user.email
                            })
                        });
                        if (!response.ok) {
                            // If API call fails, we'll rely on webhooks to update the subscription later
                            console.log('Subscription details not available yet, webhooks will update later');
                            // Clear URL parameters
                            window.history.replaceState({}, document.title, window.location.pathname);
                            if (onSuccess) {
                                onSuccess({
                                    subscriptionId: 'pending',
                                    status: 'processing',
                                    customerId
                                });
                            }
                            return;
                        }
                        const subscriptionData = await response.json();
                        console.log('Subscription details retrieved from API:', subscriptionData);
                        // Only update user record if we have a valid subscription ID (not 'pending')
                        if (subscriptionData.subscriptionId && subscriptionData.subscriptionId !== 'pending') {
                            // Update user record with subscription details
                            const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFirestore"])();
                            const userRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(db, 'users', user.uid);
                            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDoc"])(userRef, {
                                hasActiveSubscription: true,
                                currentSubscriptionId: subscriptionData.subscriptionId,
                                subscriptionStatus: subscriptionData.status,
                                currentPlan: subscriptionData.planId,
                                nextBillDate: subscriptionData.nextBillDate ? new Date(subscriptionData.nextBillDate) : null,
                                paddleCustomerId: customerId,
                                lastCheckoutDate: new Date()
                            }, {
                                merge: true
                            });
                        } else {
                            console.log('No valid subscription ID received, waiting for webhook events');
                        }
                        // Clear URL parameters
                        window.history.replaceState({}, document.title, window.location.pathname);
                        if (onSuccess) {
                            onSuccess(subscriptionData);
                        }
                    } catch (error) {
                        console.error('Error processing checkout:', error);
                        if (onError) {
                            onError(error);
                        }
                    } finally{
                        setIsProcessing(false);
                    }
                }
            }["PaddleCheckoutHandler.useEffect.processCheckout"];
            processCheckout();
        }
    }["PaddleCheckoutHandler.useEffect"], [
        checkoutId,
        customerId,
        isProcessing,
        onSuccess,
        onError
    ]);
    // This component doesn't render anything
    return null;
}
_s(PaddleCheckoutHandler, "5ZIzd9sz8a+7H+9F0b8ttSi9faw=");
_c = PaddleCheckoutHandler;
var _c;
__turbopack_context__.k.register(_c, "PaddleCheckoutHandler");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/dashboard/page.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Dashboard)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/lib/firebase.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/lib/firebase.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/auth/dist/esm/index.esm.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm2017$2f$index$2d$8bd0c73f$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__z__as__onAuthStateChanged$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/auth/dist/esm2017/index-8bd0c73f.js [app-client] (ecmascript) <export z as onAuthStateChanged>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LogoutButton$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/LogoutButton.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$UserProfileCard$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/UserProfileCard.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$script$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/script.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$paddle$2d$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/paddle-config.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.esm2017.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm2017$2f$index$2d$8bd0c73f$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__p__as__getAuth$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/auth/dist/esm2017/index-8bd0c73f.js [app-client] (ecmascript) <export p as getAuth>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$paddle$2d$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/paddle-utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$PaddleCheckoutHandler$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/PaddleCheckoutHandler.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const ThemeContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])();
function ThemeProvider({ children }) {
    _s();
    const [theme, setTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('light');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeProvider.useEffect": ()=>{
            // Load theme from localStorage if available
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                setTheme(savedTheme);
                if (savedTheme === 'dark') {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
            } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                // Use system preference as fallback
                setTheme('dark');
                document.documentElement.classList.add('dark');
            }
        }
    }["ThemeProvider.useEffect"], []);
    const changeTheme = (newTheme)=>{
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeContext.Provider, {
        value: {
            theme,
            setTheme
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/app/dashboard/page.jsx",
        lineNumber: 54,
        columnNumber: 5
    }, this);
}
_s(ThemeProvider, "Z8UCD9KudyQA62DCQ9e5cf9+m5k=");
_c = ThemeProvider;
function useTheme() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
_s1(useTheme, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
// Settings Modal Component
function SettingsModal({ isOpen, onClose }) {
    _s2();
    const { theme, setTheme } = useTheme();
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden transform transition-all",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-semibold text-slate-800 dark:text-white",
                                children: "Settings"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/page.jsx",
                                lineNumber: 79,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onClose,
                                className: "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white transition-colors",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    className: "h-6 w-6",
                                    fill: "none",
                                    viewBox: "0 0 24 24",
                                    stroke: "currentColor",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M6 18L18 6M6 6l12 12"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/page.jsx",
                                        lineNumber: 85,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                    lineNumber: 84,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/page.jsx",
                                lineNumber: 80,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/page.jsx",
                        lineNumber: 78,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "text-md font-medium text-slate-700 dark:text-slate-200 mb-3",
                                        children: "Theme"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/page.jsx",
                                        lineNumber: 93,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex space-x-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setTheme('light'),
                                                className: `flex flex-col items-center p-4 rounded-lg border-2 transition-all ${theme === 'light' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center mb-2 shadow-sm",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            xmlns: "http://www.w3.org/2000/svg",
                                                            className: "h-6 w-6 text-amber-500",
                                                            fill: "none",
                                                            viewBox: "0 0 24 24",
                                                            stroke: "currentColor",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round",
                                                                strokeWidth: 2,
                                                                d: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/dashboard/page.jsx",
                                                                lineNumber: 105,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                            lineNumber: 104,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard/page.jsx",
                                                        lineNumber: 103,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm font-medium text-slate-800 dark:text-slate-200",
                                                        children: "Light Mode"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard/page.jsx",
                                                        lineNumber: 108,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/dashboard/page.jsx",
                                                lineNumber: 95,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setTheme('dark'),
                                                className: `flex flex-col items-center p-4 rounded-lg border-2 transition-all ${theme === 'dark' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center mb-2 shadow-sm",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            xmlns: "http://www.w3.org/2000/svg",
                                                            className: "h-6 w-6 text-slate-200",
                                                            fill: "none",
                                                            viewBox: "0 0 24 24",
                                                            stroke: "currentColor",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round",
                                                                strokeWidth: 2,
                                                                d: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/dashboard/page.jsx",
                                                                lineNumber: 121,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                            lineNumber: 120,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard/page.jsx",
                                                        lineNumber: 119,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm font-medium text-slate-800 dark:text-slate-200",
                                                        children: "Dark Mode"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard/page.jsx",
                                                        lineNumber: 124,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/dashboard/page.jsx",
                                                lineNumber: 111,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/page.jsx",
                                        lineNumber: 94,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/page.jsx",
                                lineNumber: 92,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "pt-4 border-t border-slate-200 dark:border-slate-700",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "text-md font-medium text-slate-700 dark:text-slate-200 mb-3",
                                        children: "About"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/page.jsx",
                                        lineNumber: 131,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-4 bg-slate-50 dark:bg-slate-700/30 rounded-lg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center mb-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        src: "/paFire_logo.png",
                                                        alt: "paFire Logo",
                                                        width: 24,
                                                        height: 24,
                                                        className: "mr-2"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard/page.jsx",
                                                        lineNumber: 134,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h5", {
                                                        className: "font-semibold text-slate-900 dark:text-white",
                                                        children: "paFire"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard/page.jsx",
                                                        lineNumber: 141,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/dashboard/page.jsx",
                                                lineNumber: 133,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-slate-600 dark:text-slate-300",
                                                children: "Version 1.0.0"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/page.jsx",
                                                lineNumber: 143,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-slate-600 dark:text-slate-300 mt-2",
                                                children: "A Firebase & Paddle integration showcase application."
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/page.jsx",
                                                lineNumber: 146,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-4",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: "https://github.com/username/pademo",
                                                    target: "_blank",
                                                    rel: "noopener noreferrer",
                                                    className: "text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            xmlns: "http://www.w3.org/2000/svg",
                                                            className: "h-4 w-4 mr-1",
                                                            fill: "currentColor",
                                                            viewBox: "0 0 24 24",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                d: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/dashboard/page.jsx",
                                                                lineNumber: 157,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                            lineNumber: 156,
                                                            columnNumber: 21
                                                        }, this),
                                                        "View on GitHub"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                    lineNumber: 150,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/page.jsx",
                                                lineNumber: 149,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/page.jsx",
                                        lineNumber: 132,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/page.jsx",
                                lineNumber: 130,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/page.jsx",
                        lineNumber: 90,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/page.jsx",
                lineNumber: 77,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/dashboard/page.jsx",
            lineNumber: 76,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/dashboard/page.jsx",
        lineNumber: 75,
        columnNumber: 5
    }, this);
}
_s2(SettingsModal, "5ABGV54qnXKp6rHn7MS/8MjwRhQ=", false, function() {
    return [
        useTheme
    ];
});
_c1 = SettingsModal;
function Dashboard() {
    _s3();
    var _s = __turbopack_context__.k.signature();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["auth"].currentUser);
    const [paddleLoaded, setPaddleLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [billingCycle, setBillingCycle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('month');
    const [prices, setPrices] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [isSettingsOpen, setIsSettingsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [checkoutStatus, setCheckoutStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [subscription, setSubscription] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [transactions, setTransactions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [subscriptionDetails, setSubscriptionDetails] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Dashboard.useEffect": ()=>{
            const unsubscribe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm2017$2f$index$2d$8bd0c73f$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__z__as__onAuthStateChanged$3e$__["onAuthStateChanged"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["auth"], {
                "Dashboard.useEffect.unsubscribe": async (currentUser)=>{
                    if (!currentUser) {
                        router.replace('/login');
                        return;
                    }
                    setUser(currentUser);
                    const userId = currentUser.uid;
                    // Fetch subscription status directly
                    fetchSubscriptionData(userId);
                    // Wait for Paddle to be ready, then fetch prices
                    if (paddleLoaded) {
                        updatePrices();
                    }
                }
            }["Dashboard.useEffect.unsubscribe"]);
            // Log Paddle configuration for debugging
            console.log('Paddle Config:', {
                clientToken: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$paddle$2d$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PADDLE_CONFIG"].clientToken ? `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$paddle$2d$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PADDLE_CONFIG"].clientToken.substring(0, 5)}...` : 'missing',
                sellerId: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$paddle$2d$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PADDLE_CONFIG"].sellerId,
                standardMonthPrice: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$paddle$2d$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PADDLE_CONFIG"].prices.standard.month,
                premiumMonthPrice: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$paddle$2d$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PADDLE_CONFIG"].prices.premium.month
            });
            return ({
                "Dashboard.useEffect": ()=>unsubscribe()
            })["Dashboard.useEffect"];
        }
    }["Dashboard.useEffect"], [
        paddleLoaded,
        router
    ]);
    const updatePrices = async ()=>{
        if (!paddleLoaded) {
            console.error('Paddle is not loaded yet');
            return;
        }
        try {
            const request = {
                items: [
                    {
                        quantity: 1,
                        priceId: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$paddle$2d$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PADDLE_CONFIG"].prices.standard[billingCycle]
                    },
                    {
                        quantity: 1,
                        priceId: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$paddle$2d$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PADDLE_CONFIG"].prices.premium[billingCycle]
                    }
                ]
            };
            const result = await window.Paddle.PricePreview(request);
            const newPrices = {};
            result.data.details.lineItems.forEach((item)=>{
                if (item.price.id === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$paddle$2d$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PADDLE_CONFIG"].prices.standard[billingCycle]) {
                    newPrices.standard = item.formattedTotals.subtotal;
                } else if (item.price.id === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$paddle$2d$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PADDLE_CONFIG"].prices.premium[billingCycle]) {
                    newPrices.premium = item.formattedTotals.subtotal;
                }
            });
            setPrices(newPrices);
        } catch (error) {
            console.error('Error fetching prices:', error);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Dashboard.useEffect": ()=>{
            if (paddleLoaded) {
                updatePrices();
                // Debug check - print environment variables
                console.log('Environment Price IDs:', {
                    standardMonth: ("TURBOPACK compile-time value", "pri_01jv178w9jst683rgyjb6w18qx"),
                    standardYear: ("TURBOPACK compile-time value", "pri_01jv17anj5xnsta6hvv209sdyq"),
                    premiumMonth: ("TURBOPACK compile-time value", "pri_01jv17e3xm8mdsd22866ce8417"),
                    premiumYear: ("TURBOPACK compile-time value", "pri_01jv17f8370m2vyvspr2btg84s")
                });
                console.log('Paddle Config Price IDs:', __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$paddle$2d$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PADDLE_CONFIG"].prices);
            }
        }
    }["Dashboard.useEffect"], [
        paddleLoaded,
        billingCycle
    ]);
    const handleSubscription = (plan)=>{
        if (!paddleLoaded) {
            console.error('Paddle is not loaded yet');
            setCheckoutStatus('Error: Paddle is not loaded yet. Please refresh the page.');
            return;
        }
        // Set checkout status to show loading
        setCheckoutStatus('Opening checkout...');
        // Get price ID from config
        const priceId = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$paddle$2d$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PADDLE_CONFIG"].prices[plan][billingCycle];
        // Hardcoded fallback price ID for testing (Paddle sandbox test product)
        const fallbackPriceId = 'pri_01h8xz97pj0000000000000000';
        console.log(`Starting checkout for plan: ${plan}, cycle: ${billingCycle}`);
        console.log(`Using price ID: ${priceId} (fallback available: ${fallbackPriceId})`);
        console.log('User data:', {
            email: user?.email,
            uid: user?.uid
        });
        try {
            // Display debug info in console
            console.log('Paddle Config:', {
                clientToken: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$paddle$2d$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PADDLE_CONFIG"].clientToken ? `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$paddle$2d$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PADDLE_CONFIG"].clientToken.substring(0, 5)}...` : 'missing',
                sellerId: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$paddle$2d$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PADDLE_CONFIG"].sellerId,
                priceId: priceId
            });
            window.Paddle.Checkout.open({
                items: [
                    {
                        priceId: priceId,
                        quantity: 1
                    }
                ],
                settings: {
                    displayMode: 'overlay',
                    theme: 'light',
                    locale: 'en'
                },
                customer: {
                    email: user?.email || ''
                },
                customData: {
                    userId: user?.uid || ''
                },
                successCallback: (data)=>{
                    console.log('Checkout success callback triggered', data);
                    setCheckoutStatus('Processing your subscription...');
                },
                closeCallback: (data)=>{
                    console.log('Checkout closed', data);
                    // Only clear the message if user manually closes the checkout
                    setCheckoutStatus(null);
                },
                errorCallback: (error)=>{
                    console.error('Checkout error:', error);
                    // If we got a "product not found" error, try with the fallback price ID
                    if (error && (error.code === 'product_not_found' || error.message?.includes('product not found'))) {
                        console.log('Trying checkout with fallback price ID...');
                        // Try with fallback price ID
                        setTimeout(()=>{
                            try {
                                window.Paddle.Checkout.open({
                                    items: [
                                        {
                                            priceId: fallbackPriceId,
                                            quantity: 1
                                        }
                                    ],
                                    settings: {
                                        displayMode: 'overlay',
                                        theme: 'light',
                                        locale: 'en'
                                    },
                                    customer: {
                                        email: user?.email || ''
                                    },
                                    customData: {
                                        userId: user?.uid || ''
                                    }
                                });
                            } catch (fallbackError) {
                                console.error('Error with fallback price ID:', fallbackError);
                                setCheckoutStatus(`Error with fallback price ID: ${fallbackError instanceof Error ? fallbackError.message : 'Unknown error'}`);
                            }
                        }, 1000);
                    } else {
                        setCheckoutStatus(`Error during checkout: ${error.message || error.reason || 'Unknown error'}`);
                    }
                }
            });
        } catch (error) {
            console.error('Error opening Paddle checkout:', error);
            setCheckoutStatus(`Failed to open checkout: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    };
    const testFirebaseWrite = async ()=>{
        try {
            const auth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm2017$2f$index$2d$8bd0c73f$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__p__as__getAuth$3e$__["getAuth"])();
            const user = auth.currentUser;
            if (!user) {
                console.log('No user logged in');
                return;
            }
            console.log('Current user UID:', user.uid);
            const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFirestore"])();
            const testRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(db, 'users', user.uid, 'tests', new Date().toISOString());
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDoc"])(testRef, {
                timestamp: new Date(),
                testData: 'Test write to Firebase',
                userId: user.uid
            });
            console.log('Test data written successfully');
        } catch (error) {
            console.error('Error writing test data:', error);
        }
    };
    const handlePaddleEvent = async (event)=>{
        console.log('Paddle event:', event);
        // Only process events that have a valid subscription ID - not just checkout completion
        if (event.name === 'subscription.created' && user) {
            try {
                const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFirestore"])();
                const transactionsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(db, 'users', user.uid, 'transactions');
                console.log('Full Paddle subscription.created payload:', JSON.stringify(event, null, 2));
                const item = event.data.items?.[0];
                const subscriptionId = event.data.id;
                // Ensure we have a valid subscription ID
                if (!subscriptionId) {
                    console.log('No valid subscription ID in event, not saving to Firebase');
                    return;
                }
                const transactionData = {
                    userId: user.uid,
                    subscriptionId: subscriptionId,
                    product: {
                        id: item?.product?.id ?? '',
                        name: item?.product?.name ?? ''
                    },
                    amountPaid: item?.totals?.total ?? 0,
                    currency: item?.price?.unit_price?.currency_code ?? 'USD',
                    paymentStatus: event.data.status ?? 'active',
                    customerEmail: event.data.customer?.email ?? user.email ?? '',
                    customerId: event.data.customer?.id ?? '',
                    nextBillDate: event.data.next_billed_at ? new Date(event.data.next_billed_at) : null,
                    startDate: event.data.started_at ? new Date(event.data.started_at) : null,
                    quantity: item?.quantity ?? 1,
                    timestamp: new Date()
                };
                console.log('Subscription transaction data:', transactionData);
                // Save transaction with the subscription ID as the document ID.
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(transactionsRef, subscriptionId), transactionData);
                console.log('Subscription saved to Firebase');
                // Update user's subscription status
                const userRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(db, 'users', user.uid);
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDoc"])(userRef, {
                    hasActiveSubscription: true,
                    lastTransactionDate: new Date(),
                    currentPlan: transactionData.product.id,
                    subscriptionStatus: 'active',
                    currentSubscriptionId: subscriptionId
                }, {
                    merge: true
                });
            } catch (error) {
                console.error('Error saving subscription data:', error);
                console.error('Event data:', event);
            }
        } else if (event.name === 'checkout.completed') {
            // Just log the checkout completion without saving to Firebase
            console.log('Checkout completed. Waiting for subscription.created event.');
        }
    };
    const fetchSubscriptionStatus = async (userId)=>{
        try {
            const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFirestore"])();
            const userRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(db, 'users', userId);
            const userDoc = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDoc"])(userRef);
            if (userDoc.exists()) {
                const userData = userDoc.data();
                const subscriptionData = {
                    hasActive: userData.hasActiveSubscription || false,
                    plan: userData.currentPlan || null,
                    status: userData.subscriptionStatus || 'inactive',
                    lastTransaction: userData.lastTransactionDate?.toDate() || null,
                    product: userData.product || null,
                    customerId: userData.paddleCustomerId || null,
                    subscriptionId: userData.currentSubscriptionId || null,
                    nextBillDate: userData.nextBillDate?.toDate() || null,
                    canceledAt: userData.subscriptionCanceledAt?.toDate() || null,
                    scheduled_change: userData.scheduled_change || null,
                    cancellationEffectiveDate: userData.cancellationEffectiveDate?.toDate() || null
                };
                console.log('Fetched subscription status:', subscriptionData);
                setSubscription(subscriptionData);
            }
        } catch (error) {
            console.error('Error fetching subscription:', error);
        }
    };
    const fetchTransactionLogs = async (userId)=>{
        try {
            const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFirestore"])();
            const transactionsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(db, 'users', userId, 'transactions');
            // Order by timestamp in descending order and limit to 1
            const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])(transactionsRef, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orderBy"])('timestamp', 'desc'), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["limit"])(1));
            const transactionsSnap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])(q);
            const logs = transactionsSnap.docs.map((doc)=>{
                const data = doc.data();
                // Check for rawData field which might contain the scheduled_change
                if (data.rawData) {
                    // The rawData might be stored as a string in some cases
                    let rawDataObj = data.rawData;
                    if (typeof rawDataObj === 'string') {
                        try {
                            rawDataObj = JSON.parse(rawDataObj);
                        } catch (e) {
                            console.error('Failed to parse rawData string:', e);
                        }
                    }
                    // Check for scheduled_change in rawData
                    if (rawDataObj.scheduled_change) {
                        // Update the subscription state with the scheduled change data
                        if (subscription && data.subscriptionId === subscription.subscriptionId) {
                            setSubscription((prev)=>{
                                const updatedSubscription = {
                                    ...prev,
                                    scheduled_change: rawDataObj.scheduled_change
                                };
                                return updatedSubscription;
                            });
                        }
                    }
                }
                // Check if there's a direct scheduled_change
                if (data.scheduled_change) {
                    // Update the subscription state with the scheduled change data
                    if (subscription && data.subscriptionId === subscription.subscriptionId) {
                        setSubscription((prev)=>{
                            const updatedSubscription = {
                                ...prev,
                                scheduled_change: data.scheduled_change
                            };
                            return updatedSubscription;
                        });
                    }
                }
                return {
                    id: doc.id,
                    ...data,
                    planDetails: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$paddle$2d$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["identifyPlan"])(data.product?.id)
                };
            });
            setTransactions(logs);
            // Now, check subscription collections for the latest state
            if (subscription?.subscriptionId) {
                const subscriptionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(db, 'users', userId, 'subscriptions', subscription.subscriptionId);
                const subscriptionDoc = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDoc"])(subscriptionRef);
                if (subscriptionDoc.exists()) {
                    const subscriptionData = subscriptionDoc.data();
                    // Check for rawData field in the subscription document
                    if (subscriptionData.rawData) {
                        let rawDataObj = subscriptionData.rawData;
                        if (typeof rawDataObj === 'string') {
                            try {
                                rawDataObj = JSON.parse(rawDataObj);
                            } catch (e) {
                                console.error('Failed to parse subscription rawData string:', e);
                            }
                        }
                        if (rawDataObj.scheduled_change) {
                            setSubscription((prev)=>{
                                const updatedSubscription = {
                                    ...prev,
                                    scheduled_change: rawDataObj.scheduled_change
                                };
                                return updatedSubscription;
                            });
                        }
                    }
                    // Update the subscription state with any cancellation data
                    if (subscriptionData.scheduled_change || subscriptionData.cancellationEffectiveDate) {
                        setSubscription((prev)=>{
                            const updatedSubscription = {
                                ...prev,
                                scheduled_change: subscriptionData.scheduled_change || prev?.scheduled_change,
                                cancellationEffectiveDate: subscriptionData.cancellationEffectiveDate?.toDate() || prev?.cancellationEffectiveDate
                            };
                            return updatedSubscription;
                        });
                    }
                }
            }
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };
    const fetchSubscriptionDetails = async (userId, subscriptionId)=>{
        try {
            const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFirestore"])();
            // Check in transactions collection
            const transactionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(db, 'users', userId, 'transactions', subscriptionId);
            const transactionDoc = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDoc"])(transactionRef);
            if (transactionDoc.exists()) {
                const data = transactionDoc.data();
                console.log("Direct transaction data fetch:", data);
                // If this transaction has rawData with scheduled_change, update subscription
                if (data.rawData?.scheduled_change || data.scheduled_change) {
                    const scheduled_change = data.rawData?.scheduled_change || data.scheduled_change;
                    console.log("Found scheduled_change in transaction:", scheduled_change);
                    setSubscription((prev)=>{
                        const updatedSubscription = {
                            ...prev,
                            scheduled_change: scheduled_change
                        };
                        console.log('Updated subscription with direct scheduled_change:', updatedSubscription);
                        return updatedSubscription;
                    });
                    return;
                }
            }
            // Also check subscriptions collection
            const subscriptionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(db, 'users', userId, 'subscriptions', subscriptionId);
            const subscriptionDoc = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDoc"])(subscriptionRef);
            if (subscriptionDoc.exists()) {
                const data = subscriptionDoc.data();
                console.log("Direct subscription data fetch:", data);
                if (data.scheduled_change || data.cancellationEffectiveDate) {
                    setSubscription((prev)=>{
                        const updatedSubscription = {
                            ...prev,
                            scheduled_change: data.scheduled_change || prev?.scheduled_change,
                            cancellationEffectiveDate: data.cancellationEffectiveDate?.toDate() || prev?.cancellationEffectiveDate
                        };
                        console.log('Updated subscription with direct subscription data:', updatedSubscription);
                        return updatedSubscription;
                    });
                }
            }
        } catch (error) {
            console.error("Error fetching subscription details:", error);
        }
    };
    const fetchSubscriptionData = async (userId)=>{
        try {
            const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFirestore"])();
            // If we have a subscription ID, fetch it directly
            if (subscription?.subscriptionId) {
                const subscriptionsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(db, 'users', userId, 'subscriptions', subscription.subscriptionId);
                const subscriptionDoc = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDoc"])(subscriptionsRef);
                if (subscriptionDoc.exists()) {
                    const data = subscriptionDoc.data();
                    // Format price data if it exists in different formats
                    let formattedData = {
                        ...data,
                        id: subscriptionDoc.id
                    };
                    // Check for different price formats and normalize them
                    if (data.items?.[0]?.price?.unit_price) {
                        formattedData.priceAmount = data.items[0].price.unit_price.amount;
                        formattedData.priceCurrency = data.items[0].price.unit_price.currency_code;
                    } else if (data.price) {
                        if (typeof data.price === 'object') {
                            formattedData.priceAmount = data.price.amount;
                            formattedData.priceCurrency = data.price.currency;
                        } else if (typeof data.price === 'string') {
                            formattedData.formattedPrice = data.price;
                        } else if (typeof data.price === 'number') {
                            formattedData.priceAmount = data.price;
                            formattedData.priceCurrency = data.currency || 'USD';
                        }
                    } else if (data.amount) {
                        formattedData.priceAmount = data.amount;
                        formattedData.priceCurrency = data.currency || 'USD';
                    }
                    // Also check if there are specific billing details
                    if (data.billing_details || data.billingDetails) {
                        const billingDetails = data.billing_details || data.billingDetails;
                        if (billingDetails.amount || billingDetails.total) {
                            formattedData.priceAmount = billingDetails.amount || billingDetails.total;
                            formattedData.priceCurrency = billingDetails.currency || 'USD';
                        }
                    }
                    setSubscriptionDetails(formattedData);
                    return;
                }
            }
            // If no specific subscription ID or it wasn't found, find the most recent active subscription
            const subscriptionsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(db, 'users', userId, 'subscriptions');
            const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])(subscriptionsRef, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["where"])('status', '==', 'active'), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orderBy"])('createdAt', 'desc'), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["limit"])(1));
            const subscriptionsSnap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])(q);
            if (!subscriptionsSnap.empty) {
                const data = subscriptionsSnap.docs[0].data();
                // Format price data if it exists in different formats
                let formattedData = {
                    ...data,
                    id: subscriptionsSnap.docs[0].id
                };
                // Check for different price formats and normalize them
                if (data.items?.[0]?.price?.unit_price) {
                    formattedData.priceAmount = data.items[0].price.unit_price.amount;
                    formattedData.priceCurrency = data.items[0].price.unit_price.currency_code;
                } else if (data.price) {
                    if (typeof data.price === 'object') {
                        formattedData.priceAmount = data.price.amount;
                        formattedData.priceCurrency = data.price.currency;
                    } else if (typeof data.price === 'string') {
                        formattedData.formattedPrice = data.price;
                    } else if (typeof data.price === 'number') {
                        formattedData.priceAmount = data.price;
                        formattedData.priceCurrency = data.currency || 'USD';
                    }
                } else if (data.amount) {
                    formattedData.priceAmount = data.amount;
                    formattedData.priceCurrency = data.currency || 'USD';
                }
                // Also check if there are specific billing details
                if (data.billing_details || data.billingDetails) {
                    const billingDetails = data.billing_details || data.billingDetails;
                    if (billingDetails.amount || billingDetails.total) {
                        formattedData.priceAmount = billingDetails.amount || billingDetails.total;
                        formattedData.priceCurrency = billingDetails.currency || 'USD';
                    }
                }
                setSubscriptionDetails(formattedData);
            }
        } catch (error) {
            console.error('Error fetching subscription data:', error);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Dashboard.useEffect": ()=>{
            if (user?.uid) {
                // Define an async function to load all data in sequence
                const loadAllData = {
                    "Dashboard.useEffect.loadAllData": async ()=>{
                        try {
                            // Step 1: Get basic subscription info
                            await fetchSubscriptionStatus(user.uid);
                            // Step 2: Get subscription data from the subscriptions collection
                            await fetchSubscriptionData(user.uid);
                            // Step 3: Get transaction data that might have scheduled_change
                            await fetchTransactionLogs(user.uid);
                            // Step 3a: Check the user document directly for a scheduled_change
                            const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFirestore"])();
                            const userRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(db, 'users', user.uid);
                            const userDoc = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDoc"])(userRef);
                            if (userDoc.exists()) {
                                const userData = userDoc.data();
                                // Look for scheduled_change directly on the user document
                                if (userData.scheduled_change) {
                                    setSubscription({
                                        "Dashboard.useEffect.loadAllData": (prev)=>{
                                            if (!prev) return prev;
                                            return {
                                                ...prev,
                                                scheduled_change: userData.scheduled_change
                                            };
                                        }
                                    }["Dashboard.useEffect.loadAllData"]);
                                }
                                // Also check rawData if it exists
                                if (userData.rawData) {
                                    let rawDataObj = userData.rawData;
                                    if (typeof rawDataObj === 'string') {
                                        try {
                                            rawDataObj = JSON.parse(rawDataObj);
                                        } catch (e) {
                                            console.error('Failed to parse user rawData');
                                        }
                                    }
                                    if (rawDataObj?.scheduled_change) {
                                        setSubscription({
                                            "Dashboard.useEffect.loadAllData": (prev)=>{
                                                if (!prev) return prev;
                                                return {
                                                    ...prev,
                                                    scheduled_change: rawDataObj.scheduled_change
                                                };
                                            }
                                        }["Dashboard.useEffect.loadAllData"]);
                                    }
                                }
                            }
                            // Step 3b: Check subscriptions collection if we have a subscription ID
                            if (subscription?.subscriptionId) {
                                const subscriptionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(db, 'users', user.uid, 'subscriptions', subscription.subscriptionId);
                                const subscriptionDoc = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDoc"])(subscriptionRef);
                                if (subscriptionDoc.exists()) {
                                    const subscriptionData = subscriptionDoc.data();
                                    // Direct check for scheduled_change
                                    if (subscriptionData.scheduled_change) {
                                        setSubscription({
                                            "Dashboard.useEffect.loadAllData": (prev)=>{
                                                if (!prev) return prev;
                                                return {
                                                    ...prev,
                                                    scheduled_change: subscriptionData.scheduled_change
                                                };
                                            }
                                        }["Dashboard.useEffect.loadAllData"]);
                                    }
                                    // Check in rawData
                                    if (subscriptionData.rawData) {
                                        let rawDataObj = subscriptionData.rawData;
                                        if (typeof rawDataObj === 'string') {
                                            try {
                                                rawDataObj = JSON.parse(rawDataObj);
                                            } catch (e) {
                                                console.error('Failed to parse subscription rawData');
                                            }
                                        }
                                        if (rawDataObj?.scheduled_change) {
                                            setSubscription({
                                                "Dashboard.useEffect.loadAllData": (prev)=>{
                                                    if (!prev) return prev;
                                                    return {
                                                        ...prev,
                                                        scheduled_change: rawDataObj.scheduled_change
                                                    };
                                                }
                                            }["Dashboard.useEffect.loadAllData"]);
                                        }
                                    }
                                }
                            }
                            // Step 3c: Directly query transactions with this user's ID to find scheduled changes
                            const transactionsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(db, 'users', user.uid, 'transactions');
                            const transactionsSnap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])(transactionsRef);
                            // Process each transaction looking for scheduled_change
                            for (const doc of transactionsSnap.docs){
                                const data = doc.data();
                                // Check each potential location for scheduled_change data
                                let scheduled_change = null;
                                // Check in rawData
                                if (data.rawData) {
                                    let rawDataObj = data.rawData;
                                    if (typeof rawDataObj === 'string') {
                                        try {
                                            rawDataObj = JSON.parse(rawDataObj);
                                        } catch (e) {
                                            console.error('Failed to parse rawData');
                                        }
                                    }
                                    if (rawDataObj?.scheduled_change) {
                                        scheduled_change = rawDataObj.scheduled_change;
                                    }
                                }
                                // Check direct scheduled_change
                                if (data.scheduled_change) {
                                    scheduled_change = data.scheduled_change;
                                }
                                // If we found scheduled_change data, update subscription state
                                if (scheduled_change) {
                                    setSubscription({
                                        "Dashboard.useEffect.loadAllData": (prev)=>{
                                            if (!prev) return prev;
                                            return {
                                                ...prev,
                                                scheduled_change: scheduled_change
                                            };
                                        }
                                    }["Dashboard.useEffect.loadAllData"]);
                                    break; // Stop processing once we find valid data
                                }
                            }
                        } catch (error) {
                            console.error('Error loading subscription data:', error);
                        }
                    }
                }["Dashboard.useEffect.loadAllData"];
                // Execute the function
                loadAllData();
            }
        }
    }["Dashboard.useEffect"], [
        user,
        subscription?.subscriptionId
    ]);
    // Remove the separate effects that were causing race conditions
    // Instead, load all data in sequence in the single effect above
    const extractScheduledChangeFromRawData = (data)=>{
        try {
            console.log("Attempting to extract scheduled_change from raw data:", data);
            // Handle the nested rawData structure from the example - might be a string or object
            if (data.rawData) {
                let rawDataObj = data.rawData;
                if (typeof rawDataObj === 'string') {
                    try {
                        rawDataObj = JSON.parse(rawDataObj);
                    } catch (e) {
                        console.error('Failed to parse rawData string:', e);
                    }
                }
                if (rawDataObj.scheduled_change) {
                    return rawDataObj.scheduled_change;
                }
            }
            // Handle direct scheduled_change property
            if (data.scheduled_change) {
                return data.scheduled_change;
            }
            // Handle when data itself is the raw structure (like in the example)
            if (data.status && data.action === 'cancel' && data.effective_at) {
                return {
                    action: data.action,
                    effective_at: data.effective_at,
                    resume_at: data.resume_at
                };
            }
            return null;
        } catch (error) {
            console.error("Error extracting scheduled_change:", error);
            return null;
        }
    };
    const syncRawDataToSubscription = (rawData)=>{
        try {
            console.log("Attempting to sync raw data to subscription:", rawData);
            if (!rawData) return;
            // Look for scheduled_change in various places
            const scheduled_change = extractScheduledChangeFromRawData(rawData);
            if (scheduled_change) {
                console.log("Found scheduled_change in raw data:", scheduled_change);
                setSubscription((prev)=>{
                    const updatedSubscription = {
                        ...prev,
                        scheduled_change: scheduled_change
                    };
                    console.log('Updated subscription with raw data scheduled_change:', updatedSubscription);
                    return updatedSubscription;
                });
            }
        } catch (error) {
            console.error("Error syncing raw data:", error);
        }
    };
    // Add a button to test with the exact provided example structure
    const testWithProvidedExample = ()=>{
        const exampleData = {
            amount: 1599,
            billingCycle: {
                frequency: 1,
                interval: "month"
            },
            canceledAt: null,
            createdAt: new Date("2025-04-21T07:06:00.951Z"),
            currency: "USD",
            currentPeriod: {
                end: new Date("2025-05-21T07:06:00.292545Z"),
                start: new Date("2025-04-21T07:06:00.292545Z")
            },
            customData: {
                userId: "FE0qnQDim5Thj6wXey4oGdKN7hy1"
            },
            customerId: "ctm_01jrhz1tf0r5wx62mx6cby456r",
            nextBillDate: null,
            pausedAt: null,
            planId: "pro_01jrcyajvbkf83y5ycbnr055hf",
            planName: "monthlyPremium",
            priceId: "pri_01jrcyb5gnfxn2s012n83a2gcf",
            rawData: {
                address_id: "add_01jsbjn5nr0mbc0kaxgmpmdagj",
                billing_cycle: {
                    frequency: 1,
                    interval: "month"
                },
                billing_details: null,
                business_id: null,
                canceled_at: null,
                collection_mode: "automatic",
                created_at: "2025-04-21T07:06:00.951Z",
                currency_code: "USD",
                current_billing_period: {
                    ends_at: "2025-05-21T07:06:00.292545Z",
                    starts_at: "2025-04-21T07:06:00.292545Z"
                },
                custom_data: {
                    userId: "FE0qnQDim5Thj6wXey4oGdKN7hy1"
                },
                customer_id: "ctm_01jrhz1tf0r5wx62mx6cby456r",
                discount: null,
                first_billed_at: "2025-04-21T07:06:00.292545Z",
                id: "sub_01jsbjp2vqp0ends3ytwb0paej",
                import_meta: null,
                items: [
                    {
                    }
                ],
                next_billed_at: null,
                paused_at: null,
                scheduled_change: {
                    action: "cancel",
                    effective_at: "2025-05-21T07:06:00.292545Z",
                    resume_at: null
                },
                started_at: "2025-04-21T07:06:00.292545Z",
                status: "active",
                transaction_id: "txn_01jsbjn4a16qagqf32vq4jzwwm",
                updated_at: "2025-04-21T07:07:22.738Z"
            },
            startDate: new Date("2025-04-21T07:06:00.292545Z"),
            status: "active",
            subscriptionId: "sub_01jsbjp2vqp0ends3ytwb0paej",
            updatedAt: new Date("2025-04-21T07:07:24.000Z"),
            userId: "FE0qnQDim5Thj6wXey4oGdKN7hy1"
        };
        syncRawDataToSubscription(exampleData);
        // Also update the entire subscription object
        setSubscription((prev)=>{
            return {
                ...prev,
                hasActive: true,
                status: "active",
                subscriptionId: exampleData.subscriptionId
            };
        });
    };
    // Handle checkout success
    const handleCheckoutSuccess = (subscriptionData)=>{
        console.log('Checkout completed successfully:', subscriptionData);
        setCheckoutStatus('Subscription checkout completed! Updating your subscription status...');
        // Try to update subscription data immediately
        if (user?.uid) {
            // First attempt to update using the provided subscription data
            if (subscriptionData?.subscriptionId && subscriptionData.subscriptionId !== 'pending') {
                try {
                    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFirestore"])();
                    const userRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(db, 'users', user.uid);
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDoc"])(userRef, {
                        hasActiveSubscription: true,
                        lastTransactionDate: new Date(),
                        currentPlan: subscriptionData.planId || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$paddle$2d$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PADDLE_CONFIG"].prices.standard.month,
                        subscriptionStatus: 'active',
                        currentSubscriptionId: subscriptionData.subscriptionId,
                        paddleCustomerId: subscriptionData.customerId,
                        lastUpdated: new Date()
                    }, {
                        merge: true
                    }).then(()=>{
                        console.log('Successfully updated user subscription from checkout data');
                        // Refresh subscription data
                        fetchSubscriptionStatus(user.uid);
                        fetchTransactionLogs(user.uid);
                    }).catch((error)=>{
                        console.error('Error updating subscription from checkout data:', error);
                        // If direct update fails, try the manual update as a fallback
                        setTimeout(()=>manualCheckSubscriptionStatus(), 2000);
                    });
                } catch (error) {
                    console.error('Error in immediate subscription update:', error);
                    // If there's an error, try the manual update as a fallback
                    setTimeout(()=>manualCheckSubscriptionStatus(), 2000);
                }
            } else {
                // If we don't have subscription data yet, poll for updates or try manual update
                console.log('No subscription ID received yet, polling for updates...');
                // Wait a few seconds and then check for subscription updates
                setTimeout(()=>{
                    fetchSubscriptionStatus(user.uid);
                    fetchTransactionLogs(user.uid);
                    // If still no active subscription after a short delay, offer manual update
                    setTimeout(()=>{
                        if (!subscription?.hasActive) {
                            setCheckoutStatus('Checkout completed, but subscription status not updated automatically. You can try updating manually.');
                        }
                    }, 5000);
                }, 3000);
            }
        }
    };
    // Handle checkout error
    const handleCheckoutError = (error)=>{
        console.error('Error during checkout:', error);
        setCheckoutStatus('There was an error processing your subscription. Please try again or contact support.');
    };
    // Manually check and update subscription status
    const manualCheckSubscriptionStatus = async ()=>{
        if (!user) {
            console.error('No logged in user');
            return;
        }
        try {
            setCheckoutStatus('Manually checking subscription status...');
            // 1. First verify we can write to Firebase
            const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFirestore"])();
            const testRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(db, 'users', user.uid, 'tests', 'manual-check');
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDoc"])(testRef, {
                timestamp: new Date(),
                operation: 'manual-check'
            });
            console.log('Firebase test write successful');
            // 2. Update user profile with a fake subscription for testing
            const userRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(db, 'users', user.uid);
            // Generate fake customer ID if needed - could be email or email+timestamp
            const paddleCustomerId = user.email || `user-${new Date().getTime()}@example.com`;
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDoc"])(userRef, {
                hasActiveSubscription: true,
                lastTransactionDate: new Date(),
                currentPlan: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$paddle$2d$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PADDLE_CONFIG"].prices.standard.month,
                subscriptionStatus: 'active',
                currentSubscriptionId: 'manual-' + new Date().getTime(),
                paddleCustomerId: paddleCustomerId,
                lastUpdated: new Date()
            }, {
                merge: true
            });
            console.log('Manually updated subscription status with customer ID:', paddleCustomerId);
            setCheckoutStatus('Subscription status manually updated. Refreshing data...');
            // 3. Now fetch the updated subscription data
            await fetchSubscriptionStatus(user.uid);
            // 4. Clear status after a moment
            setTimeout(()=>{
                setCheckoutStatus(null);
            }, 3000);
        } catch (error) {
            console.error('Error in manual subscription update:', error);
            setCheckoutStatus('Error updating subscription: ' + (error instanceof Error ? error.message : 'Unknown error'));
        }
    };
    // Add this function after the manualCheckSubscriptionStatus function, before formatPrice
    const openCustomerPortal = async ()=>{
        console.log('Opening customer portal with subscription data:', subscription);
        if (!user) {
            setCheckoutStatus('No logged in user found');
            return;
        }
        try {
            setCheckoutStatus('Opening customer portal...');
            // Log customer info for debugging
            console.log('Customer info for portal:', {
                email: user.email,
                customerId: subscription?.customerId
            });
            // Use the specific CPL ID for the customer portal
            const portalUrl = 'https://sandbox-customer-portal.paddle.com/cpl_01jtqjeq79c64enc8qy3cs3zrm';
            console.log('Using portal URL:', portalUrl);
            // Open in new tab
            window.open(portalUrl, '_blank');
            // Clear status after a moment
            setTimeout(()=>{
                setCheckoutStatus(null);
            }, 3000);
        } catch (error) {
            console.error('Error opening customer portal:', error);
            setCheckoutStatus('Error opening customer portal: ' + (error instanceof Error ? error.message : 'Unknown error'));
        }
    };
    const formatPrice = (amount, currency = 'USD')=>{
        // If it's already a string with formatting, return it
        if (typeof amount === 'string' && amount.includes('.')) {
            return amount;
        }
        // Convert to number if it's a string
        const numericAmount = typeof amount === 'string' ? parseInt(amount, 10) : amount;
        // Format with decimal places - assuming amount is in cents/lowest denomination
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(numericAmount / 100);
    };
    // Helper function to safely format dates from Firestore Timestamps or Date objects
    const formatDate = (date)=>{
        if (!date) return 'N/A';
        if (date instanceof Date) {
            return date.toLocaleDateString();
        }
        // Handle Firestore Timestamp
        if (typeof date === 'object' && 'seconds' in date) {
            return new Date(date.seconds * 1000).toLocaleDateString();
        }
        // Handle ISO date strings
        if (typeof date === 'string') {
            return new Date(date).toLocaleDateString();
        }
        return 'N/A';
    };
    const DashboardContent = ()=>{
        _s();
        const { theme } = useTheme();
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `min-h-screen ${theme === 'dark' ? 'dark bg-slate-900' : 'bg-gradient-to-br from-slate-50 to-slate-100'}`,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$script$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    src: "https://cdn.paddle.com/paddle/v2/paddle.js",
                    onLoad: ()=>{
                        if ("object" !== 'undefined' && window.Paddle) {
                            try {
                                // Use sandbox in development mode
                                console.log('Setting Paddle environment to sandbox');
                                window.Paddle.Environment.set('sandbox');
                                console.log('Setting up Paddle with token:', __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$paddle$2d$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PADDLE_CONFIG"].clientToken ? `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$paddle$2d$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PADDLE_CONFIG"].clientToken.substring(0, 5)}...` : 'missing');
                                window.Paddle.Setup({
                                    token: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$paddle$2d$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PADDLE_CONFIG"].clientToken,
                                    eventCallback: handlePaddleEvent
                                });
                                console.log('Paddle initialized successfully');
                                setPaddleLoaded(true);
                            } catch (error) {
                                console.error('Error initializing Paddle:', error);
                            }
                        } else {
                            console.error('Paddle not available on window object');
                        }
                    },
                    onError: ()=>{
                        console.error('Failed to load Paddle script');
                    }
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/page.jsx",
                    lineNumber: 1256,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$PaddleCheckoutHandler$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    onSuccess: handleCheckoutSuccess,
                    onError: handleCheckoutError
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/page.jsx",
                    lineNumber: 1288,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                    className: "bg-white/80 dark:bg-slate-800/80 backdrop-blur-md sticky top-0 z-30 border-b border-slate-200/80 dark:border-slate-700/80",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between items-center h-16",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center space-x-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            src: "/paFire_logo.png",
                                            alt: "paFire Logo",
                                            width: 32,
                                            height: 32
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                            lineNumber: 1298,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent",
                                            children: "Dashboard"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                            lineNumber: 1304,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                    lineNumber: 1297,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center space-x-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setIsSettingsOpen(true),
                                            className: "p-2 rounded-full text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors",
                                            "aria-label": "Settings",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                xmlns: "http://www.w3.org/2000/svg",
                                                className: "h-5 w-5",
                                                viewBox: "0 0 20 20",
                                                fill: "currentColor",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    fillRule: "evenodd",
                                                    d: "M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z",
                                                    clipRule: "evenodd"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                    lineNumber: 1316,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/page.jsx",
                                                lineNumber: 1315,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                            lineNumber: 1310,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LogoutButton$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            className: "text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                            lineNumber: 1319,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                    lineNumber: 1308,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/page.jsx",
                            lineNumber: 1296,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/page.jsx",
                        lineNumber: 1295,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/page.jsx",
                    lineNumber: 1294,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                    className: "max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8",
                    children: [
                        checkoutStatus && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4 bg-green-50 border border-green-300 dark:bg-green-900/20 dark:border-green-700/40 text-green-800 dark:text-green-200 px-4 py-3 rounded-lg",
                            children: checkoutStatus
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/page.jsx",
                            lineNumber: 1328,
                            columnNumber: 13
                        }, this),
                        (!subscription || !subscription.hasActive) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4 bg-blue-50 border border-blue-300 dark:bg-blue-900/20 dark:border-blue-700/40 text-blue-800 dark:text-blue-200 px-4 py-3 rounded-lg",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mb-2",
                                    children: "If you've completed checkout but your subscription isn't showing:"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                    lineNumber: 1336,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: manualCheckSubscriptionStatus,
                                    className: "px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md",
                                    children: "Update Subscription Manually"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                    lineNumber: 1337,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/page.jsx",
                            lineNumber: 1335,
                            columnNumber: 13
                        }, this),
                        false && subscription && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4 bg-gray-100 border border-gray-300 p-4 rounded-md",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-sm font-semibold mb-2",
                                    children: "Debug Info:"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                    lineNumber: 1349,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-xs font-mono overflow-auto max-h-40",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mb-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "hasActive:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                    lineNumber: 1351,
                                                    columnNumber: 37
                                                }, this),
                                                " ",
                                                String(subscription?.hasActive)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                            lineNumber: 1351,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mb-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "status:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                    lineNumber: 1352,
                                                    columnNumber: 37
                                                }, this),
                                                " ",
                                                subscription?.status
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                            lineNumber: 1352,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mb-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "scheduled_change:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                    lineNumber: 1354,
                                                    columnNumber: 19
                                                }, this),
                                                " ",
                                                subscription?.scheduled_change ? JSON.stringify(subscription?.scheduled_change, null, 2) : 'null'
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                            lineNumber: 1353,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mb-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "Condition 1 - hasActive:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                    lineNumber: 1359,
                                                    columnNumber: 37
                                                }, this),
                                                " ",
                                                String(Boolean(subscription?.hasActive))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                            lineNumber: 1359,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mb-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "Condition 2 - has scheduled_change object:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                    lineNumber: 1360,
                                                    columnNumber: 37
                                                }, this),
                                                " ",
                                                String(Boolean(subscription?.scheduled_change))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                            lineNumber: 1360,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mb-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "Condition 3 - action is cancel:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                    lineNumber: 1361,
                                                    columnNumber: 37
                                                }, this),
                                                " ",
                                                String(Boolean(subscription?.scheduled_change?.action === "cancel"))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                            lineNumber: 1361,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mb-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "Condition 4 - has effective_at:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                    lineNumber: 1362,
                                                    columnNumber: 37
                                                }, this),
                                                " ",
                                                String(Boolean(subscription?.scheduled_change?.effective_at))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                            lineNumber: 1362,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mb-1 font-bold text-red-500",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "ALL CONDITIONS MET:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                    lineNumber: 1365,
                                                    columnNumber: 19
                                                }, this),
                                                " ",
                                                String(Boolean(subscription?.hasActive && subscription?.scheduled_change && subscription?.scheduled_change?.action === "cancel" && subscription?.scheduled_change?.effective_at))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                            lineNumber: 1364,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-2 mb-1 p-2 bg-amber-50 border-l-4 border-amber-400 text-amber-800",
                                            children: "Test banner - if you can see this, banners are rendering correctly"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                            lineNumber: 1374,
                                            columnNumber: 17
                                        }, this),
                                        subscription?.scheduled_change && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mb-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            children: "action:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                            lineNumber: 1380,
                                                            columnNumber: 41
                                                        }, this),
                                                        " ",
                                                        subscription?.scheduled_change?.action
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                    lineNumber: 1380,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mb-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            children: "effective_at:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                            lineNumber: 1381,
                                                            columnNumber: 41
                                                        }, this),
                                                        " ",
                                                        subscription?.scheduled_change?.effective_at
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                    lineNumber: 1381,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-4 flex flex-wrap gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "px-2 py-1 bg-blue-500 text-white text-xs rounded",
                                                    onClick: ()=>{
                                                        if (user?.uid) {
                                                            fetchSubscriptionStatus(user.uid);
                                                            fetchTransactionLogs(user.uid);
                                                            if (subscription?.subscriptionId) {
                                                                fetchSubscriptionDetails(user.uid, subscription.subscriptionId);
                                                            }
                                                        }
                                                    },
                                                    children: "Refresh Data"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                    lineNumber: 1386,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "px-2 py-1 bg-green-500 text-white text-xs rounded",
                                                    onClick: ()=>{
                                                        // Manually inject the example data structure for testing
                                                        setSubscription((prev)=>{
                                                            const testData = {
                                                                ...prev,
                                                                hasActive: true,
                                                                status: 'active',
                                                                scheduled_change: {
                                                                    action: 'cancel',
                                                                    effective_at: '2025-05-21T07:06:00.292545Z',
                                                                    resume_at: null
                                                                }
                                                            };
                                                            console.log('Manually set test data:', testData);
                                                            return testData;
                                                        });
                                                    },
                                                    children: "Test With Example Data"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                    lineNumber: 1402,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "px-2 py-1 bg-purple-500 text-white text-xs rounded",
                                                    onClick: testWithProvidedExample,
                                                    children: "Test With Full Example"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                    lineNumber: 1426,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                            lineNumber: 1385,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                    lineNumber: 1350,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/page.jsx",
                            lineNumber: 1348,
                            columnNumber: 13
                        }, this),
                        (()=>{
                            if (subscription && subscription.hasActive) {
                                if (subscription.scheduled_change && subscription.scheduled_change.action === "cancel" && subscription.scheduled_change.effective_at) {
                                    // Return the banner component for scheduled cancel
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-4 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-400 p-4 rounded-md shadow-sm",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    xmlns: "http://www.w3.org/2000/svg",
                                                    className: "h-5 w-5 text-amber-400 mr-2",
                                                    viewBox: "0 0 20 20",
                                                    fill: "currentColor",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        fillRule: "evenodd",
                                                        d: "M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z",
                                                        clipRule: "evenodd"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard/page.jsx",
                                                        lineNumber: 1449,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                    lineNumber: 1448,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-amber-800 dark:text-amber-200",
                                                    children: [
                                                        "This subscription is scheduled to be canceled on ",
                                                        subscription.scheduled_change?.effective_at ? formatDate(subscription.scheduled_change.effective_at) : 'soon',
                                                        "."
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                    lineNumber: 1451,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                            lineNumber: 1447,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/page.jsx",
                                        lineNumber: 1446,
                                        columnNumber: 19
                                    }, this);
                                }
                                // Backup check for cancellationEffectiveDate
                                if (subscription.cancellationEffectiveDate) {
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-4 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-400 p-4 rounded-md shadow-sm",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    xmlns: "http://www.w3.org/2000/svg",
                                                    className: "h-5 w-5 text-amber-400 mr-2",
                                                    viewBox: "0 0 20 20",
                                                    fill: "currentColor",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        fillRule: "evenodd",
                                                        d: "M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z",
                                                        clipRule: "evenodd"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard/page.jsx",
                                                        lineNumber: 1465,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                    lineNumber: 1464,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-amber-800 dark:text-amber-200",
                                                    children: [
                                                        "This subscription is scheduled to be canceled on ",
                                                        formatDate(subscription.cancellationEffectiveDate),
                                                        "."
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                    lineNumber: 1467,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                            lineNumber: 1463,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/page.jsx",
                                        lineNumber: 1462,
                                        columnNumber: 19
                                    }, this);
                                }
                            }
                            // No banner needed
                            return null;
                        })(),
                        subscription && subscription.hasActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-8 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 rounded-2xl shadow-md overflow-hidden",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-6 py-8 md:px-8 md:py-8 relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute top-0 right-0 w-64 h-64 -translate-y-24 translate-x-24 rounded-full bg-white/10 opacity-50"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/page.jsx",
                                        lineNumber: 1483,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute bottom-0 left-0 w-48 h-48 translate-y-20 -translate-x-16 rounded-full bg-white/5 opacity-50"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/page.jsx",
                                        lineNumber: 1484,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                        className: "text-2xl font-bold text-white mb-2",
                                                        children: [
                                                            "Welcome, ",
                                                            user?.displayName || user?.email?.split('@')[0],
                                                            "!"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/dashboard/page.jsx",
                                                        lineNumber: 1488,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-blue-100 max-w-md",
                                                        children: "Your subscription is active. Enjoy full access to all premium features."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard/page.jsx",
                                                        lineNumber: 1491,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/dashboard/page.jsx",
                                                lineNumber: 1487,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-6 pt-4 ",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: openCustomerPortal,
                                                    className: "flex items-center justify-center w-full py-2 px-4 text-sm font-medium text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors",
                                                    children: "Manage Subscription"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                    lineNumber: 1497,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/page.jsx",
                                                lineNumber: 1496,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/page.jsx",
                                        lineNumber: 1486,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/page.jsx",
                                lineNumber: 1482,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/page.jsx",
                            lineNumber: 1481,
                            columnNumber: 13
                        }, this),
                        (!subscription || !subscription.hasActive) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-8 bg-gradient-to-r from-slate-700 to-slate-800 dark:from-slate-800 dark:to-slate-900 rounded-2xl shadow-md overflow-hidden",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-6 py-8 md:px-8 md:py-8 relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute top-0 right-0 w-64 h-64 -translate-y-24 translate-x-24 rounded-full bg-white/10 opacity-20"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/page.jsx",
                                        lineNumber: 1512,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                        className: "text-2xl font-bold text-white mb-2",
                                                        children: "Welcome to Your Dashboard"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard/page.jsx",
                                                        lineNumber: 1516,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-slate-300 max-w-md mb-4",
                                                        children: "Unlock all premium features by subscribing to one of our plans below. Get started today and experience the full power of our platform."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard/page.jsx",
                                                        lineNumber: 1519,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>{
                                                            // Scroll to the subscription plans section
                                                            document.getElementById('subscription-plans')?.scrollIntoView({
                                                                behavior: 'smooth',
                                                                block: 'center'
                                                            });
                                                        },
                                                        className: "px-6 py-2.5 bg-white text-slate-800 hover:bg-slate-100 dark:bg-slate-100 dark:hover:bg-white rounded-lg font-medium transition-colors",
                                                        children: "View Plans"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard/page.jsx",
                                                        lineNumber: 1523,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/dashboard/page.jsx",
                                                lineNumber: 1515,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-white/10 backdrop-blur-sm p-5 rounded-xl hidden md:block",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center space-x-3 text-white mb-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                xmlns: "http://www.w3.org/2000/svg",
                                                                className: "h-5 w-5 text-blue-300",
                                                                viewBox: "0 0 20 20",
                                                                fill: "currentColor",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    fillRule: "evenodd",
                                                                    d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
                                                                    clipRule: "evenodd"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                                    lineNumber: 1539,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/dashboard/page.jsx",
                                                                lineNumber: 1538,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "Access all premium features"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/dashboard/page.jsx",
                                                                lineNumber: 1541,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/dashboard/page.jsx",
                                                        lineNumber: 1537,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center space-x-3 text-white mb-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                xmlns: "http://www.w3.org/2000/svg",
                                                                className: "h-5 w-5 text-blue-300",
                                                                viewBox: "0 0 20 20",
                                                                fill: "currentColor",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    fillRule: "evenodd",
                                                                    d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
                                                                    clipRule: "evenodd"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                                    lineNumber: 1545,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/dashboard/page.jsx",
                                                                lineNumber: 1544,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "Priority customer support"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/dashboard/page.jsx",
                                                                lineNumber: 1547,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/dashboard/page.jsx",
                                                        lineNumber: 1543,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center space-x-3 text-white",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                xmlns: "http://www.w3.org/2000/svg",
                                                                className: "h-5 w-5 text-blue-300",
                                                                viewBox: "0 0 20 20",
                                                                fill: "currentColor",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    fillRule: "evenodd",
                                                                    d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
                                                                    clipRule: "evenodd"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                                    lineNumber: 1551,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/dashboard/page.jsx",
                                                                lineNumber: 1550,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "Cancel anytime"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/dashboard/page.jsx",
                                                                lineNumber: 1553,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/dashboard/page.jsx",
                                                        lineNumber: 1549,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/dashboard/page.jsx",
                                                lineNumber: 1536,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/page.jsx",
                                        lineNumber: 1514,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/page.jsx",
                                lineNumber: 1511,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/page.jsx",
                            lineNumber: 1510,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 lg:grid-cols-3 gap-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "lg:col-span-1",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "sticky top-24 space-y-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$UserProfileCard$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                user: user
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/page.jsx",
                                                lineNumber: 1565,
                                                columnNumber: 17
                                            }, this),
                                            subscription && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-6",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200/80 dark:border-slate-700/50 p-5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "text-lg font-semibold text-slate-800 dark:text-white mb-4",
                                                            children: "Subscription Status"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                            lineNumber: 1571,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800/30",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex justify-between items-center",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "text-sm font-medium text-blue-800 dark:text-blue-200",
                                                                                    children: "Current Plan"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                                                    lineNumber: 1577,
                                                                                    columnNumber: 29
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                                    className: "text-xl font-bold text-slate-900 dark:text-white",
                                                                                    children: subscription.plan ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$paddle$2d$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["identifyPlan"])(subscription.plan)?.name || 'Standard Plan' : 'Free Plan'
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                                                    lineNumber: 1578,
                                                                                    columnNumber: 29
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                                            lineNumber: 1576,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: `px-3 py-1 rounded-full text-xs font-medium ${subscription.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' : subscription.status === 'paused' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200' : subscription.status === 'canceled' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200' : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200'}`,
                                                                            children: subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                                            lineNumber: 1582,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                                    lineNumber: 1575,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "mt-4",
                                                                    children: [
                                                                        subscription.nextBillDate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex justify-between items-center mb-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "text-sm text-slate-500 dark:text-slate-400",
                                                                                    children: "Next Billing Date"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                                                    lineNumber: 1598,
                                                                                    columnNumber: 31
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "font-medium text-slate-700 dark:text-slate-300",
                                                                                    children: formatDate(subscription.nextBillDate)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                                                    lineNumber: 1599,
                                                                                    columnNumber: 31
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                                            lineNumber: 1597,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        subscription.lastTransaction && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex justify-between items-center mb-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "text-sm text-slate-500 dark:text-slate-400",
                                                                                    children: "Last Payment"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                                                    lineNumber: 1607,
                                                                                    columnNumber: 31
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "font-medium text-slate-700 dark:text-slate-300",
                                                                                    children: formatDate(subscription.lastTransaction)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                                                    lineNumber: 1608,
                                                                                    columnNumber: 31
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                                            lineNumber: 1606,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        subscription.subscriptionId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex justify-between items-center",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "text-sm text-slate-500 dark:text-slate-400",
                                                                                    children: "Subscription ID"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                                                    lineNumber: 1616,
                                                                                    columnNumber: 31
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "font-mono text-xs text-slate-600 dark:text-slate-400",
                                                                                    children: [
                                                                                        subscription.subscriptionId.substring(0, 8),
                                                                                        "..."
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                                                    lineNumber: 1617,
                                                                                    columnNumber: 31
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                                            lineNumber: 1615,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                                    lineNumber: 1595,
                                                                    columnNumber: 25
                                                                }, this),
                                                                subscription.scheduled_change && subscription.scheduled_change.action === 'cancel' && subscription.status === 'active' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "mt-4 bg-amber-50 border border-amber-100 dark:bg-amber-900/20 dark:border-amber-800/30 text-amber-800 dark:text-amber-200 px-4 py-3 rounded-lg",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-start",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                                xmlns: "http://www.w3.org/2000/svg",
                                                                                className: "h-5 w-5 mr-2 mt-0.5 flex-shrink-0",
                                                                                viewBox: "0 0 20 20",
                                                                                fill: "currentColor",
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                    fillRule: "evenodd",
                                                                                    d: "M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z",
                                                                                    clipRule: "evenodd"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                                                    lineNumber: 1631,
                                                                                    columnNumber: 33
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/dashboard/page.jsx",
                                                                                lineNumber: 1630,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                        className: "font-medium",
                                                                                        children: [
                                                                                            "This subscription is scheduled to be canceled on ",
                                                                                            subscription.scheduled_change?.effective_at ? formatDate(subscription.scheduled_change.effective_at) : 'soon'
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/src/app/dashboard/page.jsx",
                                                                                        lineNumber: 1634,
                                                                                        columnNumber: 33
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                        className: "text-sm mt-1",
                                                                                        children: "Your access will continue until this date."
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/app/dashboard/page.jsx",
                                                                                        lineNumber: 1635,
                                                                                        columnNumber: 33
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/app/dashboard/page.jsx",
                                                                                lineNumber: 1633,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/dashboard/page.jsx",
                                                                        lineNumber: 1629,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                                    lineNumber: 1628,
                                                                    columnNumber: 27
                                                                }, this),
                                                                subscription.status === 'canceled' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "mt-4 bg-red-50 border border-red-100 dark:bg-red-900/20 dark:border-red-800/30 text-red-700 dark:text-red-200 px-4 py-3 rounded-lg",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-sm",
                                                                        children: [
                                                                            "Your subscription has been canceled",
                                                                            subscription.canceledAt ? ` on ${formatDate(subscription.canceledAt)}` : '',
                                                                            "."
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/dashboard/page.jsx",
                                                                        lineNumber: 1644,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                                    lineNumber: 1643,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                            lineNumber: 1574,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mt-4",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: openCustomerPortal,
                                                                className: "flex items-center justify-center w-full py-2 px-4 text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 rounded-lg transition-colors",
                                                                children: "Manage Subscription"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/dashboard/page.jsx",
                                                                lineNumber: 1657,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                            lineNumber: 1656,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                    lineNumber: 1570,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/page.jsx",
                                                lineNumber: 1569,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/page.jsx",
                                        lineNumber: 1564,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                    lineNumber: 1563,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "lg:col-span-2 space-y-8",
                                    children: [
                                        subscriptionDetails && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-700/50 p-6 overflow-hidden relative",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute top-0 right-0 w-48 h-48 -translate-y-12 translate-x-12",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-full h-full rounded-full bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/10 dark:to-blue-900/10 opacity-50"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard/page.jsx",
                                                        lineNumber: 1678,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                    lineNumber: 1677,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between mb-6 relative",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                            className: "text-xl font-semibold text-slate-800 dark:text-white",
                                                            children: "Subscription Details"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                            lineNumber: 1682,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: `px-3 py-1 rounded-full text-sm font-medium 
                      ${subscriptionDetails.status === 'active' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200' : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200'}`,
                                                            children: subscriptionDetails.status ? subscriptionDetails.status.charAt(0).toUpperCase() + subscriptionDetails.status.slice(1) : 'Active'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                            lineNumber: 1683,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                    lineNumber: 1681,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-1 md:grid-cols-2 gap-8 relative",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-6",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-sm text-slate-500 dark:text-slate-400 mb-1",
                                                                            children: "Plan"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                                            lineNumber: 1695,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex items-center",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-lg font-medium text-slate-900 dark:text-white mr-2",
                                                                                children: subscriptionDetails.planName || subscriptionDetails.items?.[0]?.price?.product_name || (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$paddle$2d$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["identifyPlan"])(subscriptionDetails.planId)?.name || 'Standard'
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/dashboard/page.jsx",
                                                                                lineNumber: 1697,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                                            lineNumber: 1696,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                                    lineNumber: 1694,
                                                                    columnNumber: 23
                                                                }, this),
                                                                subscriptionDetails.priceAmount && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-sm text-slate-500 dark:text-slate-400 mb-1",
                                                                            children: "Price"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                                            lineNumber: 1709,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-lg font-medium text-slate-900 dark:text-white",
                                                                            children: formatPrice(subscriptionDetails.priceAmount, subscriptionDetails.priceCurrency)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                                            lineNumber: 1710,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                                    lineNumber: 1708,
                                                                    columnNumber: 25
                                                                }, this),
                                                                subscriptionDetails.formattedPrice && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-sm text-slate-500 dark:text-slate-400 mb-1",
                                                                            children: "Price"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                                            lineNumber: 1718,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-lg font-medium text-slate-900 dark:text-white",
                                                                            children: subscriptionDetails.formattedPrice
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                                            lineNumber: 1719,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                                    lineNumber: 1717,
                                                                    columnNumber: 25
                                                                }, this),
                                                                !subscriptionDetails.priceAmount && !subscriptionDetails.formattedPrice && (subscriptionDetails.price || subscriptionDetails.items?.[0]?.price?.unit_price) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-sm text-slate-500 dark:text-slate-400 mb-1",
                                                                            children: "Price"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                                            lineNumber: 1727,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-lg font-medium text-slate-900 dark:text-white",
                                                                            children: subscriptionDetails.price ? typeof subscriptionDetails.price === 'object' ? formatPrice(subscriptionDetails.price.amount, subscriptionDetails.price.currency) : formatPrice(subscriptionDetails.price, subscriptionDetails.priceCurrency || 'USD') : formatPrice(subscriptionDetails.items[0].price.unit_price.amount, subscriptionDetails.items[0].price.unit_price.currency_code)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                                            lineNumber: 1728,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                                    lineNumber: 1726,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                            lineNumber: 1693,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-6",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-sm text-slate-500 dark:text-slate-400 mb-1",
                                                                            children: "Subscription Date"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                                            lineNumber: 1742,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-lg font-medium text-slate-900 dark:text-white",
                                                                            children: formatDate(subscriptionDetails.createdAt)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                                            lineNumber: 1743,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                                    lineNumber: 1741,
                                                                    columnNumber: 23
                                                                }, this),
                                                                subscriptionDetails.startedAt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-sm text-slate-500 dark:text-slate-400 mb-1",
                                                                            children: "Subscription Start"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                                            lineNumber: 1750,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-lg font-medium text-slate-900 dark:text-white",
                                                                            children: formatDate(subscriptionDetails.startedAt)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                                            lineNumber: 1751,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                                    lineNumber: 1749,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-sm text-slate-500 dark:text-slate-400 mb-1",
                                                                            children: "Subscription ID"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                                            lineNumber: 1758,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-sm font-mono text-slate-600 dark:text-slate-400 break-all",
                                                                            children: subscriptionDetails.subscriptionId || subscriptionDetails.id
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                                            lineNumber: 1759,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                                    lineNumber: 1757,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                            lineNumber: 1740,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                    lineNumber: 1692,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                            lineNumber: 1676,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            id: "subscription-plans",
                                            className: "bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-700/50 p-6 relative overflow-hidden",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute top-0 right-0 w-96 h-96 -translate-y-48 translate-x-48",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-full h-full rounded-full bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/10 dark:to-purple-900/10 opacity-50"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard/page.jsx",
                                                        lineNumber: 1771,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                    lineNumber: 1770,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 relative",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                                    className: "text-xl font-semibold text-slate-800 dark:text-white",
                                                                    children: "Subscription Plans"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                                    lineNumber: 1776,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-slate-500 dark:text-slate-400 mt-1",
                                                                    children: "Choose the perfect plan for your needs"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                                    lineNumber: 1777,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                            lineNumber: 1775,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex p-1 bg-slate-100 dark:bg-slate-700 rounded-lg",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>setBillingCycle('month'),
                                                                    className: `px-4 py-2 rounded-md text-sm font-medium transition-all ${billingCycle === 'month' ? 'bg-white dark:bg-slate-600 shadow-sm text-slate-800 dark:text-white' : 'text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white'}`,
                                                                    children: "Monthly"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                                    lineNumber: 1780,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>setBillingCycle('year'),
                                                                    className: `px-4 py-2 rounded-md text-sm font-medium transition-all ${billingCycle === 'year' ? 'bg-white dark:bg-slate-600 shadow-sm text-slate-800 dark:text-white' : 'text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white'}`,
                                                                    children: [
                                                                        "Yearly ",
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-green-400 text-xs ml-1",
                                                                            children: "Save 17%"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                                            lineNumber: 1798,
                                                                            columnNumber: 30
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                                    lineNumber: 1790,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                            lineNumber: 1779,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                    lineNumber: 1774,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-1 md:grid-cols-2 gap-6 relative",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: `group relative border ${subscription?.plan && (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$paddle$2d$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["identifyPlan"])(subscription.plan)?.name === 'Standard Plan' ? 'border-blue-300 bg-blue-50/30 dark:bg-blue-900/20' : 'border-slate-200 dark:border-slate-700'} rounded-2xl p-6 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300`,
                                                            children: [
                                                                subscription?.plan && (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$paddle$2d$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["identifyPlan"])(subscription.plan)?.name === 'Standard Plan' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "absolute -top-3 right-6",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm",
                                                                        children: "Current Plan"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/dashboard/page.jsx",
                                                                        lineNumber: 1808,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                                    lineNumber: 1807,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "absolute inset-0 bg-gradient-to-br from-blue-50 to-slate-50 dark:from-blue-900/10 dark:to-slate-800/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                                    lineNumber: 1813,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "relative",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                            className: "text-xl font-semibold text-slate-800 dark:text-white mb-2",
                                                                            children: "Standard Plan"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                                            lineNumber: 1816,
                                                                            columnNumber: 23
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-slate-600 dark:text-slate-300 mb-4",
                                                                            children: billingCycle === 'month' ? 'Perfect for getting started' : 'Save more with yearly billing'
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                                            lineNumber: 1817,
                                                                            columnNumber: 23
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "mb-6",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "text-3xl font-bold text-slate-900 dark:text-white",
                                                                                    children: prices.standard || 'Loading...'
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                                                    lineNumber: 1823,
                                                                                    columnNumber: 25
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "text-slate-600 dark:text-slate-400",
                                                                                    children: [
                                                                                        "/",
                                                                                        billingCycle
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                                                    lineNumber: 1826,
                                                                                    columnNumber: 25
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                                            lineNumber: 1822,
                                                                            columnNumber: 23
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "mb-6 space-y-3",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "flex items-start",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                                            xmlns: "http://www.w3.org/2000/svg",
                                                                                            className: "h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0",
                                                                                            viewBox: "0 0 20 20",
                                                                                            fill: "currentColor",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                                fillRule: "evenodd",
                                                                                                d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
                                                                                                clipRule: "evenodd"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/app/dashboard/page.jsx",
                                                                                                lineNumber: 1833,
                                                                                                columnNumber: 29
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                                                            lineNumber: 1832,
                                                                                            columnNumber: 27
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "text-slate-700 dark:text-slate-300",
                                                                                            children: "Access to basic features"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                                                            lineNumber: 1835,
                                                                                            columnNumber: 27
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                                                    lineNumber: 1831,
                                                                                    columnNumber: 25
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "flex items-start",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                                            xmlns: "http://www.w3.org/2000/svg",
                                                                                            className: "h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0",
                                                                                            viewBox: "0 0 20 20",
                                                                                            fill: "currentColor",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                                fillRule: "evenodd",
                                                                                                d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
                                                                                                clipRule: "evenodd"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/app/dashboard/page.jsx",
                                                                                                lineNumber: 1839,
                                                                                                columnNumber: 29
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                                                            lineNumber: 1838,
                                                                                            columnNumber: 27
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "text-slate-700 dark:text-slate-300",
                                                                                            children: "5 projects"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                                                            lineNumber: 1841,
                                                                                            columnNumber: 27
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                                                    lineNumber: 1837,
                                                                                    columnNumber: 25
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "flex items-start",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                                            xmlns: "http://www.w3.org/2000/svg",
                                                                                            className: "h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0",
                                                                                            viewBox: "0 0 20 20",
                                                                                            fill: "currentColor",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                                fillRule: "evenodd",
                                                                                                d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
                                                                                                clipRule: "evenodd"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/app/dashboard/page.jsx",
                                                                                                lineNumber: 1845,
                                                                                                columnNumber: 29
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                                                            lineNumber: 1844,
                                                                                            columnNumber: 27
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "text-slate-700 dark:text-slate-300",
                                                                                            children: "Email support"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                                                            lineNumber: 1847,
                                                                                            columnNumber: 27
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                                                    lineNumber: 1843,
                                                                                    columnNumber: 25
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "flex items-start",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                                            xmlns: "http://www.w3.org/2000/svg",
                                                                                            className: "h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0",
                                                                                            viewBox: "0 0 20 20",
                                                                                            fill: "currentColor",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                                fillRule: "evenodd",
                                                                                                d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
                                                                                                clipRule: "evenodd"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/app/dashboard/page.jsx",
                                                                                                lineNumber: 1851,
                                                                                                columnNumber: 29
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                                                            lineNumber: 1850,
                                                                                            columnNumber: 27
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "text-slate-700 dark:text-slate-300",
                                                                                            children: "1GB storage"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                                                            lineNumber: 1853,
                                                                                            columnNumber: 27
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                                                    lineNumber: 1849,
                                                                                    columnNumber: 25
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                                            lineNumber: 1830,
                                                                            columnNumber: 23
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>handleSubscription('standard'),
                                                                            disabled: Boolean(!paddleLoaded || subscription?.plan && (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$paddle$2d$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["identifyPlan"])(subscription.plan)?.name === 'Standard Plan' && subscription?.status === 'active'),
                                                                            className: `w-full py-3 px-4 rounded-xl transition-all ${!paddleLoaded ? 'bg-slate-200 dark:bg-slate-700 cursor-not-allowed text-slate-500 dark:text-slate-400' : subscription?.plan && (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$paddle$2d$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["identifyPlan"])(subscription.plan)?.name === 'Standard Plan' && subscription?.status === 'active' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow group-hover:shadow-md'}`,
                                                                            children: !paddleLoaded ? 'Loading...' : subscription?.plan && (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$paddle$2d$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["identifyPlan"])(subscription.plan)?.name === 'Standard Plan' && subscription?.status === 'active' ? 'Current Plan' : `Get Standard ${billingCycle === 'month' ? 'Monthly' : 'Yearly'}`
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                                            lineNumber: 1857,
                                                                            columnNumber: 23
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                                    lineNumber: 1815,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                            lineNumber: 1805,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: `group relative border-2 ${subscription?.plan && (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$paddle$2d$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["identifyPlan"])(subscription.plan)?.name === 'Premium Plan' ? 'border-violet-300 bg-violet-50/30 dark:bg-violet-900/20' : 'border-violet-200 dark:border-violet-700'} rounded-2xl p-6 hover:shadow-md hover:border-violet-300 dark:hover:border-violet-600 transition-all duration-300`,
                                                            children: [
                                                                subscription?.plan && (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$paddle$2d$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["identifyPlan"])(subscription.plan)?.name === 'Premium Plan' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "absolute -top-3 right-6",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm",
                                                                        children: "Current Plan"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/dashboard/page.jsx",
                                                                        lineNumber: 1882,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                                    lineNumber: 1881,
                                                                    columnNumber: 23
                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "absolute -top-4 left-4",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-4 py-1 rounded-full text-sm font-medium shadow-sm",
                                                                        children: "Popular"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/dashboard/page.jsx",
                                                                        lineNumber: 1888,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                                    lineNumber: 1887,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "absolute inset-0 bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-900/10 dark:to-indigo-900/10 opacity-50 group-hover:opacity-100 transition-opacity rounded-2xl"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                                    lineNumber: 1894,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "relative",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                            className: "text-xl font-semibold text-slate-800 dark:text-white mb-2",
                                                                            children: "Premium Plan"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                                            lineNumber: 1897,
                                                                            columnNumber: 23
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-slate-600 dark:text-slate-300 mb-4",
                                                                            children: billingCycle === 'month' ? 'Access all premium features' : 'Best value for full access'
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                                            lineNumber: 1898,
                                                                            columnNumber: 23
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "mb-6",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "text-3xl font-bold text-slate-900 dark:text-white",
                                                                                    children: prices.premium || 'Loading...'
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                                                    lineNumber: 1904,
                                                                                    columnNumber: 25
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "text-slate-600 dark:text-slate-400",
                                                                                    children: [
                                                                                        "/",
                                                                                        billingCycle
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                                                    lineNumber: 1907,
                                                                                    columnNumber: 25
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                                            lineNumber: 1903,
                                                                            columnNumber: 23
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "mb-6 space-y-3",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "flex items-start",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                                            xmlns: "http://www.w3.org/2000/svg",
                                                                                            className: "h-5 w-5 text-violet-500 mt-0.5 mr-3 flex-shrink-0",
                                                                                            viewBox: "0 0 20 20",
                                                                                            fill: "currentColor",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                                fillRule: "evenodd",
                                                                                                d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
                                                                                                clipRule: "evenodd"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/app/dashboard/page.jsx",
                                                                                                lineNumber: 1914,
                                                                                                columnNumber: 29
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                                                            lineNumber: 1913,
                                                                                            columnNumber: 27
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "text-slate-700 dark:text-slate-300",
                                                                                            children: [
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                                                    children: "All Standard features"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                                                                    lineNumber: 1916,
                                                                                                    columnNumber: 80
                                                                                                }, this),
                                                                                                ", plus:"
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                                                            lineNumber: 1916,
                                                                                            columnNumber: 27
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                                                    lineNumber: 1912,
                                                                                    columnNumber: 25
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "flex items-start",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                                            xmlns: "http://www.w3.org/2000/svg",
                                                                                            className: "h-5 w-5 text-violet-500 mt-0.5 mr-3 flex-shrink-0",
                                                                                            viewBox: "0 0 20 20",
                                                                                            fill: "currentColor",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                                fillRule: "evenodd",
                                                                                                d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
                                                                                                clipRule: "evenodd"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/app/dashboard/page.jsx",
                                                                                                lineNumber: 1920,
                                                                                                columnNumber: 29
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                                                            lineNumber: 1919,
                                                                                            columnNumber: 27
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "text-slate-700 dark:text-slate-300",
                                                                                            children: "Unlimited projects"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                                                            lineNumber: 1922,
                                                                                            columnNumber: 27
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                                                    lineNumber: 1918,
                                                                                    columnNumber: 25
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "flex items-start",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                                            xmlns: "http://www.w3.org/2000/svg",
                                                                                            className: "h-5 w-5 text-violet-500 mt-0.5 mr-3 flex-shrink-0",
                                                                                            viewBox: "0 0 20 20",
                                                                                            fill: "currentColor",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                                fillRule: "evenodd",
                                                                                                d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
                                                                                                clipRule: "evenodd"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/app/dashboard/page.jsx",
                                                                                                lineNumber: 1926,
                                                                                                columnNumber: 29
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                                                            lineNumber: 1925,
                                                                                            columnNumber: 27
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "text-slate-700 dark:text-slate-300",
                                                                                            children: "Priority support"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                                                            lineNumber: 1928,
                                                                                            columnNumber: 27
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                                                    lineNumber: 1924,
                                                                                    columnNumber: 25
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "flex items-start",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                                            xmlns: "http://www.w3.org/2000/svg",
                                                                                            className: "h-5 w-5 text-violet-500 mt-0.5 mr-3 flex-shrink-0",
                                                                                            viewBox: "0 0 20 20",
                                                                                            fill: "currentColor",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                                fillRule: "evenodd",
                                                                                                d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
                                                                                                clipRule: "evenodd"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/app/dashboard/page.jsx",
                                                                                                lineNumber: 1932,
                                                                                                columnNumber: 29
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                                                            lineNumber: 1931,
                                                                                            columnNumber: 27
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "text-slate-700 dark:text-slate-300",
                                                                                            children: "10GB storage"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                                                            lineNumber: 1934,
                                                                                            columnNumber: 27
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                                                    lineNumber: 1930,
                                                                                    columnNumber: 25
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "flex items-start",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                                            xmlns: "http://www.w3.org/2000/svg",
                                                                                            className: "h-5 w-5 text-violet-500 mt-0.5 mr-3 flex-shrink-0",
                                                                                            viewBox: "0 0 20 20",
                                                                                            fill: "currentColor",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                                fillRule: "evenodd",
                                                                                                d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
                                                                                                clipRule: "evenodd"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/app/dashboard/page.jsx",
                                                                                                lineNumber: 1938,
                                                                                                columnNumber: 29
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                                                            lineNumber: 1937,
                                                                                            columnNumber: 27
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "text-slate-700 dark:text-slate-300",
                                                                                            children: "Advanced analytics"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                                                            lineNumber: 1940,
                                                                                            columnNumber: 27
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                                                    lineNumber: 1936,
                                                                                    columnNumber: 25
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                                            lineNumber: 1911,
                                                                            columnNumber: 23
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>handleSubscription('premium'),
                                                                            disabled: Boolean(!paddleLoaded || subscription?.plan && (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$paddle$2d$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["identifyPlan"])(subscription.plan)?.name === 'Premium Plan' && subscription?.status === 'active'),
                                                                            className: `w-full py-3 px-4 rounded-xl transition-all ${!paddleLoaded ? 'bg-slate-200 dark:bg-slate-700 cursor-not-allowed text-slate-500 dark:text-slate-400' : subscription?.plan && (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$paddle$2d$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["identifyPlan"])(subscription.plan)?.name === 'Premium Plan' && subscription?.status === 'active' ? 'bg-violet-100 dark:bg-violet-900/30 text-violet-800 dark:text-violet-200 cursor-not-allowed' : 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-sm hover:shadow group-hover:shadow-md'}`,
                                                                            children: !paddleLoaded ? 'Loading...' : subscription?.plan && (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$paddle$2d$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["identifyPlan"])(subscription.plan)?.name === 'Premium Plan' && subscription?.status === 'active' ? 'Current Plan' : `Get Premium ${billingCycle === 'month' ? 'Monthly' : 'Yearly'}`
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                                            lineNumber: 1944,
                                                                            columnNumber: 23
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                                    lineNumber: 1896,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                            lineNumber: 1879,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                    lineNumber: 1803,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                            lineNumber: 1769,
                                            columnNumber: 15
                                        }, this),
                                        transactions && transactions.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-700/50 p-6 overflow-hidden relative",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute top-0 right-0 w-48 h-48 -translate-y-12 translate-x-12",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-full h-full rounded-full bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/10 dark:to-teal-900/10 opacity-50"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard/page.jsx",
                                                        lineNumber: 1971,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                    lineNumber: 1970,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "relative",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                            className: "text-xl font-semibold text-slate-800 dark:text-white mb-6",
                                                            children: "Recent Transactions"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                            lineNumber: 1975,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                                                            children: transactions.map((transaction)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "bg-slate-50 dark:bg-slate-700/30 rounded-lg p-4 border border-slate-200 dark:border-slate-700",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                            className: "text-md font-semibold text-slate-800 dark:text-white mb-2",
                                                                            children: transaction.product?.name || 'Transaction'
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                                            lineNumber: 1979,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "space-y-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "flex justify-between",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "text-sm text-slate-500 dark:text-slate-400",
                                                                                            children: "Status:"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                                                            lineNumber: 1982,
                                                                                            columnNumber: 31
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: `text-sm font-medium ${transaction.paymentStatus === 'completed' || transaction.paymentStatus === 'paid' ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}`,
                                                                                            children: transaction.paymentStatus ? transaction.paymentStatus.charAt(0).toUpperCase() + transaction.paymentStatus.slice(1) : 'Pending'
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                                                            lineNumber: 1983,
                                                                                            columnNumber: 31
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                                                    lineNumber: 1981,
                                                                                    columnNumber: 29
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "flex justify-between",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "text-sm text-slate-500 dark:text-slate-400",
                                                                                            children: "Amount:"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                                                            lineNumber: 1992,
                                                                                            columnNumber: 31
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "text-sm font-medium text-slate-800 dark:text-slate-200",
                                                                                            children: formatPrice(transaction.amountPaid || transaction.amount, transaction.currency || 'USD')
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                                                            lineNumber: 1993,
                                                                                            columnNumber: 31
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                                                    lineNumber: 1991,
                                                                                    columnNumber: 29
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "flex justify-between",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "text-sm text-slate-500 dark:text-slate-400",
                                                                                            children: "Date:"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                                                            lineNumber: 1998,
                                                                                            columnNumber: 31
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "text-sm text-slate-700 dark:text-slate-300",
                                                                                            children: formatDate(transaction.timestamp)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                                                            lineNumber: 1999,
                                                                                            columnNumber: 31
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                                                    lineNumber: 1997,
                                                                                    columnNumber: 29
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                                            lineNumber: 1980,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, transaction.id, true, {
                                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                                    lineNumber: 1978,
                                                                    columnNumber: 25
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                                            lineNumber: 1976,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                                    lineNumber: 1974,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/page.jsx",
                                            lineNumber: 1969,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/page.jsx",
                                    lineNumber: 1673,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/page.jsx",
                            lineNumber: 1561,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard/page.jsx",
                    lineNumber: 1325,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SettingsModal, {
                    isOpen: isSettingsOpen,
                    onClose: ()=>setIsSettingsOpen(false)
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/page.jsx",
                    lineNumber: 2015,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/dashboard/page.jsx",
            lineNumber: 1255,
            columnNumber: 7
        }, this);
    };
    _s(DashboardContent, "JkSxfi8+JQlqgIgDOc3wQN+nVIw=", false, function() {
        return [
            useTheme
        ];
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeProvider, {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DashboardContent, {}, void 0, false, {
            fileName: "[project]/src/app/dashboard/page.jsx",
            lineNumber: 2022,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/dashboard/page.jsx",
        lineNumber: 2021,
        columnNumber: 5
    }, this);
}
_s3(Dashboard, "msvR+9EI0IKTirl3rIcEQSvdiYs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c2 = Dashboard;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "ThemeProvider");
__turbopack_context__.k.register(_c1, "SettingsModal");
__turbopack_context__.k.register(_c2, "Dashboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_2e1b6ae1._.js.map