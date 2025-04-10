export const PADDLE_CONFIG = {
  clientToken: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN || '',
  prices: {
    standard: {
      month: "pri_01jqpptmznh4vswj791kdk56q3",
      year: "pri_01jqppvckqd321w7vv04yadp72"
    },
    premium: {
      month: "pri_01jrcyb5gnfxn2s012n83a2gcf",
      year: "pri_01jrcyfgfqb3p51a7sfy2y5mav"
    }
  }
} as const;

export type PlanType = keyof typeof PADDLE_CONFIG.prices;
export type BillingCycle = keyof typeof PADDLE_CONFIG.prices.standard;
