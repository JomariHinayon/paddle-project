'use client';

import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SubscriptionPortalButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleViewSubscriptions = async () => {
    try {
      setIsLoading(true);
      
      // You can optionally pass a returnUrl as a query parameter
      const returnUrl = window.location.href;
      const response = await fetch(
        `/api/subscriptions/portal-session?returnUrl=${encodeURIComponent(returnUrl)}`,
        {
          method: 'GET',
          credentials: 'include', // This is important to include cookies in the request
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get portal URL');
      }
      
      const { url } = await response.json();
      
      // Redirect the user to the Paddle customer portal
      window.location.href = url;
    } catch (error) {
      console.error('Error accessing subscription portal:', error);
      alert('Could not access subscription portal. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleViewSubscriptions}
        disabled={isLoading}
        className="btn btn-secondary"
      >
        {isLoading ? 'Loading...' : 'Subscription Portal'}
      </button>
    </div>
  );
} 