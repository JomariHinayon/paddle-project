import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-violet-50 to-white dark:from-violet-950 dark:to-slate-900">
      <main className="w-full min-h-screen grid md:grid-cols-2 gap-0">
        {/* Left side - Hero section */}
        <div className="flex flex-col justify-center px-8 md:px-16 py-16 md:py-20 order-2 md:order-1">
          <div className="max-w-xl">
            <div className="flex items-center mb-6">
              <Image 
                src="/pafire-logo.svg" 
                alt="paFire Logo" 
                width={80} 
                height={80} 
                className="mr-3"
                priority
              />
              <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-700 to-indigo-600 dark:from-violet-500 dark:to-indigo-400">
                paFire
              </h1>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-slate-800 dark:text-white mb-6">
              Unlock Premium Features with Our Subscription Plans
            </h2>
            
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              Join thousands of users who have enhanced their experience with our Standard and Premium subscription plans. Get access to advanced features, priority support, and more.
            </p>
            
            {/* Subscription highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              <div className="flex items-start">
                <div className="rounded-full p-2 bg-violet-100 dark:bg-violet-900/30 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-violet-600 dark:text-violet-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-slate-900 dark:text-white">Standard Plan</h3>
                  <p className="text-slate-600 dark:text-slate-400">Core features and email support</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="rounded-full p-2 bg-indigo-100 dark:bg-indigo-900/30 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 dark:text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-slate-900 dark:text-white">Premium Plan</h3>
                  <p className="text-slate-600 dark:text-slate-400">Advanced features and priority support</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="rounded-full p-2 bg-emerald-100 dark:bg-emerald-900/30 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600 dark:text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-slate-900 dark:text-white">Monthly or Yearly</h3>
                  <p className="text-slate-600 dark:text-slate-400">Flexible billing options</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="rounded-full p-2 bg-rose-100 dark:bg-rose-900/30 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-rose-600 dark:text-rose-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-slate-900 dark:text-white">Secure Payments</h3>
                  <p className="text-slate-600 dark:text-slate-400">Powered by Paddle</p>
                </div>
              </div>
            </div>
            
            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/signup" 
                className="px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all text-center font-medium"
              >
                Get Started Free
              </Link>
              
              <Link 
                href="/pricing" 
                className="px-6 py-3 bg-white text-violet-700 border border-violet-200 rounded-lg hover:bg-violet-50 transition-colors text-center font-medium shadow-sm"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
        
        {/* Right side - Plans preview */}
        <div className="bg-violet-900 bg-opacity-95 flex items-center justify-center p-8 order-1 md:order-2">
          <div className="max-w-md w-full">
            <div className="relative">
              {/* Premium plan card */}
              <div className="relative z-20 bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 border border-violet-100 dark:border-violet-700">
                <div className="absolute -top-3 right-6">
                  <span className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                    Popular
                  </span>
                </div>
                
                <div className="flex items-center mb-4">
                  <Image 
                    src="/pafire-logo.svg" 
                    alt="paFire Logo" 
                    width={36} 
                    height={36} 
                    className="mr-2"
                    priority
                  />
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Premium Plan</h3>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Advanced features for power users</p>
                
                <div className="mb-4">
                  <span className="text-3xl font-bold text-slate-900 dark:text-white">$19</span>
                  <span className="text-slate-500 dark:text-slate-400">/month</span>
                </div>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-violet-500 mt-0.5 mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-slate-700 dark:text-slate-300">All Standard features</span>
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
                    <span className="text-slate-700 dark:text-slate-300">Advanced analytics</span>
                  </div>
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-violet-500 mt-0.5 mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-slate-700 dark:text-slate-300">Custom integrations</span>
                  </div>
                </div>
              </div>
              
              {/* Standard plan card (positioned behind) */}
              <div className="absolute top-8 -left-4 transform -rotate-6 z-10 bg-violet-100 dark:bg-violet-900/40 rounded-2xl shadow-lg p-6 border border-violet-200 dark:border-violet-800 w-full h-full">
                <div className="flex items-center mb-4">
                  <Image 
                    src="/pafire-logo.svg" 
                    alt="paFire Logo" 
                    width={30} 
                    height={30} 
                    className="mr-2"
                    priority
                  />
                  <h3 className="text-xl font-bold text-violet-800 dark:text-violet-200">Standard Plan</h3>
                </div>
                <p className="text-sm text-violet-600 dark:text-violet-300 mb-4">Essential features for everyone</p>
                
                <div className="mb-4">
                  <span className="text-3xl font-bold text-violet-800 dark:text-violet-200">$9</span>
                  <span className="text-violet-600 dark:text-violet-300">/month</span>
                </div>
                <div className="space-y-2 opacity-70">
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-violet-500 mt-0.5 mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-violet-700 dark:text-violet-200">Core application features</span>
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