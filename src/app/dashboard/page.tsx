'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import LogoutButton from '@/components/LogoutButton';
import UserProfileCard from '@/components/UserProfileCard';
import Script from 'next/script';
import { PADDLE_CONFIG, type PlanType, type BillingCycle } from '@/lib/paddle-config';

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Script 
        src="https://cdn.paddle.com/paddle/v2/paddle.js"
        onLoad={() => {
          if (typeof window !== 'undefined' && window.Paddle) {
            window.Paddle.Environment.set('sandbox');
            window.Paddle.Setup({ 
              token: PADDLE_CONFIG.clientToken,
              eventCallback: (data: any) => {
                console.log('Paddle event:', data);
              }
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
          </div>
        </div>
      </main>
    </div>
  );
}
