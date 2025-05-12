export const PADDLE_CONFIG = {
  clientToken: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN || '',
  sellerId: process.env.NEXT_PUBLIC_PADDLE_SELLER_ID || '',
  prices: {
    standard: {
      month: 'pri_01jv178w9jst683rgyjb6w18qx',
      year: 'pri_01jv17anj5xnsta6hvv209sdyq'
    },
    premium: {
      month: 'pri_01jv17e3xm8mdsd22866ce8417',
      year: 'pri_01jv17f8370m2vyvspr2btg84s'
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
  customerPortalLink: process.env.NEXT_PUBLIC_PADDLE_CUSTOMER_PORTAL_LINK || 'https://sandbox-customer-portal.paddle.com'
};

export type PlanType = keyof typeof PADDLE_CONFIG.prices;
export type BillingCycle = keyof typeof PADDLE_CONFIG.prices.standard;

export const identifyPriceId = (priceId: string): { plan: PlanType; cycle: BillingCycle } | null => {
  for (const [plan, cycles] of Object.entries(PADDLE_CONFIG.prices)) {
    for (const [cycle, id] of Object.entries(cycles)) {
      if (id === priceId) {
        return { 
          plan: plan as PlanType, 
          cycle: cycle as BillingCycle 
        };
      }
    }
  }
  return null;
};

export const getPlanDetails = (priceId: string) => {
  const identified = identifyPriceId(priceId);
  if (!identified) return null;
  
  return {
    ...PADDLE_CONFIG.planDetails[identified.plan],
    billingCycle: identified.cycle,
    priceId
  };
};

export interface PaddleTransaction {
  items?: Array<{
    price?: {
      id?: string;
      product_id?: string;
    }
  }>;
  status?: string;
  total?: number;
  currency_code?: string;
}

export const getPlanFromTransaction = (transaction: PaddleTransaction) => {
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

export const matchTransactionPlan = (productId: string | undefined) => {
  if (!productId) return null;
  
  // Flatten price IDs for lookup
  const priceMap = Object.entries(PADDLE_CONFIG.prices).reduce((acc, [plan, cycles]) => {
    Object.entries(cycles).forEach(([cycle, id]) => {
      acc[id] = { plan: plan as PlanType, cycle: cycle as BillingCycle };
    });
    return acc;
  }, {} as Record<string, { plan: PlanType; cycle: BillingCycle }>);
  
  return priceMap[productId] || null;
};
