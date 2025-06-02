'use client';

import { signInWithPopup, signInWithRedirect, getRedirectResult } from 'firebase/auth';
import { auth, googleProvider, firestore } from '@/lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { setSession } from '@/lib/session';
import toast from 'react-hot-toast';

export default function GoogleSignInButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError('');
      
      // First try redirect-based auth if popup fails
      const ua = navigator.userAgent.toLowerCase();
      const isMobile = /iphone|ipad|ipod|android/.test(ua);
      
      let result;
      if (isMobile) {
        // Use redirect on mobile
        await signInWithRedirect(auth, googleProvider);
        return; // The page will refresh after redirect
      } else {
        // Try popup first
        try {
          result = await signInWithPopup(auth, googleProvider);
        } catch (popupError) {
          if (popupError.code === 'auth/popup-blocked' || 
              popupError.code === 'auth/popup-closed-by-user' ||
              popupError.code === 'auth/cancelled-popup-request') {
            // If popup fails, fall back to redirect
            await signInWithRedirect(auth, googleProvider);
            return; // The page will refresh after redirect
          }
          throw popupError;
        }
      }

      if (!result) return;
      
      const user = result.user;
      await setSession();

      // Update user data
      await setDoc(doc(firestore, 'users', user.uid), {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        uid: user.uid,
        provider: 'google',
        lastLogin: serverTimestamp(),
      }, { merge: true });
      toast.success('Google sign-in successful!');
      router.replace('/dashboard');
    } catch (error) {
      console.error('Error signing in with Google:', error);
      setError(error.message || 'Failed to sign in with Google');
      toast.error(error.message || 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  // Handle redirect result on component mount
  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          const user = result.user;
          await setSession();
          
          // Update user data
          await setDoc(doc(firestore, 'users', user.uid), {
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            uid: user.uid,
            provider: 'google',
            lastLogin: serverTimestamp(),
          }, { merge: true });
          toast.success('Google sign-in successful!');
          router.replace('/dashboard');
        }
      } catch (error) {
        console.error('Error handling redirect result:', error);
        setError(error.message || 'Failed to complete sign in');
        toast.error(error.message || 'Failed to complete sign in');
      }
    };

    handleRedirectResult();
  }, [router]);

  return (
    <>
      {error && (
        <div className="mb-4 text-sm text-red-600 text-center">
          {error}
        </div>
      )}
      <button
        onClick={handleGoogleSignIn}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {loading ? (
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-700" />
        ) : (
          <>
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span>Continue with Google</span>
          </>
        )}
      </button>
    </>
  );
}
