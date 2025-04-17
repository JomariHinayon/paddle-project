import { useEffect, useState } from 'react';
import { getFirestore, doc, setDoc, collection, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

interface PaddleCheckoutHandlerProps {
  onSuccess?: (subscriptionData: any) => void;
  onError?: (error: Error) => void;
}

interface SubscriptionResponse {
  subscriptionId: string;
  status: string;
  planId: string;
  nextBillDate: string | null;
  customerId: string;
}

export default function PaddleCheckoutHandler({ onSuccess, onError }: PaddleCheckoutHandlerProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutId, setCheckoutId] = useState<string | null>(null);
  const [customerId, setCustomerId] = useState<string | null>(null);
  
  // Get checkout and customer ID from URL if present
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const id = params.get('checkout_id');
      const customer = params.get('customer_id');
      
      if (id) setCheckoutId(id);
      if (customer) setCustomerId(customer);
    }
  }, []);
  
  // Process the checkout completion if we have the necessary data
  useEffect(() => {
    const processCheckout = async () => {
      if (!checkoutId || !customerId || isProcessing) return;
      
      setIsProcessing(true);
      
      try {
        const auth = getAuth();
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
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            checkoutId,
            customerId,
            userId: user.uid,
            email: user.email
          }),
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
              customerId,
            });
          }
          
          return;
        }
        
        const subscriptionData: SubscriptionResponse = await response.json();
        console.log('Subscription details retrieved from API:', subscriptionData);
        
        // Only update user record if we have a valid subscription ID (not 'pending')
        if (subscriptionData.subscriptionId && subscriptionData.subscriptionId !== 'pending') {
          // Update user record with subscription details
          const db = getFirestore();
          const userRef = doc(db, 'users', user.uid);
          await setDoc(userRef, {
            hasActiveSubscription: true,
            currentSubscriptionId: subscriptionData.subscriptionId,
            subscriptionStatus: subscriptionData.status,
            currentPlan: subscriptionData.planId,
            nextBillDate: subscriptionData.nextBillDate ? new Date(subscriptionData.nextBillDate) : null,
            paddleCustomerId: customerId,
            lastCheckoutDate: new Date()
          }, { merge: true });
        } else {
          console.log('No valid subscription ID received, waiting for webhook events');
        }
        
        // Clear URL parameters
        window.history.replaceState({}, document.title, window.location.pathname);
        
        if (onSuccess) {
          onSuccess(subscriptionData);
        }
      } catch (error: any) {
        console.error('Error processing checkout:', error);
        if (onError) {
          onError(error);
        }
      } finally {
        setIsProcessing(false);
      }
    };
    
    processCheckout();
  }, [checkoutId, customerId, isProcessing, onSuccess, onError]);
  
  // This component doesn't render anything
  return null;
} 