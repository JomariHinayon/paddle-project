'use client';

import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { PADDLE_CONFIG } from '@/lib/paddle-config';
import { identifyPlan } from '@/lib/paddle-utils';

// Initialize Paddle with the client token
useEffect(() => {
  if (window.Paddle) {
    window.Paddle.Setup({
      vendor: PADDLE_CONFIG.clientToken,
      environment: 'sandbox', // Use 'sandbox' for testing, 'production' for live
    });
  }
}, []);

interface SubscriptionManagerProps {
  userId: string;
  onPlanChange?: (newPlan: string) => void;
  onCancel?: () => void;
}

interface Subscription {
  subscriptionId: string;
  status: string;
  planId: string;
  planName: string;
  nextBillDate: Timestamp | null;
  startDate: Timestamp | null;
  billingCycle: {
    interval: string;
    frequency: number;
  };
  canceledAt?: Timestamp;
  pausedAt?: Timestamp;
}

export default function SubscriptionManager({ userId, onPlanChange, onCancel }: SubscriptionManagerProps) {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [currentSubscription, setCurrentSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processingAction, setProcessingAction] = useState<string | null>(null);

  // Load subscriptions from Firestore
  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const db = getFirestore();
        const subscriptionsRef = collection(db, 'users', userId, 'subscriptions');
        const q = query(subscriptionsRef, where('status', '!=', 'canceled'));
        const querySnapshot = await getDocs(q);
        
        const subscriptionData: Subscription[] = [];
        querySnapshot.forEach((doc) => {
          subscriptionData.push(doc.data() as Subscription);
        });
        
        setSubscriptions(subscriptionData);
        
        // Find active subscription
        const activeSubscription = subscriptionData.find(sub => 
          sub.status === 'active' || sub.status === 'trialing'
        );
        
        if (activeSubscription) {
          setCurrentSubscription(activeSubscription);
        }
        
      } catch (err: any) {
        console.error('Error fetching subscriptions:', err);
        setError(err.message || 'Failed to load subscription data');
      } finally {
        setLoading(false);
      }
    };
    
    if (userId) {
      fetchSubscriptions();
    }
  }, [userId]);

  // Handle plan change
  const handlePlanChange = async (newPlanId: string) => {
    if (!currentSubscription || !currentSubscription.subscriptionId) {
      setError('No active subscription found');
      return;
    }
    
    try {
      setProcessingAction('changingPlan');
      
      // Get Firebase auth token for API request
      const auth = getAuth();
      const user = auth.currentUser;
      
      if (!user) {
        throw new Error('Not authenticated');
      }
      
      const idToken = await user.getIdToken();
      
      // Call our API to update the plan
      const response = await fetch('/api/subscriptions/update-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify({
          subscriptionId: currentSubscription.subscriptionId,
          newPlanId
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to update subscription plan');
      }
      
      // Refresh the subscription data
      const db = getFirestore();
      const subscriptionRef = doc(db, 'users', userId, 'subscriptions', currentSubscription.subscriptionId);
      const updatedDoc = await getDoc(subscriptionRef);
      
      if (updatedDoc.exists()) {
        const updatedSubscription = updatedDoc.data() as Subscription;
        setCurrentSubscription(updatedSubscription);
        
        if (onPlanChange) {
          onPlanChange(newPlanId);
        }
      }
      
    } catch (err: any) {
      console.error('Error updating subscription plan:', err);
      setError(err.message || 'Failed to update subscription plan');
    } finally {
      setProcessingAction(null);
    }
  };

  // Handle subscription cancellation
  const handleCancelSubscription = async (immediate: boolean = false) => {
    if (!currentSubscription || !currentSubscription.subscriptionId) {
      setError('No active subscription found');
      return;
    }
    
    if (!confirm(
      immediate 
        ? 'Are you sure you want to cancel your subscription immediately? You will lose access right away.' 
        : 'Are you sure you want to cancel your subscription? You will still have access until the end of your billing period.'
    )) {
      return;
    }
    
    try {
      setProcessingAction('cancelling');
      
      // Get Firebase auth token for API request
      const auth = getAuth();
      const user = auth.currentUser;
      
      if (!user) {
        throw new Error('Not authenticated');
      }
      
      const idToken = await user.getIdToken();
      
      // Call our API to cancel the subscription
      const response = await fetch('/api/subscriptions/cancel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify({
          subscriptionId: currentSubscription.subscriptionId,
          cancelImmediately: immediate
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to cancel subscription');
      }
      
      // Refresh the subscription data
      const db = getFirestore();
      const subscriptionRef = doc(db, 'users', userId, 'subscriptions', currentSubscription.subscriptionId);
      const updatedDoc = await getDoc(subscriptionRef);
      
      if (updatedDoc.exists()) {
        const updatedSubscription = updatedDoc.data() as Subscription;
        setCurrentSubscription(updatedSubscription);
        
        if (onCancel) {
          onCancel();
        }
      }
      
    } catch (err: any) {
      console.error('Error cancelling subscription:', err);
      setError(err.message || 'Failed to cancel subscription');
    } finally {
      setProcessingAction(null);
    }
  };

  // Redirect to Paddle Customer Portal
  const openCustomerPortal = () => {
    const paddleCustomerPortalUrl = 'https://sandbox-checkout.paddle.com/subscriptions';
    window.open(paddleCustomerPortalUrl, '_blank');
  };

  // Render loading state
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse flex flex-col space-y-4">
          <div className="h-4 bg-slate-200 rounded w-3/4"></div>
          <div className="h-10 bg-slate-200 rounded w-1/2"></div>
          <div className="h-4 bg-slate-200 rounded w-full"></div>
          <div className="h-4 bg-slate-200 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  // Render when no subscription is found
  if (!currentSubscription) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900">No Active Subscription</h3>
        <p className="mt-2 text-gray-600">You don't have an active subscription at the moment.</p>
        <button 
          onClick={() => window.location.href = '/pricing'} 
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          View Plans
        </button>
      </div>
    );
  }

  // Determine the current plan details
  const planInfo = identifyPlan(currentSubscription.planId);
  const planName = planInfo?.name || currentSubscription.planName || 'Unknown Plan';
  const isStandardPlan = planName.toLowerCase().includes('standard');
  const isPremiumPlan = planName.toLowerCase().includes('premium');
  
  // Format next billing date
  const nextBillingDate = currentSubscription.nextBillDate 
    ? new Date(currentSubscription.nextBillDate.seconds * 1000).toLocaleDateString() 
    : 'N/A';

  // Render subscription details
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900">Your Subscription</h3>
      
      {/* Current plan info */}
      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm font-medium text-blue-800">Current Plan</span>
            <h4 className="text-xl font-bold text-gray-900">{planName}</h4>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            currentSubscription.status === 'active' 
              ? 'bg-green-100 text-green-800' 
              : currentSubscription.status === 'paused'
                ? 'bg-amber-100 text-amber-800'
                : currentSubscription.status === 'canceled' 
                  ? 'bg-red-100 text-red-800'
                  : 'bg-blue-100 text-blue-800'
          }`}>
            {currentSubscription.status.charAt(0).toUpperCase() + currentSubscription.status.slice(1)}
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <span className="text-sm text-gray-500">Billing Cycle</span>
            <p className="font-medium">{`${currentSubscription.billingCycle?.interval || 'monthly'}`}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Next Billing Date</span>
            <p className="font-medium">{nextBillingDate}</p>
          </div>
        </div>
        
        {currentSubscription.status === 'canceled' && (
          <div className="mt-4 bg-red-50 border border-red-100 text-red-700 px-4 py-3 rounded-lg">
            <p className="text-sm">
              Your subscription has been canceled
              {currentSubscription.canceledAt 
                ? ` on ${new Date(currentSubscription.canceledAt.seconds * 1000).toLocaleDateString()}`
                : ''
              }.
              {currentSubscription.nextBillDate && new Date(currentSubscription.nextBillDate.seconds * 1000) > new Date()
                ? ` You will have access until ${new Date(currentSubscription.nextBillDate.seconds * 1000).toLocaleDateString()}.`
                : ''
              }
            </p>
          </div>
        )}
      </div>
      
      {/* Subscription management actions */}
      {currentSubscription.status === 'active' && (
        <div className="mt-6 space-y-4">
          <div className="border-t border-gray-200 pt-4">
            <h4 className="text-md font-medium text-gray-900 mb-2">Manage Your Subscription</h4>
            
            {/* Plan change options */}
            {isStandardPlan && (
              <div className="mb-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                <h5 className="font-medium text-gray-900">Upgrade to Premium</h5>
                <p className="text-sm text-gray-600 mt-1">Get access to all premium features</p>
                <button
                  onClick={() => handlePlanChange(PADDLE_CONFIG.prices.premium.month)}
                  disabled={processingAction === 'changingPlan'}
                  className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {processingAction === 'changingPlan' ? 'Upgrading...' : 'Upgrade Now'}
                </button>
              </div>
            )}
            
            {isPremiumPlan && (
              <div className="mb-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                <h5 className="font-medium text-gray-900">Downgrade to Standard</h5>
                <p className="text-sm text-gray-600 mt-1">Reduce cost with our standard plan</p>
                <button
                  onClick={() => handlePlanChange(PADDLE_CONFIG.prices.standard.month)}
                  disabled={processingAction === 'changingPlan'}
                  className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {processingAction === 'changingPlan' ? 'Downgrading...' : 'Downgrade Plan'}
                </button>
              </div>
            )}
            
            {/* Cancel subscription options */}
            <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <h5 className="font-medium text-gray-900">Cancel Subscription</h5>
              <p className="text-sm text-gray-600 mt-1">
                Cancel at end of billing period or immediately
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  onClick={() => handleCancelSubscription(false)}
                  disabled={processingAction === 'cancelling'}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {processingAction === 'cancelling' ? 'Processing...' : 'Cancel at Period End'}
                </button>
                <button
                  onClick={() => handleCancelSubscription(true)}
                  disabled={processingAction === 'cancelling'}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {processingAction === 'cancelling' ? 'Processing...' : 'Cancel Immediately'}
                </button>
              </div>
            </div>
            
            {/* Access Paddle Customer Portal */}
            <div className="mt-6">
              <button
                onClick={openCustomerPortal}
                className="w-full px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition flex items-center justify-center"
              >
                <span>Manage Subscription in Paddle Portal</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* For canceled subscription - option to resubscribe */}
      {currentSubscription.status === 'canceled' && (
        <div className="mt-6">
          <button
            onClick={() => window.location.href = '/pricing'}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Subscribe Again
          </button>
        </div>
      )}
    </div>
  );
} 