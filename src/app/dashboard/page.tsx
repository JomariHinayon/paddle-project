'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import LogoutButton from '@/components/LogoutButton';
import UserProfileCard from '@/components/UserProfileCard';
import Script from 'next/script';
import { PADDLE_CONFIG, type PlanType, type BillingCycle } from '@/lib/paddle-config';
import { getFirestore, doc, setDoc, collection, addDoc, getDoc, getDocs } from 'firebase/firestore';
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
          lastTransaction: userData.lastTransactionDate?.toDate() || null
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
      const transactionsSnap = await getDocs(transactionsRef);
      
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
    <div className="min-h-screen bg-gray-50">
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
      
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <span className="text-xl font-semibold">Dashboard</span>
            <div className="flex items-center space-x-4">
              <LogoutButton className="text-gray-700 hover:text-gray-900" />
            </div>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <UserProfileCard user={user} />
          </div>
          
          <div className="md:col-span-2 space-y-6">
            {subscription && (
              <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                <h2 className="text-lg font-semibold mb-2">Current Subscription</h2>
                <div className="space-y-2">
                  <p className="text-sm">
                    Status: <span className={`font-medium ${
                      subscription.status === 'active' ? 'text-green-600' : 'text-gray-600'
                    }`}>
                      {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                    </span>
                  </p>
                  {subscription.plan && (
                    <p className="text-sm">
                      Plan: <span className="font-medium">{subscription.plan}</span>
                    </p>
                  )}
                  {subscription.lastTransaction && (
                    <p className="text-sm">
                      Last Updated: <span className="font-medium">
                        {new Date(subscription.lastTransaction).toLocaleDateString()}
                      </span>
                    </p>
                  )}
                </div>
                {transactions.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-sm font-medium mb-2">Transaction History</h3>
                    <div className="space-y-2">
                      {transactions.map(tx => (
                        <div key={tx.id} className="text-sm border-t pt-2">
                          <p className="text-gray-600">
                            Plan: <span className="font-medium">{tx.planDetails.name}</span>
                          </p>
                          <p className="text-gray-600">
                            Amount: <span className="font-medium">
                              {tx.amountPaid} {tx.currency}
                            </span>
                          </p>
                          <p className="text-gray-600">
                            Date: <span className="font-medium">
                              {new Date(tx.timestamp.toDate()).toLocaleDateString()}
                            </span>
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-800">Subscription Plans</h2>
                <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
                  <button
                    onClick={() => setBillingCycle('month')}
                    className={`px-4 py-2 rounded-md transition-colors ${
                      billingCycle === 'month'
                        ? 'bg-white shadow text-gray-800'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setBillingCycle('year')}
                    className={`px-4 py-2 rounded-md transition-colors ${
                      billingCycle === 'year'
                        ? 'bg-white shadow text-gray-800'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    Yearly
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold mb-2">Standard Plan</h3>
                  <p className="text-gray-600 mb-4">
                    {billingCycle === 'month' 
                      ? 'Perfect for getting started' 
                      : 'Save more with yearly billing'}
                  </p>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-gray-900">
                      {prices.standard || 'Loading...'}
                    </span>
                    <span className="text-gray-600">/{billingCycle}</span>
                  </div>
                  <button
                    onClick={() => handleSubscription('standard')}
                    disabled={!paddleLoaded}
                    className={`w-full py-2 px-4 rounded-md transition-colors ${
                      paddleLoaded 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                        : 'bg-gray-300 cursor-not-allowed text-gray-500'
                    }`}
                  >
                    {paddleLoaded ? `Get Standard ${billingCycle === 'month' ? 'Monthly' : 'Yearly'}` : 'Loading...'}
                  </button>
                </div>

                <div className="border border-violet-200 rounded-lg p-6 hover:shadow-lg transition-shadow bg-violet-50">
                  <div className="absolute -mt-10 ml-4">
                    <span className="bg-violet-600 text-white px-3 py-1 rounded-full text-sm font-medium">Popular</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Premium Plan</h3>
                  <p className="text-gray-600 mb-4">
                    {billingCycle === 'month' 
                      ? 'Access all premium features' 
                      : 'Best value for full access'}
                  </p>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-gray-900">
                      {prices.premium || 'Loading...'}
                    </span>
                    <span className="text-gray-600">/{billingCycle}</span>
                  </div>
                  <button
                    onClick={() => handleSubscription('premium')}
                    disabled={!paddleLoaded}
                    className={`w-full py-2 px-4 rounded-md transition-colors ${
                      paddleLoaded 
                        ? 'bg-violet-600 hover:bg-violet-700 text-white' 
                        : 'bg-gray-300 cursor-not-allowed text-gray-500'
                    }`}
                  >
                    {paddleLoaded ? `Get Premium ${billingCycle === 'month' ? 'Monthly' : 'Yearly'}` : 'Loading...'}
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <button
                onClick={testFirebaseWrite}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Test Firebase Write
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
