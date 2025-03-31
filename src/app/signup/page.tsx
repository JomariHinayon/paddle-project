'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, sendEmailVerification, onAuthStateChanged } from 'firebase/auth';
import { auth, firestore } from '@/lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { z } from 'zod';
import GoogleSignInButton from '@/components/GoogleSignInButton';

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Create Account</h1>
        
        <GoogleSignInButton />
        
        <div className="my-4 flex items-center">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-gray-500 text-sm">or</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {authError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {authError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              required
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
              required
            />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            <p className="mt-1 text-xs text-gray-500">
              Must be at least 8 characters with 1 uppercase letter and 1 number
            </p>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
              required
            />
            {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </span>
            ) : 'Sign Up'}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:text-blue-800 font-medium">
            Log in
          </a>
        </div>
      </div>
    </div>
  );
}