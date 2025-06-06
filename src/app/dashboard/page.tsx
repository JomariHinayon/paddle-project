'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import LogoutButton from '@/components/LogoutButton';
import UserProfileCard from '@/components/UserProfileCard';
import Script from 'next/script';
import { PADDLE_CONFIG, type PlanType, type BillingCycle } from '@/lib/paddle-config';
import { getFirestore, doc, setDoc, collection, addDoc, getDoc, getDocs, query, orderBy, limit, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { identifyPlan } from '@/lib/paddle-utils';
import Image from 'next/image';
import PaddleCheckoutHandler from '@/components/PaddleCheckoutHandler';

declare global {
  interface Window {
    Paddle: any;
  }
}

// Create a theme context
import { createContext, useContext } from 'react';

type ThemeType = 'light' | 'dark';
type ThemeContextType = {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeType>('light');

  useEffect(() => {
    // Load theme from localStorage if available
    const savedTheme = localStorage.getItem('theme') as ThemeType;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // Use system preference as fallback
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const changeTheme = (newTheme: ThemeType) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Settings Modal Component
function SettingsModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { theme, setTheme } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden transform transition-all">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Settings</h3>
            <button 
              onClick={onClose}
              className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="space-y-6">
            {/* Theme Settings */}
            <div>
              <h4 className="text-md font-medium text-slate-700 dark:text-slate-200 mb-3">Theme</h4>
              <div className="flex space-x-4">
                <button
                  onClick={() => setTheme('light')}
                  className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all ${
                    theme === 'light' 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center mb-2 shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-slate-800 dark:text-slate-200">Light Mode</span>
                </button>
                
                <button
                  onClick={() => setTheme('dark')}
                  className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all ${
                    theme === 'dark' 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center mb-2 shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-slate-800 dark:text-slate-200">Dark Mode</span>
                </button>
              </div>
            </div>
            
            {/* About Section */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
              <h4 className="text-md font-medium text-slate-700 dark:text-slate-200 mb-3">About</h4>
              <div className="p-4 bg-slate-50 dark:bg-slate-700/30 rounded-lg">
                <div className="flex items-center mb-3">
                  <Image 
                    src="/paFire_logo.png" 
                    alt="paFire Logo" 
                    width={24} 
                    height={24}
                    className="mr-2"
                  />
                  <h5 className="font-semibold text-slate-900 dark:text-white">paFire</h5>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Version 1.0.0
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
                  A Firebase & Paddle integration showcase application.
                </p>
                <div className="mt-4">
                  <a 
                    href="https://github.com/username/pademo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    View on GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Define a type for Firestore timestamp objects
interface FirestoreTimestamp {
  seconds: number;
  nanoseconds: number;
  toDate?: () => Date;
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(auth.currentUser);
  const [paddleLoaded, setPaddleLoaded] = useState(false);
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('month');
  const [prices, setPrices] = useState<{[key in PlanType]?: string}>({});
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [checkoutStatus, setCheckoutStatus] = useState<string | null>(null);
  
  // Add type definition for subscription state
  interface SubscriptionState {
    hasActive: boolean;
    plan?: string | null;
    status: string;
    lastTransaction?: Date | FirestoreTimestamp | null;
    product?: any;
    customerId?: string | null;
    subscriptionId?: string | null;
    nextBillDate?: Date | FirestoreTimestamp | null;
    canceledAt?: Date | FirestoreTimestamp | null;
    scheduled_change?: {
      action?: string;
      effective_at?: string;
      resume_at?: string | null;
    } | null;
    cancellationEffectiveDate?: Date | FirestoreTimestamp | null;
  }
  
  const [subscription, setSubscription] = useState<SubscriptionState | null>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
<<<<<<< HEAD
  const [showAllTransactions, setShowAllTransactions] = useState(false);
=======
  const [subscriptionDetails, setSubscriptionDetails] = useState<any>(null);
>>>>>>> updated

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.replace('/login');
        return;
      }
      
      setUser(currentUser);
      const userId = currentUser.uid;
      
      // Fetch subscription status directly
      fetchSubscriptionData(userId);
      
      // Wait for Paddle to be ready, then fetch prices
      if (paddleLoaded) {
        updatePrices();
      }
    });

    // Log Paddle configuration for debugging
    console.log('Paddle Config:', {
      clientToken: PADDLE_CONFIG.clientToken ? `${PADDLE_CONFIG.clientToken.substring(0, 5)}...` : 'missing',
      sellerId: PADDLE_CONFIG.sellerId,
      standardMonthPrice: PADDLE_CONFIG.prices.standard.month,
      premiumMonthPrice: PADDLE_CONFIG.prices.premium.month
    });

    return () => unsubscribe();
  }, [paddleLoaded, router]);

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
      
      // Debug check - print environment variables
      console.log('Environment Price IDs:', {
        standardMonth: process.env.NEXT_PUBLIC_PADDLE_STANDARD_MONTH_PRICE_ID,
        standardYear: process.env.NEXT_PUBLIC_PADDLE_STANDARD_YEAR_PRICE_ID,
        premiumMonth: process.env.NEXT_PUBLIC_PADDLE_PREMIUM_MONTH_PRICE_ID,
        premiumYear: process.env.NEXT_PUBLIC_PADDLE_PREMIUM_YEAR_PRICE_ID
      });
      
      console.log('Paddle Config Price IDs:', PADDLE_CONFIG.prices);
    }
  }, [paddleLoaded, billingCycle]);

  const handleSubscription = (plan: PlanType) => {
    if (!paddleLoaded) {
      console.error('Paddle is not loaded yet');
      setCheckoutStatus('Error: Paddle is not loaded yet. Please refresh the page.');
      return;
    }

    // Set checkout status to show loading
    setCheckoutStatus('Opening checkout...');
    
    // Get price ID from config
    const priceId = PADDLE_CONFIG.prices[plan][billingCycle];
    
    // Hardcoded fallback price ID for testing (Paddle sandbox test product)
    const fallbackPriceId = 'pri_01h8xz97pj0000000000000000'; 
    
    console.log(`Starting checkout for plan: ${plan}, cycle: ${billingCycle}`);
    console.log(`Using price ID: ${priceId} (fallback available: ${fallbackPriceId})`);
    console.log('User data:', { email: user?.email, uid: user?.uid });

    try {
      // Display debug info in console
      console.log('Paddle Config:', {
        clientToken: PADDLE_CONFIG.clientToken ? `${PADDLE_CONFIG.clientToken.substring(0, 5)}...` : 'missing',
        sellerId: PADDLE_CONFIG.sellerId,
        priceId: priceId
      });

    window.Paddle.Checkout.open({
      items: [{
          priceId: priceId, // Use the configured price ID
        quantity: 1
      }],
      settings: {
        displayMode: 'overlay',
        theme: 'light',
          locale: 'en'
        },
        customer: {
          email: user?.email || '',
        },
        customData: {
          userId: user?.uid || ''
        },
        successCallback: (data: any) => {
          console.log('Checkout success callback triggered', data);
          setCheckoutStatus('Processing your subscription...');
        },
        closeCallback: (data: any) => {
          console.log('Checkout closed', data);
          // Only clear the message if user manually closes the checkout
          setCheckoutStatus(null);
        },
        errorCallback: (error: any) => {
          console.error('Checkout error:', error);
          
          // If we got a "product not found" error, try with the fallback price ID
          if (error && (error.code === 'product_not_found' || error.message?.includes('product not found'))) {
            console.log('Trying checkout with fallback price ID...');
            
            // Try with fallback price ID
            setTimeout(() => {
              try {
                window.Paddle.Checkout.open({
                  items: [{
                    priceId: fallbackPriceId, // Use fallback price ID
                    quantity: 1
                  }],
                  settings: {
                    displayMode: 'overlay',
                    theme: 'light',
                    locale: 'en'
      },
      customer: {
        email: user?.email || '',
      },
      customData: {
        userId: user?.uid || ''
      }
    });
              } catch (fallbackError) {
                console.error('Error with fallback price ID:', fallbackError);
                setCheckoutStatus(`Error with fallback price ID: ${fallbackError instanceof Error ? fallbackError.message : 'Unknown error'}`);
              }
            }, 1000);
          } else {
            setCheckoutStatus(`Error during checkout: ${error.message || error.reason || 'Unknown error'}`);
          }
        }
      });
    } catch (error) {
      console.error('Error opening Paddle checkout:', error);
      setCheckoutStatus(`Failed to open checkout: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
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
        
        const subscriptionData = {
          hasActive: userData.hasActiveSubscription || false,
          plan: userData.currentPlan || null,
          status: userData.subscriptionStatus || 'inactive',
          lastTransaction: userData.lastTransactionDate?.toDate() || null,
          product: userData.product || null,
          customerId: userData.paddleCustomerId || null,
          subscriptionId: userData.currentSubscriptionId || null,
          nextBillDate: userData.nextBillDate?.toDate() || null,
          canceledAt: userData.subscriptionCanceledAt?.toDate() || null,
          scheduled_change: userData.scheduled_change || null,
          cancellationEffectiveDate: userData.cancellationEffectiveDate?.toDate() || null
        };
        
        console.log('Fetched subscription status:', subscriptionData);
        setSubscription(subscriptionData);
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
      
      const logs = transactionsSnap.docs.map(doc => {
        const data = doc.data();
        
        // Check for rawData field which might contain the scheduled_change
        if (data.rawData) {
          // The rawData might be stored as a string in some cases
          let rawDataObj = data.rawData;
          if (typeof rawDataObj === 'string') {
            try {
              rawDataObj = JSON.parse(rawDataObj);
            } catch (e) {
              console.error('Failed to parse rawData string:', e);
            }
          }
          
          // Check for scheduled_change in rawData
          if (rawDataObj.scheduled_change) {
            // Update the subscription state with the scheduled change data
            if (subscription && data.subscriptionId === subscription.subscriptionId) {
              setSubscription(prev => {
                const updatedSubscription = {
                  ...prev as SubscriptionState,
                  scheduled_change: rawDataObj.scheduled_change
                };
                return updatedSubscription;
              });
            }
          }
        }
        
        // Check if there's a direct scheduled_change
        if (data.scheduled_change) {
          // Update the subscription state with the scheduled change data
          if (subscription && data.subscriptionId === subscription.subscriptionId) {
            setSubscription(prev => {
              const updatedSubscription = {
                ...prev as SubscriptionState,
                scheduled_change: data.scheduled_change
              };
              return updatedSubscription;
            });
          }
        }
        
        return {
          id: doc.id,
          ...data,
          planDetails: identifyPlan(data.product?.id)
        };
      });
      
      setTransactions(logs);

      // Now, check subscription collections for the latest state
      if (subscription?.subscriptionId) {
        const subscriptionRef = doc(db, 'users', userId, 'subscriptions', subscription.subscriptionId);
        const subscriptionDoc = await getDoc(subscriptionRef);
        
        if (subscriptionDoc.exists()) {
          const subscriptionData = subscriptionDoc.data();
          
          // Check for rawData field in the subscription document
          if (subscriptionData.rawData) {
            let rawDataObj = subscriptionData.rawData;
            if (typeof rawDataObj === 'string') {
              try {
                rawDataObj = JSON.parse(rawDataObj);
              } catch (e) {
                console.error('Failed to parse subscription rawData string:', e);
              }
            }
            
            if (rawDataObj.scheduled_change) {
              setSubscription(prev => {
                const updatedSubscription = {
                  ...prev as SubscriptionState,
                  scheduled_change: rawDataObj.scheduled_change
                };
                return updatedSubscription;
              });
            }
          }
          
          // Update the subscription state with any cancellation data
          if (subscriptionData.scheduled_change || subscriptionData.cancellationEffectiveDate) {
            setSubscription(prev => {
              const updatedSubscription = {
                ...prev as SubscriptionState,
                scheduled_change: subscriptionData.scheduled_change || prev?.scheduled_change,
                cancellationEffectiveDate: subscriptionData.cancellationEffectiveDate?.toDate() || prev?.cancellationEffectiveDate
              };
              return updatedSubscription;
            });
          }
        }
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const fetchSubscriptionDetails = async (userId: string, subscriptionId: string) => {
    try {
      const db = getFirestore();
      
      // Check in transactions collection
      const transactionRef = doc(db, 'users', userId, 'transactions', subscriptionId);
      const transactionDoc = await getDoc(transactionRef);
      
      if (transactionDoc.exists()) {
        const data = transactionDoc.data();
        console.log("Direct transaction data fetch:", data);
        
        // If this transaction has rawData with scheduled_change, update subscription
        if (data.rawData?.scheduled_change || data.scheduled_change) {
          const scheduled_change = data.rawData?.scheduled_change || data.scheduled_change;
          console.log("Found scheduled_change in transaction:", scheduled_change);
          
          setSubscription(prev => {
            const updatedSubscription = {
              ...prev as SubscriptionState,
              scheduled_change: scheduled_change
            };
            console.log('Updated subscription with direct scheduled_change:', updatedSubscription);
            return updatedSubscription;
          });
          
          return;
        }
      }
      
      // Also check subscriptions collection
      const subscriptionRef = doc(db, 'users', userId, 'subscriptions', subscriptionId);
      const subscriptionDoc = await getDoc(subscriptionRef);
      
      if (subscriptionDoc.exists()) {
        const data = subscriptionDoc.data();
        console.log("Direct subscription data fetch:", data);
        
        if (data.scheduled_change || data.cancellationEffectiveDate) {
          setSubscription(prev => {
            const updatedSubscription = {
              ...prev as SubscriptionState,
              scheduled_change: data.scheduled_change || prev?.scheduled_change,
              cancellationEffectiveDate: data.cancellationEffectiveDate?.toDate() || prev?.cancellationEffectiveDate
            };
            console.log('Updated subscription with direct subscription data:', updatedSubscription);
            return updatedSubscription;
          });
        }
      }
    } catch (error) {
      console.error("Error fetching subscription details:", error);
    }
  };

  const fetchSubscriptionData = async (userId: string) => {
    try {
      const db = getFirestore();
      
      // If we have a subscription ID, fetch it directly
      if (subscription?.subscriptionId) {
        const subscriptionsRef = doc(db, 'users', userId, 'subscriptions', subscription.subscriptionId);
        const subscriptionDoc = await getDoc(subscriptionsRef);
        
        if (subscriptionDoc.exists()) {
          const data = subscriptionDoc.data();
          
          // Format price data if it exists in different formats
          let formattedData: any = {
            ...data,
            id: subscriptionDoc.id
          };
          
          // Check for different price formats and normalize them
          if (data.items?.[0]?.price?.unit_price) {
            formattedData.priceAmount = data.items[0].price.unit_price.amount;
            formattedData.priceCurrency = data.items[0].price.unit_price.currency_code;
          } else if (data.price) {
            if (typeof data.price === 'object') {
              formattedData.priceAmount = data.price.amount;
              formattedData.priceCurrency = data.price.currency;
            } else if (typeof data.price === 'string') {
              formattedData.formattedPrice = data.price;
            } else if (typeof data.price === 'number') {
              formattedData.priceAmount = data.price;
              formattedData.priceCurrency = data.currency || 'USD';
            }
          } else if (data.amount) {
            formattedData.priceAmount = data.amount;
            formattedData.priceCurrency = data.currency || 'USD';
          }
          
          // Also check if there are specific billing details
          if (data.billing_details || data.billingDetails) {
            const billingDetails = data.billing_details || data.billingDetails;
            if (billingDetails.amount || billingDetails.total) {
              formattedData.priceAmount = billingDetails.amount || billingDetails.total;
              formattedData.priceCurrency = billingDetails.currency || 'USD';
            }
          }
          
          setSubscriptionDetails(formattedData);
          return;
        }
      }
      
      // If no specific subscription ID or it wasn't found, find the most recent active subscription
      const subscriptionsRef = collection(db, 'users', userId, 'subscriptions');
      const q = query(
        subscriptionsRef,
        where('status', '==', 'active'),
        orderBy('createdAt', 'desc'),
        limit(1)
      );
      
      const subscriptionsSnap = await getDocs(q);
      
      if (!subscriptionsSnap.empty) {
        const data = subscriptionsSnap.docs[0].data();
        
        // Format price data if it exists in different formats
        let formattedData: any = {
          ...data,
          id: subscriptionsSnap.docs[0].id
        };
        
        // Check for different price formats and normalize them
        if (data.items?.[0]?.price?.unit_price) {
          formattedData.priceAmount = data.items[0].price.unit_price.amount;
          formattedData.priceCurrency = data.items[0].price.unit_price.currency_code;
        } else if (data.price) {
          if (typeof data.price === 'object') {
            formattedData.priceAmount = data.price.amount;
            formattedData.priceCurrency = data.price.currency;
          } else if (typeof data.price === 'string') {
            formattedData.formattedPrice = data.price;
          } else if (typeof data.price === 'number') {
            formattedData.priceAmount = data.price;
            formattedData.priceCurrency = data.currency || 'USD';
          }
        } else if (data.amount) {
          formattedData.priceAmount = data.amount;
          formattedData.priceCurrency = data.currency || 'USD';
        }
        
        // Also check if there are specific billing details
        if (data.billing_details || data.billingDetails) {
          const billingDetails = data.billing_details || data.billingDetails;
          if (billingDetails.amount || billingDetails.total) {
            formattedData.priceAmount = billingDetails.amount || billingDetails.total;
            formattedData.priceCurrency = billingDetails.currency || 'USD';
          }
        }
        
        setSubscriptionDetails(formattedData);
      }
    } catch (error) {
      console.error('Error fetching subscription data:', error);
    }
  };

  useEffect(() => {
    if (user?.uid) {
      // Define an async function to load all data in sequence
      const loadAllData = async () => {
        try {
          // Step 1: Get basic subscription info
          await fetchSubscriptionStatus(user.uid);
          
          // Step 2: Get subscription data from the subscriptions collection
          await fetchSubscriptionData(user.uid);
          
          // Step 3: Get transaction data that might have scheduled_change
          await fetchTransactionLogs(user.uid);
          
          // Step 3a: Check the user document directly for a scheduled_change
          const db = getFirestore();
          
          const userRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userRef);
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            
            // Look for scheduled_change directly on the user document
            if (userData.scheduled_change) {
              setSubscription(prev => {
                if (!prev) return prev;
                return {
                  ...prev,
                  scheduled_change: userData.scheduled_change
                };
              });
            }
            
            // Also check rawData if it exists
            if (userData.rawData) {
              let rawDataObj = userData.rawData;
              if (typeof rawDataObj === 'string') {
                try {
                  rawDataObj = JSON.parse(rawDataObj);
                } catch (e) {
                  console.error('Failed to parse user rawData');
                }
              }
              
              if (rawDataObj?.scheduled_change) {
                setSubscription(prev => {
                  if (!prev) return prev;
                  return {
                    ...prev,
                    scheduled_change: rawDataObj.scheduled_change
                  };
                });
              }
            }
          }
          
          // Step 3b: Check subscriptions collection if we have a subscription ID
          if (subscription?.subscriptionId) {
            const subscriptionRef = doc(db, 'users', user.uid, 'subscriptions', subscription.subscriptionId);
            const subscriptionDoc = await getDoc(subscriptionRef);
            
            if (subscriptionDoc.exists()) {
              const subscriptionData = subscriptionDoc.data();
              
              // Direct check for scheduled_change
              if (subscriptionData.scheduled_change) {
                setSubscription(prev => {
                  if (!prev) return prev;
                  return {
                    ...prev,
                    scheduled_change: subscriptionData.scheduled_change
                  };
                });
              }
              
              // Check in rawData
              if (subscriptionData.rawData) {
                let rawDataObj = subscriptionData.rawData;
                if (typeof rawDataObj === 'string') {
                  try {
                    rawDataObj = JSON.parse(rawDataObj);
                  } catch (e) {
                    console.error('Failed to parse subscription rawData');
                  }
                }
                
                if (rawDataObj?.scheduled_change) {
                  setSubscription(prev => {
                    if (!prev) return prev;
                    return {
                      ...prev,
                      scheduled_change: rawDataObj.scheduled_change
                    };
                  });
                }
              }
            }
          }
          
          // Step 3c: Directly query transactions with this user's ID to find scheduled changes
          const transactionsRef = collection(db, 'users', user.uid, 'transactions');
          const transactionsSnap = await getDocs(transactionsRef);
          
          // Process each transaction looking for scheduled_change
          for (const doc of transactionsSnap.docs) {
            const data = doc.data();
            
            // Check each potential location for scheduled_change data
            let scheduled_change = null;
            
            // Check in rawData
            if (data.rawData) {
              let rawDataObj = data.rawData;
              if (typeof rawDataObj === 'string') {
                try {
                  rawDataObj = JSON.parse(rawDataObj);
                } catch (e) {
                  console.error('Failed to parse rawData');
                }
              }
              
              if (rawDataObj?.scheduled_change) {
                scheduled_change = rawDataObj.scheduled_change;
              }
            }
            
            // Check direct scheduled_change
            if (data.scheduled_change) {
              scheduled_change = data.scheduled_change;
            }
            
            // If we found scheduled_change data, update subscription state
            if (scheduled_change) {
              setSubscription(prev => {
                if (!prev) return prev;
                return {
                  ...prev,
                  scheduled_change: scheduled_change
                };
              });
              break; // Stop processing once we find valid data
            }
          }
        } catch (error) {
          console.error('Error loading subscription data:', error);
        }
      };
      
      // Execute the function
      loadAllData();
    }
  }, [user, subscription?.subscriptionId]);
  
  // Remove the separate effects that were causing race conditions
  // Instead, load all data in sequence in the single effect above

  const extractScheduledChangeFromRawData = (data: any) => {
    try {
      console.log("Attempting to extract scheduled_change from raw data:", data);
      
      // Handle the nested rawData structure from the example - might be a string or object
      if (data.rawData) {
        let rawDataObj = data.rawData;
        if (typeof rawDataObj === 'string') {
          try {
            rawDataObj = JSON.parse(rawDataObj);
          } catch (e) {
            console.error('Failed to parse rawData string:', e);
          }
        }
        
        if (rawDataObj.scheduled_change) {
          return rawDataObj.scheduled_change;
        }
      }
      
      // Handle direct scheduled_change property
      if (data.scheduled_change) {
        return data.scheduled_change;
      }
      
      // Handle when data itself is the raw structure (like in the example)
      if (data.status && data.action === 'cancel' && data.effective_at) {
        return {
          action: data.action,
          effective_at: data.effective_at,
          resume_at: data.resume_at
        };
      }
      
      return null;
    } catch (error) {
      console.error("Error extracting scheduled_change:", error);
      return null;
    }
  };

  const syncRawDataToSubscription = (rawData: any) => {
    try {
      console.log("Attempting to sync raw data to subscription:", rawData);
      
      if (!rawData) return;
      
      // Look for scheduled_change in various places
      const scheduled_change = extractScheduledChangeFromRawData(rawData);
      
      if (scheduled_change) {
        console.log("Found scheduled_change in raw data:", scheduled_change);
        
        setSubscription(prev => {
          const updatedSubscription = {
            ...prev as SubscriptionState,
            scheduled_change: scheduled_change
          };
          console.log('Updated subscription with raw data scheduled_change:', updatedSubscription);
          return updatedSubscription;
        });
      }
    } catch (error) {
      console.error("Error syncing raw data:", error);
    }
  };

  // Add a button to test with the exact provided example structure
  const testWithProvidedExample = () => {
    const exampleData = {
      amount: 1599,
      billingCycle: {
        frequency: 1,
        interval: "month"
      },
      canceledAt: null,
      createdAt: new Date("2025-04-21T07:06:00.951Z"),
      currency: "USD",
      currentPeriod: {
        end: new Date("2025-05-21T07:06:00.292545Z"),
        start: new Date("2025-04-21T07:06:00.292545Z")
      },
      customData: {
        userId: "FE0qnQDim5Thj6wXey4oGdKN7hy1"
      },
      customerId: "ctm_01jrhz1tf0r5wx62mx6cby456r",
      nextBillDate: null,
      pausedAt: null,
      planId: "pro_01jrcyajvbkf83y5ycbnr055hf",
      planName: "monthlyPremium",
      priceId: "pri_01jrcyb5gnfxn2s012n83a2gcf",
      rawData: {
        address_id: "add_01jsbjn5nr0mbc0kaxgmpmdagj",
        billing_cycle: {
          frequency: 1,
          interval: "month"
        },
        billing_details: null,
        business_id: null,
        canceled_at: null,
        collection_mode: "automatic",
        created_at: "2025-04-21T07:06:00.951Z",
        currency_code: "USD",
        current_billing_period: {
          ends_at: "2025-05-21T07:06:00.292545Z",
          starts_at: "2025-04-21T07:06:00.292545Z"
        },
        custom_data: {
          userId: "FE0qnQDim5Thj6wXey4oGdKN7hy1"
        },
        customer_id: "ctm_01jrhz1tf0r5wx62mx6cby456r",
        discount: null,
        first_billed_at: "2025-04-21T07:06:00.292545Z",
        id: "sub_01jsbjp2vqp0ends3ytwb0paej",
        import_meta: null,
        items: [
          {
            // Item details omitted for brevity
          }
        ],
        next_billed_at: null,
        paused_at: null,
        scheduled_change: {
          action: "cancel",
          effective_at: "2025-05-21T07:06:00.292545Z",
          resume_at: null
        },
        started_at: "2025-04-21T07:06:00.292545Z",
        status: "active",
        transaction_id: "txn_01jsbjn4a16qagqf32vq4jzwwm",
        updated_at: "2025-04-21T07:07:22.738Z"
      },
      startDate: new Date("2025-04-21T07:06:00.292545Z"),
      status: "active",
      subscriptionId: "sub_01jsbjp2vqp0ends3ytwb0paej",
      updatedAt: new Date("2025-04-21T07:07:24.000Z"),
      userId: "FE0qnQDim5Thj6wXey4oGdKN7hy1"
    };
    
    syncRawDataToSubscription(exampleData);
    
    // Also update the entire subscription object
    setSubscription(prev => {
      return {
        ...prev as SubscriptionState,
        hasActive: true,
        status: "active",
        subscriptionId: exampleData.subscriptionId
      };
    });
  };

  // Handle checkout success
  const handleCheckoutSuccess = (subscriptionData: any) => {
    console.log('Checkout completed successfully:', subscriptionData);
    setCheckoutStatus('Subscription checkout completed! Updating your subscription status...');
    
    // Try to update subscription data immediately
    if (user?.uid) {
      // First attempt to update using the provided subscription data
      if (subscriptionData?.subscriptionId && subscriptionData.subscriptionId !== 'pending') {
        try {
          const db = getFirestore();
          const userRef = doc(db, 'users', user.uid);
          setDoc(userRef, {
            hasActiveSubscription: true,
            lastTransactionDate: new Date(),
            currentPlan: subscriptionData.planId || PADDLE_CONFIG.prices.standard.month,
            subscriptionStatus: 'active',
            currentSubscriptionId: subscriptionData.subscriptionId,
            paddleCustomerId: subscriptionData.customerId,
            lastUpdated: new Date()
          }, { merge: true })
            .then(() => {
              console.log('Successfully updated user subscription from checkout data');
              // Refresh subscription data
              fetchSubscriptionStatus(user.uid);
              fetchTransactionLogs(user.uid);
            })
            .catch(error => {
              console.error('Error updating subscription from checkout data:', error);
              // If direct update fails, try the manual update as a fallback
              setTimeout(() => manualCheckSubscriptionStatus(), 2000);
            });
        } catch (error) {
          console.error('Error in immediate subscription update:', error);
          // If there's an error, try the manual update as a fallback
          setTimeout(() => manualCheckSubscriptionStatus(), 2000);
        }
      } else {
        // If we don't have subscription data yet, poll for updates or try manual update
        console.log('No subscription ID received yet, polling for updates...');
        // Wait a few seconds and then check for subscription updates
        setTimeout(() => {
          fetchSubscriptionStatus(user.uid);
          fetchTransactionLogs(user.uid);
          
          // If still no active subscription after a short delay, offer manual update
          setTimeout(() => {
            if (!subscription?.hasActive) {
              setCheckoutStatus('Checkout completed, but subscription status not updated automatically. You can try updating manually.');
            }
          }, 5000);
        }, 3000);
      }
    }
  };
  
  // Handle checkout error
  const handleCheckoutError = (error: Error) => {
    console.error('Error during checkout:', error);
    setCheckoutStatus('There was an error processing your subscription. Please try again or contact support.');
  };
  
  // Manually check and update subscription status
  const manualCheckSubscriptionStatus = async () => {
    if (!user) {
      console.error('No logged in user');
      return;
    }
    
    try {
      setCheckoutStatus('Manually checking subscription status...');
      
      // 1. First verify we can write to Firebase
      const db = getFirestore();
      const testRef = doc(db, 'users', user.uid, 'tests', 'manual-check');
      await setDoc(testRef, {
        timestamp: new Date(),
        operation: 'manual-check'
      });
      
      console.log('Firebase test write successful');
      
      // 2. Update user profile with a fake subscription for testing
      const userRef = doc(db, 'users', user.uid);
      
      // Generate fake customer ID if needed - could be email or email+timestamp
      const paddleCustomerId = user.email || `user-${new Date().getTime()}@example.com`;
      
      await setDoc(userRef, {
        hasActiveSubscription: true,
        lastTransactionDate: new Date(),
        currentPlan: PADDLE_CONFIG.prices.standard.month,  // Using the standard plan price ID
        subscriptionStatus: 'active',
        currentSubscriptionId: 'manual-' + new Date().getTime(),
        paddleCustomerId: paddleCustomerId,
        lastUpdated: new Date()
      }, { merge: true });
      
      console.log('Manually updated subscription status with customer ID:', paddleCustomerId);
      setCheckoutStatus('Subscription status manually updated. Refreshing data...');
      
      // 3. Now fetch the updated subscription data
      await fetchSubscriptionStatus(user.uid);
      
      // 4. Clear status after a moment
      setTimeout(() => {
        setCheckoutStatus(null);
      }, 3000);
    } catch (error) {
      console.error('Error in manual subscription update:', error);
      setCheckoutStatus('Error updating subscription: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  // Add this function after the manualCheckSubscriptionStatus function, before formatPrice
  const openCustomerPortal = async () => {
    console.log('Opening customer portal with subscription data:', subscription);
    
    if (!user) {
      setCheckoutStatus('No logged in user found');
      return;
    }
    
    try {
      setCheckoutStatus('Opening customer portal...');
      
      // Log customer info for debugging
      console.log('Customer info for portal:', {
        email: user.email,
        customerId: subscription?.customerId
      });
      
      // Use the specific CPL ID for the customer portal
      const portalUrl = 'https://sandbox-customer-portal.paddle.com/cpl_01jtqjeq79c64enc8qy3cs3zrm';
      console.log('Using portal URL:', portalUrl);
      
      // Open in new tab
      window.open(portalUrl, '_blank');
      
      // Clear status after a moment
      setTimeout(() => {
        setCheckoutStatus(null);
      }, 3000);
    } catch (error) {
      console.error('Error opening customer portal:', error);
      setCheckoutStatus('Error opening customer portal: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  const formatPrice = (amount: number | string, currency: string = 'USD') => {
    // If it's already a string with formatting, return it
    if (typeof amount === 'string' && amount.includes('.')) {
      return amount;
    }
    
    // Convert to number if it's a string
    const numericAmount = typeof amount === 'string' ? parseInt(amount, 10) : amount;
    
    // Format with decimal places - assuming amount is in cents/lowest denomination
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(numericAmount / 100);
  };

  // Helper function to safely format dates from Firestore Timestamps or Date objects
  const formatDate = (date: Date | FirestoreTimestamp | string | null | undefined): string => {
    if (!date) return 'N/A';
    
    if (date instanceof Date) {
      return date.toLocaleDateString();
    }
    
    // Handle Firestore Timestamp
    if (typeof date === 'object' && 'seconds' in date) {
      return new Date(date.seconds * 1000).toLocaleDateString();
    }
    
    // Handle ISO date strings
    if (typeof date === 'string') {
      return new Date(date).toLocaleDateString();
    }
    
    return 'N/A';
  };

  const DashboardContent = () => {
    const { theme } = useTheme();
    
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-slate-900' : 'bg-gradient-to-br from-slate-50 to-slate-100'}`}>
        <Script 
          src="https://cdn.paddle.com/paddle/v2/paddle.js"
          onLoad={() => {
            if (typeof window !== 'undefined' && window.Paddle) {
              try {
                // Use sandbox in development mode
                console.log('Setting Paddle environment to sandbox');
              window.Paddle.Environment.set('sandbox');
                
                console.log('Setting up Paddle with token:', 
                  PADDLE_CONFIG.clientToken ? `${PADDLE_CONFIG.clientToken.substring(0, 5)}...` : 'missing');
                
              window.Paddle.Setup({ 
                token: PADDLE_CONFIG.clientToken,
                eventCallback: handlePaddleEvent
              });
                
                console.log('Paddle initialized successfully');
              setPaddleLoaded(true);
              } catch (error) {
                console.error('Error initializing Paddle:', error);
              }
            } else {
              console.error('Paddle not available on window object');
            }
          }}
          onError={() => {
            console.error('Failed to load Paddle script');
          }}
        />
        
        {/* Add PaddleCheckoutHandler to handle checkout completion */}
        <PaddleCheckoutHandler 
          onSuccess={handleCheckoutSuccess}
          onError={handleCheckoutError}
        />
        
        {/* Modern Navigation Bar with Glass Effect */}
        <nav className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md sticky top-0 z-30 border-b border-slate-200/80 dark:border-slate-700/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <Image 
                  src="/paFire_logo.png" 
                  alt="paFire Logo" 
                  width={32} 
                  height={32} 
                />
                <span className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Dashboard
                </span>
              </div>
              <div className="flex items-center space-x-4">
                {/* Settings Button */}
                <button
                  onClick={() => setIsSettingsOpen(true)}
                  className="p-2 rounded-full text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors"
                  aria-label="Settings"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                </button>
                <LogoutButton className="text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white" />
              </div>
            </div>
          </div>
        </nav>
        
        <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {/* Display checkout status if any */}
          {checkoutStatus && (
            <div className="mb-4 bg-green-50 border border-green-300 dark:bg-green-900/20 dark:border-green-700/40 text-green-800 dark:text-green-200 px-4 py-3 rounded-lg">
              {checkoutStatus}
            </div>
          )}
          
          {/* Manual subscription update button - for troubleshooting only */}
          {(!subscription || !subscription.hasActive) && (
            <div className="mb-4 bg-blue-50 border border-blue-300 dark:bg-blue-900/20 dark:border-blue-700/40 text-blue-800 dark:text-blue-200 px-4 py-3 rounded-lg">
              <p className="mb-2">If you've completed checkout but your subscription isn't showing:</p>
              <button 
                onClick={manualCheckSubscriptionStatus}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
              >
                Update Subscription Manually
              </button>
            </div>
          )}
          
          {/* Debug Banner - Hidden in production */}
          {false && subscription && (
            <div className="mb-4 bg-gray-100 border border-gray-300 p-4 rounded-md">
              <h3 className="text-sm font-semibold mb-2">Debug Info:</h3>
              <div className="text-xs font-mono overflow-auto max-h-40">
                <p className="mb-1"><strong>hasActive:</strong> {String(subscription?.hasActive)}</p>
                <p className="mb-1"><strong>status:</strong> {subscription?.status}</p>
                <p className="mb-1">
                  <strong>scheduled_change:</strong> {subscription?.scheduled_change ? 
                    JSON.stringify(subscription?.scheduled_change, null, 2) : 'null'}
                </p>
                
                {/* Explicit condition checks */}
                <p className="mb-1"><strong>Condition 1 - hasActive:</strong> {String(Boolean(subscription?.hasActive))}</p>
                <p className="mb-1"><strong>Condition 2 - has scheduled_change object:</strong> {String(Boolean(subscription?.scheduled_change))}</p>
                <p className="mb-1"><strong>Condition 3 - action is cancel:</strong> {String(Boolean(subscription?.scheduled_change?.action === "cancel"))}</p>
                <p className="mb-1"><strong>Condition 4 - has effective_at:</strong> {String(Boolean(subscription?.scheduled_change?.effective_at))}</p>
                
                <p className="mb-1 font-bold text-red-500">
                  <strong>ALL CONDITIONS MET:</strong> {String(
                    Boolean(subscription?.hasActive && 
                    subscription?.scheduled_change && 
                    subscription?.scheduled_change?.action === "cancel" && 
                    subscription?.scheduled_change?.effective_at)
                  )}
                </p>
                
                {/* Add a test banner to check if banners are visible at all */}
                <div className="mt-2 mb-1 p-2 bg-amber-50 border-l-4 border-amber-400 text-amber-800">
                  Test banner - if you can see this, banners are rendering correctly
                </div>
                
                {subscription?.scheduled_change && (
                  <>
                    <p className="mb-1"><strong>action:</strong> {subscription?.scheduled_change?.action}</p>
                    <p className="mb-1"><strong>effective_at:</strong> {subscription?.scheduled_change?.effective_at}</p>
                  </>
                )}
                
                <div className="mt-4 flex flex-wrap gap-2">
                  <button 
                    className="px-2 py-1 bg-blue-500 text-white text-xs rounded"
                    onClick={() => {
                      if (user?.uid) {
                        fetchSubscriptionStatus(user.uid);
                        fetchTransactionLogs(user.uid);
                        if (subscription?.subscriptionId) {
                          fetchSubscriptionDetails(user.uid, subscription.subscriptionId);
                        }
                      }
                    }}
                  >
                    Refresh Data
                  </button>
                  
                  {/* Test button to manually set the example data */}
                  <button 
                    className="px-2 py-1 bg-green-500 text-white text-xs rounded"
                    onClick={() => {
                      // Manually inject the example data structure for testing
                      setSubscription(prev => {
                        const testData = {
                          ...prev as SubscriptionState,
                          hasActive: true,
                          status: 'active',
                          scheduled_change: {
                            action: 'cancel',
                            effective_at: '2025-05-21T07:06:00.292545Z',
                            resume_at: null
                          }
                        };
                        console.log('Manually set test data:', testData);
                        return testData;
                      });
                    }}
                  >
                    Test With Example Data
                  </button>
                  
                  {/* Test with the exact example provided */}
                  <button 
                    className="px-2 py-1 bg-purple-500 text-white text-xs rounded"
                    onClick={testWithProvidedExample}
                  >
                    Test With Full Example
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Clean banner component without debug logs */}
          {(() => {
            if(subscription && subscription.hasActive) {            
              if(subscription.scheduled_change && 
                 subscription.scheduled_change.action === "cancel" && 
                 subscription.scheduled_change.effective_at) {
                
                // Return the banner component for scheduled cancel
                return (
                  <div className="mb-4 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-400 p-4 rounded-md shadow-sm">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <p className="text-sm text-amber-800 dark:text-amber-200">
                        This subscription is scheduled to be canceled on {subscription.scheduled_change?.effective_at ? formatDate(subscription.scheduled_change.effective_at) : 'soon'}.
                      </p>
                    </div>
                  </div>
                );
              }
              
<<<<<<< HEAD
              {subscription && (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 overflow-hidden relative">
                  {/* Decorative background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-blue-50 opacity-50" />
                  
                  {/* Decorative circles */}
                  <div className="absolute top-0 right-0 w-32 h-32 -translate-y-8 translate-x-8">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 opacity-30" />
                  </div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 translate-y-6 -translate-x-6">
                    <div className="w-full h-full rounded-full bg-gradient-to-tr from-indigo-100 to-blue-100 opacity-30" />
                  </div>
                  
                  {/* Content */}
                  <div className="relative">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-lg font-semibold text-slate-800">Subscription Status</h2>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        subscription.status === 'active' 
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-800'
                      }`}>
                        <span className={`w-2 h-2 rounded-full mr-2 ${
                          subscription.status === 'active' 
                            ? 'bg-emerald-500'
                            : 'bg-slate-500'
                        }`} />
                        {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                      </span>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-slate-50/80 rounded-xl p-4 backdrop-blur-sm border border-slate-100">
                        <p className="text-sm font-medium text-slate-500 mb-1">Current Plan</p>
                        <div className="flex items-center">
                          <div className="flex-1">
                            <p className="text-lg font-semibold text-slate-900">
                              {transactions[0].planDetails?.name || 'Unknown Plan'}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {subscription.lastTransaction && (
                        <div className="bg-slate-50/80 rounded-xl p-4 backdrop-blur-sm border border-slate-100">
                          <p className="text-sm font-medium text-slate-500 mb-1">Last Payment</p>
                          <div className="flex items-center justify-between">
                            <p className="text-lg font-semibold text-slate-900">
                              {new Date(subscription.lastTransaction).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      )}
=======
              // Backup check for cancellationEffectiveDate
              if(subscription.cancellationEffectiveDate) {
                return (
                  <div className="mb-4 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-400 p-4 rounded-md shadow-sm">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <p className="text-sm text-amber-800 dark:text-amber-200">
                        This subscription is scheduled to be canceled on {formatDate(subscription.cancellationEffectiveDate)}.
                      </p>
                    </div>
                  </div>
                );
              }
            }
            
            // No banner needed
            return null;
          })()}
          
          {subscription && subscription.hasActive && (
            <div className="mb-8 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 rounded-2xl shadow-md overflow-hidden">
              <div className="px-6 py-8 md:px-8 md:py-8 relative">
                <div className="absolute top-0 right-0 w-64 h-64 -translate-y-24 translate-x-24 rounded-full bg-white/10 opacity-50" />
                <div className="absolute bottom-0 left-0 w-48 h-48 translate-y-20 -translate-x-16 rounded-full bg-white/5 opacity-50" />
                
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div>
                    <h1 className="text-2xl font-bold text-white mb-2">
                      Welcome, {user?.displayName || user?.email?.split('@')[0]}!
                    </h1>
                    <p className="text-blue-100 max-w-md">
                      Your subscription is active. 
                      Enjoy full access to all premium features.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 ">
                    <button 
                      onClick={openCustomerPortal}
                      className="flex items-center justify-center w-full py-2 px-4 text-sm font-medium text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                    >
                      Manage Subscription
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {(!subscription || !subscription.hasActive) && (
            <div className="mb-8 bg-gradient-to-r from-slate-700 to-slate-800 dark:from-slate-800 dark:to-slate-900 rounded-2xl shadow-md overflow-hidden">
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
                      className="px-6 py-2.5 bg-white text-slate-800 hover:bg-slate-100 dark:bg-slate-100 dark:hover:bg-white rounded-lg font-medium transition-colors"
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
                
                {/* Subscription Status Card */}
                {subscription && (
                  <div className="mt-6">
                    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200/80 dark:border-slate-700/50 p-5">
                      <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Subscription Status</h3>
                      
                      {/* Current plan info */}
                      <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800/30">
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="text-sm font-medium text-blue-800 dark:text-blue-200">Current Plan</span>
                            <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                              {subscription.plan ? identifyPlan(subscription.plan)?.name || 'Standard Plan' : 'Free Plan'}
                            </h4>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                            subscription.status === 'active' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' 
                              : subscription.status === 'paused'
                                ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200'
                                : subscription.status === 'canceled' 
                                  ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200'
                                  : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200'
                          }`}>
                            {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          {subscription.nextBillDate && (
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm text-slate-500 dark:text-slate-400">Next Billing Date</span>
                              <span className="font-medium text-slate-700 dark:text-slate-300">
                                {formatDate(subscription.nextBillDate)}
                              </span>
                            </div>
                          )}
                          
                          {subscription.lastTransaction && (
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm text-slate-500 dark:text-slate-400">Last Payment</span>
                              <span className="font-medium text-slate-700 dark:text-slate-300">
                                {formatDate(subscription.lastTransaction)}
                              </span>
                            </div>
                          )}
                          
                          {subscription.subscriptionId && (
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-slate-500 dark:text-slate-400">Subscription ID</span>
                              <span className="font-mono text-xs text-slate-600 dark:text-slate-400">
                                {subscription.subscriptionId.substring(0, 8)}...
                              </span>
                            </div>
                          )}
                        </div>
                        
                        {/* Display scheduled cancellation notice */}
                        {subscription.scheduled_change && 
                          subscription.scheduled_change.action === 'cancel' && 
                          subscription.status === 'active' && (
                          <div className="mt-4 bg-amber-50 border border-amber-100 dark:bg-amber-900/20 dark:border-amber-800/30 text-amber-800 dark:text-amber-200 px-4 py-3 rounded-lg">
                            <div className="flex items-start">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                              <div>
                                <p className="font-medium">This subscription is scheduled to be canceled on {subscription.scheduled_change?.effective_at ? formatDate(subscription.scheduled_change.effective_at) : 'soon'}</p>
                                <p className="text-sm mt-1">Your access will continue until this date.</p>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {/* Display cancellation notice if already canceled */}
                        {subscription.status === 'canceled' && (
                          <div className="mt-4 bg-red-50 border border-red-100 dark:bg-red-900/20 dark:border-red-800/30 text-red-700 dark:text-red-200 px-4 py-3 rounded-lg">
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
                      
                      {/* Portal access button */}
                      <div className="mt-4">
                        <button 
                          onClick={openCustomerPortal}
                          className="flex items-center justify-center w-full py-2 px-4 text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                        >
                          Manage Subscription
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Removed Subscription Plans Section */}
              </div>
            </div>

            {/* Main Content Section */}
            <div className="lg:col-span-2 space-y-8">
              {/* Subscription Details Card */}
              {subscriptionDetails && (
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-700/50 p-6 overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-48 h-48 -translate-y-12 translate-x-12">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/10 dark:to-blue-900/10 opacity-50" />
                  </div>
                  
                  <div className="flex items-center justify-between mb-6 relative">
                    <h2 className="text-xl font-semibold text-slate-800 dark:text-white">Subscription Details</h2>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium 
                      ${subscriptionDetails.status === 'active' 
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200' 
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200'}`
                    }>
                      {subscriptionDetails.status ? subscriptionDetails.status.charAt(0).toUpperCase() + subscriptionDetails.status.slice(1) : 'Active'}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                    <div className="space-y-6">
                      <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Plan</p>
                        <div className="flex items-center">
                          <span className="text-lg font-medium text-slate-900 dark:text-white mr-2">
                            {subscriptionDetails.planName || 
                             subscriptionDetails.items?.[0]?.price?.product_name || 
                             identifyPlan(subscriptionDetails.planId)?.name || 
                             'Standard'}
                          </span>
                         
                        </div>
                      </div>
                      
                      {subscriptionDetails.priceAmount && (
                        <div>
                          <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Price</p>
                          <p className="text-lg font-medium text-slate-900 dark:text-white">
                            {formatPrice(subscriptionDetails.priceAmount, subscriptionDetails.priceCurrency)}
                          </p>
                        </div>
                      )}
                      
                      {subscriptionDetails.formattedPrice && (
                        <div>
                          <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Price</p>
                          <p className="text-lg font-medium text-slate-900 dark:text-white">
                            {subscriptionDetails.formattedPrice}
                          </p>
                        </div>
                      )}
                      
                      {!subscriptionDetails.priceAmount && !subscriptionDetails.formattedPrice && (subscriptionDetails.price || subscriptionDetails.items?.[0]?.price?.unit_price) && (
                        <div>
                          <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Price</p>
                          <p className="text-lg font-medium text-slate-900 dark:text-white">
                            {subscriptionDetails.price 
                              ? (typeof subscriptionDetails.price === 'object' 
                                 ? formatPrice(subscriptionDetails.price.amount, subscriptionDetails.price.currency) 
                                 : formatPrice(subscriptionDetails.price, subscriptionDetails.priceCurrency || 'USD'))
                              : formatPrice(subscriptionDetails.items[0].price.unit_price.amount, subscriptionDetails.items[0].price.unit_price.currency_code)
                            }
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Subscription Date</p>
                        <p className="text-lg font-medium text-slate-900 dark:text-white">
                          {formatDate(subscriptionDetails.createdAt)}
                        </p>
                      </div>
                      
                      {subscriptionDetails.startedAt && (
                        <div>
                          <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Subscription Start</p>
                          <p className="text-lg font-medium text-slate-900 dark:text-white">
                            {formatDate(subscriptionDetails.startedAt)}
                          </p>
                        </div>
                      )}
                      
                      <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Subscription ID</p>
                        <p className="text-sm font-mono text-slate-600 dark:text-slate-400 break-all">
                          {subscriptionDetails.subscriptionId || subscriptionDetails.id}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Subscription Plans Section */}
              <div id="subscription-plans" className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-700/50 p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 -translate-y-48 translate-x-48">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/10 dark:to-purple-900/10 opacity-50" />
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 relative">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-800 dark:text-white">Subscription Plans</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Choose the perfect plan for your needs</p>
                  </div>
                  <div className="flex p-1 bg-slate-100 dark:bg-slate-700 rounded-lg">
                    <button
                      onClick={() => setBillingCycle('month')}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                        billingCycle === 'month'
                          ? 'bg-white dark:bg-slate-600 shadow-sm text-slate-800 dark:text-white'
                          : 'text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white'
                      }`}
                    >
                      Monthly
                    </button>
                    <button
                      onClick={() => setBillingCycle('year')}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                        billingCycle === 'year'
                          ? 'bg-white dark:bg-slate-600 shadow-sm text-slate-800 dark:text-white'
                          : 'text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white'
                      }`}
                    >
                      Yearly <span className="text-green-400 text-xs ml-1">Save 17%</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                  {/* Standard Plan */}
                  <div className={`group relative border ${subscription?.plan && identifyPlan(subscription.plan)?.name === 'Standard Plan' ? 'border-blue-300 bg-blue-50/30 dark:bg-blue-900/20' : 'border-slate-200 dark:border-slate-700'} rounded-2xl p-6 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300`}>
                    {subscription?.plan && identifyPlan(subscription.plan)?.name === 'Standard Plan' && (
                      <div className="absolute -top-3 right-6">
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                          Current Plan
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-slate-50 dark:from-blue-900/10 dark:to-slate-800/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                    
                    <div className="relative">
                      <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">Standard Plan</h3>
                      <p className="text-slate-600 dark:text-slate-300 mb-4">
                        {billingCycle === 'month' 
                          ? 'Perfect for getting started' 
                          : 'Save more with yearly billing'}
                      </p>
                      <div className="mb-6">
                        <span className="text-3xl font-bold text-slate-900 dark:text-white">
                          {prices.standard || 'Loading...'}
                        </span>
                        <span className="text-slate-600 dark:text-slate-400">/{billingCycle}</span>
                      </div>
                      
                      {/* Feature list for Standard Plan */}
                      <div className="mb-6 space-y-3">
                        <div className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-slate-700 dark:text-slate-300">Access to basic features</span>
                        </div>
                        <div className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-slate-700 dark:text-slate-300">5 projects</span>
                        </div>
                        <div className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-slate-700 dark:text-slate-300">Email support</span>
                        </div>
                        <div className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-slate-700 dark:text-slate-300">1GB storage</span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => handleSubscription('standard')}
                        disabled={Boolean(!paddleLoaded || (subscription?.plan && identifyPlan(subscription.plan)?.name === 'Standard Plan' && subscription?.status === 'active'))}
                        className={`w-full py-3 px-4 rounded-xl transition-all ${
                          !paddleLoaded 
                            ? 'bg-slate-200 dark:bg-slate-700 cursor-not-allowed text-slate-500 dark:text-slate-400'
                            : subscription?.plan && identifyPlan(subscription.plan)?.name === 'Standard Plan' && subscription?.status === 'active'
                              ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 cursor-not-allowed'
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
                  <div className={`group relative border-2 ${subscription?.plan && identifyPlan(subscription.plan)?.name === 'Premium Plan' ? 'border-violet-300 bg-violet-50/30 dark:bg-violet-900/20' : 'border-violet-200 dark:border-violet-700'} rounded-2xl p-6 hover:shadow-md hover:border-violet-300 dark:hover:border-violet-600 transition-all duration-300`}>
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
                    
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-900/10 dark:to-indigo-900/10 opacity-50 group-hover:opacity-100 transition-opacity rounded-2xl" />
                    
                    <div className="relative">
                      <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">Premium Plan</h3>
                      <p className="text-slate-600 dark:text-slate-300 mb-4">
                        {billingCycle === 'month' 
                          ? 'Access all premium features' 
                          : 'Best value for full access'}
                      </p>
                      <div className="mb-6">
                        <span className="text-3xl font-bold text-slate-900 dark:text-white">
                          {prices.premium || 'Loading...'}
                        </span>
                        <span className="text-slate-600 dark:text-slate-400">/{billingCycle}</span>
                      </div>
                      
                      {/* Feature list for Premium Plan */}
                      <div className="mb-6 space-y-3">
                        <div className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-violet-500 mt-0.5 mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-slate-700 dark:text-slate-300"><strong>All Standard features</strong>, plus:</span>
                        </div>
                        <div className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-violet-500 mt-0.5 mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-slate-700 dark:text-slate-300">Unlimited projects</span>
                        </div>
                        <div className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-violet-500 mt-0.5 mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-slate-700 dark:text-slate-300">Priority support</span>
                        </div>
                        <div className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-violet-500 mt-0.5 mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-slate-700 dark:text-slate-300">10GB storage</span>
                        </div>
                        <div className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-violet-500 mt-0.5 mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-slate-700 dark:text-slate-300">Advanced analytics</span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => handleSubscription('premium')}
                        disabled={Boolean(!paddleLoaded || (subscription?.plan && identifyPlan(subscription.plan)?.name === 'Premium Plan' && subscription?.status === 'active'))}
                        className={`w-full py-3 px-4 rounded-xl transition-all ${
                          !paddleLoaded 
                            ? 'bg-slate-200 dark:bg-slate-700 cursor-not-allowed text-slate-500 dark:text-slate-400'
                            : subscription?.plan && identifyPlan(subscription.plan)?.name === 'Premium Plan' && subscription?.status === 'active'
                              ? 'bg-violet-100 dark:bg-violet-900/30 text-violet-800 dark:text-violet-200 cursor-not-allowed'
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

              {/* Recent Transactions */}
              {transactions && transactions.length > 0 && (
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-700/50 p-6 overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-48 h-48 -translate-y-12 translate-x-12">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/10 dark:to-teal-900/10 opacity-50" />
                  </div>
                  
                  <div className="relative">
                    <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-6">Recent Transactions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {transactions.map(transaction => (
                        <div key={transaction.id} className="bg-slate-50 dark:bg-slate-700/30 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                          <h4 className="text-md font-semibold text-slate-800 dark:text-white mb-2">{transaction.product?.name || 'Transaction'}</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-slate-500 dark:text-slate-400">Status:</span>
                              <span className={`text-sm font-medium ${
                                transaction.paymentStatus === 'completed' || transaction.paymentStatus === 'paid'
                                  ? 'text-green-600 dark:text-green-400'
                                  : 'text-amber-600 dark:text-amber-400'
                              }`}>
                                {transaction.paymentStatus ? transaction.paymentStatus.charAt(0).toUpperCase() + transaction.paymentStatus.slice(1) : 'Pending'}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-slate-500 dark:text-slate-400">Amount:</span>
                              <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                                {formatPrice(transaction.amountPaid || transaction.amount, transaction.currency || 'USD')}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-slate-500 dark:text-slate-400">Date:</span>
                              <span className="text-sm text-slate-700 dark:text-slate-300">
                                {formatDate(transaction.timestamp)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
>>>>>>> updated
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
        
        {/* Settings Modal */}
        <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      </div>
    );
  };

<<<<<<< HEAD
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
                        <p className="text-lg font-medium text-slate-900">
                          {transactions[0].planDetails?.name || 'Unknown Plan'}
                        </p>
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
=======
  return (
    <ThemeProvider>
      <DashboardContent />
    </ThemeProvider>
>>>>>>> updated
  );
}
