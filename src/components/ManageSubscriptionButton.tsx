'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ManageSubscriptionButtonProps {
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  showIcon?: boolean;
  returnUrl?: string;
}

export default function ManageSubscriptionButton({
  className = '',
  variant = 'primary',
  size = 'medium',
  showIcon = true,
  returnUrl,
}: ManageSubscriptionButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Set default classes based on variant and size
  let buttonClasses = 'flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  // Add variant-specific classes
  switch (variant) {
    case 'primary':
      buttonClasses += ' bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500';
      break;
    case 'secondary':
      buttonClasses += ' bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500';
      break;
    case 'outline':
      buttonClasses += ' border border-gray-300 hover:bg-gray-50 text-gray-700 focus:ring-blue-500';
      break;
    case 'text':
      buttonClasses += ' hover:bg-gray-100 text-gray-700 focus:ring-blue-500';
      break;
  }
  
  // Add size-specific classes
  switch (size) {
    case 'small':
      buttonClasses += ' text-sm px-3 py-1.5';
      break;
    case 'medium':
      buttonClasses += ' text-base px-4 py-2';
      break;
    case 'large':
      buttonClasses += ' text-lg px-6 py-3';
      break;
  }

  // Handle click to redirect to customer portal
  const handleManageSubscription = async () => {
    setIsLoading(true);
    try {
      // Build the URL with any return URL if provided
      let url = '/api/subscriptions/portal-session';
      if (returnUrl) {
        url += `?returnUrl=${encodeURIComponent(returnUrl)}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get portal URL');
      }

      if (data.url) {
        // Redirect to the Paddle Customer Portal
        window.location.href = data.url;
      } else {
        throw new Error('No portal URL received');
      }
    } catch (error) {
      console.error('Error getting customer portal URL:', error);
      // You could show an error message here if desired
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className={`${buttonClasses} ${className}`}
      onClick={handleManageSubscription}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </>
      ) : (
        <>
          {showIcon && (
            <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          )}
          Manage Subscription
        </>
      )}
    </button>
  );
} 