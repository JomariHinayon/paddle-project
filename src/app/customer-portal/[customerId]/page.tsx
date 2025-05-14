import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import DirectPortalAccess from '@/components/DirectPortalAccess';

interface CustomerPortalPageProps {
  params: {
    customerId: string;
  };
  searchParams?: {
    returnUrl?: string;
  };
}

export const metadata: Metadata = {
  title: 'Manage Your Subscription | Paddle Customer Portal',
  description: 'Access your subscription details and billing information.',
};

// Generate static params for build time
// This is required when using static export with dynamic routes
export function generateStaticParams() {
  // Since customer IDs are dynamic and likely come from a database,
  // we'll provide a dummy/placeholder ID for static generation
  // In a real app, you might fetch actual customer IDs from your database
  return [
    { customerId: 'placeholder-id' },
  ];
}

export default function CustomerPortalPage({
  params,
  searchParams,
}: CustomerPortalPageProps) {
  const { customerId } = params;
  const returnUrl = searchParams?.returnUrl;
  
  // Validate the customerId to ensure it's in the expected format
  // This is a basic validation; you might want to implement more robust checks
  if (!customerId || customerId.length < 10) {
    // For static export, we'll render a fallback rather than using notFound()
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Invalid Customer ID</h1>
          <p className="text-gray-600 mb-6">
            The customer ID provided is not valid or does not exist.
          </p>
          <a 
            href="/"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Return to Home
          </a>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Subscription Management</h1>
          <p className="text-gray-600">
            Manage your subscription details, update payment methods, and view billing history.
          </p>
        </div>
        
        <DirectPortalAccess 
          customerId={customerId}
          returnUrl={returnUrl}
          className="mt-8"
        />
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-medium mb-4">Need Help?</h3>
          <p className="text-gray-600 mb-2">
            If you have any questions about your subscription or billing, please contact our support team.
          </p>
          <a 
            href="mailto:support@example.com" 
            className="text-blue-600 hover:text-blue-800 transition"
          >
            support@example.com
          </a>
        </div>
      </div>
    </div>
  );
} 