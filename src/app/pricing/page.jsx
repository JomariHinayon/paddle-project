'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function PricingPage() {
  const [duration, setDuration] = useState('monthly');

  const plans = [
    {
      name: 'Basic',
      price: {
        monthly: 9,
        yearly: 90,
      },
      description: 'Essential features for personal use',
      features: [
        'Basic task management',
        '3GB storage',
        'Standard analytics',
        'Email reminders',
        'Mobile app access',
      ],
      cta: 'Subscribe to Basic',
    },
    {
      name: 'Plus',
      price: {
        monthly: 19,
        yearly: 190,
      },
      description: 'Enhanced features for power users',
      features: [
        '15GB storage',
        'Advanced analytics',
        'Priority support',
        'Custom dashboards',
        'Calendar integration',
        'Export functionality',
        'Dark mode',
      ],
      cta: 'Subscribe to Plus',
      highlighted: true,
      badge: 'Most Popular',
    },
    {
      name: 'Premium',
      price: {
        monthly: 39,
        yearly: 390,
      },
      description: 'Complete solution for professionals',
      features: [
        'Unlimited storage',
        'AI-powered insights',
        'Dedicated support',
        'Advanced customization',
        'Offline access',
        'Priority feature releases',
        'Multiple device sync',
        'Advanced security',
      ],
      cta: 'Subscribe to Premium',
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700">
      <header className="w-full py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
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
          <nav className="hidden md:flex space-x-6">
            <Link href="/features" className="text-gray-200 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="/pricing" className="text-white font-medium">
              Pricing
            </Link>
            <Link href="/account" className="text-gray-200 hover:text-white transition-colors">
              My Account
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-gray-200 hover:text-white transition-colors">
              Log in
            </Link>
            <Link 
              href="/signup" 
              className="bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 text-white px-4 py-2 rounded-lg hover:bg-opacity-20 transition-all"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Choose Your Subscription</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Select the plan that fits your needs. Subscriptions are billed immediately upon sign-up.
          </p>
          
          <div className="mt-8 inline-flex items-center bg-white bg-opacity-10 backdrop-blur-sm p-1 rounded-lg">
            <button
              onClick={() => setDuration('monthly')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                duration === 'monthly' 
                  ? 'bg-white text-purple-800' 
                  : 'text-gray-200 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setDuration('yearly')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                duration === 'yearly' 
                  ? 'bg-white text-purple-800' 
                  : 'text-gray-200 hover:text-white'
              }`}
            >
              Yearly <span className="text-green-400 text-xs ml-1">Save 17%</span>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div 
              key={plan.name}
              className={`rounded-2xl backdrop-blur-md border relative ${
                plan.highlighted 
                  ? 'bg-white bg-opacity-15 border-pink-400 border-opacity-50 transform md:-translate-y-4 shadow-xl' 
                  : 'bg-white bg-opacity-10 border-white border-opacity-20'
              }`}
            >
              {plan.badge && (
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                  <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                    {plan.badge}
                  </div>
                </div>
              )}
              
              <div className="p-6 md:p-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-300 mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <div className="flex items-end">
                    <span className="text-4xl font-bold text-white">${plan.price[duration]}</span>
                    <span className="text-gray-300 ml-2">/{duration === 'monthly' ? 'month' : 'year'}</span>
                  </div>
                  {duration === 'yearly' && (
                    <p className="text-green-400 text-sm mt-1">
                      ${(plan.price.monthly * 12 - plan.price.yearly).toFixed(0)} saved per year
                    </p>
                  )}
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-5 w-5 text-green-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-200">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  href={`/signup?plan=${plan.name.toLowerCase()}&billing=${duration}`}
                  className={`w-full block text-center py-3 px-6 rounded-xl font-medium transition-all ${
                    plan.highlighted 
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 shadow-lg' 
                      : 'bg-white bg-opacity-10 border border-white border-opacity-20 text-white hover:bg-opacity-20'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-20 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Subscription FAQ</h2>
          
          <div className="max-w-3xl mx-auto bg-white bg-opacity-10 backdrop-blur-md rounded-2xl border border-white border-opacity-20 divide-y divide-white divide-opacity-10">
            <div className="p-6">
              <h3 className="text-lg font-medium text-white mb-2">When will I be billed?</h3>
              <p className="text-gray-200">Your subscription begins immediately after payment. Monthly subscriptions renew every 30 days, and yearly subscriptions renew after 365 days.</p>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-medium text-white mb-2">Can I change my plan?</h3>
              <p className="text-gray-200">Yes, you can upgrade your subscription at any time. When upgrading, you'll be charged the prorated difference for the remainder of your billing cycle.</p>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-medium text-white mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-200">We accept all major credit cards and PayPal. Your payment information is securely stored and processed.</p>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-medium text-white mb-2">How do I cancel my subscription?</h3>
              <p className="text-gray-200">You can cancel your subscription at any time from your account settings. Your subscription will remain active until the end of your current billing period.</p>
            </div>
          </div>
          
          <div className="mt-12 bg-white bg-opacity-10 backdrop-blur-md rounded-2xl border border-white border-opacity-20 p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Need help with your subscription?</h3>
            <p className="text-gray-200 mb-6">Our support team is available to answer any questions about your subscription.</p>
            <Link
              href="/support"
              className="inline-flex items-center bg-white text-purple-800 px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
            >
              Contact Support
              <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Link>
          </div>
        </div>
      </main>
      
      <footer className="bg-gradient-to-br from-indigo-900 to-indigo-950 border-t border-white border-opacity-10 py-12 px-4 sm:px-6 lg:px-8 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-white font-medium mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link href="/features" className="text-gray-300 hover:text-white">Features</Link></li>
                <li><Link href="/pricing" className="text-gray-300 hover:text-white">Pricing</Link></li>
                <li><Link href="/updates" className="text-gray-300 hover:text-white">Updates</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Account</h4>
              <ul className="space-y-2">
                <li><Link href="/account" className="text-gray-300 hover:text-white">My Account</Link></li>
                <li><Link href="/account/billing" className="text-gray-300 hover:text-white">Billing</Link></li>
                <li><Link href="/account/settings" className="text-gray-300 hover:text-white">Settings</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link href="/help" className="text-gray-300 hover:text-white">Help Center</Link></li>
                <li><Link href="/guides" className="text-gray-300 hover:text-white">User Guides</Link></li>
                <li><Link href="/support" className="text-gray-300 hover:text-white">Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="/terms" className="text-gray-300 hover:text-white">Terms of Service</Link></li>
                <li><Link href="/privacy" className="text-gray-300 hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/refund" className="text-gray-300 hover:text-white">Refund Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white border-opacity-10 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="relative w-8 h-8 mr-2">
                <Image 
                  src="/paFire_logo.png" 
                  alt="paFire Logo" 
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-white font-bold">paFire</span>
            </div>
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} paFire, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}