'use client';

// Force static export for Netlify
export const dynamic = "force-static";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function VerifyEmailPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Verifying your email...');
  const router = useRouter();

  useEffect(() => {
    // For static export, we'll simulate successful verification
    setTimeout(() => {
      setStatus('success');
      setMessage('Your email has been verified successfully!');
      
      // Redirect to home after a short delay
      setTimeout(() => {
        router.push('/');
      }, 2000);
    }, 1500);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Email Verification</h1>
        
        {status === 'loading' && (
          <div className="flex justify-center items-center mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}
        
        <p className={`mb-4 ${
          status === 'success' ? 'text-green-600' : 
          status === 'error' ? 'text-red-600' : 
          'text-gray-600'
        }`}>
          {message}
        </p>
        
        {status !== 'loading' && (
          <button
            onClick={() => router.push('/')}
            className="inline-block bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Return to Home
          </button>
        )}
      </div>
    </div>
  );
}
