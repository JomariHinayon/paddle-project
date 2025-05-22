'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth, firestore } from '@/lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import Link from 'next/link';
import Image from 'next/image';
import GoogleSignInButton from '@/components/GoogleSignInButton';
import { setSession } from '@/lib/session';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.emailVerified) {
          router.replace('/dashboard');
        } else {
          router.replace('/confirm-signup?email=' + encodeURIComponent(user.email || ''));
        }
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Set session token
      await setSession();

      // Update last login
      await setDoc(doc(firestore, 'users', user.uid), {
        lastLogin: serverTimestamp()
      }, { merge: true });

      // Clear form data
      setFormData({ email: '', password: '' });

      // Redirect based on email verification using replace
      if (!user.emailVerified) {
        router.replace('/confirm-signup?email=' + encodeURIComponent(formData.email));
      } else {
        router.replace('/dashboard');
      }
    } catch (error) {
      setError(getErrorMessage(error.code));
      setLoading(false);
    }
  };

  const getErrorMessage = (code) => {
    switch (code) {
      case 'auth/invalid-credential':
        return 'Invalid email or password';
      case 'auth/user-disabled':
        return 'This account has been disabled';
      case 'auth/user-not-found':
        return 'No account found with this email';
      case 'auth/wrong-password':
        return 'Invalid email or password';
      default:
        return 'Failed to sign in. Please try again.';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-white dark:from-violet-950 dark:to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8 md:p-10">
          <div className="flex items-center mb-8">
            <Image 
              src="/pafire-logo.svg"
              alt="paFire Logo"
              width={40}
              height={40}
              className="mr-3"
              priority
            />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome Back</h1>
          </div>

          <GoogleSignInButton />
          
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-200 dark:border-slate-700"></div>
            <span className="px-4 text-gray-500 dark:text-slate-400 text-sm">or continue with email</span>
            <div className="flex-1 border-t border-gray-200 dark:border-slate-700"></div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg text-sm border-l-4 border-red-500">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 dark:text-slate-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 dark:text-slate-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <Link href="/forgot-password" className="text-violet-600 hover:text-violet-800 dark:text-violet-400 dark:hover:text-violet-300">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-6 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600 dark:text-slate-400">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="font-medium text-violet-600 hover:text-violet-800 dark:text-violet-400 dark:hover:text-violet-300 transition-colors">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
