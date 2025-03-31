'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import LogoutButton from '@/components/LogoutButton';
import UserProfileCard from '@/components/UserProfileCard';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace('/login');
        return;
      }
      setUser(user);
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <span className="text-xl font-semibold">Dashboard</span>
            <div className="flex items-center space-x-4">
              <LogoutButton className="text-gray-700 hover:text-gray-900" />
            </div>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <UserProfileCard user={user} />
          </div>
          
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Stats</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-violet-50 rounded-lg">
                  <p className="text-sm text-violet-600">Login Method</p>
                  <p className="text-lg font-semibold text-violet-900">
                    {user?.providerData[0]?.providerId === 'password' 
                      ? 'Email/Password' 
                      : 'Google'}
                  </p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-600">Last Sign In</p>
                  <p className="text-lg font-semibold text-blue-900">
                    {user?.metadata.lastSignInTime 
                      ? new Date(user.metadata.lastSignInTime).toLocaleDateString() 
                      : 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Account Activity</h2>
              <p className="text-gray-600">Coming soon...</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
