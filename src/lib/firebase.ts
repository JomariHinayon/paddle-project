"use client";

// lib/firebase.ts
import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider, EmailAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getPerformance, initializePerformance } from "firebase/performance";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: "G-1R6HX54FVL"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Authentication
export const auth = getAuth(app);
auth.useDeviceLanguage(); // For better auth flows

// Providers
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('profile');
googleProvider.addScope('email');
googleProvider.setCustomParameters({
  prompt: 'select_account'
}); // Better UX for Google Auth

export const emailProvider = new EmailAuthProvider();

// Firestore Database
export const firestore = getFirestore(app);

// Cloud Storage
export const storage = getStorage(app);

// Cloud Functions
export const functions = getFunctions(app);

// Analytics - only initialize in browser environment
export const initAnalytics = async () => {
  if (typeof window !== 'undefined') {
    const analyticsSupported = await isSupported();
    if (analyticsSupported) {
      return getAnalytics(app);
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
*/

// Emulator setup (for development)
if (process.env.NODE_ENV === 'development') {
  connectFunctionsEmulator(functions, 'localhost', 5001);
  // Note: Auth emulator needs to be set up in your auth flows
}

// Utility function to get current user token
export const getCurrentUserToken = async (): Promise<string | null> => {
  try {
    const user = auth.currentUser;
    if (!user) return null;
    return await user.getIdToken();
  } catch (error) {
    console.error('Error getting user token:', error);
    return null;
  }
};