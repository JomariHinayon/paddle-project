'use client';

import { useEffect } from 'react';
import { getAuth } from 'firebase/auth';
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
      // Use the correct URL for sandbox vs production
      script.src = environment === 'sandbox'
        ? 'https://cdn.sandbox.paddle.com/paddle/paddle.js'
        : 'https://cdn.paddle.com/paddle/paddle.js';
      script.async = true;
      script.onload = initializePaddle;
      script.onerror = (error) => {
        console.error('Failed to load Paddle script:', error);
      };
      
      // Append script to body
      document.body.appendChild(script);
    };

    // Function to initialize Paddle
    const initializePaddle = () => {
      if (!window.Paddle) {
        console.error('Paddle not loaded correctly');
        console.log('Window object keys:', Object.keys(window));
        return;
      }
      
      // Setup Paddle with correct configuration
      try {
        window.Paddle.Setup({
          vendor: parseInt(vendorId), // Use vendorId from props
          environment: environment,
          eventCallback: handlePaddleEvent
        });
        console.log('Paddle initialized successfully with vendor:', vendorId, 'and environment:', environment);
      } catch (error) {
        console.error('Error setting up Paddle:', error);
      }
    };

    // Handle Paddle events
    const handlePaddleEvent = async (eventData: any) => {
      console.log('Paddle event received:', eventData);
      
      // Handle Checkout.Complete event 
      if (eventData.event === 'Checkout.Complete') {
        console.log('Checkout completed successfully:', eventData);
        
        try {
          const auth = getAuth();
          const user = auth.currentUser;
          
          if (!user) {
            console.error('No authenticated user found');
            return;
          }
          
          // Store checkout data temporarily
          if (typeof window !== 'undefined') {
            sessionStorage.setItem('paddle_checkout_id', eventData.checkout?.id);
          }
          
          // Call the callback if provided
          if (onCheckoutComplete) {
            onCheckoutComplete(eventData);
          }
          
          // Clear URL parameters if they exist
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
      // No specific cleanup needed
    };
  }, [environment, vendorId, onCheckoutComplete]);

  // This component doesn't render anything visible
  return null;
}