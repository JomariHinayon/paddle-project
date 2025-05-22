'use client';

// Force static export for Netlify
export const dynamic = "force-static";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Import directly with relative paths instead of using @ alias
import ManageSubscriptionButton from '../../components/ManageSubscriptionButton';
import SubscriptionPortalButton from '../../components/SubscriptionPortalButton';

export default function AccountPage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [subscriptionData, setSubscriptionData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // For static export, we'll simulate a logged-in user
    setTimeout(() => {
      setIsAuthenticated(true);
      setUser({
        email: 'example@test.com',
        uid: 'test-uid-12345'
      });
      setSubscriptionData({
        status: 'active',
        plan: 'Premium',
        nextBillDate: '12/31/2023',
        customerId: 'cus_test12345'
      });
      setLoading(false);
    }, 500);
  }, [router]);

  if (isAuthenticated === null) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Account Management</h1>
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Subscription Management</h2>
        <p className="mb-4">
          Manage your subscription settings, billing information, and payment methods.
        </p>
        {SubscriptionPortalButton && (
          <SubscriptionPortalButton />
        )}
      </div>
      
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{user?.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">User ID</p>
            <p className="font-mono text-sm truncate">{user?.uid}</p>
          </div>
        </div>
      </div>
      
      {subscriptionData ? (
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Subscription</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-500">Plan</p>
              <p className="font-medium">{subscriptionData.plan}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                subscriptionData.status === 'active' ? 'bg-green-100 text-green-800' : 
                subscriptionData.status === 'paused' ? 'bg-yellow-100 text-yellow-800' : 
                'bg-gray-100 text-gray-800'
              }`}>
                {subscriptionData.status}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Next Billing Date</p>
              <p className="font-medium">{subscriptionData.nextBillDate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Customer ID</p>
              <p className="font-mono text-sm truncate">{subscriptionData.customerId}</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            {ManageSubscriptionButton && (
              <ManageSubscriptionButton 
                variant="primary"
                returnUrl={typeof window !== 'undefined' ? `${window.location.origin}/account` : '/account'}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Subscription</h2>
          <p className="text-gray-500 mb-4">You don't have an active subscription.</p>
          <a 
            href="/pricing" 
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            View Pricing
          </a>
        </div>
      )}
    </div>
  );
} 