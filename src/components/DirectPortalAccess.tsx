'use client';

import React from 'react';
import ManageSubscriptionButton from './ManageSubscriptionButton';

interface DirectPortalAccessProps {
  customerId: string;
  returnUrl?: string;
  className?: string;
}

/**
 * Component that allows direct access to a customer's Paddle portal session
 * without requiring them to be logged in
 */
export default function DirectPortalAccess({
  customerId,
  returnUrl,
  className,
}: DirectPortalAccessProps) {
  return (
    <div className={`flex flex-col items-center ${className || ''}`}>
      <h2 className="text-xl font-semibold mb-4">Manage Your Subscription</h2>
      <p className="text-gray-600 mb-6">
        Click below to access your subscription details in the Paddle customer portal.
      </p>
      <ManageSubscriptionButton
        customerId={customerId}
        returnUrl={returnUrl}
        variant="primary"
        size="large"
      />
    </div>
  );
} 