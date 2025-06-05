'use client';

import { useState, useEffect } from 'react';
import { PADDLE_CONFIG } from '@/lib/paddle-config';
import { identifyPlan } from '@/lib/paddle-utils';
import { getAuth } from 'firebase/auth';

export default function SubscriptionStatusCard({ subscription, userEmail, className = '' }) {
  // Format dates from Firestore timestamp or Date object
  const formatDate = (date) => {
    if (!date) return 'N/A';
    
    // Handle Firestore timestamp
    if (date.seconds) {
      return new Date(date.seconds * 1000).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
    
    // Handle normal date object or ISO string
    return new Date(date).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get plan info
  const planInfo = subscription.planId ? identifyPlan(subscription.planId) : null;
  const planName = subscription.planName || (planInfo?.name || 'Unknown Plan');
  
  // Format the next billing date
  const nextBillingDate = subscription.nextBillDate ? formatDate(subscription.nextBillDate) : 'N/A';
  
  // Determine if there's a scheduled cancellation
  const hasScheduledCancellation = subscription.scheduledChange && 
    subscription.scheduledChange.action === 'cancel' &&
    subscription.status === 'active';
  
  // Format the cancellation date if scheduled
  const cancellationDate = hasScheduledCancellation && subscription.scheduledChange ? 
    formatDate(subscription.scheduledChange.effective_at) : 'N/A';

  // Modal state
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [isCancelling, setIsCancelling] = useState(false);
  const [cancelError, setCancelError] = useState('');
  const [cancelSuccess, setCancelSuccess] = useState('');

  // Cancel subscription handler
  const handleCancelSubscription = async () => {
    setIsCancelling(true);
    setCancelError('');
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) throw new Error('Not authenticated');
      const idToken = await user.getIdToken();
      const res = await fetch('/api/subscriptions/cancel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify({
          subscriptionId: subscription.id,
          reason: cancelReason,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to cancel subscription');
      setCancelSuccess('Subscription cancelled successfully.');
      setShowCancelModal(false);
      window.location.reload();
    } catch (err) {
      setCancelError(err.message || 'Failed to cancel subscription');
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Subscription Status</h3>
      
      {/* Current plan info */}
      <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm font-medium text-blue-800">Current Plan</span>
            <h4 className="text-xl font-bold text-gray-900">{planName}</h4>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            subscription.status === 'active' 
              ? 'bg-green-100 text-green-800' 
              : subscription.status === 'paused'
                ? 'bg-amber-100 text-amber-800'
                : subscription.status === 'canceled' 
                  ? 'bg-red-100 text-red-800'
                  : 'bg-blue-100 text-blue-800'
          }`}>
            {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">Subscription ID</span>
            <span className="font-mono text-xs text-gray-600">{subscription.id}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Next Billing Date</span>
            <span className="font-medium">{nextBillingDate}</span>
          </div>
        </div>
        
        {/* Display scheduled cancellation notice */}
        {hasScheduledCancellation && (
          <div className="mt-4 bg-amber-50 border border-amber-100 text-amber-800 px-4 py-3 rounded-lg">
            <div className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="font-medium">This subscription is scheduled to be canceled on {cancellationDate}</p>
                <p className="text-sm mt-1">Your access will continue until this date.</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Display cancellation notice if already canceled */}
        {subscription.status === 'canceled' && (
          <div className="mt-4 bg-red-50 border border-red-100 text-red-700 px-4 py-3 rounded-lg">
            <p className="text-sm">
              Your subscription has been canceled
              {subscription.canceledAt 
                ? ` on ${formatDate(subscription.canceledAt)}`
                : ''
              }.
            </p>
          </div>
        )}
      </div>
      
      {/* Portal access button replaced with Cancel Subscription */}
      <div className="mt-6">
        <button
          onClick={() => setShowCancelModal(true)}
          className="flex items-center justify-center w-full py-2 px-4 text-sm font-medium text-red-600 hover:text-white bg-red-50 hover:bg-red-600 hover:bg-opacity-90 rounded-lg transition-colors border border-red-200"
        >
          Cancel Subscription
        </button>
      </div>

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h4 className="text-lg font-semibold mb-2 text-gray-900">Cancel Subscription</h4>
            <p className="text-sm text-gray-700 mb-4">Please let us know why you're cancelling:</p>
            <textarea
              className="w-full border border-gray-300 rounded p-2 mb-4"
              rows={3}
              value={cancelReason}
              onChange={e => setCancelReason(e.target.value)}
              placeholder="Reason for cancellation (optional)"
            />
            {cancelError && <div className="text-red-600 text-sm mb-2">{cancelError}</div>}
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                onClick={() => setShowCancelModal(false)}
                disabled={isCancelling}
              >
                Close
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                onClick={handleCancelSubscription}
                disabled={isCancelling}
              >
                {isCancelling ? 'Cancelling...' : 'Confirm Cancel Subscription'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 