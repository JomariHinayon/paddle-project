'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function PaymentSuccessPage() {
  const [countdown, setCountdown] = useState(5);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = '/dashboard'; // Redirect to dashboard
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 flex flex-col">
      <main className="w-full flex justify-center items-center p-6 py-16">
        <div className="w-full max-w-md backdrop-blur-md bg-white bg-opacity-10 rounded-2xl border border-white border-opacity-20 p-8 shadow-2xl">
          <div className="flex justify-center mb-8">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative w-12 h-12">
                <Image 
                  src="/paFire_logo.png" 
                  alt="paFire Logo" 
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-bold text-white">paFire</span>
            </Link>
          </div>

          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-500 bg-opacity-20 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-white text-center mb-4">Payment Successful!</h1>
          
          <p className="text-gray-200 text-center mb-8">
            Thank you for subscribing to paFire. Your subscription is now active.
          </p>
          
          <div className="bg-white bg-opacity-10 rounded-lg p-4 mb-6 border border-white border-opacity-20">
            <p className="text-gray-200 text-sm text-center">
              A receipt has been sent to your email address. You will be redirected to your dashboard in {countdown} seconds.
            </p>
          </div>
          
          <div className="flex justify-center">
            <Link 
              href="/dashboard" 
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all text-center font-medium shadow-lg"
            >
              Go to Dashboard
            </Link>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-300">
              Need help with your subscription? <Link href="/support" className="text-white underline">Contact Support</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
} 