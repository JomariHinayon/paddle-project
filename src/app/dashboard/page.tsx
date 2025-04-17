'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import LogoutButton from '@/components/LogoutButton';
import UserProfileCard from '@/components/UserProfileCard';
import Script from 'next/script';
import { PADDLE_CONFIG, type PlanType, type BillingCycle } from '@/lib/paddle-config';
import { getFirestore, doc, setDoc, collection, addDoc, getDoc, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { identifyPlan } from '@/lib/paddle-utils';

declare global {
  interface Window {
    Paddle: any;
  }
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(auth.currentUser);
  const [paddleLoaded, setPaddleLoaded] = useState(false);
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('month');
  const [prices, setPrices] = useState<{[key in PlanType]?: string}>({});
  const [subscription, setSubscription] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace('/login');
        return;
      }
      setUser(user);
    });

    return () => unsubscribe();
  }, [router]);

  const updatePrices = async () => {
    if (!paddleLoaded) {
      console.error('Paddle is not loaded yet');
      return;
    }

    try {
      const request = {
        items: [
          {
            quantity: 1,
            priceId: PADDLE_CONFIG.prices.standard[billingCycle]
          },
          {
            quantity: 1,
            priceId: PADDLE_CONFIG.prices.premium[billingCycle]
          }
        ]
      };

      const result = await window.Paddle.PricePreview(request);
      const newPrices: {[key in PlanType]?: string} = {};

      result.data.details.lineItems.forEach((item: any) => {
        if (item.price.id === PADDLE_CONFIG.prices.standard[billingCycle]) {
          newPrices.standard = item.formattedTotals.subtotal;
        } else if (item.price.id === PADDLE_CONFIG.prices.premium[billingCycle]) {
          newPrices.premium = item.formattedTotals.subtotal;
        }
      });

      setPrices(newPrices);
    } catch (error) {
      console.error('Error fetching prices:', error);
    }
  };

  useEffect(() => {
    if (paddleLoaded) {
      updatePrices();
    }
  }, [paddleLoaded, billingCycle]);

  const handleSubscription = (plan: PlanType) => {
    if (!paddleLoaded) {
      console.error('Paddle is not loaded yet');
      return;
    }

    window.Paddle.Checkout.open({
      items: [{
        priceId: PADDLE_CONFIG.prices[plan][billingCycle],
        quantity: 1
      }],
      settings: {
        displayMode: 'overlay',
        theme: 'light',
        variant: 'one-page'
      },
      customer: {
        email: user?.email || '',
      },
      customData: {
        userId: user?.uid || ''
      }
    });
  };

  const testFirebaseWrite = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      
      if (!user) {
        console.log('No user logged in');
        return;
      }

      console.log('Current user UID:', user.uid);
      
      const db = getFirestore();
      const testRef = doc(db, 'users', user.uid, 'tests', new Date().toISOString());
      
      await setDoc(testRef, {
        timestamp: new Date(),
        testData: 'Test write to Firebase',
        userId: user.uid
      });
      
      console.log('Test data written successfully');
    } catch (error) {
      console.error('Error writing test data:', error);
    }
  };

  const handlePaddleEvent = async (event: any) => {
    console.log('Paddle event:', event);

    // Only process events that have a valid subscription ID - not just checkout completion
    if (event.name === 'subscription.created' && user) {
      try {
        const db = getFirestore();
        const transactionsRef = collection(db, 'users', user.uid, 'transactions');

        console.log('Full Paddle subscription.created payload:', JSON.stringify(event, null, 2));

        const item = event.data.items?.[0];
        const subscriptionId = event.data.id;
        
        // Ensure we have a valid subscription ID
        if (!subscriptionId) {
          console.log('No valid subscription ID in event, not saving to Firebase');
          return;
        }
        
        const transactionData = {
          userId: user.uid,
          subscriptionId: subscriptionId,
          product: {
            id: item?.product?.id ?? '',
            name: item?.product?.name ?? ''
          },
          amountPaid: item?.totals?.total ?? 0,
          currency: item?.price?.unit_price?.currency_code ?? 'USD',
          paymentStatus: event.data.status ?? 'active',
          customerEmail: event.data.customer?.email ?? user.email ?? '',
          customerId: event.data.customer?.id ?? '',
          nextBillDate: event.data.next_billed_at ? new Date(event.data.next_billed_at) : null,
          startDate: event.data.started_at ? new Date(event.data.started_at) : null,
          quantity: item?.quantity ?? 1,
          timestamp: new Date()
        };

        console.log('Subscription transaction data:', transactionData);

        // Save transaction with the subscription ID as the document ID.
        await setDoc(doc(transactionsRef, subscriptionId), transactionData);
        console.log('Subscription saved to Firebase');

        // Update user's subscription status
        const userRef = doc(db, 'users', user.uid);
        await setDoc(userRef, {
          hasActiveSubscription: true,
          lastTransactionDate: new Date(),
          currentPlan: transactionData.product.id,
          subscriptionStatus: 'active',
          currentSubscriptionId: subscriptionId
        }, { merge: true });
      } catch (error) {
        console.error('Error saving subscription data:', error);
        console.error('Event data:', event);
      }
    } else if (event.name === 'checkout.completed') {
      // Just log the checkout completion without saving to Firebase
      console.log('Checkout completed. Waiting for subscription.created event.');
    }
  };

  const fetchSubscriptionStatus = async (userId: string) => {
    try {
      const db = getFirestore();
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setSubscription({
          hasActive: userData.hasActiveSubscription || false,
          plan: userData.currentPlan || null,
          status: userData.subscriptionStatus || 'inactive',
          lastTransaction: userData.lastTransactionDate?.toDate() || null,
          product: userData.product || null,
          customerId: userData.paddleCustomerId || null,
          subscriptionId: userData.currentSubscriptionId || null,
          nextBillDate: userData.nextBillDate?.toDate() || null,
          canceledAt: userData.subscriptionCanceledAt?.toDate() || null
        });
        console.log('Subscription status:', userData);
      }
    } catch (error) {
      console.error('Error fetching subscription:', error);
    }
  };

  const fetchTransactionLogs = async (userId: string) => {
    try {
      const db = getFirestore();
      const transactionsRef = collection(db, 'users', userId, 'transactions');
      // Order by timestamp in descending order and limit to 1
      const q = query(transactionsRef, orderBy('timestamp', 'desc'), limit(1));
      const transactionsSnap = await getDocs(q);
      
      const logs = transactionsSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        planDetails: identifyPlan(doc.data().product.id)
      }));
      
      setTransactions(logs);
      console.log('Transaction logs:', logs);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    if (user?.uid) {
      fetchSubscriptionStatus(user.uid);
      fetchTransactionLogs(user.uid);
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Script 
        src="https://cdn.paddle.com/paddle/v2/paddle.js"
        onLoad={() => {
          if (typeof window !== 'undefined' && window.Paddle) {
            window.Paddle.Environment.set('sandbox');
            window.Paddle.Setup({ 
              token: PADDLE_CONFIG.clientToken,
              eventCallback: handlePaddleEvent
            });
            setPaddleLoaded(true);
          }
        }}
      />
      
      {/* Modern Navigation Bar with Glass Effect */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Dashboard
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <LogoutButton className="text-slate-700 hover:text-slate-900" />
            </div>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {subscription && subscription.hasActive && (
          <div className="mb-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-md overflow-hidden">
            <div className="px-6 py-8 md:px-8 md:py-8 relative">
              <div className="absolute top-0 right-0 w-64 h-64 -translate-y-24 translate-x-24 rounded-full bg-white/10 opacity-50" />
              <div className="absolute bottom-0 left-0 w-48 h-48 translate-y-20 -translate-x-16 rounded-full bg-white/5 opacity-50" />
              
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <h1 className="text-2xl font-bold text-white mb-2">
                    Welcome, {user?.displayName || user?.email?.split('@')[0]}!
                  </h1>
                  <p className="text-blue-100 max-w-md">
                    Your {subscription.plan && identifyPlan(subscription.plan)?.name} subscription is active. 
                    Enjoy full access to all premium features.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {subscription.nextBillDate && (
                    <div className="bg-white/15 backdrop-blur-sm px-4 py-2 rounded-lg">
                      <p className="text-xs text-blue-100 font-medium">NEXT BILLING</p>
                      <p className="text-white font-medium">
                        {new Date(subscription.nextBillDate).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                  <div className="bg-white/15 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <p className="text-xs text-blue-100 font-medium">STATUS</p>
                    <p className="text-white font-medium capitalize">{subscription.status}</p>
                  </div>
                  {transactions.length > 0 && transactions[0].amountPaid && (
                    <div className="bg-white/15 backdrop-blur-sm px-4 py-2 rounded-lg">
                      <p className="text-xs text-blue-100 font-medium">PLAN</p>
                      <p className="text-white font-medium">
                        {transactions[0].planDetails?.name || subscription.plan}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {(!subscription || !subscription.hasActive) && (
          <div className="mb-8 bg-gradient-to-r from-slate-700 to-slate-800 rounded-2xl shadow-md overflow-hidden">
            <div className="px-6 py-8 md:px-8 md:py-8 relative">
              <div className="absolute top-0 right-0 w-64 h-64 -translate-y-24 translate-x-24 rounded-full bg-white/10 opacity-20" />
              
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <h1 className="text-2xl font-bold text-white mb-2">
                    Welcome to Your Dashboard
                  </h1>
                  <p className="text-slate-300 max-w-md mb-4">
                    Unlock all premium features by subscribing to one of our plans below.
                    Get started today and experience the full power of our platform.
                  </p>
                  <button
                    onClick={() => {
                      // Scroll to the subscription plans section
                      document.getElementById('subscription-plans')?.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'center'
                      });
                    }}
                    className="px-6 py-2.5 bg-white text-slate-800 hover:bg-slate-100 rounded-lg font-medium transition-colors"
                  >
                    View Plans
                  </button>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-5 rounded-xl hidden md:block">
                  <div className="flex items-center space-x-3 text-white mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-300" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Access all premium features</span>
                  </div>
                  <div className="flex items-center space-x-3 text-white mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-300" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Priority customer support</span>
                  </div>
                  <div className="flex items-center space-x-3 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-300" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Cancel anytime</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile and Subscription Info Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <UserProfileCard user={user} />
              
              {subscription && (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 -translate-y-8 translate-x-8">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 opacity-50" />
                  </div>
                  
                  <h2 className="text-lg font-semibold text-slate-800 mb-4 relative">Subscription Status</h2>
                  <div className="space-y-4 relative">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Status</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        subscription.status === 'active' 
                          ? 'bg-emerald-100 text-emerald-800'
                          : subscription.status === 'canceled'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-slate-100 text-slate-800'
                      }`}>
                        {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                      </span>
                    </div>
                    
                    {transactions.length > 0 && (
                      <>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-600">Plan</span>
                          <span className="font-medium text-sm px-3 py-1 bg-blue-50 text-blue-700 rounded-full">
                            {transactions[0].planDetails?.name || 'Unknown Plan'}
                          </span>
                        </div>

                        {transactions[0].subscriptionId && (
                          <div className="flex items-center justify-between">
                            <span className="text-slate-600">Subscription ID</span>
                            <span className="font-mono text-xs text-slate-600 truncate max-w-[150px]" title={transactions[0].subscriptionId}>
                              {transactions[0].subscriptionId}
                            </span>
                          </div>
                        )}

                        {transactions[0].nextBillDate && (
                          <div className="flex items-center justify-between">
                            <span className="text-slate-600">Next Billing</span>
                            <span className="font-medium text-slate-800">
                              {new Date(transactions[0].nextBillDate.seconds * 1000).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                      </>
                    )}
                    
                    {subscription.lastTransaction && (
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Last Payment</span>
                        <span className="font-medium text-slate-800">
                          {new Date(subscription.lastTransaction).toLocaleDateString()}
                        </span>
                      </div>
                    )}

                    <div className="mt-6 pt-4 border-t border-slate-100">
                      <a 
                        href={`https://sandbox-checkout.paddle.com/subscriptions`} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-full py-2 px-4 text-sm font-medium text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                      >
                        Manage Subscription
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Content Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Transaction Card */}
            {transactions.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-48 h-48 -translate-y-12 translate-x-12">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-emerald-50 to-blue-50 opacity-50" />
                </div>
                
                <div className="flex items-center justify-between mb-6 relative">
                  <h2 className="text-xl font-semibold text-slate-800">Subscription Details</h2>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium 
                    ${transactions[0].paymentStatus === 'active' 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-blue-100 text-blue-800'}`
                  }>
                    {transactions[0].paymentStatus || 'Active'}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                  <div className="space-y-6">
                    <div>
                      <p className="text-sm text-slate-500 mb-1">Plan</p>
                      <div className="flex items-center">
                        <span className="text-lg font-medium text-slate-900 mr-2">{transactions[0].planDetails?.name || 'Standard'}</span>
                        {transactions[0].product?.id && (
                          <span className="text-xs px-2 py-1 bg-slate-100 rounded-md text-slate-600">ID: {transactions[0].product.id}</span>
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 mb-1">Amount Paid</p>
                      <p className="text-lg font-medium text-slate-900">
                        {transactions[0].amountPaid} {transactions[0].currency}
                      </p>
                    </div>
                    {transactions[0].nextBillDate && (
                      <div>
                        <p className="text-sm text-slate-500 mb-1">Next Billing Date</p>
                        <p className="text-lg font-medium text-slate-900">
                          {new Date(transactions[0].nextBillDate.seconds * 1000).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <p className="text-sm text-slate-500 mb-1">Purchase Date</p>
                      <p className="text-lg font-medium text-slate-900">
                        {new Date(transactions[0].timestamp.toDate()).toLocaleDateString()}
                      </p>
                    </div>
                    {transactions[0].startDate && (
                      <div>
                        <p className="text-sm text-slate-500 mb-1">Subscription Start</p>
                        <p className="text-lg font-medium text-slate-900">
                          {new Date(transactions[0].startDate.seconds * 1000).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-slate-500 mb-1">Subscription ID</p>
                      <p className="text-sm font-mono text-slate-600 break-all">
                        {transactions[0].subscriptionId}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <p className="text-sm text-slate-500 mb-4">Thank you for your subscription! Your access is now active.</p>
                  <div className="flex flex-wrap gap-3">
                    <button 
                      onClick={() => window.open('https://sandbox-checkout.paddle.com/subscriptions', '_blank')}
                      className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                    >
                      Manage Subscription
                    </button>
                    <button 
                      onClick={() => fetchTransactionLogs(user!.uid)}
                      className="inline-flex items-center px-4 py-2 bg-slate-50 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors text-sm font-medium"
                    >
                      Refresh Data
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Subscription Plans */}
            <div id="subscription-plans" className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 -translate-y-48 translate-x-48">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-violet-50 to-purple-50 opacity-50" />
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 relative">
                <div>
                  <h2 className="text-xl font-semibold text-slate-800">Subscription Plans</h2>
                  <p className="text-slate-500 mt-1">Choose the perfect plan for your needs</p>
                </div>
                <div className="flex p-1 bg-slate-100 rounded-lg">
                  <button
                    onClick={() => setBillingCycle('month')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      billingCycle === 'month'
                        ? 'bg-white shadow-sm text-slate-800'
                        : 'text-slate-600 hover:text-slate-800'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setBillingCycle('year')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      billingCycle === 'year'
                        ? 'bg-white shadow-sm text-slate-800'
                        : 'text-slate-600 hover:text-slate-800'
                    }`}
                  >
                    Yearly
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                {/* Standard Plan */}
                <div className={`group relative border ${subscription?.plan && identifyPlan(subscription.plan)?.name === 'Standard Plan' ? 'border-blue-300 bg-blue-50/30' : 'border-slate-200'} rounded-2xl p-6 hover:shadow-md hover:border-slate-300 transition-all duration-300`}>
                  {subscription?.plan && identifyPlan(subscription.plan)?.name === 'Standard Plan' && (
                    <div className="absolute -top-3 right-6">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                        Current Plan
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-slate-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                  
                  <div className="relative">
                    <h3 className="text-xl font-semibold text-slate-800 mb-2">Standard Plan</h3>
                    <p className="text-slate-600 mb-4">
                      {billingCycle === 'month' 
                        ? 'Perfect for getting started' 
                        : 'Save more with yearly billing'}
                    </p>
                    <div className="mb-6">
                      <span className="text-3xl font-bold text-slate-900">
                        {prices.standard || 'Loading...'}
                      </span>
                      <span className="text-slate-600">/{billingCycle}</span>
                    </div>
                    <button
                      onClick={() => handleSubscription('standard')}
                      disabled={!paddleLoaded || (subscription?.plan && identifyPlan(subscription.plan)?.name === 'Standard Plan' && subscription?.status === 'active')}
                      className={`w-full py-3 px-4 rounded-xl transition-all ${
                        !paddleLoaded 
                          ? 'bg-slate-200 cursor-not-allowed text-slate-500'
                          : subscription?.plan && identifyPlan(subscription.plan)?.name === 'Standard Plan' && subscription?.status === 'active'
                            ? 'bg-blue-100 text-blue-800 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow group-hover:shadow-md'
                      }`}
                    >
                      {!paddleLoaded 
                        ? 'Loading...' 
                        : subscription?.plan && identifyPlan(subscription.plan)?.name === 'Standard Plan' && subscription?.status === 'active'
                          ? 'Current Plan'
                          : `Get Standard ${billingCycle === 'month' ? 'Monthly' : 'Yearly'}`
                      }
                    </button>
                  </div>
                </div>

                {/* Premium Plan */}
                <div className={`group relative border-2 ${subscription?.plan && identifyPlan(subscription.plan)?.name === 'Premium Plan' ? 'border-violet-300 bg-violet-50/30' : 'border-violet-200'} rounded-2xl p-6 hover:shadow-md hover:border-violet-300 transition-all duration-300`}>
                  {subscription?.plan && identifyPlan(subscription.plan)?.name === 'Premium Plan' ? (
                    <div className="absolute -top-3 right-6">
                      <span className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                        Current Plan
                      </span>
                    </div>
                  ) : (
                    <div className="absolute -top-4 left-4">
                      <span className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-4 py-1 rounded-full text-sm font-medium shadow-sm">
                        Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-50 to-indigo-50 opacity-50 group-hover:opacity-100 transition-opacity rounded-2xl" />
                  
                  <div className="relative">
                    <h3 className="text-xl font-semibold text-slate-800 mb-2">Premium Plan</h3>
                    <p className="text-slate-600 mb-4">
                      {billingCycle === 'month' 
                        ? 'Access all premium features' 
                        : 'Best value for full access'}
                    </p>
                    <div className="mb-6">
                      <span className="text-3xl font-bold text-slate-900">
                        {prices.premium || 'Loading...'}
                      </span>
                      <span className="text-slate-600">/{billingCycle}</span>
                    </div>
                    <button
                      onClick={() => handleSubscription('premium')}
                      disabled={!paddleLoaded || (subscription?.plan && identifyPlan(subscription.plan)?.name === 'Premium Plan' && subscription?.status === 'active')}
                      className={`w-full py-3 px-4 rounded-xl transition-all ${
                        !paddleLoaded 
                          ? 'bg-slate-200 cursor-not-allowed text-slate-500'
                          : subscription?.plan && identifyPlan(subscription.plan)?.name === 'Premium Plan' && subscription?.status === 'active'
                            ? 'bg-violet-100 text-violet-800 cursor-not-allowed'
                            : 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-sm hover:shadow group-hover:shadow-md'
                      }`}
                    >
                      {!paddleLoaded 
                        ? 'Loading...' 
                        : subscription?.plan && identifyPlan(subscription.plan)?.name === 'Premium Plan' && subscription?.status === 'active'
                          ? 'Current Plan'
                          : `Get Premium ${billingCycle === 'month' ? 'Monthly' : 'Yearly'}`
                      }
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
