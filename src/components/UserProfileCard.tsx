'use client';

import { User } from 'firebase/auth';
import Image from 'next/image';

interface UserProfileCardProps {
  user: User | null;
}

export default function UserProfileCard({ user }: UserProfileCardProps) {
  const getProfileImage = () => {
    if (user?.photoURL) {
      // Handle Google photo URL
      return (
        <Image 
          src={user.photoURL}
          alt={user.displayName || 'Profile'}
          width={64}
          height={64}
          className="rounded-full"
          priority
        />
      );
    }

    return (
      <div className="h-16 w-16 rounded-full bg-violet-100 flex items-center justify-center">
        <span className="text-2xl text-violet-600">
          {(user?.displayName?.[0] || user?.email?.[0] || '?').toUpperCase()}
        </span>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-4">
        {getProfileImage()}
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            {user?.displayName || user?.email?.split('@')[0] || 'User'}
          </h2>
          <p className="text-gray-500">{user?.email}</p>
        </div>
      </div>
      
      <div className="mt-6 border-t pt-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Account Status</span>
          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
            Active
          </span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm text-gray-500">Subscription</span>
          <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
            Free Plan
          </span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm text-gray-500">Email Verified</span>
          <span className={`px-2 py-1 text-xs rounded-full ${
            user?.emailVerified 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {user?.emailVerified ? 'Verified' : 'Pending'}
          </span>
        </div>
      </div>
    </div>
  );
}
