'use client';

import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { clearSession } from '@/lib/session';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LogoutButton({ className = '' }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      clearSession();
      router.replace('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className={`flex items-center ${className}`}
    >
      {loading ? (
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
      ) : (
        'Logout'
      )}
    </button>
  );
}
