'use client';

import { useEffect } from 'react';
import { getAnalytics } from 'firebase/analytics';
import { getPerformance } from 'firebase/performance';
import { getApps } from 'firebase/app';

/**
 * This component safely initializes Firebase Performance Monitoring
 * on the client side, with proper error handling to avoid the attribute error.
 */
export default function FirebaseInitializer() {
  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined') return;
    
    // Only initialize if Firebase is already initialized
    if (getApps().length === 0) return;
    
    const initializeFirebaseServices = async () => {
      try {
        // Initialize Analytics
        try {
          const { isSupported } = await import('firebase/analytics');
          const analyticsSupported = await isSupported();
          
          if (analyticsSupported) {
            const analytics = getAnalytics();
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
        */
      } catch (error) {
        console.warn('Error initializing Firebase services:', error);
      }
    };
    
    initializeFirebaseServices();
  }, []);
  
  // This component doesn't render anything
  return null;
} 