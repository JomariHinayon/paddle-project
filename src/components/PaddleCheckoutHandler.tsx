import { useEffect, useState } from 'react';
import { getFirestore, doc, setDoc, collection, addDoc } from 'firebase/firestore';
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
        
        // 1. First store checkout data in Firestore
        const db = getFirestore();
        const checkoutRef = doc(collection(db, 'users', user.uid, 'checkouts'), checkoutId);
        
        const checkoutData = {
          checkoutId,
          customerId,
          userId: user.uid,
          status: 'completed',
          timestamp: new Date(),
          email: user.email,
        };
        
        await setDoc(checkoutRef, checkoutData);
        console.log('Checkout data saved to Firebase');
        
        // 2. Make API call to verify subscription details
        const response = await fetch('/api/subscriptions/get-details', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            customerId,
            userId: user.uid
          }),
        });
        
        if (!response.ok) {
          // If API call fails, we'll rely on webhooks to update the subscription
          console.log('Subscription details not available yet, webhooks will update later');
          
          // We should still update user record
          const userRef = doc(db, 'users', user.uid);
          await setDoc(userRef, {
            paddleCustomerId: customerId,
            checkoutCompleted: true,
            checkoutId,
            lastCheckoutDate: new Date()
          }, { merge: true });
          
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
        
        // 3. Update user record with subscription details
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