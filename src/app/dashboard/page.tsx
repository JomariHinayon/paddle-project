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
  const [showAllTransactions, setShowAllTransactions] = useState(false);

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
    
    if (event.name === 'checkout.completed' && user) {
      try {
        const db = getFirestore();
        const transactionsRef = collection(db, 'users', user.uid, 'transactions');
        
        console.log('Full Paddle checkout.completed payload:', JSON.stringify(event, null, 2));

        const item = event.data.items?.[0]; // Access the first item
        const transactionData = {
          userId: user.uid,
          paddleTransactionId: event.data.id ?? '',
          product: {
            id: item?.product?.id ?? '',
            name: item?.product?.name ?? ''
          },
          amountPaid: item?.totals?.total ?? 0,
          currency: event.data.currency_code ?? 'USD',
          paymentStatus: event.data.status ?? 'completed',
          customerEmail: event.data.customer?.email ?? user.email ?? '',
          timestamp: new Date()
        };
        
        console.log('Saving transaction data:', transactionData);
        
        await addDoc(transactionsRef, transactionData);
        console.log('Transaction saved to Firebase');

        // Update user's subscription status
        const userRef = doc(db, 'users', user.uid);
        await setDoc(userRef, {
          hasActiveSubscription: true,
          lastTransactionDate: new Date(),
          currentPlan: transactionData.product.id,
          subscriptionStatus: 'active'
        }, { merge: true });
      } catch (error) {
        console.error('Error saving transaction:', error);
        console.error('Event data:', event);
      }
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
          product: userData.product || null
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
      // Order by timestamp in descending order to show most recent first
      const q = query(transactionsRef, orderBy('timestamp', 'desc'));
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
                          : 'bg-slate-100 text-slate-800'
                      }`}>
                        {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                      </span>
                    </div>
                    
                    {subscription.product && (
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Current Plan</span>
                        <span className="font-medium text-slate-800">
                          {subscription.product.name || 'Unknown Plan'}
                        </span>
                      </div>
                    )}
                    
                    {subscription.lastTransaction && (
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Last Payment</span>
                        <span className="font-medium text-slate-800">
                          {new Date(subscription.lastTransaction).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Content Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Transaction Card */}
            {transactions.length > 0 && (
              <>
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-48 h-48 -translate-y-12 translate-x-12">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-emerald-50 to-blue-50 opacity-50" />
                  </div>
                  
                  <div className="flex items-center justify-between mb-6 relative">
                    <h2 className="text-xl font-semibold text-slate-800">Recent Transaction</h2>
                    <button
                      onClick={() => window.open('/transactions', '_blank')}
                      className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      See all →
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                    <div className="space-y-6">
                      <div>
                        <p className="text-sm text-slate-500 mb-1">Plan</p>
                        <p className="text-lg font-medium text-slate-900">{transactions[0].planDetails.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 mb-1">Amount Paid</p>
                        <p className="text-lg font-medium text-slate-900">
                          {transactions[0].amountPaid} {transactions[0].currency}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <p className="text-sm text-slate-500 mb-1">Date</p>
                        <p className="text-lg font-medium text-slate-900">
                          {new Date(transactions[0].timestamp.toDate()).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 mb-1">Transaction ID</p>
                        <p className="text-sm font-mono text-slate-600 break-all">
                          {transactions[0].paddleTransactionId}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Transaction History */}
                {/* <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-48 h-48 -translate-y-12 translate-x-12">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-50 to-blue-50 opacity-50" />
                  </div>
                  
                  <div className="flex items-center justify-between mb-6 relative">
                    <h2 className="text-xl font-semibold text-slate-800">Transaction History</h2>
                    <button
                      onClick={() => setShowAllTransactions(!showAllTransactions)}
                      className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      {showAllTransactions ? 'Hide' : 'See all'}
                    </button>
                  </div>
                  
                  {showAllTransactions && (
                    <div className="space-y-4 relative">
                      {transactions.map((transaction, index) => (
                        <div 
                          key={transaction.id}
                          className={`p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-all ${
                            index === 0 ? 'bg-blue-50/50' : 'bg-white'
                          }`}
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div>
                              <p className="text-sm text-slate-500">Plan</p>
                              <p className="font-medium text-slate-900">{transaction.planDetails.name}</p>
                            </div>
                            <div>
                              <p className="text-sm text-slate-500">Amount</p>
                              <p className="font-medium text-slate-900">
                                {transaction.amountPaid} {transaction.currency}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-slate-500">Date</p>
                              <p className="font-medium text-slate-900">
                                {new Date(transaction.timestamp.toDate()).toLocaleDateString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-slate-500">Status</p>
                              <span className={`inline-block px-2 py-1 rounded-full text-sm font-medium ${
                                transaction.paymentStatus === 'completed'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-slate-100 text-slate-800'
                              }`}>
                                {transaction.paymentStatus.charAt(0).toUpperCase() + transaction.paymentStatus.slice(1)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {!showAllTransactions && transactions.length > 1 && (
                    <p className="text-sm text-slate-500">
                      You have {transactions.length - 1} more transaction{transactions.length - 1 !== 1 ? 's' : ''}. Click 'See all' to view them.
                    </p>
                  )}
                </div> */}
              </>
            )}

            {/* Subscription Plans */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 -translate-y-48 translate-x-48">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-violet-50 to-purple-50 opacity-50" />
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 relative">
                <h2 className="text-xl font-semibold text-slate-800">Subscription Plans</h2>
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
                <div className="group relative border border-slate-200 rounded-2xl p-6 hover:shadow-md hover:border-slate-300 transition-all duration-300">
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
                      disabled={!paddleLoaded}
                      className={`w-full py-3 px-4 rounded-xl transition-all ${
                        paddleLoaded 
                          ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow group-hover:shadow-md' 
                          : 'bg-slate-200 cursor-not-allowed text-slate-500'
                      }`}
                    >
                      {paddleLoaded ? `Get Standard ${billingCycle === 'month' ? 'Monthly' : 'Yearly'}` : 'Loading...'}
                    </button>
                  </div>
                </div>

                {/* Premium Plan */}
                <div className="group relative border-2 border-violet-200 rounded-2xl p-6 hover:shadow-md hover:border-violet-300 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-50 to-indigo-50 opacity-50 group-hover:opacity-100 transition-opacity rounded-2xl" />
                  
                  <div className="absolute -top-4 left-4">
                    <span className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-4 py-1 rounded-full text-sm font-medium shadow-sm">
                      Popular
                    </span>
                  </div>
                  
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
                      disabled={!paddleLoaded}
                      className={`w-full py-3 px-4 rounded-xl transition-all ${
                        paddleLoaded 
                          ? 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-sm hover:shadow group-hover:shadow-md' 
                          : 'bg-slate-200 cursor-not-allowed text-slate-500'
                      }`}
                    >
                      {paddleLoaded ? `Get Premium ${billingCycle === 'month' ? 'Monthly' : 'Yearly'}` : 'Loading...'}
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
