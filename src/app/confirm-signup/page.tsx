'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, reload } from 'firebase/auth';
import Link from 'next/link';

// Make this route static for export
export const dynamic = "force-static";

function ConfirmSignupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!email) {
      router.replace('/signup');
      return;
    }

    const checkVerification = async (user: any) => {
      if (user) {
        await reload(user); // Reload user to get latest verification status
        setIsVerified(user.emailVerified);
      }
      setLoading(false);
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace('/signup');
        return;
      }
      checkVerification(user);
    });

    return () => unsubscribe();
  }, [email, router]);

  const handleResendEmail = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await user.sendEmailVerification();
        alert('Verification email has been resent!');
      }
    } catch (error) {
      console.error('Error sending verification email:', error);
      alert('Failed to resend verification email');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Verify Your Email</h1>
        
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : isVerified ? (
          <div>
            <div className="mb-4 text-green-600">
              Your email has been verified successfully!
            </div>
            <Link 
              href="/"
              className="inline-block bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Go to Home Page
            </Link>
          </div>
        ) : (
          <div>
            <p className="mb-4 text-gray-600">
              We've sent a verification email to:
              <br />
              <span className="font-semibold">{email}</span>
            </p>
            <p className="mb-6 text-sm text-gray-500">
              Please check your email and click the verification link to complete your registration.
              The link will expire when you log out.
            </p>
            <button
              onClick={handleResendEmail}
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Resend verification email
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ConfirmSignup() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    }>
      <ConfirmSignupContent />
    </Suspense>
  );
}
