'use client';

import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import ManageSubscriptionButton from '@/components/ManageSubscriptionButton';
import SubscriptionPortalButton from '@/components/SubscriptionPortalButton';

export default function AccountPage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [subscriptionData, setSubscriptionData] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
        
        // Fetch subscription data from Firestore
        try {
          const db = getFirestore();
          const userRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userRef);
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            
            // Check if user has subscription data
            if (userData.hasActiveSubscription && userData.currentSubscriptionId) {
              setSubscriptionData({
                status: userData.subscriptionStatus || 'unknown',
                plan: userData.currentPlan || 'unknown',
                nextBillDate: userData.nextBillDate ? new Date(userData.nextBillDate.toDate()).toLocaleDateString() : 'unknown',
                customerId: userData.paddleCustomerId || null,
              });
            }
          }
        } catch (error) {
          console.error('Error fetching subscription data:', error);
        }
        
        setLoading(false);
      } else {
        setIsAuthenticated(false);
        router.push('/login'); // Redirect to login if not authenticated
      }
    });

    return () => unsubscribe();
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
        <SubscriptionPortalButton />
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
            <ManageSubscriptionButton 
              variant="primary"
              returnUrl={`${window.location.origin}/account`}
            />
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