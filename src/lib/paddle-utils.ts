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

export const PADDLE_PLANS = {
  'pri_01jqxf4pd45rpn0h4t': {
    name: 'Standard Plan',
    features: ['Basic features', 'Email support']
  },
  'pri_01jqxf4pd45rpn0h4t2': {
    name: 'Premium Plan',
    features: ['All features', 'Priority support']
  }
} as const;

export const identifyPlan = (productId: string | null) => {
  if (!productId) return { name: 'Free Plan', features: ['Basic access'] };
  return PADDLE_PLANS[productId as keyof typeof PADDLE_PLANS] || { name: 'Unknown Plan', features: [] };
};

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
