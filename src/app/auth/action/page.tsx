'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { applyActionCode, auth } from '@/lib/firebase';
import Link from 'next/link';

function AuthActionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const handleAuthAction = async () => {
      const mode = searchParams.get('mode');
      const oobCode = searchParams.get('oobCode');
      
      if (!mode || !oobCode) {
        setStatus('error');
        setErrorMessage('Invalid verification link');
        return;
      }

      try {
        switch (mode) {
          case 'verifyEmail':
            await applyActionCode(auth, oobCode);
            setStatus('success');
            break;
          default:
            setStatus('error');
            setErrorMessage('Unsupported action');
        }
      } catch (error: any) {
        setStatus('error');
        setErrorMessage(error.message || 'Failed to verify email');
      }
    };

    handleAuthAction();
  }, [searchParams]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        {status === 'success' ? (
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-gray-800">Email Verified!</h1>
            <p className="text-green-600">Your email has been successfully verified.</p>
            <Link
              href="/login"
              className="block w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Continue to Login
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-gray-800">Verification Failed</h1>
            <p className="text-red-600">{errorMessage}</p>
            <Link
              href="/signup"
              className="block w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Back to Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AuthAction() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    }>
      <AuthActionContent />
    </Suspense>
  );
}
