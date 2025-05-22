'use client';

import { useEffect } from 'react';

export default function SandboxPortalRedirect() {
  useEffect(() => {
    // Redirect directly to the specified Paddle sandbox portal URL
    window.location.href = 'https://sandbox-customer-portal.paddle.com/cpl_01jqppqpftkjwppfthwevb3h64?customer_email=testemailuser89%40gmail.com&customer_id=ctm_01jrhz1tf0r5wx62mx6cby456r&origin-intended=true';
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold">Redirecting to Customer Portal...</h2>
        <p className="mt-2 text-gray-600">
          Please wait while we redirect you to the Paddle customer portal.
        </p>
        <div className="mt-4 flex justify-center">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        </div>
      </div>
    </div>
  );
} 