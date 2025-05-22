import React from 'react';
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import PaddleInitializer from '@/components/PaddleInitializer';
import PaddleCheckoutHandler from '@/components/PaddleCheckoutHandler';
import { hasActiveSubscription, getUserSubscription } from '@/lib/subscription-utils';
import { PADDLE_PLANS, PaddlePlan } from '@/lib/paddle-utils';



// Declare Paddle global variable


export default function CheckoutExample() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState(null);
  const [checkoutStatus, setCheckoutStatus] = useState(null);
  
  // Initialize auth listener
  useEffect(() => {
    const auth = getAuth();
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        try {
          // Fix the type mismatch by properly typing the result or casting it
          const subData = await getUserSubscription();
          // Make sure the returned data h(subData) {
            setSubscription(subData );
          }
        } catch (error) {
          console.error('Error fetching subscription;
        }
      }
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, []);
  
  // Handle successful checkout completion
  const handleCheckoutSuccess = (data=> {
    console.log('Checkout completed successfully;
    setCheckoutStatus('Checkout completed! Loading subscription details...');
    
    // Refresh subscription data
    getUserSubscription()
      .then(subscriptionData => {
        if (subscriptionData) {
          // Cast to Subscription type to ensure compatibility
          setSubscription(subscriptionData );
          setCheckoutStatus('Subscription activated!');
        }
      })
      .catch(error => {
        console.error('Error fetching updated subscription;
        setCheckoutStatus('Checkout completed, but subscription details are still processing');
      });
  };
  
  // Handle checkout error
  const handleCheckoutError = (error=> {
    console.error('Checkout error;
    setCheckoutStatus(`Checkout error: ${error.message}`);
  };
  
  // Start Paddle checkout process
  const startCheckout = (planId=> {
    if (!user) {
      router.push('/login');
      return;
    }
    
    if (typeof window === 'undefined' || !window.Paddle) {
      console.error('Paddle not initialized');
      return;
    }
    
    // Open Paddle checkout
    window.Paddle.Checkout.open({
      product,
      email,
      passthrough: JSON.stringify({
        userId,
        email,
      successCallback=> {
        console.log('Paddle checkout success callback fired');
      }
    });
  };
  
  if (loading) {
    return <div className="p-6">Loading...</div>;
  }
  
  if (!user) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Please log in</h1>
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => router.push('/login')}
        >
          Login
        </button>
      </div>
    );
  }
  
  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Paddle initialization components */}
      <PaddleInitializer 
        vendorId={process.env.NEXT_PUBLIC_PADDLE_VENDOR_ID || ''}
        environment="sandbox"
        onCheckoutComplete={handleCheckoutSuccess}
      />
      
      {/* Component to handle checkout URL parameters */}
      <PaddleCheckoutHandler 
        onSuccess={handleCheckoutSuccess}
        onError={handleCheckoutError}
      />
      
      <h1 className="text-3xl font-bold mb-6">Subscription Dashboard</h1>
      
      {checkoutStatus && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {checkoutStatus}
        </div>
      )}
      
      {/* Subscription status */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Your Subscription</h2>
        {subscription ? (
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="mb-4">
              <span className="font-semibold">Status:</span> 
              <span className={`ml-2 ${subscription.status === 'active' ? 'text-green-500' : 'text-yellow-500'}`}>
                {subscription.status}
              </span>
            </div>
            <div className="mb-4">
              <span className="font-semibold">Plan:</span> 
              <span className="ml-2">
                {PADDLE_PLANS[subscription.planId ?.name || subscription.planId || 'Unknown'}
              </span>
            </div>
            {subscription.nextBillDate && (
              <div className="mb-4">
                <span className="font-semibold">Next bill date:</span>
                <span className="ml-2">
                  {new Date(subscription.nextBillDate).toLocaleDateString()}
                </span>
              </div>
            )}
            
            <button 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
              onClick={() => window.open('https://customer.paddle.com/login', '_blank')}
            >
              Manage Subscription
            </button>
          </div>
        ) ="bg-gray-100 rounded-lg p-6">
            <p className="mb-4">You don't have an active subscription yet.</p>
          </div>
        )}
      </div>
      
      {/* Available plans */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Available Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(PADDLE_PLANS).map(([planId, plan]=> (
            <div key={planId} className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">{plan.name}</h3>
              <ul className="mb-4">
                {plan.features.map((feature, index=> (
                  <li key={index} className="mb-1 flex items-center">
                    <span className="mr-2">✓</span> {feature}
                  </li>
                ))}
              </ul>
              <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                onClick={() => startCheckout(planId)}
              >
                {subscription ? 'Change Plan' : 'Subscribe'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 