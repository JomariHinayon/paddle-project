'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, sendEmailVerification, onAuthStateChanged } from 'firebase/auth';
import { auth, firestore } from '@/lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { z } from 'zod';
import GoogleSignInButton from '@/components/GoogleSignInButton';
import Link from 'next/link';
import Image from 'next/image';

// Form validation schema
const signUpSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState('');

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    
    try {
      signUpSchema.parse(formData);
      setLoading(true);

      // Create user first
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      try {
        // Then try to store user data
        await setDoc(doc(firestore, 'users', userCredential.user.uid), {
          email: formData.email,
          uid: userCredential.user.uid,
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp(),
          emailVerified: false,
          provider: 'email'
        });
      } catch (firestoreError) {
        console.error('Firestore error:', firestoreError);
        // Continue with verification even if Firestore fails
      }

      // Send verification email
      await sendEmailVerification(userCredential.user);
      
      // Clear form and loading state before redirect
      setFormData({ email: '', password: '', confirmPassword: '' });
      setLoading(false);
      
      // Redirect to confirmation page
      router.replace('/confirm-signup?email=' + encodeURIComponent(formData.email));
      
    } catch (error: any) {
      setLoading(false);
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path) newErrors[err.path[0]] = err.message;
        });
        setErrors(newErrors);
      } else {
        setAuthError(getAuthErrorMessage(error.code));
      }
    }
  };

  const getAuthErrorMessage = (code: string) => {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'Email already in use';
      case 'auth/invalid-email':
        return 'Invalid email address';
      case 'auth/weak-password':
        return 'Password is too weak';
      default:
        return 'Failed to create account. Please try again.';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-white dark:from-violet-950 dark:to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md md:max-w-xl lg:max-w-2xl grid bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden">
        {/* Left side - Sign up form */}
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
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create Your Account</h1>
          </div>
          
          <GoogleSignInButton />
          
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-200 dark:border-slate-700"></div>
            <span className="px-4 text-gray-500 dark:text-slate-400 text-sm">or continue with email</span>
            <div className="flex-1 border-t border-gray-200 dark:border-slate-700"></div>
          </div>

          {authError && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg text-sm border-l-4 border-red-500">
              {authError}
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
                  className={`w-full pl-10 pr-4 py-3 border ${errors.email ? 'border-red-500 dark:border-red-600' : 'border-gray-300 dark:border-slate-600'} rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white`}
                  placeholder="your@email.com"
                  required
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
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
                  className={`w-full pl-10 pr-4 py-3 border ${errors.password ? 'border-red-500 dark:border-red-600' : 'border-gray-300 dark:border-slate-600'} rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white`}
                  placeholder="••••••••"
                  required
                />
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password}</p>}
              <p className="mt-1 text-xs text-gray-500 dark:text-slate-400">
                Must be at least 8 characters with 1 uppercase letter and 1 number
              </p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 dark:text-slate-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border ${errors.confirmPassword ? 'border-red-500 dark:border-red-600' : 'border-gray-300 dark:border-slate-600'} rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white`}
                  placeholder="••••••••"
                  required
                />
              </div>
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.confirmPassword}</p>}
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
                  Creating Account...
                </span>
              ) : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600 dark:text-slate-400">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-violet-600 hover:text-violet-800 dark:text-violet-400 dark:hover:text-violet-300 transition-colors">
              Log in
            </Link>
          </div>
        </div>
        
        {/* Right side - Subscription highlights */}
        {/* <div className="hidden md:block bg-gradient-to-br from-violet-600 to-indigo-700 p-10 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-y-24 translate-x-24"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full translate-y-24 -translate-x-24"></div>
          
          <div className="relative z-10 h-full flex flex-col">
            <h2 className="text-3xl font-bold mb-6">Join paFire Today</h2>
            <p className="text-lg text-indigo-100 mb-8">
              Create your account to unlock premium features and take your experience to the next level.
            </p>
            
            <div className="space-y-6 flex-1">
              <div className="flex items-start">
                <div className="rounded-full p-2 bg-white bg-opacity-20 mr-4 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Standard Plan</h3>
                  <p className="text-indigo-100 opacity-90">Core application features with email support and basic analytics.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="rounded-full p-2 bg-white bg-opacity-20 mr-4 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Premium Plan</h3>
                  <p className="text-indigo-100 opacity-90">All standard features plus priority support, advanced analytics and team collaboration tools.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="rounded-full p-2 bg-white bg-opacity-20 mr-4 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Secure & Private</h3>
                  <p className="text-indigo-100 opacity-90">Your data is always safe and protected with our enterprise-grade security.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-auto pt-8">
              <div className="p-4 bg-white bg-opacity-10 rounded-lg border border-white border-opacity-20">
                <p className="italic text-indigo-100">
                  "paFire has completely transformed how we manage our workflow. The premium features are worth every penny!"
                </p>
                <p className="mt-2 font-medium">— Sarah Johnson, Product Manager</p>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}