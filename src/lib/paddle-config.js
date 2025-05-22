export const PADDLE_CONFIG = {
  clientToken: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN || '',
  sellerId: process.env.NEXT_PUBLIC_PADDLE_SELLER_ID || '',
  prices: {
    standard: {
      month: process.env.NEXT_PUBLIC_PADDLE_STANDARD_MONTH_PRICE_ID || 'pri_01h8xz97pj0000000000000000',
      year: process.env.NEXT_PUBLIC_PADDLE_STANDARD_YEAR_PRICE_ID || 'pri_01h8xz97pj0000000000000000'
    },
    premium: {
      month: process.env.NEXT_PUBLIC_PADDLE_PREMIUM_MONTH_PRICE_ID || 'pri_01h8xz97pj0000000000000000',
      year: process.env.NEXT_PUBLIC_PADDLE_PREMIUM_YEAR_PRICE_ID || 'pri_01h8xz97pj0000000000000000'
    }
  },
  planDetails: {
    standard: {
      name: 'Standard Plan',
      features: ['Core application features', 'Email support', 'Basic analytics']
    },
    premium: {
      name: 'Premium Plan',
      features: ['All Standard features', 'Priority support', 'Advanced analytics', 'Custom integrations', 'Team collaboration tools']
    }
  },
  checkoutUrl: 'https://checkout.paddle.com/checkout',
  customerPortalUrl: 'https://checkout.paddle.com/customer',
  customerPortalLink: process.env.NEXT_PUBLIC_PADDLE_CUSTOMER_PORTAL_LINK || 'https://sandbox-customer-portal.paddle.com/cpl_01jtqjeq79c64enc8qy3cs3zrm'
};

export const identifyPriceId = (priceId) => {
  for (const [plan, cycles] of Object.entries(PADDLE_CONFIG.prices)) {
    for (const [cycle, id] of Object.entries(cycles)) {
      if (id === priceId) {
        return {
          plan: plan,
          cycle: cycle
        };
      }
    }
  }
  return null;
};

export const getPlanDetails = (priceId) => {
  const identified = identifyPriceId(priceId);
  if (!identified) return null;

  return {
    ...PADDLE_CONFIG.planDetails[identified.plan],
    billingCycle: identified.cycle,
    priceId
  };
};

export const getPlanFromTransaction = (transaction) => {
  const priceId = transaction.items?.[0]?.price?.id;
  if (!priceId) return null;

  const planInfo = identifyPriceId(priceId);
  if (!planInfo) return null;

  return {
    ...PADDLE_CONFIG.planDetails[planInfo.plan],
    billingCycle: planInfo.cycle,
    priceId,
    amount: transaction.total,
    currency: transaction.currency_code,
    status: transaction.status
  };
};

export const matchTransactionPlan = (productId) => {
  if (!productId) return null;

  // Flatten price IDs for lookup
  const priceMap = Object.entries(PADDLE_CONFIG.prices).reduce((acc, [plan, cycles]) => {
    Object.entries(cycles).forEach(([cycle, id]) => {
      acc[id] = { plan: plan, cycle: cycle };
    });
    return acc;
  }, {});

  return priceMap[productId] || null;
};
