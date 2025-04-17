import { PADDLE_CONFIG } from '@/lib/paddle-config';

interface TransactionData {
  checkoutId: string;
  transactionId: string;
  status: string;
  total: number;
  currency: string;
  items: Array<{
    price: {
      product_id: string;
      description?: string;
    };
  }>;
  paddleEventData: any;
}

interface PlanInfo {
  name: string;
  tier: 'standard' | 'premium';
  interval: 'month' | 'year';
  description?: string;
  features?: string[];
}

/**
 * Identifies a plan based on the planId from Paddle
 * 
 * @param planId The Paddle plan ID to identify
 * @returns Information about the plan or null if not found
 */
export function identifyPlan(planId: string): PlanInfo | null {
  // Check standard plans
  if (planId === PADDLE_CONFIG.prices.standard.month) {
    return {
      name: 'Standard Monthly',
      tier: 'standard',
      interval: 'month',
      description: 'Basic features with monthly billing',
      features: PADDLE_CONFIG.planDetails.standard.features
    };
  }

  if (planId === PADDLE_CONFIG.prices.standard.year) {
    return {
      name: 'Standard Yearly',
      tier: 'standard',
      interval: 'year',
      description: 'Basic features with yearly billing (save 16%)',
      features: PADDLE_CONFIG.planDetails.standard.features
    };
  }

  // Check premium plans
  if (planId === PADDLE_CONFIG.prices.premium.month) {
    return {
      name: 'Premium Monthly',
      tier: 'premium',
      interval: 'month',
      description: 'Advanced features with monthly billing',
      features: PADDLE_CONFIG.planDetails.premium.features
    };
  }

  if (planId === PADDLE_CONFIG.prices.premium.year) {
    return {
      name: 'Premium Yearly',
      tier: 'premium',
      interval: 'year',
      description: 'Advanced features with yearly billing (save 16%)',
      features: PADDLE_CONFIG.planDetails.premium.features
    };
  }

  return null;
}

/**
 * Formats a Paddle price amount for display
 * 
 * @param amount The price amount in cents/smallest currency unit
 * @param currencyCode The currency code (default: USD)
 * @returns Formatted price string
 */
export function formatPrice(amount: number, currencyCode: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2
  }).format(amount / 100);
}

/**
 * Creates a valid checkout URL for Paddle
 * 
 * @param priceId The Paddle price ID to create checkout for
 * @param customerId Optional customer ID for existing customers
 * @param customerEmail Optional customer email for prefilling checkout
 * @returns Full checkout URL
 */
export function createCheckoutUrl(
  priceId: string, 
  customerId?: string, 
  customerEmail?: string
): string {
  const baseUrl = PADDLE_CONFIG.checkoutUrl;
  const queryParams = new URLSearchParams();
  
  // Add the price ID as an item
  queryParams.append('items[0][priceId]', priceId);
  queryParams.append('items[0][quantity]', '1');
  
  // Add customer ID if provided
  if (customerId) {
    queryParams.append('customer[id]', customerId);
  }
  
  // Add customer email if provided
  if (customerEmail) {
    queryParams.append('customer[email]', customerEmail);
  }
  
  // Add success and cancel URLs if needed
  // queryParams.append('successUrl', window.location.origin + '/checkout/success');
  // queryParams.append('cancelUrl', window.location.origin + '/checkout/cancel');
  
  return `${baseUrl}?${queryParams.toString()}`;
}

export const getTransactionDetails = (transaction: TransactionData) => {
  const productId = transaction.items?.[0]?.price?.product_id;
  const plan = identifyPlan(productId);
  
  return {
    ...plan,
    amount: `${transaction.total} ${transaction.currency}`,
    status: transaction.status,
    checkoutId: transaction.checkoutId,
    transactionId: transaction.transactionId,
    rawProductId: productId,
    purchaseDate: transaction.paddleEventData?.created_at,
  };
};
