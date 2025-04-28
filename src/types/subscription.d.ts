export interface SubscriptionStatus {
  hasActive: boolean;
  plan: string | null;
  status: 'active' | 'canceled' | 'inactive';
  nextBillDate: Date | null;
  canceledAt: Date | null;
  subscriptionId: string | null;
  lastUpdated: Date | null;
}

export interface PaddleWebhookEvent {
  event_type: 
    | 'subscription.created'
    | 'subscription.updated'
    | 'subscription.canceled'
    | 'checkout.completed'
    | 'transaction.completed';
  data: {
    id: string;
    subscription_id?: string;
    items: Array<{
      price: {
        product_id: string;
        description?: string;
        unit_price?: {
          amount: number;
          currency_code: string;
        };
      };
      product?: {
        id: string;
        name: string;
      };
    }>;
    custom_data?: {
      userId: string;
    };
    status?: string;
    start_date?: string;
    next_billed_at?: string;
    billing_cycle?: string;
    cancel_reason?: string;
    billing_period?: {
      start_at: string;
      end_at: string;
    };
    details?: {
      totals?: {
        total: number;
      };
    };
    order_id?: string;
    currency_code?: string;
    customer?: {
      email: string;
    };
  };
}