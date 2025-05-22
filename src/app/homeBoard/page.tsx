'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { sendEmailVerification } from 'firebase/auth';

export default function SuccessPage() {
  const router = useRouter();
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) {
      router.push('/signup');
      return;
    }

    // Check email verification status periodically
    const interval = setInterval(async () => {
      await user.reload();
      if (user.emailVerified) {
        clearInterval(interval);
        router.push('/dashboard');
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [user]);

  return (
    <div className="success-container">
      <h1>🎉 Signup Successful!</h1>
      {user?.providerId === 'password' && !user.emailVerified && (
        <div className="verification-notice">
          <p>We've sent a verification email to {user.email}</p>
          <button onClick={() => sendEmailVerification(user)}>
            Resend Verification
          </button>
        </div>
      )}
      <button onClick={() => router.push('/dashboard')}>
        Continue to Dashboard
      </button>
    </div>
  );
}