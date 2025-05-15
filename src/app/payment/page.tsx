'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

// Make this route static for export
export const dynamic = "force-static";

function PaymentPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planParam = searchParams?.get('plan') || 'basic';
  const billingParam = searchParams?.get('billing') || 'monthly';
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US'
  });
  
  // Plan details
  const plans = {
    basic: {
      name: 'Basic',
      price: {
        monthly: 9,
        yearly: 90
      }
    },
    plus: {
      name: 'Plus',
      price: {
        monthly: 19,
        yearly: 190
      }
    },
    premium: {
      name: 'Premium',
      price: {
        monthly: 39,
        yearly: 390
      }
    }
  };

  const selectedPlan = plans[planParam as keyof typeof plans] || plans.basic;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      const formattedValue = value
        .replace(/\s/g, '')
        .match(/.{1,4}/g)
        ?.join(' ') || '';
      
      setFormData(prev => ({ ...prev, [name]: formattedValue }));
      return;
    }
    
    // Format expiry date (MM/YY)
    if (name === 'expiryDate') {
      const digits = value.replace(/\D/g, '');
      let formattedValue = '';
      
      if (digits.length <= 2) {
        formattedValue = digits;
      } else {
        formattedValue = `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
      }
      
      setFormData(prev => ({ ...prev, [name]: formattedValue }));
      return;
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Here you would typically integrate with a payment processor
    // such as Stripe, PayPal, etc.
    
    // Simulate payment processing delay
    setTimeout(() => {
      // Redirect to success page after payment
      router.push('/payment/success');
    }, 2000);
  };
  
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 flex flex-col">
      <main className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row py-8 px-4 gap-8">
        {/* Payment form */}
        <div className="w-full lg:w-3/5 order-2 lg:order-1">
          <div className="backdrop-blur-md bg-white bg-opacity-10 rounded-2xl border border-white border-opacity-20 p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">Payment Details</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Credit Card Information</h3>
                
                <div className="space-y-2">
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-200">
                    Card Number
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="cardHolder" className="block text-sm font-medium text-gray-200">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    id="cardHolder"
                    name="cardHolder"
                    value={formData.cardHolder}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="John Smith"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-200">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      placeholder="MM/YY"
                      maxLength={5}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-200">
                      CVV
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      placeholder="123"
                      maxLength={3}
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Billing Address</h3>
                
                <div className="space-y-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-200">
                    Street Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="123 Main St"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="city" className="block text-sm font-medium text-gray-200">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      placeholder="New York"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="state" className="block text-sm font-medium text-gray-200">
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      placeholder="NY"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-200">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      placeholder="10001"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="country" className="block text-sm font-medium text-gray-200">
                      Country
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                      required
                    >
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="AU">Australia</option>
                      {/* Add more countries as needed */}
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all text-center font-medium shadow-lg"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    `Pay $${selectedPlan.price[billingParam as keyof typeof selectedPlan.price]} ${billingParam === 'monthly' ? 'per month' : 'per year'}`
                  )}
                </button>
                
                <p className="text-xs text-gray-300 text-center mt-4">
                  Your personal data will be used to process your order, support your experience, and for other purposes described in our <Link href="/privacy" className="text-white underline">privacy policy</Link>.
                </p>
              </div>
            </form>
          </div>
        </div>
        
        {/* Order summary */}
        <div className="w-full lg:w-2/5 order-1 lg:order-2">
          <div className="backdrop-blur-md bg-white bg-opacity-10 rounded-2xl border border-white border-opacity-20 p-8 shadow-2xl sticky top-8">
            <div className="flex justify-between items-center mb-6">
              <Link href="/" className="flex items-center space-x-2">
                <div className="relative w-10 h-10">
                  <Image 
                    src="/paFire_logo.png" 
                    alt="paFire Logo" 
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-xl font-bold text-white">paFire</span>
              </Link>
            </div>
            
            <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-200">Plan</span>
                <span className="text-white font-medium">{selectedPlan.name}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-200">Billing Cycle</span>
                <span className="text-white font-medium capitalize">{billingParam}</span>
              </div>
              
              <div className="border-t border-white border-opacity-10 my-4 pt-4">
                <div className="flex justify-between text-lg">
                  <span className="text-gray-200">Total</span>
                  <span className="text-white font-bold">
                    ${selectedPlan.price[billingParam as keyof typeof selectedPlan.price]}
                    <span className="text-sm font-normal text-gray-300">/{billingParam === 'monthly' ? 'month' : 'year'}</span>
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-8 space-y-4">
              <h3 className="text-lg font-medium text-white">What's included:</h3>
              
              <ul className="space-y-2">
                {planParam === 'basic' && (
                  <>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-200">Basic task management</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-200">3GB storage</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-200">Standard analytics</span>
                    </li>
                  </>
                )}
                
                {planParam === 'plus' && (
                  <>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-200">15GB storage</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-200">Advanced analytics</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-200">Priority support</span>
                    </li>
                  </>
                )}
                
                {planParam === 'premium' && (
                  <>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-200">Unlimited storage</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-200">AI-powered insights</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-200">Dedicated support</span>
                    </li>
                  </>
                )}
              </ul>
            </div>
            
            <div className="mt-8 border-t border-white border-opacity-10 pt-4">
              <div className="text-sm text-gray-300">
                <p className="mb-2">
                  By completing your purchase, you agree to our <Link href="/terms" className="text-white underline">Terms of Service</Link> and authorize us to charge your payment method on a recurring basis.
                </p>
                <p>
                  You can cancel your subscription anytime from your account settings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={
      <div className="w-full min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    }>
      <PaymentPageContent />
    </Suspense>
  );
} 