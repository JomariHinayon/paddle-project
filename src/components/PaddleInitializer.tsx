'use client';

import { useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { PADDLE_CONFIG } from '@/lib/paddle-config';

declare global {
  interface Window {
    Paddle: any;
  }
}

interface PaddleInitializerProps {
  environment?: 'sandbox' | 'production';
  vendorId: string;
  onCheckoutComplete?: (data: any) => void;
}

export default function PaddleInitializer({
  environment = 'sandbox',
  vendorId,
  onCheckoutComplete
}: PaddleInitializerProps) {
  useEffect(() => {
    // Function to load Paddle.js
    const loadPaddle = () => {
      // Check if Paddle is already loaded
      if (window.Paddle) {
        console.log('Paddle already loaded, initializing...');
        initializePaddle();
        return;
      }

      // Create script element
      const script = document.createElement('script');
      script.src = environment === 'sandbox'
        ? 'https://cdn.paddle.com/paddle/paddle.js'
        : 'https://cdn.paddle.com/paddle/paddle.js';
      script.async = true;
      script.onload = initializePaddle;

      // Append script to body
      document.body.appendChild(script);
    };

    // Function to initialize Paddle
    const initializePaddle = () => {
      if (!window.Paddle) {
        console.error('Paddle not loaded correctly');
        return;
      }

      // Setup Paddle
      window.Paddle.Setup({
        seller: parseInt(PADDLE_CONFIG.sellerId),
        environment: environment,
        eventCallback: handlePaddleEvent
      });

      console.log('Paddle initialized');
    };

    // Handle Paddle events
    const handlePaddleEvent = async (eventData: any) => {
      console.log('Paddle event:', eventData.event);

      // Handle checkout.completed event 
      if (eventData.event === 'checkout.completed') {
        console.log('Checkout completed:', eventData.eventData);
        
        const checkoutData = eventData.eventData;
        const customerId = checkoutData.user?.id;
        const checkoutId = checkoutData.checkout?.id;
        
        if (!customerId || !checkoutId) {
          console.error('Missing customer or checkout ID in Paddle event');
          return;
        }
        
        try {
          const auth = getAuth();
          const user = auth.currentUser;
          
          if (!user) {
            console.error('No authenticated user found');
            return;
          }
          
          // Instead of storing checkout data, we'll just temporarily reference it 
          // for tracking purposes only until a subscription is created
          console.log('Paddle checkout completed. Waiting for subscription.created webhook.');
          
          // We'll still store the customerId temporarily for use in later flows
          // but without saving other checkout data to Firebase
          sessionStorage.setItem('paddle_checkout_id', checkoutId);
          sessionStorage.setItem('paddle_customer_id', customerId);
          
          // Call the callback if provided
          if (onCheckoutComplete) {
            onCheckoutComplete({
              checkoutId,
              customerId,
              paddleEventData: checkoutData
            });
          }
          
          // Redirect to success page or clear URL parameters
          if (typeof window !== 'undefined' && window.location.search.includes('checkout_id')) {
            window.history.replaceState({}, document.title, window.location.pathname);
          }
        } catch (error) {
          console.error('Error handling checkout completion:', error);
        }
      }
    };

    // Load Paddle when component mounts
    if (typeof window !== 'undefined') {
      loadPaddle();
    }

    // Cleanup function
    return () => {
      // No cleanup needed for Paddle script
    };
  }, [environment, vendorId, onCheckoutComplete]);

  // This component doesn't render anything visible
  return null;
} 