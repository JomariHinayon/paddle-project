import { PADDLE_CONFIG } from '@/lib/paddle-config.js';

function TransactionData(checkoutId, transactionId, status, total, currency, items, paddleEventData) {
  this.checkoutId = checkoutId;
  this.transactionId = transactionId;
  this.status = status;
  this.total = total;
  this.currency = currency;
  this.items = items;
  this.paddleEventData = paddleEventData;
}

function PlanInfo(name, tier, interval, description, features) {
  this.name = name;
  this.tier = tier;
  this.interval = interval;
  this.description = description;
  this.features = features;
}

export function PaddlePlan(name, features, description, tier, interval) {
  this.name = name;
  this.features = features;
  this.description = description;
  this.tier = tier;
  this.interval = interval;
}

// Export the PADDLE_PLANS object
export const PADDLE_PLANS = {
  // Standard monthly plan
  [PADDLE_CONFIG.prices.standard.month]: new PaddlePlan(
    'Standard Monthly',
    PADDLE_CONFIG.planDetails.standard.features,
    'Basic features with monthly billing',
    'standard',
    'month'
  ),

  // Standard yearly plan
  [PADDLE_CONFIG.prices.standard.year]: new PaddlePlan(
    'Standard Yearly',
    PADDLE_CONFIG.planDetails.standard.features,
    'Basic features with yearly billing (save 16%)',
    'standard',
    'year'
  ),

  // Premium monthly plan
  [PADDLE_CONFIG.prices.premium.month]: new PaddlePlan(
    'Premium Monthly',
    PADDLE_CONFIG.planDetails.premium.features,
    'Advanced features with monthly billing',
    'premium',
    'month'
  ),

  // Premium yearly plan
  [PADDLE_CONFIG.prices.premium.year]: new PaddlePlan(
    'Premium Yearly',
    PADDLE_CONFIG.planDetails.premium.features,
    'Advanced features with yearly billing (save 16%)',
    'premium',
    'year'
  )
};

/**
 * Identifies a plan based on the planId from Paddle
 * 
 * @param planId The Paddle plan ID to identify
 * @returns Information about the plan or null if not found
 */
export function identifyPlan(planId) {
  // Check standard plans
  if (planId === PADDLE_CONFIG.prices.standard.month) {
    return new PlanInfo(
      'Standard Monthly',
      'standard',
      'month',
      'Basic features with monthly billing',
      PADDLE_CONFIG.planDetails.standard.features
    );
  }

  if (planId === PADDLE_CONFIG.prices.standard.year) {
    return new PlanInfo(
      'Standard Yearly',
      'standard',
      'year',
      'Basic features with yearly billing (save 16%)',
      PADDLE_CONFIG.planDetails.standard.features
    );
  }

  // Check premium plans
  if (planId === PADDLE_CONFIG.prices.premium.month) {
    return new PlanInfo(
      'Premium Monthly',
      'premium',
      'month',
      'Advanced features with monthly billing',
      PADDLE_CONFIG.planDetails.premium.features
    );
  }

  if (planId === PADDLE_CONFIG.prices.premium.year) {
    return new PlanInfo(
      'Premium Yearly',
      'premium',
      'year',
      'Advanced features with yearly billing (save 16%)',
      PADDLE_CONFIG.planDetails.premium.features
    );
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
export function formatPrice(amount, currencyCode = 'USD') {
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
export function createCheckoutUrl(priceId, customerId, customerEmail) {
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

export const getTransactionDetails = function (transaction) {
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
